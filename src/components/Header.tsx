import React from 'react';
import {
  Droplets,
  Wifi,
  WifiOff,
  AlertTriangle,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  SlidersHorizontal,
  Globe,
  Check,
} from 'lucide-react';
import { useWaterSystem } from '../context/WaterSystemContext';
import { DemoScenario, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

export const Header: React.FC = () => {
  const {
    overallStatus,
    systemMode,
    setSystemMode,
    currentScenario,
    switchScenario,
    device,
    buzzerMuted,
    setBuzzerMuted,
    setActiveTab,
    activeTab,
    language,
    setLanguage,
  } = useWaterSystem();

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const getStatusBadge = () => {
    switch (overallStatus) {
      case 'SAFE':
        return (
          <div
            id="status-badge-safe"
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] sm:text-xs font-black shadow-2xs whitespace-nowrap leading-none"
          >
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
            </span>
            <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>{t.statusSafe}</span>
          </div>
        );
      case 'WARNING':
        return (
          <div
            id="status-badge-warning"
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-[10px] sm:text-xs font-black shadow-2xs whitespace-nowrap leading-none"
          >
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-amber-500"></span>
            </span>
            <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
            <span>{t.statusWarning}</span>
          </div>
        );
      case 'UNSAFE':
        return (
          <div
            id="status-badge-unsafe"
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-50 border border-rose-300 text-rose-800 text-[10px] sm:text-xs font-black shadow-2xs animate-pulse whitespace-nowrap leading-none"
          >
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-rose-600"></span>
            </span>
            <ShieldAlert className="w-3 h-3 text-rose-600 shrink-0" />
            <span>{t.statusUnsafe}</span>
          </div>
        );
      case 'SYSTEM OFFLINE':
      default:
        return (
          <div
            id="status-badge-offline"
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-slate-700 text-[10px] sm:text-xs font-black shadow-2xs whitespace-nowrap leading-none"
          >
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-slate-400 shrink-0"></span>
            <WifiOff className="w-3 h-3 text-slate-500 shrink-0" />
            <span>{t.statusOffline}</span>
          </div>
        );
    }
  };

  const languagesList: { code: SupportedLanguage; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'te', label: 'తెలుగు' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Banner: Mode Controls & Clean Sub-row (SIH Problem 26040 removed completely) */}
      <div className="bg-gradient-to-r from-cyan-900 via-sky-800 to-cyan-900 text-white px-3 sm:px-6 py-1 text-xs font-medium flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-cyan-200 text-[11px] sm:text-xs font-semibold">
            {t.appSubtitle}
          </span>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="inline-flex rounded-lg p-0.5 bg-cyan-950/70 border border-cyan-700/50 text-[10px] sm:text-xs">
            <button
              id="mode-toggle-live"
              onClick={() => {
                setSystemMode('LIVE');
                switchScenario('normal');
              }}
              className={`px-2 py-0.5 rounded-md font-bold transition-colors ${
                systemMode === 'LIVE'
                  ? 'bg-cyan-500 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {t.liveMode}
            </button>
            <button
              id="mode-toggle-demo"
              onClick={() => setSystemMode('DEMO')}
              className={`px-2 py-0.5 rounded-md font-bold flex items-center gap-1 transition-colors ${
                systemMode === 'DEMO'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-2.5 h-2.5" />
              {t.demoMode}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Row: AquaGuard -> Green Dot -> Language Control -> Status & Hardware */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Container: AquaGuard (with SAFE below) + Language Control */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 shrink-0">
            <Droplets className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          
          {/* AquaGuard and SAFE Status below it */}
          <div className="flex flex-col justify-center min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-base sm:text-lg md:text-xl font-black tracking-tight text-slate-900 leading-none shrink-0">
                {t.appTitle}
              </h1>

              {/* The Green Dot right after AquaGuard */}
              <span
                id="aquaguard-green-dot"
                className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0"
                title="ESP32 Telemetry Active & Online"
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
              </span>
            </div>

            {/* SAFE status badge placed directly below AquaGuard */}
            <div id="water-status-header" className="mt-1 flex items-center">
              {getStatusBadge()}
            </div>
          </div>

          {/* Language Control beside */}
          <div
            id="header-language-control"
            className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs shrink-0 ml-1 sm:ml-2"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-700 ml-1.5 mr-1 hidden sm:block" />
            {languagesList.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  id={`header-lang-btn-${lang.code}`}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-extrabold flex items-center gap-1 transition-all ${
                    isSelected
                      ? 'bg-white text-cyan-800 shadow-xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                  title={lang.label}
                >
                  <span>{lang.label}</span>
                  {isSelected && <Check className="w-3 h-3 text-cyan-600 hidden sm:inline" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Controls: ESP32, Buzzer */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 ml-auto">
          {/* ESP32 Online status indicator (desktop) */}
          <div
            id="esp32-connection-pill"
            onClick={() => setActiveTab('device')}
            className="cursor-pointer hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-medium text-slate-700 transition"
            title="View ESP32 device details"
          >
            {device.connectionStatus === 'ONLINE' ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">{t.esp32Online}</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-rose-600" />
                <span className="text-rose-700 font-semibold">{t.esp32Offline}</span>
              </>
            )}
          </div>

          {/* Buzzer Sound Mute Toggle */}
          <button
            id="buzzer-toggle-btn"
            onClick={() => setBuzzerMuted(!buzzerMuted)}
            className={`p-2 rounded-xl border text-xs transition shrink-0 ${
              buzzerMuted
                ? 'bg-slate-100 text-slate-400 border-slate-200'
                : 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100'
            }`}
            title={buzzerMuted ? 'Unmute alert buzzer' : 'Mute alert buzzer'}
            aria-label="Toggle Buzzer"
          >
            {buzzerMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Demo Scenario Sub-bar (Active when in Demo Mode) */}
      {systemMode === 'DEMO' && (
        <div className="bg-amber-50/90 border-t border-amber-200 px-3 sm:px-6 py-1.5">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900">
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700" />
              <span>{t.scenarioLabel}</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
              {(
                [
                  { id: 'normal', label: '1. Normal' },
                  { id: 'high_turbidity', label: '2. High Turbidity' },
                  { id: 'high_tds', label: '3. High TDS' },
                  { id: 'abnormal_ph', label: '4. Abnormal pH' },
                  { id: 'filter_life_low', label: '5. Filter Life Low' },
                  { id: 'sensor_failure', label: '6. Sensor Fail' },
                  { id: 'system_offline', label: '7. Offline' },
                ] as { id: DemoScenario; label: string }[]
              ).map((sc) => (
                <button
                  key={sc.id}
                  id={`scenario-btn-${sc.id}`}
                  onClick={() => switchScenario(sc.id)}
                  className={`px-2.5 py-0.5 rounded-md text-xs font-medium whitespace-nowrap transition ${
                    currentScenario === sc.id
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
