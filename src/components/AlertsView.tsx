import React from 'react';
import {
  AlertTriangle,
  AlertOctagon,
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
  Clock,
  Zap,
} from 'lucide-react';
import { useWaterSystem } from '../context/WaterSystemContext';
import { AlertSeverity } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

export const AlertsView: React.FC = () => {
  const { alerts, language } = useWaterSystem();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Filter strictly for active warnings only - no unnecessary resolved clutter
  const activeWarnings = alerts.filter(
    (alert) => !alert.resolved && alert.severity !== 'NORMAL'
  );

  const getSeverityBadge = (severity: AlertSeverity) => {
    switch (severity) {
      case 'CRITICAL':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
            🔴 CRITICAL
          </span>
        );
      case 'WARNING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            🟠 WARNING
          </span>
        );
      case 'ATTENTION':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-300">
            🟡 ATTENTION
          </span>
        );
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 lg:pb-8">
      {/* Page Header & Buzzer Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              {t.alertsTitle}
            </h2>
            {activeWarnings.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white font-extrabold text-xs">
                {activeWarnings.length}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t.alertsSubtitle}
          </p>
        </div>
      </div>

      {/* Shortened Water Safety Protocol Banner */}
      <div className="p-3 sm:p-3.5 rounded-2xl bg-amber-500/10 border border-amber-300 text-amber-950 flex items-center gap-3 text-xs leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
        <div>
          <span className="font-bold">{t.protocolTitle}</span>{' '}
          <span>{t.protocolText}</span>
        </div>
      </div>

      {/* Active Warnings Only - Clean & Direct */}
      <div className="space-y-3">
        {activeWarnings.length === 0 ? (
          <div className="p-8 sm:p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {t.noActiveWarningsTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                {t.noActiveWarningsDesc}
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-emerald-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>IoT Auto-Monitoring Active</span>
            </div>
          </div>
        ) : (
          activeWarnings.map((alert) => {
            const isCritical = alert.severity === 'CRITICAL';
            const isWarning = alert.severity === 'WARNING';

            return (
              <div
                key={alert.id}
                id={`alert-row-${alert.id}`}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  isCritical
                    ? 'bg-rose-50/70 border-rose-300 ring-1 ring-rose-200'
                    : isWarning
                    ? 'bg-amber-50/70 border-amber-300'
                    : 'bg-yellow-50/70 border-yellow-300'
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className={`p-2.5 rounded-2xl shrink-0 shadow-xs ${
                      isCritical
                        ? 'bg-rose-600 text-white'
                        : isWarning
                        ? 'bg-amber-500 text-white'
                        : 'bg-yellow-500 text-white'
                    }`}
                  >
                    {isCritical ? (
                      <AlertOctagon className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : isWarning ? (
                      <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-slate-600 uppercase">
                        {alert.type}
                      </span>
                      {getSeverityBadge(alert.severity)}
                      {alert.sensorValue && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 font-extrabold shadow-2xs">
                          {alert.sensorValue}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                      {alert.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                      {alert.message}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-3 pt-2 border-t border-slate-200/60">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <Zap className="w-3 h-3 text-emerald-600" />
                        {t.autoResolvingBadge}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium ml-auto">
                        <Clock className="w-3 h-3" />
                        {alert.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
