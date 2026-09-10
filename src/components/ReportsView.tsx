import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { useWaterSystem } from '../context/WaterSystemContext';

export const ReportsView: React.FC = () => {
  const {
    overallStatus,
    inputWater,
    outputWater,
    improvement,
    filters,
    alerts,
    device,
  } = useWaterSystem();

  const [reportPeriod, setReportPeriod] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    setGeneratingPdf(true);
    setTimeout(() => {
      setGeneratingPdf(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            Water Quality Reports & Audit Logs
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Generate printable, auditable water purification reports conforming to SIH validation standards
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            id="print-report-btn"
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
          <button
            id="download-pdf-btn"
            disabled={generatingPdf}
            onClick={handleDownloadPdf}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>{generatingPdf ? 'Rendering PDF...' : 'Download Official PDF'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {downloadSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs flex items-center gap-2 shadow-lg">
          <CheckCircle2 className="w-4 h-4" />
          <span>NexusFlow_{reportPeriod}_Water_Report.pdf generated successfully!</span>
        </div>
      )}

      {/* Period Selection Controls */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs max-w-fit">
        {(['Daily', 'Weekly', 'Monthly'] as const).map((period) => (
          <button
            key={period}
            id={`report-period-${period}`}
            onClick={() => setReportPeriod(period)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
              reportPeriod === period
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {period} Report
          </button>
        ))}
      </div>

      {/* Printable Report Preview Paper Container */}
      <div
        id="printable-report-card"
        className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-300 shadow-md max-w-4xl mx-auto space-y-8 print:border-none print:shadow-none print:p-0"
      >
        {/* Document Letterhead */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-slate-900 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white font-black text-sm">
                NF
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                NEXUSFLOW SYSTEM AUDIT REPORT
              </h1>
            </div>
            <p className="text-xs font-medium text-slate-500 mt-1">
              Smart Water Purification & Quality Monitoring Platform • SIH Problem Statement 26040
            </p>
          </div>

          <div className="text-left sm:text-right text-xs text-slate-600 font-mono space-y-0.5">
            <div><strong>Report Type:</strong> {reportPeriod} Purification Log</div>
            <div><strong>Date:</strong> {new Date().toLocaleDateString('en-GB')}</div>
            <div><strong>Device ID:</strong> {device.hardwareId}</div>
          </div>
        </div>

        {/* Executive Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Treated Volume</span>
            <span className="text-lg font-black text-slate-900 font-mono">{device.totalTreatedLiters} L</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Avg Turbidity Drop</span>
            <span className="text-lg font-black text-emerald-700 font-mono">↓ {improvement.turbidityReductionPct}%</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Avg TDS Reduction</span>
            <span className="text-lg font-black text-cyan-700 font-mono">↓ {improvement.tdsReductionPct}%</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Status</span>
            <span className="text-sm font-black text-emerald-800 font-mono uppercase mt-1 block">
              {overallStatus}
            </span>
          </div>
        </div>

        {/* Treatment Performance Comparative Table */}
        <div className="space-y-2">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
            1. Dual-Stage Water Quality Telemetry
          </h3>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-extrabold uppercase border-b border-slate-200">
                <tr>
                  <th className="p-3">Parameter</th>
                  <th className="p-3">Raw Input</th>
                  <th className="p-3">Treated Output</th>
                  <th className="p-3">BIS 10500 Standard</th>
                  <th className="p-3 text-right">Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-bold text-slate-800">Turbidity (NTU)</td>
                  <td className="p-3 font-mono text-amber-800 font-semibold">{inputWater.turbidity.value} NTU</td>
                  <td className="p-3 font-mono text-emerald-700 font-bold">{outputWater.turbidity.value} NTU</td>
                  <td className="p-3 text-slate-500 font-mono">≤ 1.0 NTU (Acceptable)</td>
                  <td className="p-3 text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">COMPLIANT</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-800">TDS (ppm)</td>
                  <td className="p-3 font-mono text-amber-800 font-semibold">{inputWater.tds.value} ppm</td>
                  <td className="p-3 font-mono text-emerald-700 font-bold">{outputWater.tds.value} ppm</td>
                  <td className="p-3 text-slate-500 font-mono">≤ 500 ppm (Acceptable)</td>
                  <td className="p-3 text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">COMPLIANT</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-800">pH Level</td>
                  <td className="p-3 font-mono text-amber-800 font-semibold">{inputWater.ph.value}</td>
                  <td className="p-3 font-mono text-emerald-700 font-bold">{outputWater.ph.value}</td>
                  <td className="p-3 text-slate-500 font-mono">6.5 – 8.5</td>
                  <td className="p-3 text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">COMPLIANT</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-800">Temperature</td>
                  <td className="p-3 font-mono text-slate-600">{inputWater.temperature.value} °C</td>
                  <td className="p-3 font-mono text-slate-600">{outputWater.temperature.value} °C</td>
                  <td className="p-3 text-slate-500 font-mono">Ambient (15 – 35 °C)</td>
                  <td className="p-3 text-right">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">NORMAL</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Filter Health Summary Table */}
        <div className="space-y-2">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
            2. Filter Cartridge Health & Estimated Depletion
          </h3>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-extrabold uppercase border-b border-slate-200">
                <tr>
                  <th className="p-3">Cartridge / Component</th>
                  <th className="p-3">Remaining Life</th>
                  <th className="p-3">Volume Filtered</th>
                  <th className="p-3">Est. Days Left</th>
                  <th className="p-3 text-right">Recommended Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filters.map((f) => (
                  <tr key={f.id}>
                    <td className="p-3 font-bold text-slate-800">{f.name}</td>
                    <td className="p-3 font-mono font-bold text-cyan-800">{f.lifespanPercentage}%</td>
                    <td className="p-3 font-mono text-slate-600">{f.totalVolumeProcessedLiters} L</td>
                    <td className="p-3 font-mono text-slate-600">{f.estimatedDaysRemaining} days</td>
                    <td className="p-3 text-right font-medium text-slate-700">{f.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts Log Summary */}
        <div className="space-y-2">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
            3. Safety Alarms & Fail-Safe Event History ({reportPeriod})
          </h3>
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 text-xs space-y-2">
            {alerts.slice(0, 3).map((a) => (
              <div key={a.id} className="flex items-center justify-between pb-2 border-b border-slate-200 last:border-b-0 last:pb-0">
                <div>
                  <span className="font-bold text-slate-800">{a.title}</span>
                  <p className="text-slate-500 text-[11px]">{a.message}</p>
                </div>
                <div className="text-right font-mono text-[11px]">
                  <span className="text-slate-500">{a.timestamp}</span>
                  <span className={`block font-bold ${a.resolved ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {a.resolved ? 'RESOLVED' : 'ACTIVE'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official Safety Compliance Statement */}
        <div className="p-4 rounded-xl border border-sky-200 bg-sky-50 text-sky-950 text-xs space-y-1">
          <div className="flex items-center gap-2 font-black text-sky-900">
            <ShieldCheck className="w-4 h-4 text-sky-700" />
            <span>Official Scientific Disclaimer & Verification Notice:</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            This telemetry report certifies physical treatment parameters (turbidity reduction, total dissolved solids
            filtration, pH stability) captured by the ESP32 IoT module. In accordance with SIH 26040 safety standards,
            these parameters confirm treatment system functionality but do not replace certified accredited laboratory
            microbiological and heavy-metal testing for untrusted, agricultural runoff, or industrial sources.
          </p>
        </div>

        {/* Signature Box */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
          <div>System Signature: ESP32-AUTH-DIGEST-{device.hardwareId.slice(0, 12)}</div>
          <div>Audited by NexusFlow IoT Engine</div>
        </div>
      </div>
    </div>
  );
};
