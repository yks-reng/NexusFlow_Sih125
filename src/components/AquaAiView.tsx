import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Bot,
  User,
  Send,
  Trash2,
  Sparkles,
  Loader2,
  Lightbulb,
  PlusCircle,
  MessageSquare,
  Search,
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Square,
  Languages,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Radio,
  Zap,
} from 'lucide-react';
import { useWaterSystem } from '../context/WaterSystemContext';
import { SupportedLanguage } from '../types';

interface LanguageConfig {
  code: SupportedLanguage;
  label: string;
  nativeLabel: string;
  headerTitle: string;
  headerSubtitle: string;
  placeholder: string;
  sendBtn: string;
  newChatBtn: string;
  deleteChatTitle: string;
  suggestionsTitle: string;
  sampleQuestions: string[];
  waterCategory: string;
  sensorCategory: string;
}

const LANGUAGE_CONFIGS: Record<SupportedLanguage, LanguageConfig> = {
  en: {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    headerTitle: 'NexusFlow Voice Assistant',
    headerSubtitle: 'Speak or Type in Any Language',
    placeholder: 'Speak or type your question in any language (e.g., Can I drink this water? Why is it salty?)...',
    sendBtn: 'Ask AI',
    newChatBtn: 'New Chat',
    deleteChatTitle: 'Delete Chat',
    suggestionsTitle: 'Quick Questions for Beginners',
    sampleQuestions: [
      'Is my water safe to drink right now?',
      'Why does purified water taste bitter or salty?',
      'How do I clean brown muddy water quickly with fitkari?',
      'Can cows, buffaloes, and farm animals drink this water?',
      'Will borewell water choke my drip irrigation pipes?',
      'What causes water to smell like rotten eggs?',
      'Why is the TDS sensor jumping or showing zero?',
      'Why is the temperature meter reading -127°C?',
    ],
    waterCategory: '💧 Drinking Water & Family Safety (Simple Answers)',
    sensorCategory: '⚙️ Machine & Sensor Fixes (No Tools Needed)',
  },
  hi: {
    code: 'hi',
    label: 'Hindi',
    nativeLabel: 'हिन्दी',
    headerTitle: 'NexusFlow वॉइस सहायक',
    headerSubtitle: 'बोलें या लिखें किसी भी भाषा में',
    placeholder: 'बोलकर या लिखकर पूछें (जैसे: क्या पानी पीने लायक है? खारापन क्यों है?)...',
    sendBtn: 'पूछें',
    newChatBtn: 'नई बातचीत',
    deleteChatTitle: 'बातचीत हटाएं',
    suggestionsTitle: 'सरल प्रश्न (आसान भाषा में)',
    sampleQuestions: [
      'क्या मेरा पानी अभी पीने के लिए बिल्कुल सुरक्षित है?',
      'पानी में खारा या कड़वा स्वाद क्यों आ रहा है?',
      'मटमैले पानी को फिटकरी से तुरंत कैसे साफ़ करें?',
      'क्या गाय और भैंसों को यह पानी पिलाना सुरक्षित है?',
      'क्या बोरवेल के पानी से ड्रिप की नली जाम हो जाएगी?',
      'पानी से सड़े अंडे जैसी बदबू क्यों आती है?',
      'TDS मीटर में रीडिंग बार-बार क्यों बदल रही है?',
      'तापमान मीटर -127°C क्यों दिखा रहा है?',
    ],
    waterCategory: '💧 पीने का पानी और स्वास्थ्य (सरल हिंदी)',
    sensorCategory: '⚙️ मशीन और सेंसर के आसान घरेलू उपाय',
  },
  te: {
    code: 'te',
    label: 'Telugu',
    nativeLabel: 'తెలుగు',
    headerTitle: 'NexusFlow వాయిస్ సహాయకుడు',
    headerSubtitle: 'ఏ భాషలోనైనా మాట్లాడండి లేదా టైప్ చేయండి',
    placeholder: 'ఏ భాషలోనైనా మాట్లాడండి లేదా అడగండి (ఉదా: ఈ నీరు తాగవచ్చా? ఉప్పుగా ఎందుకు ఉంది?)...',
    sendBtn: 'అడగండి',
    newChatBtn: 'కొత్త చాట్',
    deleteChatTitle: 'చాట్ తొలగించు',
    suggestionsTitle: 'రైతులకు మరియు కుటుంబాలకు సులువైన ప్రశ్నలు',
    sampleQuestions: [
      'నా నీరు ఇప్పుడు తాగడానికి పూర్తిగా సురక్షితమేనా?',
      'నీటిలో ఉప్పు లేదా చేదు రుచి ఎందుకు వస్తోంది?',
      'ఎర్రటి మట్టి నీటిని పటికతో ఎలా తేటపరుచుకోవాలి?',
      'ఆవులు, గేదెలకు ఈ నీటిని తాగించవచ్చా?',
      'డ్రిప్ పైపులు ఉప్పు వల్ల మూసుకుపోతాయా?',
      'నీటిలో కుళ్ళిన గుడ్డు వాసన ఎందుకు వస్తుంది?',
      'TDS మీటర్ ఎగురుతోంది లేదా సున్నా ఎందుకు చూపిస్తోంది?',
      'టెంపరేచర్ సెన్సార్ -127°C ఎందుకు చూపిస్తోంది?',
    ],
    waterCategory: '💧 తాగునీరు & ఆరోగ్యం (సులువైన తెలుగు)',
    sensorCategory: '⚙️ సెన్సార్లు & సులభ పరిష్కారాలు',
  },
};

// Detect target BCP-47 language code for browser speech synthesis matching the input language
function getVoiceLangCode(
  text: string,
  serverLang?: string,
  speechLangCode?: string,
  inputLang?: string
): string {
  // 1. If explicit speech language tag was provided by the backend, prioritize it
  if (speechLangCode) return speechLangCode;

  // 2. If inputLang or serverLang is provided, map to standard speech synthesis BCP-47 tag
  const effectiveCode = inputLang || serverLang;
  if (effectiveCode) {
    if (effectiveCode === 'hi') return 'hi-IN';
    if (effectiveCode === 'te') return 'te-IN';
    if (effectiveCode === 'ta') return 'ta-IN';
    if (effectiveCode === 'mr') return 'mr-IN';
    if (effectiveCode === 'bn') return 'bn-IN';
    if (effectiveCode === 'gu') return 'gu-IN';
    if (effectiveCode === 'kn') return 'kn-IN';
    if (effectiveCode === 'ml') return 'ml-IN';
    if (effectiveCode === 'pa') return 'pa-IN';
    if (effectiveCode === 'ur') return 'ur-IN';
    if (effectiveCode === 'es') return 'es-ES';
    if (effectiveCode === 'fr') return 'fr-FR';
    if (effectiveCode === 'de') return 'de-DE';
    if (effectiveCode === 'en') return 'en-US';
  }

  // 3. Inspect text characters and scripts
  if (/[\u0900-\u097F]/.test(text)) {
    if (/\b(आहे|नाही|कसा|कशी|काय|पाणी|पिण्यायोग्य)\b/.test(text)) {
      return 'mr-IN'; // Marathi
    }
    return 'hi-IN'; // Hindi
  }
  if (/[\u0C00-\u0C7F]/.test(text)) return 'te-IN'; // Telugu
  if (/[\u0B80-\u0BFF]/.test(text)) return 'ta-IN'; // Tamil
  if (/[\u0980-\u09FF]/.test(text)) return 'bn-IN'; // Bengali
  if (/[\u0A80-\u0AFF]/.test(text)) return 'gu-IN'; // Gujarati
  if (/[\u0C80-\u0CFF]/.test(text)) return 'kn-IN'; // Kannada
  if (/[\u0D00-\u0D7F]/.test(text)) return 'ml-IN'; // Malayalam
  if (/[\u0A00-\u0A7F]/.test(text)) return 'pa-IN'; // Punjabi

  // 4. Inspect romanized regional keywords (Hinglish, Teluglish, Tamglish, etc.)
  const lower = text.toLowerCase();
  if (/\b(pani|paani|peene|peena|kaisa|kyu|kyon|hai|saaf|ganda|khara|namak|fitkari)\b/i.test(lower)) {
    return 'hi-IN';
  }
  if (/\b(neellu|neeru|taagocha|taagavacha|bavunda|ledu|uppu|muriki)\b/i.test(lower)) {
    return 'te-IN';
  }
  if (/\b(thanni|thanner|kudikkalama|nalliruka|uppu|kudika)\b/i.test(lower)) {
    return 'ta-IN';
  }
  if (/\b(hola|agua|beber|filtro|salud|seguro|cómo|por\s*qué|buena|gracias)\b/i.test(lower)) {
    return 'es-ES';
  }
  if (/\b(bonjour|eau|boire|filtre|santé|pourquoi|propre|comment|merci)\b/i.test(lower)) {
    return 'fr-FR';
  }
  if (/\b(hallo|wasser|trinken|filter|gesundheit|warum|sauber|danke)\b/i.test(lower)) {
    return 'de-DE';
  }

  return 'en-US';
}

// Friendly readable language label
function getLanguageDisplayName(langCode: string): string {
  const code = (langCode || '').toLowerCase();
  if (code.startsWith('hi')) return 'हिन्दी (Hindi)';
  if (code.startsWith('te')) return 'తెలుగు (Telugu)';
  if (code.startsWith('ta')) return 'தமிழ் (Tamil)';
  if (code.startsWith('mr')) return 'मराठी (Marathi)';
  if (code.startsWith('bn')) return 'বাংলা (Bengali)';
  if (code.startsWith('gu')) return 'ગુજરાતી (Gujarati)';
  if (code.startsWith('kn')) return 'ಕನ್ನಡ (Kannada)';
  if (code.startsWith('ml')) return 'മലയാളം (Malayalam)';
  if (code.startsWith('pa')) return 'ਪੰਜਾਬੀ (Punjabi)';
  if (code.startsWith('ur')) return 'اردو (Urdu)';
  if (code.startsWith('es')) return 'Español (Spanish)';
  if (code.startsWith('fr')) return 'Français (French)';
  if (code.startsWith('de')) return 'Deutsch (German)';
  if (code.startsWith('en-in')) return 'English (India)';
  if (code.startsWith('en')) return 'English';
  return 'English';
}

// Complete list of voice input languages supported by AquaAI
const VOICE_INPUT_LANGUAGES = [
  { id: 'auto', label: 'Auto (Detect Language)', tag: '' },
  { id: 'hi-IN', label: 'हिन्दी (Hindi)', tag: 'hi-IN' },
  { id: 'te-IN', label: 'తెలుగు (Telugu)', tag: 'te-IN' },
  { id: 'ta-IN', label: 'தமிழ் (Tamil)', tag: 'ta-IN' },
  { id: 'mr-IN', label: 'मराठी (Marathi)', tag: 'mr-IN' },
  { id: 'bn-IN', label: 'বাংলা (Bengali)', tag: 'bn-IN' },
  { id: 'gu-IN', label: 'ગુજરાતી (Gujarati)', tag: 'gu-IN' },
  { id: 'kn-IN', label: 'ಕನ್ನಡ (Kannada)', tag: 'kn-IN' },
  { id: 'ml-IN', label: 'മലയാളം (Malayalam)', tag: 'ml-IN' },
  { id: 'pa-IN', label: 'ਪੰਜਾਬੀ (Punjabi)', tag: 'pa-IN' },
  { id: 'ur-IN', label: 'اردو (Urdu)', tag: 'ur-IN' },
  { id: 'es-ES', label: 'Español (Spanish)', tag: 'es-ES' },
  { id: 'fr-FR', label: 'Français (French)', tag: 'fr-FR' },
  { id: 'de-DE', label: 'Deutsch (German)', tag: 'de-DE' },
  { id: 'en-IN', label: 'English (India)', tag: 'en-IN' },
  { id: 'en-US', label: 'English (US)', tag: 'en-US' },
];

// Thoroughly scrub Markdown, symbols, and formatting for natural, human voice synthesis.
// Guarantees voice engine NEVER reads "dash dash dash", "bullet", or "asterisk".
export function prepareTextForSpeech(text: string, langCode: string = 'en'): string {
  if (!text) return '';

  return (
    text
      // 1. Remove horizontal rules (---, ***, ___, ====) - the primary source of "dash dash dash"
      .replace(/\n\s*[-*_]{2,}\s*\n/g, '. ')
      .replace(/\s*[-*_]{3,}\s*/g, '. ')
      // 2. Remove HTML comments & tags
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<[^>]*>/g, '')
      // 3. Remove Markdown headings (###, ##, #)
      .replace(/#{1,6}\s?/g, '')
      // 4. Remove bold, italics, backticks, strikethrough (*, _, ~, `)
      .replace(/[*_~`]/g, '')
      // 5. Replace links [text](url) -> text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // 6. Remove Markdown table bars and dashed rows
      .replace(/\|[ -:|]+\|/g, ' ')
      .replace(/\|/g, ', ')
      // 7. Remove list bullets (•, -, *, +, ◦) at start of lines or phrases
      .replace(/(^|\n)\s*[-*+•◦]\s+/g, '$1')
      .replace(/[-*+•◦]\s+/g, ', ')
      // 8. Replace standalone dashes between words ' - ' or ' — ' with a comma pause
      .replace(/\s+[-—–]+\s+/g, ', ')
      .replace(/[-—–]{2,}/g, '. ')
      // 9. Strip emojis so speech engine doesn't read symbol descriptions
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}]/gu, '')
      // 10. Replace temperature and units with natural spoken words
      .replace(/-(\d+)\s*°\s*C/gi, 'minus $1 degrees Celsius')
      .replace(/(\d+)\s*°\s*C/gi, '$1 degrees Celsius')
      .replace(/\bppm\b/gi, 'parts per million')
      // 11. Normalize newlines and punctuation into clean natural pauses
      .replace(/\n{2,}/g, '. ')
      .replace(/\n/g, '. ')
      .replace(/\s{2,}/g, ' ')
      .replace(/\.{2,}/g, '.')
      .replace(/,\s*,/g, ',')
      .trim()
  );
}

export const AquaAiView: React.FC = () => {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    createNewChat,
    deleteChat,
    sendAiMessage,
    isAiThinking,
    aiLanguage,
  } = useWaterSystem();

  const [inputPrompt, setInputPrompt] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [audioLoadingMsgId, setAudioLoadingMsgId] = useState<string | null>(null);
  const [activeSpokenLangName, setActiveSpokenLangName] = useState<string>('');
  const [isAutoSpeakEnabled, setIsAutoSpeakEnabled] = useState(true);
  const [isAutoSubmitVoiceEnabled, setIsAutoSubmitVoiceEnabled] = useState(true);
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false);
  const [voiceEngine, setVoiceEngine] = useState<'instant' | 'neural'>('instant');
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(true);
  const [selectedVoiceInputLang, setSelectedVoiceInputLang] = useState<string>('auto');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const lastSpokenMsgIdRef = useRef<string | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const audioCacheRef = useRef<Map<string, string>>(new Map());
  const currentTranscriptRef = useRef<string>('');
  const silenceTimerRef = useRef<any>(null);
  const isSubmittingRef = useRef<boolean>(false);

  const t = LANGUAGE_CONFIGS[aiLanguage] || LANGUAGE_CONFIGS.en;

  const activeConversation =
    conversations.find((c) => c.id === activeConversationId) || conversations[0];
  const messages = activeConversation ? activeConversation.messages : [];

  // Check Web Speech API support and load synthesis voices
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechRecognitionSupported(false);
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        const v = window.speechSynthesis.getVoices();
        if (v && v.length > 0) {
          setAvailableVoices(v);
        }
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Cleanup speech recognition, neural audio, and speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      if (audioPlayerRef.current) {
        try {
          audioPlayerRef.current.pause();
        } catch {
          // ignore
        }
        audioPlayerRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiThinking]);

  // Voice synthesis: Find the best matching browser voice for the exact language
  const getBestVoice = useCallback(
    (langCode: string): SpeechSynthesisVoice | null => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
      const voices =
        availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return null;

      const code = langCode.toLowerCase().replace('_', '-');
      const prefix = code.split('-')[0];

      // 1. Exact match (e.g. 'hi-in', 'te-in', 'ta-in', 'es-es')
      const exactMatch = voices.find(
        (v) => v.lang.toLowerCase().replace('_', '-') === code
      );
      if (exactMatch) return exactMatch;

      // 2. Prefix match (e.g. starts with 'hi', 'te', 'ta')
      const prefixMatch = voices.find((v) =>
        v.lang.toLowerCase().startsWith(prefix)
      );
      if (prefixMatch) return prefixMatch;

      // 3. Name-based match for specific language voices
      const nameKeywords: Record<string, string[]> = {
        hi: ['hindi', 'हिन्दी', 'hemant', 'kalpana', 'lekha'],
        te: ['telugu', 'తెలుగు', 'mohan', 'chitra'],
        ta: ['tamil', 'தமிழ்', 'valluvar'],
        mr: ['marathi', 'मराठी', 'aarohi'],
        bn: ['bengali', 'বাংলা', 'bashkar'],
        gu: ['gujarati', 'ગુજરાતી', 'dhwani'],
        kn: ['kannada', 'ಕನ್ನಡ', 'gagan'],
        ml: ['malayalam', 'മലയാളം', 'midhun'],
        pa: ['punjabi', 'ਪੰਜਾਬੀ'],
        ur: ['urdu', 'اردو'],
        es: ['spanish', 'español', 'espanol', 'monica', 'jorge'],
        fr: ['french', 'français', 'francais', 'amelie', 'thomas'],
        de: ['german', 'deutsch', 'anna', 'markus'],
      };

      const kws = nameKeywords[prefix] || [];
      for (const kw of kws) {
        const namedVoice = voices.find((v) =>
          v.name.toLowerCase().includes(kw)
        );
        if (namedVoice) return namedVoice;
      }

      if (prefix !== 'en') {
        return null;
      }

      // If target language is English, prefer Indian English or system default
      return (
        voices.find((v) => v.lang.toLowerCase().startsWith('en-in')) ||
        voices.find((v) => v.lang.toLowerCase().startsWith('en')) ||
        voices.find((v) => v.default) ||
        voices[0] ||
        null
      );
    },
    [availableVoices]
  );

  // Prime and unlock the browser audio context and speech synthesizer on user interactions
  const unlockAudioContext = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.resume();
        }
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          if (ctx.state === 'suspended') {
            ctx.resume();
          }
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Stop all voice playback immediately (both Neural Audio and Web Speech)
  const stopSpeaking = useCallback(() => {
    if (audioPlayerRef.current) {
      try {
        audioPlayerRef.current.pause();
        audioPlayerRef.current.currentTime = 0;
      } catch {
        // ignore
      }
      audioPlayerRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    setSpeakingMsgId(null);
    setAudioLoadingMsgId(null);
    setActiveSpokenLangName('');
  }, []);

  // Instant browser speech synthesis with native accent and zero quota limits
  const speakWithBrowserSynthesis = useCallback(
    (msgId: string, cleanText: string, langCode: string) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        setSpeakingMsgId(null);
        setAudioLoadingMsgId(null);
        setActiveSpokenLangName('');
        return;
      }
      try {
        window.speechSynthesis.cancel();
        window.speechSynthesis.resume();

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 0.92;
        utterance.pitch = 1.0;
        utterance.lang = langCode;

        const matchedVoice = getBestVoice(langCode);
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }

        const langDisplayName = getLanguageDisplayName(langCode);
        setActiveSpokenLangName(langDisplayName);

        utterance.onstart = () => {
          setAudioLoadingMsgId(null);
          setSpeakingMsgId(msgId);
        };
        utterance.onend = () => {
          setSpeakingMsgId(null);
          setActiveSpokenLangName('');
        };
        utterance.onerror = (e) => {
          console.warn('Browser speech synthesis notice:', e);
          setSpeakingMsgId(null);
          setAudioLoadingMsgId(null);
          setActiveSpokenLangName('');
        };

        setSpeakingMsgId(msgId);
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis error:', err);
        setSpeakingMsgId(null);
        setAudioLoadingMsgId(null);
        setActiveSpokenLangName('');
      }
    },
    [getBestVoice]
  );

  // Speak a message out loud in the language of the user's input with ZERO "dash dash dash"
  const speakMessage = useCallback(
    async (
      msgId: string,
      text: string,
      detectedLang?: string,
      speechLangCode?: string,
      inputLang?: string
    ) => {
      // If currently playing or preparing audio for this message, toggle stop
      if (speakingMsgId === msgId || audioLoadingMsgId === msgId) {
        stopSpeaking();
        return;
      }

      // Stop any other active speech first & prime audio
      stopSpeaking();
      unlockAudioContext();

      const langCode = getVoiceLangCode(text, detectedLang, speechLangCode, inputLang);
      const cleanText = prepareTextForSpeech(text, langCode);
      if (!cleanText) return;

      const langDisplayName = getLanguageDisplayName(langCode);
      setActiveSpokenLangName(langDisplayName);

      // Mode 1: Instant Native Browser Voice (Default) - 0ms delay, zero quota limits, 100% reliable
      if (voiceEngine === 'instant') {
        speakWithBrowserSynthesis(msgId, cleanText, langCode);
        return;
      }

      // Mode 2: Neural Cloud Voice (Gemini TTS) with immediate fallback
      const cachedAudioUrl = audioCacheRef.current.get(msgId);
      if (cachedAudioUrl) {
        try {
          const audio = new Audio(cachedAudioUrl);
          audioPlayerRef.current = audio;
          setSpeakingMsgId(msgId);
          audio.onended = () => {
            setSpeakingMsgId(null);
            setActiveSpokenLangName('');
            audioPlayerRef.current = null;
          };
          audio.onerror = () => {
            speakWithBrowserSynthesis(msgId, cleanText, langCode);
          };
          await audio.play();
          return;
        } catch {
          speakWithBrowserSynthesis(msgId, cleanText, langCode);
          return;
        }
      }

      setAudioLoadingMsgId(msgId);
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const response = await fetch('/api/ai/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: cleanText, language: langCode }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.audioUrl) {
            audioCacheRef.current.set(msgId, data.audioUrl);
            setAudioLoadingMsgId(null);

            const audio = new Audio(data.audioUrl);
            audioPlayerRef.current = audio;
            setSpeakingMsgId(msgId);

            audio.onended = () => {
              setSpeakingMsgId(null);
              setActiveSpokenLangName('');
              audioPlayerRef.current = null;
            };
            audio.onerror = () => {
              speakWithBrowserSynthesis(msgId, cleanText, langCode);
            };
            await audio.play();
            return;
          }
        }
      } catch (e) {
        console.warn('Neural TTS unavailable or quota exceeded, switching to instant browser speech:', e);
      }

      // Seamless fallback to browser voice
      setAudioLoadingMsgId(null);
      speakWithBrowserSynthesis(msgId, cleanText, langCode);
    },
    [speakingMsgId, audioLoadingMsgId, stopSpeaking, unlockAudioContext, voiceEngine, speakWithBrowserSynthesis]
  );

  // Auto-speak new assistant message if auto-read is enabled
  useEffect(() => {
    if (!isAutoSpeakEnabled) return;
    if (messages.length === 0 || isAiThinking) return;

    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role === 'assistant' && lastMsg.id !== lastSpokenMsgIdRef.current) {
      lastSpokenMsgIdRef.current = lastMsg.id;
      // Delay slightly so the user sees the message appear first, then automatically hears the answer read out
      const timer = setTimeout(() => {
        speakMessage(
          lastMsg.id,
          lastMsg.content,
          lastMsg.detectedLang,
          lastMsg.speechLangCode,
          lastMsg.inputLang
        );
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [messages, isAutoSpeakEnabled, isAiThinking, speakMessage]);

  // Voice Auto-Submit Handler: Submits the user's spoken words automatically on its own
  const triggerVoiceAutoSubmit = useCallback(
    (textToSubmit: string) => {
      const cleaned = textToSubmit.trim();
      if (!cleaned || isAiThinking || isSubmittingRef.current) return;

      isSubmittingRef.current = true;
      setIsAutoSubmitting(true);
      setInputPrompt(cleaned);
      unlockAudioContext();
      stopSpeaking();

      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }

      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      setIsListening(false);

      // Brief confirmation delay so the user sees their voice confirmed before submission
      setTimeout(() => {
        sendAiMessage(cleaned, aiLanguage);
        setInputPrompt('');
        currentTranscriptRef.current = '';
        setIsAutoSubmitting(false);
        isSubmittingRef.current = false;
      }, 350);
    },
    [isAiThinking, aiLanguage, sendAiMessage, stopSpeaking, unlockAudioContext]
  );

  // Voice Input: Start Microphone Recording
  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError(
        'Voice input is not supported in this browser. Please use Chrome, Edge, or Safari, or type your question.'
      );
      return;
    }

    // Stop active audio output and prime speech pipeline
    unlockAudioContext();
    stopSpeaking();

    // Reset transcript and silence timers
    currentTranscriptRef.current = '';
    isSubmittingRef.current = false;
    setInputPrompt('');
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      // Match recognition language to selected voice language or app language
      let recLang = 'en-US';
      const langKey = (selectedVoiceInputLang !== 'auto' ? selectedVoiceInputLang : (aiLanguage as string)) || 'en';
      if (selectedVoiceInputLang !== 'auto') {
        recLang = selectedVoiceInputLang;
      } else if (langKey === 'hi') {
        recLang = 'hi-IN';
      } else if (langKey === 'te') {
        recLang = 'te-IN';
      } else if (langKey === 'ta') {
        recLang = 'ta-IN';
      } else if (langKey === 'mr') {
        recLang = 'mr-IN';
      } else if (langKey === 'bn') {
        recLang = 'bn-IN';
      } else if (langKey === 'gu') {
        recLang = 'gu-IN';
      } else if (langKey === 'kn') {
        recLang = 'kn-IN';
      } else if (langKey === 'ml') {
        recLang = 'ml-IN';
      } else if (langKey === 'pa') {
        recLang = 'pa-IN';
      } else if (langKey === 'ur') {
        recLang = 'ur-IN';
      } else if (langKey === 'es') {
        recLang = 'es-ES';
      } else if (langKey === 'fr') {
        recLang = 'fr-FR';
      } else if (langKey === 'de') {
        recLang = 'de-DE';
      } else {
        recLang = navigator.language || 'en-US';
      }
      recognition.lang = recLang;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        let hasFinal = false;
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            hasFinal = true;
          }
        }
        if (transcript.trim()) {
          currentTranscriptRef.current = transcript.trim();
          setInputPrompt(transcript);

          // If auto-submit is enabled, start silence timer
          if (isAutoSubmitVoiceEnabled) {
            if (silenceTimerRef.current) {
              clearTimeout(silenceTimerRef.current);
            }
            const delay = hasFinal ? 750 : 1200;
            silenceTimerRef.current = setTimeout(() => {
              if (currentTranscriptRef.current.trim() && !isSubmittingRef.current) {
                triggerVoiceAutoSubmit(currentTranscriptRef.current.trim());
              }
            }, delay);
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        if (event.error === 'not-allowed') {
          setSpeechError(
            'Microphone access was blocked. Please grant microphone permission in your browser URL bar.'
          );
        } else if (event.error === 'no-speech') {
          setSpeechError('No speech was detected. Please click the microphone again and speak clearly.');
        } else {
          setSpeechError(`Microphone issue (${event.error}). You can also type your question.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        const finalSpoken = currentTranscriptRef.current.trim();
        // If user stopped speaking, auto-submit their words immediately on its own
        if (finalSpoken && isAutoSubmitVoiceEnabled && !isSubmittingRef.current) {
          triggerVoiceAutoSubmit(finalSpoken);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
      setSpeechError('Could not start microphone. Please check permissions.');
    }
  };

  const stopListening = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
  };

  const toggleListening = () => {
    if (isListening) {
      const captured = currentTranscriptRef.current.trim() || inputPrompt.trim();
      stopListening();
      if (captured && isAutoSubmitVoiceEnabled) {
        triggerVoiceAutoSubmit(captured);
      }
    } else {
      startListening();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isAiThinking) return;
    if (isListening) {
      stopListening();
    }
    unlockAudioContext();
    stopSpeaking();
    sendAiMessage(inputPrompt, aiLanguage);
    setInputPrompt('');
    inputRef.current?.focus();
  };

  const handleChipClick = (prompt: string) => {
    if (isAiThinking) return;
    unlockAudioContext();
    stopSpeaking();
    sendAiMessage(prompt, aiLanguage);
    inputRef.current?.focus();
  };

  return (
    <div
      id="aqua-ai-root-container"
      className="w-full h-full flex-1 min-h-0 flex flex-col"
    >
      <div className="flex-1 flex flex-col bg-white border border-slate-200 shadow-xl overflow-hidden min-h-0 rounded-2xl sm:rounded-3xl">
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-3.5 py-3 sm:px-6 sm:py-3.5 border-b border-slate-200 bg-white shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-600/20 shrink-0">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 truncate">
                  NexusFlow
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-[11px] font-extrabold">
                  <Mic className="w-3 h-3 text-cyan-600" />
                  Voice Enabled
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate hidden xs:block">
                {t.headerSubtitle} • Direct & Instant Answers
              </p>
            </div>
          </div>

          {/* Top Actions: Voice Auto-Read Toggle, Stop Voice, New Chat */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Active speaking indicator / Stop Audio button */}
            {(speakingMsgId || audioLoadingMsgId) && (
              <button
                id="stop-audio-btn"
                type="button"
                onClick={stopSpeaking}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center gap-1.5 shadow-sm animate-pulse transition active:scale-95"
                title="Stop voice audio"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Stop Voice</span>
                <span className="flex items-center gap-0.5 ml-0.5">
                  <span className="w-1 h-3 bg-white rounded-full animate-bounce" />
                  <span className="w-1 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 h-3.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </button>
            )}

            {/* Auto Read Aloud Toggle */}
            <button
              id="toggle-auto-read-btn"
              type="button"
              onClick={() => setIsAutoSpeakEnabled(!isAutoSpeakEnabled)}
              className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                isAutoSpeakEnabled
                  ? 'bg-cyan-50 text-cyan-800 border-cyan-300 shadow-2xs'
                  : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
              }`}
              title={isAutoSpeakEnabled ? 'Voice Auto-Read is ON: Answers are read aloud automatically' : 'Voice Auto-Read is OFF'}
            >
              {isAutoSpeakEnabled ? (
                <Volume2 className="w-4 h-4 text-cyan-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
              <span className="hidden md:inline">
                {isAutoSpeakEnabled ? 'Voice Auto-Read: ON' : 'Voice Auto-Read: OFF'}
              </span>
            </button>

            {/* Auto Submit Voice Toggle */}
            <button
              id="toggle-auto-submit-btn"
              type="button"
              onClick={() => setIsAutoSubmitVoiceEnabled(!isAutoSubmitVoiceEnabled)}
              className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                isAutoSubmitVoiceEnabled
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs'
                  : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
              }`}
              title={
                isAutoSubmitVoiceEnabled
                  ? 'Voice Auto-Submit is ON: Voice inputs submit automatically on their own as soon as you pause speaking'
                  : 'Voice Auto-Submit is OFF'
              }
            >
              <Zap
                className={`w-3.5 h-3.5 ${
                  isAutoSubmitVoiceEnabled ? 'text-emerald-600 fill-emerald-600' : 'text-slate-400'
                }`}
              />
              <span className="hidden md:inline">
                {isAutoSubmitVoiceEnabled ? 'Auto-Submit: ON' : 'Auto-Submit: OFF'}
              </span>
            </button>

            {/* New Chat */}
            <button
              id="new-chat-btn"
              type="button"
              onClick={createNewChat}
              className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold text-cyan-700 hover:bg-cyan-50 border border-cyan-200 transition flex items-center gap-1.5 shadow-2xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{t.newChatBtn}</span>
            </button>

            {conversations.length > 1 && (
              <button
                id="delete-chat-btn"
                type="button"
                onClick={() => deleteChat(activeConversation.id)}
                className="p-1.5 sm:p-2 rounded-xl text-xs sm:text-sm text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition"
                title={t.deleteChatTitle}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Speech Error Banner (if mic permission denied or unsupported) */}
        {speechError && (
          <div className="mx-3.5 sm:mx-6 mt-3 p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs sm:text-sm flex items-center justify-between gap-2 shadow-xs shrink-0 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 min-w-0">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{speechError}</span>
            </div>
            <button
              onClick={() => setSpeechError(null)}
              className="p-1 rounded-lg hover:bg-amber-200 text-amber-800 transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Conversation Pills (if multiple chats) */}
        {conversations.length > 1 && (
          <div className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-slate-50 border-b border-slate-200 overflow-x-auto shrink-0 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 shrink-0">
              <MessageSquare className="w-3.5 h-3.5" /> Chats:
            </span>
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConversationId(conv.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  conv.id === activeConversation?.id
                    ? 'bg-cyan-600 text-white font-bold shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {conv.title}
              </button>
            ))}
          </div>
        )}

        {/* Main Chat Messages Container */}
        <div
          id="chat-messages-scroll-area"
          className="flex-1 overflow-y-auto p-3.5 sm:p-6 md:p-8 space-y-6 sm:space-y-7 bg-slate-50/50 min-h-0"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-3 sm:p-4 max-w-2xl mx-auto space-y-5">
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-tr from-cyan-100 to-sky-100 text-cyan-800 shadow-sm">
                <Sparkles className="w-9 h-9 sm:w-11 sm:h-11" />
              </div>
              <div>
                <h3 className="text-lg sm:text-2xl font-black text-slate-900">
                  {t.headerTitle}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed max-w-xl mx-auto">
                  Click the <strong>Microphone button 🎙️</strong> to speak your question or type in the box below. Ask in <em>any language</em> you speak — Hindi, Telugu, Tamil, Marathi, English, etc.
                </p>
              </div>

              {/* Categorized Question Grids */}
              <div className="w-full space-y-3.5 pt-1 text-left">
                {/* Drinking Water Category */}
                <div className="bg-white/90 p-4 rounded-2xl border border-sky-200 shadow-xs">
                  <h4 className="text-xs sm:text-sm font-black text-sky-950 mb-2.5 flex items-center gap-1.5">
                    <span>{t.waterCategory}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {t.sampleQuestions.slice(0, 4).map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleChipClick(q)}
                        className="p-3 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 text-left transition hover:border-sky-300 shadow-2xs flex items-start gap-2"
                      >
                        <span className="text-sky-600 font-bold text-sm leading-none">›</span>
                        <span>{q}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Machine / Sensors Category */}
                <div className="bg-white/90 p-4 rounded-2xl border border-amber-200 shadow-xs">
                  <h4 className="text-xs sm:text-sm font-black text-amber-950 mb-2.5 flex items-center gap-1.5">
                    <span>{t.sensorCategory}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {t.sampleQuestions.slice(4).map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleChipClick(q)}
                        className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 text-left transition hover:border-amber-300 shadow-2xs flex items-start gap-2"
                      >
                        <span className="text-amber-600 font-bold text-sm leading-none">›</span>
                        <span>{q}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-5xl mx-auto space-y-6 sm:space-y-7">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                const isSpeakingThis = speakingMsgId === msg.id;
                const isLoadingThisAudio = audioLoadingMsgId === msg.id;
                const langCode = !isUser
                  ? getVoiceLangCode(msg.content, msg.detectedLang, msg.speechLangCode, msg.inputLang)
                  : getVoiceLangCode(msg.content);

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 sm:gap-4 ${
                      isUser ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Role Avatar */}
                    <div
                      className={`h-9 w-9 sm:h-11 sm:w-11 rounded-2xl flex items-center justify-center shrink-0 text-sm font-bold shadow-xs ${
                        isUser
                          ? 'bg-slate-900 text-white'
                          : 'bg-gradient-to-tr from-cyan-600 to-sky-600 text-white'
                      }`}
                    >
                      {isUser ? (
                        <User className="w-5 h-5" />
                      ) : (
                        <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`w-full ${
                        isUser
                          ? 'max-w-[88%] sm:max-w-2xl bg-cyan-600 text-white rounded-3xl rounded-tr-none p-4 sm:p-5 shadow-sm'
                          : 'max-w-full bg-white border border-slate-200/90 text-slate-800 rounded-3xl rounded-tl-none p-4 sm:p-6 md:p-7 shadow-xs'
                      }`}
                    >
                      {/* User Header: Detected Input Language */}
                      {isUser && (
                        <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-cyan-500/40 text-xs text-cyan-100">
                          <span className="font-semibold text-[11px]">Your Question</span>
                          <span className="bg-cyan-700/90 px-2 py-0.5 rounded-full text-[11px] font-bold text-white flex items-center gap-1">
                            <Languages className="w-3 h-3 text-cyan-300" />
                            <span>Input: {getLanguageDisplayName(langCode)}</span>
                          </span>
                        </div>
                      )}

                      {/* Assistant Header Badge: Language & Voice Controls */}
                      {!isUser && (
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Direct Answer
                            </span>
                            <span
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-950 text-xs font-bold border border-cyan-200"
                              title="Voice output and response language matched directly to your input language"
                            >
                              <Languages className="w-3.5 h-3.5 text-cyan-600" />
                              <span>Voice Output: {getLanguageDisplayName(langCode)}</span>
                            </span>
                          </div>

                          {/* Voice Read Aloud Button for this response */}
                          <button
                            type="button"
                            onClick={() =>
                              speakMessage(
                                msg.id,
                                msg.content,
                                msg.detectedLang,
                                msg.speechLangCode,
                                msg.inputLang
                              )
                            }
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs ${
                              isSpeakingThis
                                ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse shadow-sm'
                                : isLoadingThisAudio
                                ? 'bg-cyan-100 text-cyan-900 border border-cyan-300'
                                : 'bg-slate-100 hover:bg-cyan-50 text-slate-700 hover:text-cyan-800 border border-slate-200 hover:border-cyan-300'
                            }`}
                            title={
                              isSpeakingThis
                                ? 'Click to stop audio'
                                : `Listen to this answer in ${getLanguageDisplayName(langCode)}`
                            }
                          >
                            {isLoadingThisAudio ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 text-cyan-700 animate-spin" />
                                <span>Voice Loading ({getLanguageDisplayName(langCode)})...</span>
                              </>
                            ) : isSpeakingThis ? (
                              <>
                                <Square className="w-3.5 h-3.5 fill-current" />
                                <span>Stop ({activeSpokenLangName || getLanguageDisplayName(langCode)})</span>
                                <span className="flex items-center gap-0.5 ml-1">
                                  <span className="w-1 h-3 bg-white rounded-full animate-bounce" />
                                  <span
                                    className="w-1 h-2 bg-white rounded-full animate-bounce"
                                    style={{ animationDelay: '150ms' }}
                                  />
                                  <span
                                    className="w-1 h-3.5 bg-white rounded-full animate-bounce"
                                    style={{ animationDelay: '300ms' }}
                                  />
                                </span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3.5 h-3.5 text-cyan-600" />
                                <span>Listen in {getLanguageDisplayName(langCode)}</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {isUser ? (
                        <p className="whitespace-pre-wrap font-medium text-sm sm:text-base md:text-lg leading-relaxed">
                          {msg.content}
                        </p>
                      ) : (
                        <div className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-800 space-y-3">
                          <ReactMarkdown
                            components={{
                              h1: ({ children }) => (
                                <h1 className="text-xl sm:text-2xl font-black text-slate-900 my-3">
                                  {children}
                                </h1>
                              ),
                              h2: ({ children }) => (
                                <h2 className="text-lg sm:text-xl font-bold text-slate-900 my-2.5">
                                  {children}
                                </h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 my-2">
                                  {children}
                                </h3>
                              ),
                              p: ({ children }) => (
                                <p className="mb-3 leading-relaxed text-slate-800">{children}</p>
                              ),
                              ul: ({ children }) => (
                                <ul className="list-disc pl-5 my-2.5 space-y-1.5">{children}</ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="list-decimal pl-5 my-2.5 space-y-1.5">{children}</ol>
                              ),
                              li: ({ children }) => (
                                <li className="leading-relaxed">{children}</li>
                              ),
                              strong: ({ children }) => (
                                <strong className="font-bold text-slate-900">{children}</strong>
                              ),
                              blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-cyan-500 pl-4 py-1.5 text-slate-700 bg-cyan-50/60 rounded-r-xl my-3 font-medium">
                                  {children}
                                </blockquote>
                              ),
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      )}

                      <span
                        className={`block text-xs sm:text-sm mt-3 font-mono ${
                          isUser ? 'text-cyan-100 text-right' : 'text-slate-400'
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* AI Thinking Indicator */}
              {isAiThinking && (
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-2xl bg-gradient-to-tr from-cyan-600 to-sky-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                    <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 text-slate-700 text-sm sm:text-base font-medium rounded-tl-none shadow-xs flex items-center gap-3">
                    <Loader2 className="w-5 h-5 text-cyan-600 animate-spin" />
                    <span>
                      {aiLanguage === 'hi'
                        ? 'NexusFlow सीधा उत्तर तैयार कर रहा है...'
                        : aiLanguage === 'te'
                        ? 'NexusFlow సూటి సమాధానం సిద్ధం చేస్తోంది...'
                        : 'NexusFlow is preparing the direct answer...'}
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips (Horizontal Scroll) */}
        <div className="px-3.5 sm:px-6 py-2 border-t border-slate-200 bg-white shrink-0">
          <div className="max-w-5xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.suggestionsTitle}:</span>
            </span>
            {t.sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isAiThinking}
                onClick={() => handleChipClick(q)}
                className="px-3 py-1 rounded-full bg-slate-100 hover:bg-cyan-50 hover:text-cyan-800 border border-slate-200 text-xs font-medium text-slate-700 whitespace-nowrap transition hover:border-cyan-300 disabled:opacity-50 shrink-0 shadow-2xs"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Active Speech Recording Floating Banner with Auto-Submit Indication */}
        {isListening && (
          <div className="px-3 sm:px-6 py-2.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-md flex items-center justify-between gap-3 shrink-0 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center gap-3 min-w-0">
              <span className="relative flex h-3.5 w-3.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white"></span>
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-xs sm:text-sm">Listening to your voice...</span>
                  <span className="text-[11px] bg-red-800/90 px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
                    <Zap className="w-3 h-3 text-amber-300" />
                    Auto-submits on its own
                  </span>
                </div>
                <p className="text-xs text-rose-100 truncate mt-0.5 font-medium">
                  {inputPrompt || 'Speak your question now (e.g. Can I drink this water?)...'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  const spoken = currentTranscriptRef.current.trim() || inputPrompt.trim();
                  stopListening();
                  if (spoken) {
                    triggerVoiceAutoSubmit(spoken);
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-white text-rose-700 hover:bg-rose-50 text-xs font-black shadow-xs transition active:scale-95 flex items-center gap-1"
              >
                <span>Send Now</span>
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Auto-Submitting Visual Confirmation Banner */}
        {isAutoSubmitting && (
          <div className="px-3 sm:px-6 py-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-md flex items-center justify-between gap-3 shrink-0 animate-in fade-in duration-150">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-200 animate-spin" />
              <span className="text-xs sm:text-sm font-black">
                ✨ Voice recognized! Auto-submitting question to NexusFlow...
              </span>
            </div>
            <Loader2 className="w-4 h-4 text-white animate-spin shrink-0" />
          </div>
        )}

        {/* Search & Ask Input Bar Footer */}
        <div
          id="aqua-ai-search-footer"
          className="p-3 sm:p-4 bg-white border-t-2 border-slate-200 shrink-0 shadow-lg relative z-20"
        >
          <form onSubmit={handleSubmit} className="max-w-5xl mx-auto flex items-center gap-2 sm:gap-3">
            {/* Microphone Voice Input & Language Selector */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                id="aqua-ai-mic-btn"
                type="button"
                onClick={toggleListening}
                className={`p-3.5 sm:p-4 rounded-2xl font-bold flex items-center justify-center transition active:scale-95 shrink-0 shadow-md ${
                  isListening
                    ? 'bg-rose-600 text-white ring-4 ring-rose-300 animate-pulse'
                    : speechRecognitionSupported
                    ? 'bg-gradient-to-tr from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
                title={
                  isListening
                    ? 'Listening... Click to stop and submit immediately'
                    : speechRecognitionSupported
                    ? `Click to speak your question — voice automatically submits on its own when you stop speaking!`
                    : 'Voice input is not supported in this browser'
                }
                disabled={!speechRecognitionSupported}
              >
                {isListening ? (
                  <MicOff className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>

              {/* Quick Language Dropdown for Mic Input */}
              <div className="hidden sm:flex flex-col justify-center">
                <label htmlFor="voice-input-lang-select" className="sr-only">
                  Microphone Language
                </label>
                <select
                  id="voice-input-lang-select"
                  value={selectedVoiceInputLang}
                  onChange={(e) => setSelectedVoiceInputLang(e.target.value)}
                  className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl px-2 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer transition shadow-2xs"
                  title="Choose which language you want to speak in"
                >
                  {VOICE_INPUT_LANGUAGES.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      🗣️ {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Text Input Field */}
            <div className="relative flex-1 flex items-center">
              <Search className="w-5 h-5 text-cyan-600 absolute left-4 pointer-events-none" />
              <input
                ref={inputRef}
                id="aqua-ai-chat-input"
                type="text"
                value={inputPrompt}
                disabled={isAiThinking}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder={t.placeholder}
                className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-2xl bg-slate-50 border-2 border-slate-300 text-slate-900 placeholder-slate-400 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:bg-white shadow-inner transition"
              />
              {inputPrompt.length > 0 && (
                <button
                  type="button"
                  onClick={() => setInputPrompt('')}
                  className="absolute right-3.5 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
                  title="Clear text"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Send Message Button */}
            <button
              id="send-ai-message-btn"
              type="submit"
              disabled={!inputPrompt.trim() || isAiThinking}
              className="px-4 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 active:scale-95 text-white font-extrabold text-sm sm:text-base flex items-center gap-2 transition shadow-md hover:shadow-lg shrink-0"
            >
              {isAiThinking ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              <span className="hidden sm:inline">{t.sendBtn}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

