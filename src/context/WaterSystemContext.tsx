import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  ChatConversation,
  ChatMessage,
  DemoScenario,
  DeviceTelemetry,
  FilterItem,
  HistoricalReading,
  SensorHealthItem,
  SupportedLanguage,
  SystemAlert,
  ValveSystemControl,
  WaterImprovement,
  WaterOverallStatus,
  WaterStageData,
} from '../types';
import {
  generateHistoricalData,
  INITIAL_ALERTS,
  INITIAL_CONTROLS,
  INITIAL_DEVICE,
  INITIAL_FILTERS,
  INITIAL_INPUT_WATER,
  INITIAL_OUTPUT_WATER,
  INITIAL_SENSORS,
  SCENARIO_PRESETS,
} from '../data/mockData';

interface WaterSystemContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  systemMode: 'LIVE' | 'DEMO';
  setSystemMode: (mode: 'LIVE' | 'DEMO') => void;
  currentScenario: DemoScenario;
  switchScenario: (scenario: DemoScenario) => void;
  overallStatus: WaterOverallStatus;
  inputWater: WaterStageData;
  outputWater: WaterStageData;
  improvement: WaterImprovement;
  filters: FilterItem[];
  replaceFilter: (filterId: string) => void;
  sensors: SensorHealthItem[];
  calibrateSensor: (sensorId: string) => void;
  alerts: SystemAlert[];
  unreadAlertsCount: number;
  acknowledgeAlert: (alertId: string) => void;
  resolveAlert: (alertId: string) => void;
  controls: ValveSystemControl;
  togglePump: () => void;
  toggleUV: () => void;
  toggleInletValve: () => void;
  toggleOutputValve: () => void;
  toggleRejectValve: () => void;
  toggleControlMode: () => void;
  emergencyStop: () => void;
  resetEmergencyStop: () => void;
  device: DeviceTelemetry;
  connectESP32: () => void;
  disconnectESP32: () => void;
  refreshDeviceData: () => void;
  historicalReadings: HistoricalReading[];
  historyRange: '1h' | '6h' | '24h' | '7d';
  setHistoryRange: (range: '1h' | '6h' | '24h' | '7d') => void;
  buzzerMuted: boolean;
  setBuzzerMuted: (muted: boolean) => void;
  conversations: ChatConversation[];
  activeConversationId: string;
  setActiveConversationId: (id: string) => void;
  createNewChat: () => string;
  deleteChat: (id: string) => void;
  sendAiMessage: (messageText: string, customLang?: SupportedLanguage) => Promise<void>;
  isAiThinking: boolean;
  aiLanguage: SupportedLanguage;
  setAiLanguage: (lang: SupportedLanguage) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}

const WaterSystemContext = createContext<WaterSystemContextType | undefined>(undefined);

const CHAT_STORAGE_KEY = 'nexusflow_chat_history_v1';
const LANGUAGE_STORAGE_KEY = 'nexusflow_app_language';

export const WaterSystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [systemMode, setSystemMode] = useState<'LIVE' | 'DEMO'>('LIVE');
  const [currentScenario, setCurrentScenario] = useState<DemoScenario>('normal');
  const [buzzerMuted, setBuzzerMuted] = useState<boolean>(false);
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as SupportedLanguage | null;
      if (saved && (saved === 'en' || saved === 'hi' || saved === 'te')) {
        return saved;
      }
    } catch (e) {
      console.error('Failed to load language:', e);
    }
    return 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (e) {
      console.error('Failed to save language:', e);
    }
  };

  const aiLanguage = language;
  const setAiLanguage = setLanguage;

  const [inputWater, setInputWater] = useState<WaterStageData>(INITIAL_INPUT_WATER);
  const [outputWater, setOutputWater] = useState<WaterStageData>(INITIAL_OUTPUT_WATER);
  const [filters, setFilters] = useState<FilterItem[]>(INITIAL_FILTERS);
  const [sensors, setSensors] = useState<SensorHealthItem[]>(INITIAL_SENSORS);
  const [alerts, setAlerts] = useState<SystemAlert[]>(INITIAL_ALERTS);
  const [controls, setControls] = useState<ValveSystemControl>(INITIAL_CONTROLS);
  const [device, setDevice] = useState<DeviceTelemetry>(INITIAL_DEVICE);
  const [historyRange, setHistoryRange] = useState<'1h' | '6h' | '24h' | '7d'>('1h');
  const [historicalReadings, setHistoricalReadings] = useState<HistoricalReading[]>(() =>
    generateHistoricalData('1h')
  );

  // Chatbot state with local storage persistence
  const [conversations, setConversations] = useState<ChatConversation[]>(() => {
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load chat history:', e);
    }
    return [
      {
        id: 'chat-seed-1',
        title: 'Water Quality & Turbidity Diagnosis',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 3600000).toISOString(),
        messages: [
          {
            id: 'msg-1',
            role: 'user',
            content: 'Why is my input water showing a warning?',
            timestamp: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
          {
            id: 'msg-2',
            role: 'assistant',
            content:
              'Your input turbidity is 38.0 NTU, exceeding the 5.0 NTU threshold due to suspended silt in raw water. The filtration stages are active and output turbidity is safe at 1.4 NTU.',
            timestamp: new Date(Date.now() - 3590000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ],
      },
    ];
  });

  const [activeConversationId, setActiveConversationId] = useState<string>(() => {
    return conversations[0]?.id || 'chat-seed-1';
  });
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  // Save conversations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(conversations));
    } catch (e) {
      console.error('Failed to persist chat conversations:', e);
    }
  }, [conversations]);

  // Update historical data when range changes
  useEffect(() => {
    setHistoricalReadings(generateHistoricalData(historyRange));
  }, [historyRange]);

  // Derive improvements between input and output
  const improvement: WaterImprovement = useMemo(() => {
    const inTurb = inputWater.turbidity.value;
    const outTurb = outputWater.turbidity.value;
    const turbRed = inTurb > 0 ? Math.max(0, Math.min(100, Math.round(((inTurb - outTurb) / inTurb) * 100))) : 0;

    const inTds = inputWater.tds.value;
    const outTds = outputWater.tds.value;
    const tdsRed = inTds > 0 ? Math.max(0, Math.min(100, Math.round(((inTds - outTds) / inTds) * 100))) : 0;

    const inPh = inputWater.ph.value;
    const outPh = outputWater.ph.value;
    const phStabilized = outPh >= 6.8 && outPh <= 7.8;

    return {
      turbidityReductionPct: turbRed,
      tdsReductionPct: tdsRed,
      phStabilized,
      phDelta: Number((outPh - inPh).toFixed(1)),
      tempDelta: Number((outputWater.temperature.value - inputWater.temperature.value).toFixed(1)),
    };
  }, [inputWater, outputWater]);

  // Derive Overall System Water Status
  const overallStatus: WaterOverallStatus = useMemo(() => {
    if (device.connectionStatus === 'OFFLINE') {
      return 'SYSTEM OFFLINE';
    }
    const outPh = outputWater.ph.value;
    const outTds = outputWater.tds.value;
    const outTurb = outputWater.turbidity.value;

    if (outPh < 6.0 || outPh > 9.0 || outTds > 800 || outTurb > 5.0) {
      return 'UNSAFE';
    }
    if (outPh < 6.5 || outPh > 8.5 || outTds > 500 || outTurb > 2.5) {
      return 'WARNING';
    }
    return 'SAFE';
  }, [device.connectionStatus, outputWater]);

  // Automatic Water Diversion Logic (SIH Section 6)
  useEffect(() => {
    if (controls.mode === 'AUTO' && !controls.emergencyStopped && device.connectionStatus === 'ONLINE') {
      const outPh = outputWater.ph.value;
      const outTds = outputWater.tds.value;
      const outTurb = outputWater.turbidity.value;

      const isWaterAbnormal = outPh < 6.5 || outPh > 8.5 || outTds > 500 || outTurb > 4.0;

      if (isWaterAbnormal) {
        // Divert to reject / re-treatment loop
        setControls((prev) => {
          if (prev.outputValve !== false || prev.rejectValve !== true) {
            return {
              ...prev,
              outputValve: false,
              rejectValve: true,
            };
          }
          return prev;
        });

        // Add auto-diversion alert if not already logged
        setAlerts((prev) => {
          const exists = prev.some((a) => a.type === 'OUTPUT QUALITY WARNING' && !a.resolved);
          if (!exists) {
            return [
              {
                id: `alt-${Date.now()}`,
                type: 'OUTPUT QUALITY WARNING',
                title: 'Automatic Safety Diversion Engaged',
                message:
                  'Output water does not meet configured monitoring limits. Clean output valve closed; flow diverted to re-treatment path.',
                severity: 'CRITICAL',
                timestamp: 'Just now',
                sensorValue: `pH ${outPh}, TDS ${outTds}, Turb ${outTurb}`,
                resolved: false,
                acknowledged: false,
                channels: ['in-app', 'dashboard', 'buzzer'],
              },
              ...prev,
            ];
          }
          return prev;
        });
      } else {
        // Normal mode: Allow clean output and auto-resolve diversion alert
        setControls((prev) => {
          if (prev.outputValve !== true || prev.rejectValve !== false) {
            return {
              ...prev,
              outputValve: true,
              rejectValve: false,
            };
          }
          return prev;
        });

        // Auto-resolve any active output quality / diversion warning
        setAlerts((prev) =>
          prev.map((a) =>
            a.type === 'OUTPUT QUALITY WARNING' && !a.resolved
              ? { ...a, resolved: true, acknowledged: true }
              : a
          )
        );
      }
    }
  }, [controls.mode, controls.emergencyStopped, device.connectionStatus, outputWater]);

  // Automatic Self-Resolution: Warnings resolve by themselves when water readings normalize
  useEffect(() => {
    setAlerts((prevAlerts) => {
      const outPh = outputWater.ph.value;
      const outTds = outputWater.tds.value;
      const outTurb = outputWater.turbidity.value;
      const inTurb = inputWater.turbidity.value;
      const inTds = inputWater.tds.value;
      const inPh = inputWater.ph.value;
      const isOnline = device.connectionStatus === 'ONLINE';

      let hasChanges = false;
      const updated = prevAlerts.map((alert) => {
        if (alert.resolved) return alert;

        let shouldAutoResolve = false;

        // Auto-resolve turbidity warnings when turbidity is below nominal limit (5 NTU)
        if (alert.type === 'HIGH TURBIDITY' || alert.title.toLowerCase().includes('turbidity')) {
          if (inTurb <= 5.0 && outTurb <= 2.5) {
            shouldAutoResolve = true;
          }
        }
        // Auto-resolve TDS warnings when TDS is within normal limits
        else if (alert.type === 'HIGH TDS' || alert.title.toLowerCase().includes('tds')) {
          if (inTds <= 500 && outTds <= 500) {
            shouldAutoResolve = true;
          }
        }
        // Auto-resolve pH warnings when pH is normalized between 6.5 and 8.5
        else if (alert.type === 'ABNORMAL pH' || alert.type === 'ABNORMAL PH' || alert.title.toLowerCase().includes('ph')) {
          if (inPh >= 6.5 && inPh <= 8.5 && outPh >= 6.5 && outPh <= 8.5) {
            shouldAutoResolve = true;
          }
        }
        // Auto-resolve offline alert when connection restored
        else if (alert.type === 'DEVICE OFFLINE' || alert.title.toLowerCase().includes('offline')) {
          if (isOnline) {
            shouldAutoResolve = true;
          }
        }
        // Auto-resolve emergency stop alert when reset
        else if (alert.type === 'EMERGENCY STOP') {
          if (!controls.emergencyStopped) {
            shouldAutoResolve = true;
          }
        }
        // Auto-resolve output quality alert when safe
        else if (alert.type === 'OUTPUT QUALITY WARNING' || alert.type === 'AUTO DIVERSION') {
          if (outPh >= 6.5 && outPh <= 8.5 && outTds <= 500 && outTurb <= 2.5) {
            shouldAutoResolve = true;
          }
        }
        // When in normal scenario and output is safe, auto-resolve all quality warnings
        else if (currentScenario === 'normal' && outTurb <= 2.5 && outTds <= 500 && outPh >= 6.5 && outPh <= 8.5) {
          shouldAutoResolve = true;
        }

        if (shouldAutoResolve) {
          hasChanges = true;
          return { ...alert, resolved: true, acknowledged: true };
        }
        return alert;
      });

      return hasChanges ? updated : prevAlerts;
    });
  }, [outputWater, inputWater, device.connectionStatus, controls.emergencyStopped, currentScenario]);

  // Scenario Switcher
  const switchScenario = (scenario: DemoScenario) => {
    setCurrentScenario(scenario);

    // If switching to normal scenario, auto-resolve all previous warnings immediately
    if (scenario === 'normal') {
      setAlerts((prev) => prev.map((a) => ({ ...a, resolved: true, acknowledged: true })));
    }

    const preset = SCENARIO_PRESETS[scenario];
    if (!preset) return;

    if (preset.input) {
      setInputWater((prev) => ({
        ...prev,
        ...preset.input,
      }));
    }
    if (preset.output) {
      setOutputWater((prev) => ({
        ...prev,
        ...preset.output,
      }));
    }
    if (preset.deviceStatus) {
      setDevice((prev) => ({
        ...prev,
        connectionStatus: preset.deviceStatus!,
      }));
    } else {
      setDevice((prev) => ({
        ...prev,
        connectionStatus: 'ONLINE',
      }));
    }
    if (preset.alertTrigger) {
      setAlerts((prev) => [preset.alertTrigger!, ...prev.filter((a) => a.id !== preset.alertTrigger!.id)]);
    }
    if (preset.valveOverride) {
      setControls((prev) => ({
        ...prev,
        ...preset.valveOverride,
      }));
    }
    if (preset.filterOverride) {
      setFilters((prev) =>
        prev.map((f) => {
          const match = preset.filterOverride?.find((o) => o.id === f.id);
          return match ? { ...f, ...match } : f;
        })
      );
    }
    if (preset.sensorOverride) {
      setSensors((prev) =>
        prev.map((s) => {
          const match = preset.sensorOverride?.find((o) => o.id === s.id);
          return match ? { ...s, ...match } : s;
        })
      );
    }
  };

  // Real-time gentle jitter simulation to reflect live ESP32 telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setDevice((prev) => {
        if (prev.connectionStatus === 'OFFLINE') {
          return {
            ...prev,
            lastDataReceivedSecs: prev.lastDataReceivedSecs + 3,
          };
        }
        return {
          ...prev,
          lastDataReceivedSecs: Math.floor(Math.random() * 5) + 1,
          uptimeSeconds: prev.uptimeSeconds + 3,
          flowRateLpm: Number((1.75 + Math.random() * 0.15).toFixed(2)),
          totalTreatedLiters: Number((prev.totalTreatedLiters + 0.08).toFixed(1)),
        };
      });

      // Subtle fluctuation on output values if system is active
      if (controls.pump && device.connectionStatus === 'ONLINE') {
        setOutputWater((prev) => ({
          ...prev,
          tds: {
            ...prev.tds,
            value: Math.max(80, Math.min(300, Math.round(prev.tds.value + (Math.random() - 0.5) * 2))),
            lastUpdated: 'Just now',
          },
          turbidity: {
            ...prev.turbidity,
            value: Number(Math.max(0.4, Math.min(3.0, prev.turbidity.value + (Math.random() - 0.5) * 0.05)).toFixed(1)),
            lastUpdated: 'Just now',
          },
        }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [controls.pump, device.connectionStatus]);

  // Filter actions
  const replaceFilter = (filterId: string) => {
    const today = new Date().toISOString().split('T')[0];
    setFilters((prev) =>
      prev.map((f) => {
        if (f.id === filterId) {
          return {
            ...f,
            lifespanPercentage: 100,
            estimatedDaysRemaining: f.id === 'uv' ? 365 : f.id === 'ro' ? 180 : 90,
            operatingHours: 0,
            totalVolumeProcessedLiters: 0,
            flowRestrictionStatus: 'Optimal (Clean cartridge)',
            lastReplacement: today,
            recommendation: 'Filter replaced and calibrated. Running at peak efficiency.',
            status: 'GOOD',
          };
        }
        return f;
      })
    );

    // Resolve filter alerts if any
    setAlerts((prev) =>
      prev.map((a) => (a.type === 'FILTER LIFE LOW' ? { ...a, resolved: true, acknowledged: true } : a))
    );
  };

  // Sensor Calibration Action
  const calibrateSensor = (sensorId: string) => {
    const today = new Date().toISOString().split('T')[0];
    setSensors((prev) =>
      prev.map((s) => {
        if (s.id === sensorId) {
          return {
            ...s,
            status: 'ONLINE',
            calibrationStatus: 'Calibrated successfully with certified reference buffer',
            lastCalibrationDate: today,
            healthPercentage: 99,
            diagnosticNote: 'Linear slope and baseline impedance within ±0.5% tolerance.',
            errorDetected: false,
          };
        }
        return s;
      })
    );

    // Resolve sensor alerts
    setAlerts((prev) =>
      prev.map((a) => (a.type === 'SENSOR ERROR' ? { ...a, resolved: true, acknowledged: true } : a))
    );
  };

  // Alert actions
  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a)));
  };

  const resolveAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === alertId ? { ...a, resolved: true, acknowledged: true } : a)));
  };

  const unreadAlertsCount = useMemo(() => {
    return alerts.filter((a) => !a.resolved && a.severity !== 'NORMAL').length;
  }, [alerts]);

  // Controls actions
  const togglePump = () => {
    setControls((prev) => ({ ...prev, pump: !prev.pump }));
  };

  const toggleUV = () => {
    setControls((prev) => ({ ...prev, uv: !prev.uv }));
  };

  const toggleInletValve = () => {
    setControls((prev) => ({ ...prev, inletValve: !prev.inletValve }));
  };

  const toggleOutputValve = () => {
    setControls((prev) => ({ ...prev, outputValve: !prev.outputValve }));
  };

  const toggleRejectValve = () => {
    setControls((prev) => ({ ...prev, rejectValve: !prev.rejectValve }));
  };

  const toggleControlMode = () => {
    setControls((prev) => ({
      ...prev,
      mode: prev.mode === 'AUTO' ? 'MANUAL' : 'AUTO',
    }));
  };

  const emergencyStop = () => {
    setControls({
      pump: false,
      uv: false,
      inletValve: false,
      outputValve: false,
      rejectValve: false,
      mode: 'MANUAL',
      emergencyStopped: true,
    });
    setAlerts((prev) => [
      {
        id: `alt-${Date.now()}`,
        type: 'EMERGENCY STOP',
        title: 'Emergency Shutoff Activated',
        message: 'System manually halted. Pump deactivated, all solenoid valves closed immediately.',
        severity: 'CRITICAL',
        timestamp: 'Just now',
        sensorValue: 'SHUTDOWN',
        resolved: false,
        acknowledged: false,
        channels: ['in-app', 'dashboard', 'buzzer'],
      },
      ...prev,
    ]);
  };

  const resetEmergencyStop = () => {
    setControls({
      ...INITIAL_CONTROLS,
      emergencyStopped: false,
    });
  };

  // Device actions
  const connectESP32 = () => {
    setDevice((prev) => ({
      ...prev,
      connectionStatus: 'ONLINE',
      lastDataReceivedSecs: 1,
    }));
  };

  const disconnectESP32 = () => {
    setDevice((prev) => ({
      ...prev,
      connectionStatus: 'OFFLINE',
      lastDataReceivedSecs: 120,
    }));
  };

  const refreshDeviceData = () => {
    setDevice((prev) => ({
      ...prev,
      lastDataReceivedSecs: 1,
    }));
  };

  // Chatbot conversation handlers
  const createNewChat = (): string => {
    const newId = `chat-${Date.now()}`;
    const newConversation: ChatConversation = {
      id: newId,
      title: 'New Water Quality Inquiry',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          role: 'assistant',
          content:
            'Hello, I am **NexusFlow**, your intelligent water-purification assistant.\n\nI have real-time access to your ESP32 sensors, filter lifespans, valve states, and safety alerts. Ask me anything about water quality, treatment parameters, or system diagnostics!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    };

    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newId);
    return newId;
  };

  const deleteChat = (id: string) => {
    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (filtered.length === 0) {
        const fallback = {
          id: `chat-${Date.now()}`,
          title: 'New Water Quality Inquiry',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          messages: [],
        };
        setActiveConversationId(fallback.id);
        return [fallback];
      }
      if (activeConversationId === id) {
        setActiveConversationId(filtered[0].id);
      }
      return filtered;
    });
  };

  const sendAiMessage = async (messageText: string, customLang?: SupportedLanguage) => {
    if (!messageText.trim()) return;

    let convId = activeConversationId;
    let currentConv = conversations.find((c) => c.id === convId);

    if (!currentConv) {
      convId = createNewChat();
      currentConv = conversations.find((c) => c.id === convId);
    }

    const effectiveLang = customLang || aiLanguage;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-u`,
      role: 'user',
      content: messageText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Update conversation title if default
    const isFirstUserMsg = !currentConv?.messages.some((m) => m.role === 'user');
    const autoTitle = isFirstUserMsg
      ? messageText.trim().slice(0, 32) + (messageText.length > 32 ? '...' : '')
      : currentConv?.title || 'Water Quality Chat';

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === convId) {
          return {
            ...c,
            title: autoTitle,
            updatedAt: new Date().toISOString(),
            messages: [...c.messages, userMessage],
          };
        }
        return c;
      })
    );

    setIsAiThinking(true);

    try {
      // Build rich system context for AquaAI
      const systemContext = {
        waterStatus: overallStatus,
        inputWater: {
          ph: inputWater.ph.value,
          tds: inputWater.tds.value,
          turbidity: inputWater.turbidity.value,
          temperature: inputWater.temperature.value,
        },
        outputWater: {
          ph: outputWater.ph.value,
          tds: outputWater.tds.value,
          turbidity: outputWater.turbidity.value,
          temperature: outputWater.temperature.value,
        },
        improvements: improvement,
        filters: filters.map((f) => ({
          name: f.name,
          lifespanPercentage: f.lifespanPercentage,
          estimatedDaysRemaining: f.estimatedDaysRemaining,
          status: f.status,
        })),
        sensors: sensors.map((s) => ({
          name: s.name,
          status: s.status,
          healthPercentage: s.healthPercentage,
          calibration: s.calibrationStatus,
        })),
        alerts: alerts.filter((a) => !a.resolved).map((a) => ({ title: a.title, severity: a.severity })),
        valves: controls,
        device: {
          connectionStatus: device.connectionStatus,
          battery: device.batteryPercentage,
          uptimeSecs: device.uptimeSeconds,
        },
      };

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: currentConv?.messages || [],
          systemContext,
          language: effectiveLang,
        }),
      });

      const data = await res.json();
      const replyContent = data.reply || 'I was unable to process the question with current sensor readings.';
      const detectedLang = data.detectedLang || effectiveLang;
      const speechLangCode =
        data.speechLangTag ||
        (detectedLang === 'hi'
          ? 'hi-IN'
          : detectedLang === 'te'
          ? 'te-IN'
          : detectedLang === 'ta'
          ? 'ta-IN'
          : detectedLang === 'mr'
          ? 'mr-IN'
          : detectedLang === 'bn'
          ? 'bn-IN'
          : detectedLang === 'gu'
          ? 'gu-IN'
          : detectedLang === 'kn'
          ? 'kn-IN'
          : detectedLang === 'ml'
          ? 'ml-IN'
          : detectedLang === 'pa'
          ? 'pa-IN'
          : detectedLang === 'ur'
          ? 'ur-IN'
          : detectedLang === 'es'
          ? 'es-ES'
          : detectedLang === 'fr'
          ? 'fr-FR'
          : detectedLang === 'de'
          ? 'de-DE'
          : 'en-US');
      const inputLang = data.inputLang || detectedLang;

      const aiMessage: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        detectedLang,
        speechLangCode,
        inputLang,
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === convId) {
            return {
              ...c,
              updatedAt: new Date().toISOString(),
              messages: [...c.messages, aiMessage],
            };
          }
          return c;
        })
      );
    } catch (err) {
      console.error('AI chat error:', err);
      const fallbackAiMsg: ChatMessage = {
        id: `msg-${Date.now()}-ai-err`,
        role: 'assistant',
        content:
          'Could not establish connection to the AI backend. Please check your network or review live sensor values on the dashboard.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setConversations((prev) =>
        prev.map((c) => (c.id === convId ? { ...c, messages: [...c.messages, fallbackAiMsg] } : c))
      );
    } finally {
      setIsAiThinking(false);
    }
  };

  return (
    <WaterSystemContext.Provider
      value={{
        activeTab,
        setActiveTab,
        systemMode,
        setSystemMode,
        currentScenario,
        switchScenario,
        overallStatus,
        inputWater,
        outputWater,
        improvement,
        filters,
        replaceFilter,
        sensors,
        calibrateSensor,
        alerts,
        unreadAlertsCount,
        acknowledgeAlert,
        resolveAlert,
        controls,
        togglePump,
        toggleUV,
        toggleInletValve,
        toggleOutputValve,
        toggleRejectValve,
        toggleControlMode,
        emergencyStop,
        resetEmergencyStop,
        device,
        connectESP32,
        disconnectESP32,
        refreshDeviceData,
        historicalReadings,
        historyRange,
        setHistoryRange,
        buzzerMuted,
        setBuzzerMuted,
        conversations,
        activeConversationId,
        setActiveConversationId,
        createNewChat,
        deleteChat,
        sendAiMessage,
        isAiThinking,
        aiLanguage,
        setAiLanguage,
        language: aiLanguage,
        setLanguage: setAiLanguage,
      }}
    >
      {children}
    </WaterSystemContext.Provider>
  );
};

export const useWaterSystem = () => {
  const context = useContext(WaterSystemContext);
  if (!context) {
    throw new Error('useWaterSystem must be used within a WaterSystemProvider');
  }
  return context;
};
