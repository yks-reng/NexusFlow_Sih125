import React from 'react';
import {
  LayoutDashboard,
  Droplet,
  Filter,
  Activity,
  AlertTriangle,
  Sliders,
  Bot,
  FileText,
  Cpu,
} from 'lucide-react';
import { useWaterSystem } from '../context/WaterSystemContext';
import { TRANSLATIONS } from '../i18n/translations';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, unreadAlertsCount, language } = useWaterSystem();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const primaryNavItems: NavItem[] = [
    { id: 'dashboard', label: t.navDashboard, icon: LayoutDashboard },
    { id: 'water_quality', label: t.navWaterQuality, icon: Droplet },
    { id: 'filter_health', label: t.navFilterHealth, icon: Filter },
    { id: 'alerts', label: t.navAlerts, icon: AlertTriangle, badge: unreadAlertsCount },
    { id: 'aqua_ai', label: t.navAquaAi, icon: Bot },
    { id: 'system_control', label: t.navControls, icon: Sliders },
  ];

  const fullNavItems: NavItem[] = [
    { id: 'dashboard', label: t.navDashboard, icon: LayoutDashboard },
    { id: 'water_quality', label: t.navWaterQuality, icon: Droplet },
    { id: 'filter_health', label: t.navFilterHealth, icon: Filter },
    { id: 'sensor_health', label: t.navSensorHealth, icon: Activity },
    { id: 'alerts', label: t.navAlerts, icon: AlertTriangle, badge: unreadAlertsCount },
    { id: 'system_control', label: t.navControls, icon: Sliders },
    { id: 'aqua_ai', label: t.navAquaAi, icon: Bot },
    { id: 'reports', label: t.navReports, icon: FileText },
    { id: 'device', label: t.navDevice, icon: Cpu },
  ];

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0 p-4 min-h-[calc(100vh-60px)] justify-between">
        <div className="space-y-1">
          <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {t.appTitle}
          </div>
          {fullNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-600/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      isActive ? 'bg-white text-rose-600' : 'bg-rose-500 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (Fixed bottom) */}
      <nav
        id="mobile-bottom-nav"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg"
      >
        <div className="grid grid-cols-6 gap-1 max-w-lg mx-auto">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center justify-center py-1 rounded-lg text-[10px] font-medium transition ${
                  isActive ? 'text-cyan-700 font-bold' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <div className={`p-1 rounded-md ${isActive ? 'bg-cyan-50' : ''}`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-600' : 'text-slate-400'}`} />
                </div>
                <span className="truncate w-full text-center tracking-tight">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute top-0.5 right-1.5 h-4 min-w-4 px-1 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
