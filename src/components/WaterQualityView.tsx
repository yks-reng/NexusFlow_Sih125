import React, { useState } from 'react';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
  Area,
  AreaChart,
} from 'recharts';
import {
  Activity,
  Info,
} from 'lucide-react';
import { useWaterSystem } from '../context/WaterSystemContext';
import { TRANSLATIONS } from '../i18n/translations';

export const WaterQualityView: React.FC = () => {
  const {
    inputWater,
    outputWater,
    historicalReadings,
    historyRange,
    setHistoryRange,
    language,
  } = useWaterSystem();

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [waterSelection, setWaterSelection] = useState<'both' | 'input' | 'output'>('both');
  const [selectedMetric, setSelectedMetric] = useState<'turbidity' | 'tds' | 'ph' | 'temperature'>('turbidity');

  // Compute Current, Min, Max, Average for the selected metric
  const computeStats = (metric: 'turbidity' | 'tds' | 'ph' | 'temperature', type: 'input' | 'output') => {
    const key = `${type}_${metric}` as keyof (typeof historicalReadings)[0];
    const values = historicalReadings.map((r) => Number(r[key]) || 0);

    if (values.length === 0) return { current: 0, min: 0, max: 0, avg: 0 };

    const current = values[values.length - 1];
    const min = Math.min(...values);
    const max = Math.max(...values);
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = Number((sum / values.length).toFixed(1));

    return { current, min, max, avg };
  };

  const inputStats = computeStats(selectedMetric, 'input');
  const outputStats = computeStats(selectedMetric, 'output');

  const getMetricDetails = (metric: 'turbidity' | 'tds' | 'ph' | 'temperature') => {
    switch (metric) {
      case 'turbidity':
        return {
          title: t.turbidityMetric,
          unit: 'NTU',
          safeLimit: 1.0,
          maxLimit: 5.0,
          description: t.turbidityDesc,
          standardNote: t.turbidityStandardNote,
          inKey: 'input_turbidity',
          outKey: 'output_turbidity',
          inColor: '#f59e0b',
          outColor: '#059669',
        };
      case 'tds':
        return {
          title: t.tdsMetric,
          unit: 'ppm',
          safeLimit: 300,
          maxLimit: 500,
          description: t.tdsDesc,
          standardNote: t.tdsStandardNote,
          inKey: 'input_tds',
          outKey: 'output_tds',
          inColor: '#d97706',
          outColor: '#0284c7',
        };
      case 'ph':
        return {
          title: t.phMetric,
          unit: 'pH',
          safeLimit: 7.0,
          minLimit: 6.5,
          maxLimit: 8.5,
          description: t.phDesc,
          standardNote: t.phStandardNote,
          inKey: 'input_ph',
          outKey: 'output_ph',
          inColor: '#b45309',
          outColor: '#10b981',
        };
      case 'temperature':
        return {
          title: t.tempMetric,
          unit: '°C',
          safeLimit: 25.0,
          maxLimit: 35.0,
          description: t.tempDesc,
          standardNote: t.tempStandardNote,
          inKey: 'input_temperature',
          outKey: 'output_temperature',
          inColor: '#64748b',
          outColor: '#06b6d4',
        };
    }
  };

  const metricInfo = getMetricDetails(selectedMetric);

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            {t.wqTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {t.wqSubtitle}
          </p>
        </div>

        {/* Time Range Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200">
          {(['1h', '6h', '24h', '7d'] as const).map((range) => {
            let label = t.range1h;
            if (range === '6h') label = t.range6h;
            if (range === '24h') label = t.range24h;
            if (range === '7d') label = t.range7d;

            return (
              <button
                key={range}
                id={`range-btn-${range}`}
                onClick={() => setHistoryRange(range)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  historyRange === range
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Metric Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(
          [
            { id: 'turbidity', label: `${t.turbidityLabel} (NTU)`, inVal: inputWater.turbidity.value, outVal: outputWater.turbidity.value },
            { id: 'tds', label: `${t.tdsLabel} (ppm)`, inVal: inputWater.tds.value, outVal: outputWater.tds.value },
            { id: 'ph', label: `${t.phLabel} (pH)`, inVal: inputWater.ph.value, outVal: outputWater.ph.value },
            { id: 'temperature', label: `${t.temperatureLabel} (°C)`, inVal: inputWater.temperature.value, outVal: outputWater.temperature.value },
          ] as const
        ).map((m) => {
          const isSelected = selectedMetric === m.id;
          return (
            <button
              key={m.id}
              id={`select-metric-${m.id}`}
              onClick={() => setSelectedMetric(m.id)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-white border-cyan-500 shadow-sm ring-2 ring-cyan-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-500">{m.label}</span>
                {isSelected && <span className="h-2 w-2 rounded-full bg-cyan-600"></span>}
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <div>
                  <span className="text-[10px] text-slate-400">In: </span>
                  <span className="text-xs font-mono font-bold text-amber-700">{m.inVal}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400">Out: </span>
                  <span className="text-sm font-mono font-black text-emerald-700">{m.outVal}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Chart Card */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        {/* Chart Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-600" />
              <span>{metricInfo.title} — {t.trendGraphTitle}</span>
            </h3>
            <p className="text-xs text-slate-500">{metricInfo.description}</p>
          </div>

          {/* Water Selection Switch (Input vs Output vs Both) */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-medium">
            <button
              id="view-both-water-btn"
              onClick={() => setWaterSelection('both')}
              className={`px-2.5 py-1 rounded-md transition ${
                waterSelection === 'both' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600'
              }`}
            >
              {t.compareBoth}
            </button>
            <button
              id="view-input-water-btn"
              onClick={() => setWaterSelection('input')}
              className={`px-2.5 py-1 rounded-md transition ${
                waterSelection === 'input' ? 'bg-amber-100 text-amber-900 font-bold shadow-xs' : 'text-slate-600'
              }`}
            >
              {t.inputOnly}
            </button>
            <button
              id="view-output-water-btn"
              onClick={() => setWaterSelection('output')}
              className={`px-2.5 py-1 rounded-md transition ${
                waterSelection === 'output' ? 'bg-emerald-100 text-emerald-900 font-bold shadow-xs' : 'text-slate-600'
              }`}
            >
              {t.outputOnly}
            </button>
          </div>
        </div>

        {/* Recharts Area / Line Chart Container */}
        <div className="w-full h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historicalReadings} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="inGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={metricInfo.inColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={metricInfo.inColor} stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="outGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={metricInfo.outColor} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={metricInfo.outColor} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="timeLabel" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                  border: 'none',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />

              {/* Reference safety line */}
              {metricInfo.maxLimit && (
                <ReferenceLine
                  y={metricInfo.maxLimit}
                  label={{ value: `${t.maxSafeThreshold}: ${metricInfo.maxLimit} ${metricInfo.unit}`, fill: '#dc2626', fontSize: 10 }}
                  stroke="#ef4444"
                  strokeDasharray="4 4"
                />
              )}

              {(waterSelection === 'both' || waterSelection === 'input') && (
                <Area
                  type="monotone"
                  dataKey={metricInfo.inKey}
                  name={`${t.chartInputSeries} (${metricInfo.unit})`}
                  stroke={metricInfo.inColor}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#inGrad)"
                />
              )}

              {(waterSelection === 'both' || waterSelection === 'output') && (
                <Area
                  type="monotone"
                  dataKey={metricInfo.outKey}
                  name={`${t.chartOutputSeries} (${metricInfo.unit})`}
                  stroke={metricInfo.outColor}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#outGrad)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Statistical Summary Row (Current, Min, Max, Avg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          {/* Input stats */}
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-900 uppercase">{t.inputStatsTitle}</span>
              <span className="text-[10px] text-amber-700 font-mono">{t.lastUpdatedJustNow}</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-lg bg-white border border-amber-100">
                <span className="text-[10px] text-slate-400 block">{t.statCurrent}</span>
                <span className="text-sm font-bold text-amber-900 font-mono">
                  {inputStats.current} {metricInfo.unit}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-amber-100">
                <span className="text-[10px] text-slate-400 block">{t.statMin}</span>
                <span className="text-sm font-bold text-slate-800 font-mono">
                  {inputStats.min} {metricInfo.unit}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-amber-100">
                <span className="text-[10px] text-slate-400 block">{t.statMax}</span>
                <span className="text-sm font-bold text-rose-700 font-mono">
                  {inputStats.max} {metricInfo.unit}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-amber-100">
                <span className="text-[10px] text-slate-400 block">{t.statAvg}</span>
                <span className="text-sm font-bold text-slate-800 font-mono">
                  {inputStats.avg} {metricInfo.unit}
                </span>
              </div>
            </div>
          </div>

          {/* Output stats */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-900 uppercase">{t.outputStatsTitle}</span>
              <span className="text-[10px] text-emerald-700 font-mono">{t.lastUpdatedJustNow}</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-lg bg-white border border-emerald-100">
                <span className="text-[10px] text-slate-400 block">{t.statCurrent}</span>
                <span className="text-sm font-bold text-emerald-900 font-mono">
                  {outputStats.current} {metricInfo.unit}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-emerald-100">
                <span className="text-[10px] text-slate-400 block">{t.statMin}</span>
                <span className="text-sm font-bold text-slate-800 font-mono">
                  {outputStats.min} {metricInfo.unit}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-emerald-100">
                <span className="text-[10px] text-slate-400 block">{t.statMax}</span>
                <span className="text-sm font-bold text-emerald-800 font-mono">
                  {outputStats.max} {metricInfo.unit}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-emerald-100">
                <span className="text-[10px] text-slate-400 block">{t.statAvg}</span>
                <span className="text-sm font-bold text-slate-800 font-mono">
                  {outputStats.avg} {metricInfo.unit}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory reference disclaimer */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-800">{t.regulatoryRefTitle}: </span>
            {metricInfo.standardNote}
          </div>
        </div>
      </div>
    </div>
  );
};
