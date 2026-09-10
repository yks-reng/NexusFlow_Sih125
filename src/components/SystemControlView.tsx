import React from 'react';
import {
  Power,
  RotateCcw,
  Sliders,
  Waves,
  ArrowRight,
} from 'lucide-react';
import { useWaterSystem } from '../context/WaterSystemContext';
import { TRANSLATIONS } from '../i18n/translations';

export const SystemControlView: React.FC = () => {
  const {
    controls,
    togglePump,
    toggleUV,
    toggleInletValve,
    toggleOutputValve,
    toggleRejectValve,
    toggleControlMode,
    emergencyStop,
    resetEmergencyStop,
    language,
  } = useWaterSystem();

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            {t.ctrlTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {t.ctrlSubtitle}
          </p>
        </div>

        {/* Mode Selector Pill (AUTO vs MANUAL) */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">{t.operatingModeTitle}</span>
          <button
            id="toggle-control-mode-btn"
            onClick={toggleControlMode}
            className={`px-3 py-1.5 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition shadow-xs ${
              controls.mode === 'AUTO'
                ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>MODE: {controls.mode === 'AUTO' ? t.modeAutoBadge : t.modeManualBadge}</span>
          </button>
        </div>
      </div>

      {/* Emergency Shutoff Status Card */}
      {controls.emergencyStopped && (
        <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-400 text-rose-950 flex flex-wrap items-center justify-between gap-4 shadow-sm animate-pulse">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-600 text-white">
              <Power className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-rose-900">{t.emergencyHaltTitle}</h3>
              <p className="text-xs text-rose-800">
                {t.emergencyHaltDesc}
              </p>
            </div>
          </div>
          <button
            id="emergency-reset-card-btn"
            onClick={resetEmergencyStop}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.clearHaltBtn}</span>
          </button>
        </div>
      )}

      {/* Interactive Hydraulic Routing Diagram */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Waves className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-cyan-200">
              {t.hydraulicTitle}
            </h3>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-cyan-300">
            Logic: {controls.mode === 'AUTO' ? t.logicAutoBadge : t.logicManualBadge}
          </span>
        </div>

        {/* Diagram Flow Map */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 text-xs overflow-x-auto">
          {/* 1. Inlet Valve */}
          <div className={`p-3 rounded-xl border text-center shrink-0 w-28 transition ${
            controls.inletValve ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200' : 'bg-slate-900 border-slate-700 text-slate-500'
          }`}>
            <span className="text-[10px] text-slate-400 block font-bold">{t.stage1Badge}</span>
            <span className="font-extrabold block">{t.inletValveName}</span>
            <span className={`text-[10px] font-bold ${controls.inletValve ? 'text-emerald-400' : 'text-rose-400'}`}>
              {controls.inletValve ? t.open : t.closed}
            </span>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-600 shrink-0 hidden lg:block" />

          {/* 2. Booster Pump */}
          <div className={`p-3 rounded-xl border text-center shrink-0 w-28 transition ${
            controls.pump ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200' : 'bg-slate-900 border-slate-700 text-slate-500'
          }`}>
            <span className="text-[10px] text-slate-400 block font-bold">{t.stage2Badge}</span>
            <span className="font-extrabold block">{t.boosterPumpName}</span>
            <span className={`text-[10px] font-bold ${controls.pump ? 'text-emerald-400' : 'text-rose-400'}`}>
              {controls.pump ? t.statusRunningOn : t.idle}
            </span>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-600 shrink-0 hidden lg:block" />

          {/* 3. Multi-stage filtration */}
          <div className="p-3 rounded-xl border border-slate-700 bg-slate-900 text-center shrink-0 w-44">
            <span className="text-[10px] text-slate-400 block font-bold">{t.purificationCoreBadge}</span>
            <span className="font-extrabold text-white block">Sediment + Carbon + RO</span>
            <span className="text-[10px] text-cyan-400">{t.fourStageFiltration}</span>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-600 shrink-0 hidden lg:block" />

          {/* 4. UV Sterilizer */}
          <div className={`p-3 rounded-xl border text-center shrink-0 w-28 transition ${
            controls.uv ? 'bg-indigo-950/70 border-indigo-400 text-indigo-200' : 'bg-slate-900 border-slate-700 text-slate-500'
          }`}>
            <span className="text-[10px] text-slate-400 block font-bold">{t.sterilizerBadge}</span>
            <span className="font-extrabold block">{t.uvLampName}</span>
            <span className={`text-[10px] font-bold ${controls.uv ? 'text-indigo-400' : 'text-slate-500'}`}>
              {controls.uv ? t.statusIlluminated : t.idle}
            </span>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-600 shrink-0 hidden lg:block" />

          {/* 5. Dual Diversion Solenoids */}
          <div className="flex flex-col gap-2 shrink-0">
            {/* Output Clean Valve */}
            <div className={`p-2.5 rounded-lg border text-center w-36 transition ${
              controls.outputValve ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-600'
            }`}>
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-extrabold">{t.cleanOutputName}</span>
                <span className={`font-bold ${controls.outputValve ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {controls.outputValve ? t.statusOpenCheck : t.statusShutClosed}
                </span>
              </div>
            </div>

            {/* Reject / Re-treatment Valve */}
            <div className={`p-2.5 rounded-lg border text-center w-36 transition ${
              controls.rejectValve ? 'bg-rose-950/80 border-rose-400 text-rose-200' : 'bg-slate-900 border-slate-800 text-slate-600'
            }`}>
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-extrabold">{t.retreatmentName}</span>
                <span className={`font-bold ${controls.rejectValve ? 'text-rose-400' : 'text-slate-500'}`}>
                  {controls.rejectValve ? t.statusDivertedWarning : t.closed}
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          {t.autoFailsafeExplanation}
        </p>
      </div>

      {/* Actuator Toggles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. Feed Booster Pump */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <h4 className="text-sm font-extrabold text-slate-900">{t.boosterCardTitle}</h4>
            <p className="text-xs text-slate-500">{t.boosterCardDesc}</p>
            <span className={`text-xs font-bold mt-1 inline-block ${controls.pump ? 'text-emerald-600' : 'text-slate-400'}`}>
              Status: {controls.pump ? t.active : t.idle}
            </span>
          </div>
          <button
            id="toggle-pump-btn"
            disabled={controls.emergencyStopped}
            onClick={togglePump}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              controls.pump
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {controls.pump ? t.turnOffBtn : t.turnOnBtn}
          </button>
        </div>

        {/* 2. UV Sterilizer Lamp */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <h4 className="text-sm font-extrabold text-slate-900">{t.uvCardTitle}</h4>
            <p className="text-xs text-slate-500">{t.uvCardDesc}</p>
            <span className={`text-xs font-bold mt-1 inline-block ${controls.uv ? 'text-indigo-600' : 'text-slate-400'}`}>
              Status: {controls.uv ? t.statusIlluminated : t.idle}
            </span>
          </div>
          <button
            id="toggle-uv-btn"
            disabled={controls.emergencyStopped}
            onClick={toggleUV}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              controls.uv
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {controls.uv ? t.turnOffBtn : t.turnOnBtn}
          </button>
        </div>

        {/* 3. Inlet Solenoid Valve */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <h4 className="text-sm font-extrabold text-slate-900">{t.inletCardTitle}</h4>
            <p className="text-xs text-slate-500">{t.inletCardDesc}</p>
            <span className={`text-xs font-bold mt-1 inline-block ${controls.inletValve ? 'text-emerald-600' : 'text-slate-400'}`}>
              Status: {controls.inletValve ? t.open : t.closed}
            </span>
          </div>
          <button
            id="toggle-inlet-btn"
            disabled={controls.emergencyStopped}
            onClick={toggleInletValve}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              controls.inletValve
                ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {controls.inletValve ? t.closeValveBtn : t.openValveBtn}
          </button>
        </div>

        {/* 4. Output Clean Water Valve */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <h4 className="text-sm font-extrabold text-slate-900">{t.cleanCardTitle}</h4>
            <p className="text-xs text-slate-500">{t.cleanCardDesc}</p>
            <span className={`text-xs font-bold mt-1 inline-block ${controls.outputValve ? 'text-emerald-600' : 'text-slate-400'}`}>
              Status: {controls.outputValve ? t.statusDispensingOpen : t.statusShutClosed}
            </span>
          </div>
          <button
            id="toggle-output-btn"
            disabled={controls.emergencyStopped}
            onClick={toggleOutputValve}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              controls.outputValve
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {controls.outputValve ? t.closeValveBtn : t.openValveBtn}
          </button>
        </div>

        {/* 5. Reject / Re-treatment Valve */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <h4 className="text-sm font-extrabold text-slate-900">{t.rejectCardTitle}</h4>
            <p className="text-xs text-slate-500">{t.rejectCardDesc}</p>
            <span className={`text-xs font-bold mt-1 inline-block ${controls.rejectValve ? 'text-amber-600' : 'text-slate-400'}`}>
              Status: {controls.rejectValve ? t.statusDivertingOpen : t.closed}
            </span>
          </div>
          <button
            id="toggle-reject-btn"
            disabled={controls.emergencyStopped}
            onClick={toggleRejectValve}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              controls.rejectValve
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {controls.rejectValve ? t.closeValveBtn : t.openValveBtn}
          </button>
        </div>

        {/* 6. Emergency Shutoff Controller */}
        <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 shadow-sm flex items-center justify-between">
          <div>
            <h4 className="text-sm font-extrabold text-rose-950">{t.emergencyCardTitle}</h4>
            <p className="text-xs text-rose-800">{t.emergencyCardDesc}</p>
            <span className="text-[11px] text-rose-700 font-mono mt-1 block">{t.hardwareRelayNote}</span>
          </div>
          <button
            id="control-view-emergency-btn"
            onClick={controls.emergencyStopped ? resetEmergencyStop : emergencyStop}
            className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md transition ${
              controls.emergencyStopped
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-rose-600 hover:bg-rose-700 text-white active:scale-95'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{controls.emergencyStopped ? t.resumeSystem : t.stopSystem}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
