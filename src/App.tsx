import React from 'react';
import { RotateCcw, ShieldAlert } from 'lucide-react';
import { WaterSystemProvider, useWaterSystem } from './context/WaterSystemContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { DashboardView } from './components/DashboardView';
import { WaterQualityView } from './components/WaterQualityView';
import { FilterHealthView } from './components/FilterHealthView';
import { SensorHealthView } from './components/SensorHealthView';
import { AlertsView } from './components/AlertsView';
import { SystemControlView } from './components/SystemControlView';
import { AquaAiView } from './components/AquaAiView';
import { ReportsView } from './components/ReportsView';
import { DeviceView } from './components/DeviceView';
import { TRANSLATIONS } from './i18n/translations';

const MainContent: React.FC = () => {
  const { activeTab, controls, resetEmergencyStop, language } = useWaterSystem();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const isChat = activeTab === 'aqua_ai';

  return (
    <main
      id="main-app-content"
      className={`flex-1 w-full min-h-0 flex flex-col ${
        isChat
          ? 'p-1 sm:p-2.5 lg:p-4 max-w-7xl mx-auto overflow-hidden pb-16 lg:pb-2'
          : 'p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto overflow-y-auto pb-24 lg:pb-8'
      }`}
    >
      {/* Scrollable Emergency Stopped / Resume Banner for all views (Vanishes when scrolling down) */}
      {controls.emergencyStopped && activeTab !== 'dashboard' && (
        <div
          id="global-emergency-resume-banner"
          className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 animate-pulse mb-4 shrink-0"
        >
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-7 h-7 text-rose-200 shrink-0" />
            <div>
              <h3 className="font-black text-sm sm:text-base leading-tight">
                {t.emergencyActiveTitle}
              </h3>
              <p className="text-xs text-rose-100 mt-0.5">
                {t.emergencyActiveDesc}
              </p>
            </div>
          </div>
          <button
            id="global-resume-system-btn"
            onClick={resetEmergencyStop}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-95 shrink-0"
          >
            <RotateCcw className="w-4 h-4 text-emerald-600" />
            <span>{t.resumeSystem}</span>
          </button>
        </div>
      )}

      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'water_quality' && <WaterQualityView />}
      {activeTab === 'filter_health' && <FilterHealthView />}
      {activeTab === 'sensor_health' && <SensorHealthView />}
      {activeTab === 'alerts' && <AlertsView />}
      {activeTab === 'system_control' && <SystemControlView />}
      {activeTab === 'aqua_ai' && <AquaAiView />}
      {activeTab === 'reports' && <ReportsView />}
      {activeTab === 'device' && <DeviceView />}
    </main>
  );
};

export default function App() {
  return (
    <WaterSystemProvider>
      <div className="h-[100dvh] w-full bg-slate-50 flex flex-col text-slate-900 selection:bg-cyan-500 selection:text-white font-sans antialiased overflow-hidden">
        <Header />
        <div className="flex-1 flex min-h-0 overflow-hidden relative">
          <Navigation />
          <MainContent />
        </div>
      </div>
    </WaterSystemProvider>
  );
}
