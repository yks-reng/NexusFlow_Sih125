import React, { useState } from 'react';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Calendar,
  Zap,
  Check,
  Cpu,
  ShieldCheck,
  AlertOctagon,
  Sparkles,
} from 'lucide-react';
import { useWaterSystem } from '../context/WaterSystemContext';
import { SensorHealthItem } from '../types';

export const SensorHealthView: React.FC = () => {
  const { sensors, calibrateSensor } = useWaterSystem();
  const [calibratingId, setCalibratingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCalibrate = (id: string, name: string) => {
    setCalibratingId(id);
    setTimeout(() => {
      calibrateSensor(id);
      setCalibratingId(null);
      setToastMessage(`Calibration routine completed for ${name}! ADC offset zeroed.`);
      setTimeout(() => setToastMessage(null), 4000);
    }, 700);
  };

  const getStatusBadge = (status: SensorHealthItem['status']) => {
    switch (status) {
      case 'ONLINE':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            ONLINE
          </span>
        );
      case 'OFFLINE':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-300">
            OFFLINE
          </span>
        );
      case 'CALIBRATION REQUIRED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            CALIBRATION REQ
          </span>
        );
      case 'SENSOR ERROR':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
            <AlertOctagon className="w-3 h-3 text-rose-600" />
            SENSOR ERROR
          </span>
        );
      case 'MAINTENANCE REQUIRED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-yellow-100 text-yellow-800 border border-yellow-300">
            MAINTENANCE
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs flex items-center gap-2 shadow-lg">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            Sensor Health & Calibration Diagnostics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Telemetry integrity, ADC calibration offsets, electrode impedance, and signal health
          </p>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
          <Cpu className="w-4 h-4 text-cyan-600" />
          <span>ESP32 ADC Resolution: 12-bit (4096 levels)</span>
        </div>
      </div>

      {/* Sensor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sensors.map((sensor) => {
          const isError = sensor.status === 'SENSOR ERROR' || sensor.healthPercentage < 50;

          return (
            <div
              key={sensor.id}
              id={`sensor-card-${sensor.id}`}
              className={`p-5 rounded-2xl bg-white border shadow-sm space-y-4 transition ${
                isError ? 'border-rose-300 ring-1 ring-rose-200 bg-rose-50/20' : 'border-slate-200'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{sensor.name}</h3>
                  <p className="text-xs text-slate-500">{sensor.metric}</p>
                </div>
                {getStatusBadge(sensor.status)}
              </div>

              {/* Current Reading & Health Score */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-400 block">Live Sensor Value</span>
                  <span className="text-base font-black text-slate-900 font-mono">
                    {sensor.currentReading}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-400 block">Sensor Health Rating</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className={`text-base font-black font-mono ${
                        isError ? 'text-rose-700' : 'text-emerald-700'
                      }`}
                    >
                      {sensor.healthPercentage}%
                    </span>
                    <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isError ? 'bg-rose-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${sensor.healthPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Calibration Specs */}
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Calibration State:</span>
                  <span className="font-semibold text-slate-800">{sensor.calibrationStatus}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Last Calibrated Date:</span>
                  <span className="font-mono text-slate-700">{sensor.lastCalibrationDate}</span>
                </div>
                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-[11px] text-slate-400 block">Diagnostic Telemetry Notes:</span>
                  <p className="text-slate-600 text-xs mt-0.5 font-mono">{sensor.diagnosticNote}</p>
                </div>
              </div>

              {/* Error Box if Error Detected */}
              {sensor.errorDetected && (
                <div className="p-3 rounded-xl bg-rose-100/70 border border-rose-300 text-xs text-rose-900 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Hardware Fault Detected:</span> Sensor reading out of analog
                    voltage range. Clean probe face or inspect ribbon connector.
                  </div>
                </div>
              )}

              {/* Action: Calibrate Sensor */}
              <button
                id={`calibrate-sensor-btn-${sensor.id}`}
                disabled={calibratingId === sensor.id}
                onClick={() => handleCalibrate(sensor.id, sensor.name)}
                className="w-full py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs active:scale-98"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${calibratingId === sensor.id ? 'animate-spin' : ''}`} />
                <span>Simulate Sensor Re-Calibration (Standard Reference)</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
