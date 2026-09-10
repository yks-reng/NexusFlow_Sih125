import React, { useState } from 'react';
import {
  Filter,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Waves,
  ShieldCheck,
  Zap,
  Layers,
  Check,
  Wrench,
  X,
  PackageCheck,
  AlertCircle,
} from 'lucide-react';
import { useWaterSystem } from '../context/WaterSystemContext';
import { FilterItem } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

export const FilterHealthView: React.FC = () => {
  const { filters, replaceFilter, language } = useWaterSystem();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [replacingId, setReplacingId] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [confirmFilter, setConfirmFilter] = useState<FilterItem | null>(null);
  const [confirmedPhysicalInstall, setConfirmedPhysicalInstall] = useState(true);

  const getLocalizedName = (filterId: string, fallback: string) => {
    switch (filterId) {
      case 'sediment':
        return t.filterSedimentName;
      case 'carbon':
        return t.filterCarbonName;
      case 'ro':
        return t.filterRoName;
      case 'uv':
        return t.filterUvName;
      default:
        return fallback;
    }
  };

  const getLocalizedType = (filterId: string, fallback: string) => {
    switch (filterId) {
      case 'sediment':
        return t.filterSedimentType;
      case 'carbon':
        return t.filterCarbonType;
      case 'ro':
        return t.filterRoType;
      case 'uv':
        return t.filterUvType;
      default:
        return fallback;
    }
  };

  const getLocalizedRec = (filterId: string, fallback: string) => {
    switch (filterId) {
      case 'sediment':
        return t.filterSedimentStatusText;
      case 'carbon':
        return t.filterCarbonStatusText;
      case 'ro':
        return t.filterRoStatusText;
      case 'uv':
        return t.filterUvStatusText;
      default:
        return fallback;
    }
  };

  const handleConfirmNewFilter = (filter: FilterItem) => {
    const locName = getLocalizedName(filter.id, filter.name);
    setReplacingId(filter.id);
    setConfirmFilter(null);
    setTimeout(() => {
      replaceFilter(filter.id);
      setReplacingId(null);
      setSuccessToast(`${locName}: ${t.toastInstalledSuccess}`);
      setTimeout(() => setSuccessToast(null), 4000);
    }, 500);
  };

  const getStatusBadge = (status: FilterItem['status']) => {
    switch (status) {
      case 'GOOD':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            {t.fhStatusGood}
          </span>
        );
      case 'ATTENTION':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-yellow-100 text-yellow-800 border border-yellow-200">
            {t.fhStatusAttention}
          </span>
        );
      case 'REPLACE SOON':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            {t.fhStatusReplaceSoon}
          </span>
        );
      case 'CRITICAL':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 border border-rose-300">
            <AlertTriangle className="w-3 h-3 text-rose-600" />
            {t.fhStatusExpired}
          </span>
        );
    }
  };

  const getFilterIcon = (id: string) => {
    switch (id) {
      case 'sediment':
        return <Layers className="w-5 h-5 text-amber-600" />;
      case 'carbon':
        return <Filter className="w-5 h-5 text-slate-700" />;
      case 'ro':
        return <Waves className="w-5 h-5 text-cyan-600" />;
      case 'uv':
        return <Zap className="w-5 h-5 text-indigo-600" />;
      default:
        return <Filter className="w-5 h-5 text-cyan-600" />;
    }
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Toast Notification */}
      {successToast && (
        <div className="p-3.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs flex items-center gap-2 shadow-lg animate-fade-in">
          <Check className="w-4 h-4" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            {t.fhTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {t.fhSubtitle}
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200 text-xs text-cyan-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0" />
          <span className="font-semibold">{t.all4StagesBadge}</span>
        </div>
      </div>

      {/* 4 Filters Detailed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filters.map((filter) => {
          const isLow = filter.lifespanPercentage < 25;
          const isMid = filter.lifespanPercentage >= 25 && filter.lifespanPercentage < 60;
          const locName = getLocalizedName(filter.id, filter.name);
          const locType = getLocalizedType(filter.id, filter.type);
          const locRec = getLocalizedRec(filter.id, filter.recommendation);

          return (
            <div
              key={filter.id}
              id={`filter-detail-card-${filter.id}`}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-cyan-300 transition"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-100">{getFilterIcon(filter.id)}</div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{locName}</h3>
                    <p className="text-xs text-slate-500">{locType}</p>
                  </div>
                </div>
                {getStatusBadge(filter.status)}
              </div>

              {/* Progress Bar & Lifespan */}
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-600">{t.remainingLifespan}</span>
                  <span
                    className={`text-xl font-black font-mono ${
                      isLow ? 'text-amber-700' : isMid ? 'text-cyan-700' : 'text-emerald-700'
                    }`}
                  >
                    {filter.lifespanPercentage}%
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isLow ? 'bg-amber-500' : isMid ? 'bg-cyan-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${filter.lifespanPercentage}%` }}
                  />
                </div>
              </div>

              {/* Detailed Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-400 block">{t.estDaysRemaining}</span>
                  <span className="text-sm font-bold text-slate-800 font-mono">
                    ~{filter.estimatedDaysRemaining} {t.daysLeftLabel}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-400 block">{t.operatingRuntime}</span>
                  <span className="text-sm font-bold text-slate-800 font-mono">
                    {filter.operatingHours} hrs
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-400 block">{t.volumeProcessed}</span>
                  <span className="text-sm font-bold text-slate-800 font-mono">
                    {filter.totalVolumeProcessedLiters} / {filter.ratedCapacityLiters} L
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-400 block">{t.flowMembraneStatus}</span>
                  <span className="text-xs font-bold text-slate-800 truncate block" title={filter.flowRestrictionStatus}>
                    {filter.flowRestrictionStatus}
                  </span>
                </div>
              </div>

              {/* Maintenance & Replacement Dates */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.installedDate} {filter.installationDate}</span>
                </div>
                <div>
                  <span>{t.lastReplacedDate} {filter.lastReplacement}</span>
                </div>
              </div>

              {/* Recommendation Note */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-snug">{locRec}</p>
              </div>

              {/* Replace with New Filter Action */}
              <div className="pt-1 space-y-1.5">
                <button
                  id={`replace-filter-btn-${filter.id}`}
                  disabled={replacingId === filter.id}
                  onClick={() => {
                    setConfirmedPhysicalInstall(true);
                    setConfirmFilter(filter);
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition border active:scale-98 ${
                    filter.status === 'REPLACE SOON' || filter.status === 'CRITICAL'
                      ? 'bg-amber-600 hover:bg-amber-700 text-white border-amber-700 shadow-sm'
                      : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900 shadow-sm'
                  }`}
                >
                  <Wrench className={`w-3.5 h-3.5 ${replacingId === filter.id ? 'animate-spin' : ''}`} />
                  <span>
                    {replacingId === filter.id ? t.installingNewFilter : t.replaceWithNewBtn}
                  </span>
                </button>
                <p className="text-[11px] text-center text-slate-400 font-medium">
                  {t.physicalReplacementNote}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal for Physical Filter Replacement */}
      {confirmFilter && (
        <div
          id="confirm-filter-modal-backdrop"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setConfirmFilter(null)}
        >
          <div
            id="confirm-filter-modal"
            className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-100 text-cyan-800">
                  <PackageCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {t.confirmModalTitle}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t.confirmModalSubtitle}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setConfirmFilter(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">{t.stageLabel}</span>
                <span className="font-extrabold text-slate-900">
                  {getLocalizedName(confirmFilter.id, confirmFilter.name)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">{t.cartridgeTypeLabel}</span>
                <span className="font-semibold text-slate-700">
                  {getLocalizedType(confirmFilter.id, confirmFilter.type)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">{t.currentHealthLabel}</span>
                <span className="font-mono font-bold text-slate-900">
                  {confirmFilter.lifespanPercentage}% {t.remainingLabel}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {t.modalPhysicalWarning}
              </p>
            </div>

            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition cursor-pointer select-none">
              <input
                type="checkbox"
                checked={confirmedPhysicalInstall}
                onChange={(e) => setConfirmedPhysicalInstall(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded text-cyan-600 focus:ring-cyan-500 border-slate-300"
              />
              <span className="text-xs text-slate-700 font-medium leading-snug">
                {t.confirmCheckboxText}
              </span>
            </label>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmFilter(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                {t.cancelBtn}
              </button>
              <button
                type="button"
                id="confirm-install-new-filter-btn"
                disabled={!confirmedPhysicalInstall}
                onClick={() => handleConfirmNewFilter(confirmFilter)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-700 hover:bg-cyan-800 disabled:opacity-50 text-white shadow-sm transition flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{t.confirmInstallBtn}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
