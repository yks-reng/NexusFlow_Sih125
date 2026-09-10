import React from 'react';
import {
  ArrowDown,
  Battery,
  CheckCircle2,
  Clock,
  Info,
  Minus,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
  Waves,
  Wifi,
  WifiOff,
  Zap,
  Activity,
  Cpu,
  Power,
  Sliders,
  ArrowRight,
} from 'lucide-react';
import { useWaterSystem } from '../context/WaterSystemContext';
import { MetricStatus } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

export const DashboardView: React.FC = () => {
  const {
    inputWater,
    outputWater,
    improvement,
    device,
    filters,
    controls,
    resetEmergencyStop,
    setActiveTab,
    language,
  } = useWaterSystem();

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const getMetricStatusBadge = (status: MetricStatus) => {
    switch (status) {
      case 'NORMAL':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            {t.statusNormal}
          </span>
        );
      case 'ATTENTION':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            {t.statusElevated}
          </span>
        );
      case 'WARNING':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
            {t.statusUnsafeText}
          </span>
        );
      case 'CRITICAL':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white animate-pulse">
            {t.statusCritical}
          </span>
        );
      default:
        return null;
    }
  };

  const renderSparkline = (points: number[], colorClass: string) => {
    if (!points || points.length === 0) return null;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const height = 24;
    const width = 64;

    const svgPoints = points
      .map((val, idx) => {
        const x = (idx / (points.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 4) - 2;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

    return (
      <svg
        className={`w-16 h-6 overflow-visible ${colorClass} hidden sm:block`}
        viewBox={`0 0 ${width} ${height}`}
      >
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={svgPoints}
        />
      </svg>
    );
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* 
        RESUME SYSTEM EMERGENCY BANNER (Positioned in scrollable view)
        When user scrolls down, this banner vanishes naturally!
      */}
      {controls.emergencyStopped && (
        <div
          id="dashboard-emergency-resume-banner"
          className="p-4 rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 animate-pulse"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/20 text-white shrink-0">
              <ShieldAlert className="w-7 h-7 text-white" />
            </div>
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
            id="resume-system-scrollable-btn"
            onClick={resetEmergencyStop}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-95 shrink-0"
          >
            <RotateCcw className="w-4 h-4 text-emerald-600" />
            <span>{t.resumeSystem}</span>
          </button>
        </div>
      )}

      {/* 
        1. FIRST SECTION: REAL-TIME TREATMENT COMPARISON
        Input & Output Water Readings Before & After Multi-stage Filtration
        (Clean, mobile-first, and simple to understand)
      */}
      <div id="real-time-treatment-comparison-section" className="space-y-4">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-600 shrink-0" />
              <span>{t.treatmentComparisonTitle}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {t.treatmentComparisonSubtitle}
            </p>
          </div>
        </div>

        {/* Output & Input Water Cards Stack — OUTPUT WATER READING positioned above INPUT WATER READING */}
        <div className="space-y-4">
          {/* OUTPUT WATER CARD — OUTPUT WATER READING */}
          <div
            id="output-water-card"
            className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-emerald-300 shadow-sm relative overflow-hidden ring-2 ring-emerald-100"
          >
            <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500 shrink-0"></span>
                <div>
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 leading-tight">
                    {t.outputWaterTitle}
                  </h3>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-800 px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 shrink-0 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {t.safeForConsumption}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
              {/* pH Level */}
              <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100/80 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-700">{t.phLabel}</span>
                  {getMetricStatusBadge(outputWater.ph.status)}
                </div>
                <div className="my-2.5 flex items-center justify-between gap-2">
                  <span className="text-2xl font-black text-emerald-700 font-mono">
                    {outputWater.ph.value.toFixed(1)}
                  </span>
                  {renderSparkline(outputWater.ph.trend, 'text-emerald-500')}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  {t.targetRange}: {outputWater.ph.normalRange}
                </span>
              </div>

              {/* TDS */}
              <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100/80 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-700">{t.tdsLabel}</span>
                  {getMetricStatusBadge(outputWater.tds.status)}
                </div>
                <div className="my-2.5 flex items-center justify-between gap-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-emerald-700 font-mono">
                      {outputWater.tds.value}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">ppm</span>
                  </div>
                  {renderSparkline(outputWater.tds.trend, 'text-emerald-500')}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  {t.targetRange}: {outputWater.tds.normalRange}
                </span>
              </div>

              {/* Turbidity */}
              <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100/80 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-700">{t.turbidityLabel}</span>
                  {getMetricStatusBadge(outputWater.turbidity.status)}
                </div>
                <div className="my-2.5 flex items-center justify-between gap-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-emerald-700 font-mono">
                      {outputWater.turbidity.value.toFixed(1)}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">NTU</span>
                  </div>
                  {renderSparkline(outputWater.turbidity.trend, 'text-emerald-500')}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  {t.targetRange}: {outputWater.turbidity.normalRange}
                </span>
              </div>

              {/* Temperature */}
              <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100/80 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-700">{t.temperatureLabel}</span>
                  {getMetricStatusBadge(outputWater.temperature.status)}
                </div>
                <div className="my-2.5 flex items-center justify-between gap-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900 font-mono">
                      {outputWater.temperature.value.toFixed(1)}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">°C</span>
                  </div>
                  {renderSparkline(outputWater.temperature.trend, 'text-slate-400')}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  {t.targetRange}: {outputWater.temperature.normalRange}
                </span>
              </div>
            </div>
          </div>

          {/* INPUT WATER CARD — INPUT WATER READING */}
          <div
            id="input-water-card"
            className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-amber-200 shadow-sm relative overflow-hidden"
          >
            <div className="flex items-center justify-between pb-3 border-b border-amber-100">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-amber-500 shrink-0"></span>
                <div>
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 leading-tight">
                    {t.inputWaterTitle}
                  </h3>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-amber-800 px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300 shrink-0">
                {t.requiresPurification}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
              {/* pH Level */}
              <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100/80 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-700">{t.phLabel}</span>
                  {getMetricStatusBadge(inputWater.ph.status)}
                </div>
                <div className="my-2.5 flex items-center justify-between gap-2">
                  <span className="text-2xl font-black text-slate-900 font-mono">
                    {inputWater.ph.value.toFixed(1)}
                  </span>
                  {renderSparkline(inputWater.ph.trend, 'text-amber-500')}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  {t.targetRange}: {inputWater.ph.normalRange}
                </span>
              </div>

              {/* TDS */}
              <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100/80 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-700">{t.tdsLabel}</span>
                  {getMetricStatusBadge(inputWater.tds.status)}
                </div>
                <div className="my-2.5 flex items-center justify-between gap-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900 font-mono">
                      {inputWater.tds.value}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">ppm</span>
                  </div>
                  {renderSparkline(inputWater.tds.trend, 'text-amber-500')}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  {t.targetRange}: {inputWater.tds.normalRange}
                </span>
              </div>

              {/* Turbidity */}
              <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100/80 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-700">{t.turbidityLabel}</span>
                  {getMetricStatusBadge(inputWater.turbidity.status)}
                </div>
                <div className="my-2.5 flex items-center justify-between gap-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900 font-mono">
                      {inputWater.turbidity.value.toFixed(1)}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">NTU</span>
                  </div>
                  {renderSparkline(inputWater.turbidity.trend, 'text-rose-500')}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  {t.targetRange}: {inputWater.turbidity.normalRange}
                </span>
              </div>

              {/* Temperature */}
              <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100/80 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-700">{t.temperatureLabel}</span>
                  {getMetricStatusBadge(inputWater.temperature.status)}
                </div>
                <div className="my-2.5 flex items-center justify-between gap-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900 font-mono">
                      {inputWater.temperature.value.toFixed(1)}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">°C</span>
                  </div>
                  {renderSparkline(inputWater.temperature.trend, 'text-slate-400')}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  {t.targetRange}: {inputWater.temperature.normalRange}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* PURIFICATION EFFICIENCY STRIP */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-900 to-sky-900 text-white shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-200">
              {t.purificationEfficiency}
            </h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
              <span className="text-[10px] text-cyan-200 font-medium">{t.turbidityRemoved}</span>
              <div className="flex items-center gap-1.5 mt-1">
                <TrendingDown className="w-5 h-5 text-emerald-400" />
                <span className="text-xl font-extrabold text-white">
                  ↓ {improvement.turbidityReductionPct}%
                </span>
              </div>
              <span className="text-[10px] text-slate-300">
                {inputWater.turbidity.value} → {outputWater.turbidity.value} NTU
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
              <span className="text-[10px] text-cyan-200 font-medium">{t.tdsReduced}</span>
              <div className="flex items-center gap-1.5 mt-1">
                <TrendingDown className="w-5 h-5 text-emerald-400" />
                <span className="text-xl font-extrabold text-white">
                  ↓ {improvement.tdsReductionPct}%
                </span>
              </div>
              <span className="text-[10px] text-slate-300">
                {inputWater.tds.value} → {outputWater.tds.value} ppm
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
              <span className="text-[10px] text-cyan-200 font-medium">{t.phStabilized}</span>
              <div className="flex items-center gap-1.5 mt-1">
                <CheckCircle2 className="w-5 h-5 text-cyan-300" />
                <span className="text-xl font-extrabold text-white">
                  {improvement.phStabilized ? '✓ Optimal' : 'Adjusting'}
                </span>
              </div>
              <span className="text-[10px] text-slate-300">
                {inputWater.ph.value} → {outputWater.ph.value} pH
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
              <span className="text-[10px] text-cyan-200 font-medium">{t.optimalTemp}</span>
              <div className="flex items-center gap-1.5 mt-1">
                <Minus className="w-5 h-5 text-sky-300" />
                <span className="text-xl font-extrabold text-white">
                  {improvement.tempDelta}°C
                </span>
              </div>
              <span className="text-[10px] text-slate-300">
                {outputWater.temperature.value.toFixed(1)}°C
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 
        2. ESP32 TELEMETRY (COMES DIRECTLY AFTER INPUT AND OUTPUT WATER READINGS)
        Explicitly requested: "esp32 telemetry come after the input and output water reading"
      */}
      <div id="esp32-telemetry-section" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Cpu className="w-5 h-5 text-sky-600" />
              <span>{t.esp32SectionTitle}</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {t.esp32SectionSubtitle}
            </p>
          </div>
          <button
            id="view-device-tab-btn"
            onClick={() => setActiveTab('device')}
            className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1"
          >
            <span>{t.navDevice}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ESP32 Telemetry Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* Flow Rate */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-bold flex items-center gap-1.5">
              <Waves className="w-4 h-4 text-cyan-600" />
              {t.flowRate}
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                {device.flowRateLpm}
              </span>
              <span className="text-xs font-bold text-slate-400">L/min</span>
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">
              • Steady laminar stream
            </div>
          </div>

          {/* Battery Level */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-bold flex items-center gap-1.5">
              <Battery className="w-4 h-4 text-emerald-600" />
              {t.batteryLevel}
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                {device.batteryPercentage}
              </span>
              <span className="text-xs font-bold text-slate-400">%</span>
            </div>
            <div className="text-[11px] text-slate-500 font-semibold mt-1">
              LiFePO4 Backup Cell
            </div>
          </div>

          {/* Uptime */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-bold flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-600" />
              {t.uptime}
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                {Math.floor(device.uptimeSeconds / 3600)}h {Math.floor((device.uptimeSeconds % 3600) / 60)}m
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-semibold mt-1">
              Continuous Operation
            </div>
          </div>

          {/* Total Treated Liters */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              {t.totalTreated}
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                {device.totalTreatedLiters}
              </span>
              <span className="text-xs font-bold text-slate-400">Liters</span>
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">
              100% Monitored
            </div>
          </div>
        </div>

        {/* Hardware Actuators Row */}
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{t.hardwareStatus}</span>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                device.connectionStatus === 'ONLINE'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {device.connectionStatus === 'ONLINE' ? (
                <Wifi className="w-3 h-3 text-emerald-600" />
              ) : (
                <WifiOff className="w-3 h-3 text-rose-600" />
              )}
              {device.connectionStatus === 'ONLINE' ? t.esp32Online : t.esp32Offline}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">{t.feedPump}</span>
              <span
                className={`text-xs font-black px-2 py-0.5 rounded ${
                  controls.pump
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {controls.pump ? t.active : t.idle}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">{t.uvPurifier}</span>
              <span
                className={`text-xs font-black px-2 py-0.5 rounded ${
                  controls.uv
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {controls.uv ? t.active : t.idle}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">{t.outputValve}</span>
              <span
                className={`text-xs font-black px-2 py-0.5 rounded ${
                  controls.outputValve
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {controls.outputValve ? t.open : t.closed}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">{t.bypassValve}</span>
              <span
                className={`text-xs font-black px-2 py-0.5 rounded ${
                  controls.rejectValve
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {controls.rejectValve ? t.open : t.closed}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FILTER CARTRIDGE LIFESPANS SECTION */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              {t.navFilterHealth}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Calculated from processed liters, hours of operation, and turbidity differential
            </p>
          </div>
          <button
            id="view-all-filters-btn"
            onClick={() => setActiveTab('filter_health')}
            className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filters.map((filter) => {
            const isLow = filter.lifespanPercentage < 25;
            return (
              <div
                key={filter.id}
                id={`filter-card-${filter.id}`}
                className={`p-3.5 rounded-xl border transition ${
                  isLow ? 'bg-amber-50/70 border-amber-300' : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-extrabold text-slate-800">{filter.name}</span>
                  <span
                    className={`text-xs font-mono font-bold ${
                      isLow ? 'text-amber-700' : 'text-slate-900'
                    }`}
                  >
                    {filter.lifespanPercentage}%
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isLow ? 'bg-amber-500' : 'bg-cyan-600'
                    }`}
                    style={{ width: `${filter.lifespanPercentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>~{filter.estimatedDaysRemaining} days left</span>
                  <span
                    className={`font-semibold ${
                      filter.status === 'GOOD' ? 'text-emerald-700' : 'text-amber-700'
                    }`}
                  >
                    {filter.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. SCIENTIFIC SAFETY DISCLAIMER */}
      <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 flex items-start gap-3 text-xs leading-relaxed">
        <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">{t.disclaimerTitle} </span>
          {t.disclaimerText}
        </div>
      </div>
    </div>
  );
};
