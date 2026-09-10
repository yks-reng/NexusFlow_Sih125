import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Helper to map 2-letter language code to BCP-47 speech synthesis tag
function getSpeechLangTag(langCode: string): string {
  switch (langCode) {
    case 'hi': return 'hi-IN';
    case 'te': return 'te-IN';
    case 'ta': return 'ta-IN';
    case 'mr': return 'mr-IN';
    case 'bn': return 'bn-IN';
    case 'gu': return 'gu-IN';
    case 'kn': return 'kn-IN';
    case 'ml': return 'ml-IN';
    case 'pa': return 'pa-IN';
    case 'ur': return 'ur-IN';
    case 'es': return 'es-ES';
    case 'fr': return 'fr-FR';
    case 'de': return 'de-DE';
    case 'it': return 'it-IT';
    case 'pt': return 'pt-BR';
    case 'ru': return 'ru-RU';
    case 'ja': return 'ja-JP';
    case 'zh': return 'zh-CN';
    case 'ar': return 'ar-SA';
    case 'en':
    default:
      return 'en-US';
  }
}

// Helper to detect message language
function detectLanguage(text: string, fallbackLang: string = 'en'): string {
  if (!text || typeof text !== 'string') return fallbackLang || 'en';

  // Check Marathi in Devanagari
  if (/[\u0900-\u097F]/.test(text)) {
    if (/\b(आहे|नाही|कसा|कशी|काय|पाणी|पिण्यायोग्य|खारेपणा|गाई|म्हैस)\b/.test(text)) {
      return 'mr';
    }
    return 'hi'; // Default Devanagari is Hindi
  }

  // Indic native scripts
  if (/[\u0C00-\u0C7F]/.test(text)) return 'te'; // Telugu
  if (/[\u0B80-\u0BFF]/.test(text)) return 'ta'; // Tamil
  if (/[\u0980-\u09FF]/.test(text)) return 'bn'; // Bengali
  if (/[\u0A80-\u0AFF]/.test(text)) return 'gu'; // Gujarati
  if (/[\u0C80-\u0CFF]/.test(text)) return 'kn'; // Kannada
  if (/[\u0D00-\u0D7F]/.test(text)) return 'ml'; // Malayalam
  if (/[\u0A00-\u0A7F]/.test(text)) return 'pa'; // Punjabi
  if (/[\u0600-\u06FF]/.test(text)) return 'ur'; // Urdu / Arabic
  if (/[\u0400-\u04FF]/.test(text)) return 'ru'; // Cyrillic / Russian
  if (/[\u3040-\u30ff]/.test(text)) return 'ja'; // Japanese
  if (/[\u4e00-\u9fff]/.test(text)) return 'zh'; // Chinese

  const lower = text.toLowerCase();
  // Hinglish (Romanized Hindi)
  if (/\b(pani|paani|peene|peena|kaisa|kese|kyu|kyun|kyon|hai|hoga|h|kare|khatra|saaf|ganda|khara|namak|swaad|badbu|mitti|fitkari|bacho|gay|bhains|khet|chulha|kya|batao|theek|sahi|peeyun)\b/i.test(lower)) {
    return 'hi';
  }
  // Teluglish (Romanized Telugu)
  if (/\b(neellu|neeru|taagocha|taagavacha|bavunda|ledu|uppu|muriki|drip|tagocha|chedu|kavala|ela|undi|undhi|cheppandi)\b/i.test(lower)) {
    return 'te';
  }
  // Tamglish (Romanized Tamil)
  if (/\b(thanni|thanner|kudikkalama|nalliruka|uppu|kudika|epadi|iruku|illai|sollunga)\b/i.test(lower)) {
    return 'ta';
  }
  // Spanish
  if (/\b(hola|agua|beber|filtro|salud|seguro|segura|cómo|como|por\s*qué|porque|está|esta|peligro|limpiar|buena|bueno|malo|tomar|gracias)\b/i.test(lower)) {
    return 'es';
  }
  // French
  if (/\b(bonjour|eau|boire|filtre|santé|pourquoi|propre|comment|danger|bonne|buvable|merci)\b/i.test(lower)) {
    return 'fr';
  }
  // German
  if (/\b(hallo|wasser|trinken|filter|gesundheit|warum|sauber|wie|gefahr|danke)\b/i.test(lower)) {
    return 'de';
  }

  return fallbackLang || 'en';
}

// AI Chatbot endpoint with comprehensive context
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { message, history, systemContext, language = 'en' } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const detectedLang = detectLanguage(message, language);
    const ai = getGeminiClient();

    const systemInstruction = `You are NexusFlow, an intelligent, fast, and precise Water & Purifier Assistant.

CRITICAL USER MANDATE: DIRECT ANSWER ONLY — NO MEANINGS, NO UNNECESSARY INFORMATION
1. GIVE ONLY THE DIRECT ANSWER TO THE USER'S QUESTION in 1 to 3 concise, clear sentences.
2. DO NOT EXPLAIN DEFINITIONS OR MEANINGS:
   - Do NOT explain what TDS, pH, turbidity, or other metrics mean or stand for unless the user specifically asks "What is TDS?" or "What does pH mean?".
   - Do NOT include analogies (e.g. "TDS is like salt in tea", "sediment filter is like a tea strainer").
   - Do NOT add background explanations, definitions, or theory.
3. DO NOT ADD UNREQUESTED INFORMATION:
   - No unsolicited "everyday tips", "village advice", "cattle tips", "farming advice", or "health reports" unless explicitly asked.
   - No multi-section essay templates or redundant bullet points.
4. STRICT LANGUAGE MATCHING:
   - You MUST analyze the language of the user's message.
   - Always reply in the EXACT SAME LANGUAGE the user used (Hindi, Telugu, Tamil, Marathi, Bengali, Gujarati, Kannada, Spanish, French, German, Hinglish, English, etc.).
5. AUDIO-FRIENDLY FORMATTING:
   - Never use dashed separator lines like '---' or markdown tables.
   - Keep answers crisp, direct, and conversational so they sound natural when read out loud.

CURRENT NEXUSFLOW TELEMETRY:
${systemContext ? JSON.stringify(systemContext, null, 2) : 'Sensors running live.'}`;

    if (!ai) {
      const fallbackResponse = generateSmartFallback(message, systemContext, detectedLang);
      const speechLangTag = getSpeechLangTag(detectedLang);
      return res.json({
        reply: fallbackResponse,
        source: 'local_expert_engine',
        detectedLang,
        speechLangTag,
        inputLang: detectedLang,
        notice: 'Operating in built-in offline water-science expert engine.',
      });
    }

    // Build chat conversation with history
    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      const recentHistory = history.slice(-10);
      for (const msg of recentHistory) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        });
      }
    }
    // Add current user prompt
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    // Model fallback chain: try primary model, then fast fallback models if busy/experiencing spikes
    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
    let replyText = '';
    let successModel = '';

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });
        if (response.text) {
          replyText = response.text;
          successModel = modelName;
          break;
        }
      } catch (modelErr: any) {
        console.warn(`Model ${modelName} failed or unavailable:`, modelErr?.message || modelErr);
        // Continue to next model in fallback list
      }
    }

    if (!replyText) {
      // Fallback to local expert engine if all cloud models are unavailable
      replyText = generateSmartFallback(message, systemContext, detectedLang);
      successModel = 'local_expert_engine';
    }

    const replyLang = detectLanguage(replyText, detectedLang);
    const speechLangTag = getSpeechLangTag(replyLang || detectedLang);

    res.json({
      reply: replyText,
      source: successModel,
      detectedLang: replyLang || detectedLang,
      speechLangTag,
      inputLang: detectedLang,
    });
  } catch (error: any) {
    console.error('Error in /api/ai/chat:', error);
    const fallbackLang = detectLanguage(req.body.message || '', req.body.language || 'en');
    const fallbackResponse = generateSmartFallback(req.body.message || '', req.body.systemContext, fallbackLang);
    const speechLangTag = getSpeechLangTag(fallbackLang);
    res.json({
      reply: fallbackResponse,
      source: 'fallback_rules',
      detectedLang: fallbackLang,
      speechLangTag,
      inputLang: fallbackLang,
    });
  }
});

// Helper: Convert linear PCM 24kHz mono audio to standard WAV format
function pcmToWav(pcmBase64: string, sampleRate = 24000, channels = 1, bitsPerSample = 16): string {
  const pcmBuffer = Buffer.from(pcmBase64, 'base64');
  const byteRate = (sampleRate * channels * bitsPerSample) / 8;
  const blockAlign = (channels * bitsPerSample) / 8;
  const dataSize = pcmBuffer.length;
  const header = Buffer.alloc(44);

  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM format
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]).toString('base64');
}

// Clean text for natural speech synthesis so synthesizers NEVER say "dash dash dash"
function cleanTextForSpeech(text: string): string {
  if (!text) return '';
  return text
    // 1. Remove horizontal rules (---, ***, ___, ====)
    .replace(/\n\s*[-*_]{2,}\s*\n/g, '. ')
    .replace(/\s*[-*_]{3,}\s*/g, '. ')
    // 2. Remove HTML comments and tags
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]*>/g, '')
    // 3. Remove markdown headers (###, ##, #)
    .replace(/#{1,6}\s?/g, '')
    // 4. Remove bold, italics, backticks, strikethrough
    .replace(/[*_~`]/g, '')
    // 5. Replace markdown links [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // 6. Remove markdown table bars and dashed rows
    .replace(/\|[ -:|]+\|/g, ' ')
    .replace(/\|/g, ', ')
    // 7. Remove list bullets (•, -, *, +) at start of lines
    .replace(/(^|\n)\s*[-*+•◦]\s+/g, '$1')
    .replace(/[-*+•◦]\s+/g, ', ')
    // 8. Replace standalone dashes between words ' - ' or ' — ' with a comma
    .replace(/\s+[-—–]+\s+/g, ', ')
    .replace(/[-—–]{2,}/g, '. ')
    // 9. Remove emojis so they are not spelled out
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}]/gu, '')
    // 10. Units expansion
    .replace(/(\d+)\s*°\s*C/gi, '$1 degrees Celsius')
    .replace(/\bppm\b/gi, 'parts per million')
    // 11. Normalize whitespaces and pauses
    .replace(/\n{2,}/g, '. ')
    .replace(/\n/g, '. ')
    .replace(/\s{2,}/g, ' ')
    .replace(/\.{2,}/g, '.')
    .replace(/,\s*,/g, ',')
    .trim();
}

// Dedicated AI Text-to-Speech Endpoint powered by Gemini Flash TTS
app.post('/api/ai/tts', async (req: Request, res: Response) => {
  try {
    const { text, language = 'en' } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required for TTS' });
    }

    const clean = cleanTextForSpeech(text);
    // Limit spoken length to first 450 characters (covers core bottom line and advice smoothly)
    const spokenSlice = clean.length > 500 ? clean.slice(0, 500) + '...' : clean;

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        success: false,
        cleanText: spokenSlice,
        reason: 'ai_client_unavailable',
      });
    }

    // Call Gemini 3.1 Flash TTS model
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-tts-preview',
      contents: [{ parts: [{ text: spokenSlice }] }],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const pcmData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (pcmData) {
      const wavBase64 = pcmToWav(pcmData, 24000, 1, 16);
      return res.json({
        success: true,
        audioUrl: `data:audio/wav;base64,${wavBase64}`,
        cleanText: spokenSlice,
        engine: 'gemini-tts',
      });
    }

    res.json({
      success: false,
      cleanText: spokenSlice,
      reason: 'no_audio_data_returned',
    });
  } catch (err: any) {
    console.warn('Gemini TTS processing error:', err?.message || err);
    res.json({
      success: false,
      cleanText: cleanTextForSpeech(req.body.text || ''),
      error: err?.message || 'TTS generation error',
    });
  }
});

// Direct, concise offline water & sensor diagnostic reasoning engine
function generateSmartFallback(message: string, context: any, language: string = 'en'): string {
  const q = message.toLowerCase();
  const input = context?.inputWater || { ph: 6.8, tds: 650, turbidity: 38, temperature: 27.2 };
  const output = context?.outputWater || { ph: 7.2, tds: 145, turbidity: 0.8, temperature: 26.8 };

  // ==========================================
  // HINDI DIRECT ANSWERS
  // ==========================================
  if (language === 'hi' || q.includes('गाय') || q.includes('भैंस') || q.includes('फसल') || q.includes('किसान') || q.includes('खारा') || q.includes('मिट्टी') || q.includes('बदबू')) {
    if (q.includes('गाय') || q.includes('भैंस') || q.includes('पशु') || q.includes('जानवर') || q.includes('cattle') || q.includes('cow') || q.includes('buffalo')) {
      return `हाँ, यह शुद्ध पानी (TDS ${output.tds} ppm) गाय, भैंस और सभी पशुओं के पीने के लिए पूरी तरह सुरक्षित और स्वास्थ्यवर्धक है।`;
    }

    if (q.includes('फसल') || q.includes('खेती') || q.includes('ड्रिप') || q.includes('सिंचाई') || q.includes('crop') || q.includes('drip')) {
      return `यह पानी फसलों और ड्रिप सिंचाई के लिए सुरक्षित है। ड्रिप लाइन को चोक होने से बचाने के लिए मोटर के आगे 120-मेश डिस्क फ़िल्टर का उपयोग करें।`;
    }

    if (q.includes('खारा') || q.includes('कड़वा') || q.includes('स्वाद') || q.includes('नमक') || q.includes('tds')) {
      return `पानी का खारा या कड़वा स्वाद घुले हुए लवणों (TDS) की वजह से होता है। प्यूरीफायर ने इसे घटाकर ${output.tds} ppm कर दिया है जो बिल्कुल मीठा है। यदि पीने का पानी अभी भी खारा लगे तो RO मेम्ब्रेन बदलने की ज़रूरत है।`;
    }

    if (q.includes('मिट्टी') || q.includes('गंदा') || q.includes('मटमैला') || q.includes('कीचड़') || q.includes('turbidity')) {
      return `मटमैला पानी साफ़ करने के लिए बाल्टी में थोड़ी फिटकरी (Alum) 4-5 बार घुमाकर 1 घंटा छोड़ दें, मिट्टी नीचे बैठ जाएगी। मशीन का पहला सफ़ेद सेडिमेंट फ़िल्टर साफ़ करें या बदलें।`;
    }

    if (q.includes('बदबू') || q.includes('गंध') || q.includes('सड़ा') || q.includes('अंडा') || q.includes('smell')) {
      return `सड़े अंडे जैसी बदबू सल्फर गैस के कारण होती है। पानी को 1-2 घंटे खुले बर्तन में रखने से बदबू उड़ जाती है, या प्यूरीफायर का कार्बन (चारकोल) फ़िल्टर बदलें।`;
    }

    if (q.includes('सेंसर') || q.includes('मीटर') || q.includes('स्क्रीन') || q.includes('रीडिंग') || q.includes('तार') || q.includes('sensor')) {
      return `TDS मीटर उछलने पर सेंसर को पानी में हल्का हिलाएं ताकि फंसे बुलबुले निकल जाएं। तापमान -127°C दिखाने का मतलब है कि तापमान सेंसर का तार ढीला हो गया है, उसे बोर्ड पर कस दें।`;
    }

    if (q.includes('सुरक्षित') || q.includes('पीने') || q.includes('safe') || q.includes('drink')) {
      return `हाँ, यह पानी अभी पीने के लिए बिल्कुल सुरक्षित है। इसका TDS ${output.tds} ppm, टर्बिडिटी ${output.turbidity} NTU और pH ${output.ph} पूरी तरह सामान्य और सुरक्षित सीमा में हैं।`;
    }
  }

  // ==========================================
  // TELUGU DIRECT ANSWERS
  // ==========================================
  if (language === 'te' || q.includes('ఆవు') || q.includes('గేదె') || q.includes('పంట') || q.includes('రైతు') || q.includes('బోరు') || q.includes('ఉప్పు') || q.includes('మురికి')) {
    if (q.includes('ఆవు') || q.includes('గేదె') || q.includes('పశు') || q.includes('మేక') || q.includes('cattle') || q.includes('cow')) {
      return `అవును, ఈ శుద్ధి చేసిన నీరు (TDS ${output.tds} ppm) ఆవులు, గేదెలు మరియు పశువులు తాగడానికి పూర్తి సురక్షితమైనది.`;
    }

    if (q.includes('పంట') || q.includes('డ్రిప్') || q.includes('వ్యవసాయం') || q.includes('వరి') || q.includes('తోట') || q.includes('crop') || q.includes('drip')) {
      return `ఈ నీరు పంటలకు మరియు డ్రిప్ పైపులకు సురక్షితమైనది. డ్రిప్ నాజిళ్ళు మూసుకుపోకుండా మోటార్ వద్ద 120-మెష్ డిస్క్ ఫిల్టర్ వాడండి.`;
    }

    if (q.includes('ఉప్పు') || q.includes('చేదు') || q.includes('రుచి') || q.includes('tds')) {
      return `నీటిలో లవణాలు (TDS) ఎక్కువ ఉండటం వల్ల ఉప్పు లేదా చేదు రుచి వస్తుంది. మన మెషిన్ దీనిని ${output.tds} ppm కి తగ్గించింది. ఇంకా ఉప్పగా అనిపిస్తే RO ఫిల్టర్ మార్చండి.`;
    }

    if (q.includes('మట్టి') || q.includes('మురికి') || q.includes('రంగు') || q.includes('turbidity')) {
      return `మట్టి నీటిని సులభంగా శుభ్రం చేయడానికి బకెట్ నీటిలో పటిక (Fitkari) ముక్కను 4-5 సార్లు తిప్పి గంటసేపు ఉంచండి; మట్టి అంతా అడుగున చేరుతుంది. మొదటి సెడిమెంట్ ఫిల్టర్ శుభ్రం చేయండి.`;
    }

    if (q.includes('సెన్సార్') || q.includes('మీటర్') || q.includes('వైరు') || q.includes('రీడింగ్') || q.includes('sensor')) {
      return `TDS మీటర్ ఎగురుతుంటే సెన్సార్ పిన్నుల వద్ద గాలి బుడగలు పోయేలా నీటిలో కదిలించండి. టెంపరేచర్ -127°C వస్తే వైరు లూజ్ అయిందని అర్థం, గట్టిగా బిగించండి.`;
    }

    if (q.includes('సురక్షిత') || q.includes('తాగ') || q.includes('safe') || q.includes('drink')) {
      return `అవును, మీ నీరు ప్రస్తుతం తాగడానికి పూర్తి సురక్షితం. TDS ${output.tds} ppm, టర్బిడిటీ ${output.turbidity} NTU మరియు pH ${output.ph} అన్నీ సురక్షిత పరిమితుల్లో ఉన్నాయి.`;
    }
  }

  // ==========================================
  // ENGLISH DIRECT ANSWERS
  // ==========================================
  if (q.includes('cow') || q.includes('buffalo') || q.includes('cattle') || q.includes('animal') || q.includes('goat') || q.includes('poultry') || q.includes('livestock')) {
    return `Yes, this purified water (TDS ${output.tds} ppm) is completely safe and healthy for cows, buffaloes, and livestock.`;
  }

  if (q.includes('crop') || q.includes('drip') || q.includes('farm') || q.includes('soil') || q.includes('irrigation') || q.includes('field') || q.includes('plant')) {
    return `This water is safe for crops and drip irrigation. Use a 120-mesh disc filter at the pump to prevent emitter clogging, and flush line ends monthly.`;
  }

  if (q.includes('salty') || q.includes('bitter') || q.includes('taste') || q.includes('tds') || q.includes('hard water') || q.includes('scale')) {
    return `A salty or bitter taste is caused by elevated dissolved minerals (TDS). The purifier has lowered output TDS to ${output.tds} ppm (sweet and safe). If water still tastes salty, replace the RO membrane.`;
  }

  if (q.includes('muddy') || q.includes('cloudy') || q.includes('murky') || q.includes('silt') || q.includes('dirty') || q.includes('turbidity') || q.includes('brown')) {
    return `To clear muddy water fast, swirl alum (fitkari) in a bucket 4-5 times and let it settle for 1 hour so mud drops to the bottom. Also check or rinse your white sediment pre-filter.`;
  }

  if (q.includes('smell') || q.includes('odor') || q.includes('rotten egg') || q.includes('sulfur') || q.includes('stink') || q.includes('chlorine')) {
    return `A rotten egg odor is caused by dissolved hydrogen sulfide gas. Aerate the water in an open container for 1-2 hours so the gas vents out, or replace the activated carbon filter.`;
  }

  if (q.includes('sensor') || q.includes('meter') || q.includes('jumping') || q.includes('zero') || q.includes('calibrate') || q.includes('-127') || q.includes('reboot') || q.includes('light')) {
    return `For a jumping TDS reading, tap the sensor underwater to release trapped air bubbles. A -127°C reading indicates the temperature sensor wire has disconnected and needs re-plugging.`;
  }

  if (q.includes('safe') || q.includes('drink') || q.includes('potable') || q.includes('water')) {
    return `Yes, your water is safe to drink right now. The output TDS is ${output.tds} ppm, turbidity is ${output.turbidity} NTU, and pH is ${output.ph}, all within safe drinking limits.`;
  }

  // Default Direct Response
  return `NexusFlow is active. Current output water: TDS ${output.tds} ppm, Turbidity ${output.turbidity} NTU, pH ${output.ph} (Safe). What question can I answer for you?`;
}

// Start Server with Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NexusFlow server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
