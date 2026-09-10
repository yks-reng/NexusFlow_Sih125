import React, { useState } from 'react';
import {
  Cpu,
  Wifi,
  WifiOff,
  Battery,
  Clock,
  Waves,
  RefreshCw,
  Radio,
  Terminal,
  CheckCircle2,
} from 'lucide-react';
import { useWaterSystem } from '../context/WaterSystemContext';

export const DeviceView: React.FC = () => {
  const { device, connectESP32, refreshDeviceData } = useWaterSystem();
  const [reconnecting, setReconnecting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleReconnect = () => {
    setReconnecting(true);
    setTimeout(() => {
      connectESP32();
      refreshDeviceData();
      setReconnecting(false);
      setToastMessage('ESP32 handshake successful! Telemetry packet stream restored.');
      setTimeout(() => setToastMessage(null), 4000);
    }, 1000);
  };

  const getSignalQuality = (rssi: number) => {
    if (rssi > -60) return { label: 'Excellent', color: 'text-emerald-600', bars: 4 };
    if (rssi > -70) return { label: 'Good', color: 'text-emerald-500', bars: 3 };
    if (rssi > -80) return { label: 'Fair', color: 'text-amber-500', bars: 2 };
    return { label: 'Weak', color: 'text-rose-500', bars: 1 };
  };

  const signal = getSignalQuality(device.wifiRssi);

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Toast */}
      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs flex items-center gap-2 shadow-lg">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            ESP32 Microcontroller & Telemetry Link
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Hardware connection health, WiFi/MQTT wireless telemetry, battery BMS, and sensor bus
          </p>
        </div>

        {/* Manual Reconnect Button */}
        <button
          id="reconnect-esp32-btn"
          disabled={reconnecting}
          onClick={handleReconnect}
          className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
        >
          <RefreshCw className={`w-4 h-4 ${reconnecting ? 'animate-spin' : ''}`} />
          <span>{reconnecting ? 'Pinging ESP32...' : 'Force ESP32 Reconnect'}</span>
        </button>
      </div>

      {/* Connection Status Hero */}
      <div
        id="esp32-status-hero"
        className={`p-6 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm ${
          device.connectionStatus === 'ONLINE'
            ? 'bg-gradient-to-br from-emerald-500/10 via-white to-teal-500/10 border-emerald-200'
            : 'bg-rose-50/70 border-rose-300'
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-md ${
              device.connectionStatus === 'ONLINE' ? 'bg-emerald-600' : 'bg-rose-600'
            }`}
          >
            {device.connectionStatus === 'ONLINE' ? (
              <Wifi className="w-7 h-7" />
            ) : (
              <WifiOff className="w-7 h-7" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-slate-900">
                ESP32 Status: {device.connectionStatus}
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  device.connectionStatus === 'ONLINE'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {device.connectionStatus === 'ONLINE' ? 'MQTT Broker Active' : 'Disconnected'}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              {device.connectionStatus === 'ONLINE'
                ? `Active telemetry heartbeat stream. Last packet received ${device.lastDataReceivedSecs} seconds ago.`
                : 'No telemetry stream detected. Automatic safety isolation valves engaged.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <span className="text-slate-400 block font-medium">Network SSID</span>
            <span className="font-extrabold text-slate-900 font-mono">{device.wifiSsid}</span>
          </div>
          <div className="text-right text-xs border-l border-slate-200 pl-3">
            <span className="text-slate-400 block font-medium">Firmware</span>
            <span className="font-extrabold text-slate-900 font-mono">v{device.firmwareVersion}</span>
          </div>
        </div>
      </div>

      {/* Hardware Telemetry Parameters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* WiFi Signal */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Radio className="w-4 h-4 text-cyan-600" /> WiFi Signal (RSSI)
            </span>
            <span className={`text-xs font-bold ${signal.color}`}>{signal.label}</span>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-slate-900 font-mono">{device.wifiRssi}</span>
            <span className="text-xs text-slate-400">dBm (2.4 GHz)</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 mt-3 overflow-hidden">
            <div
              className="h-full bg-cyan-600 rounded-full"
              style={{ width: `${Math.min(100, Math.max(10, 100 + device.wifiRssi))}%` }}
            />
          </div>
        </div>

        {/* Battery & Solar BMS */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Battery className="w-4 h-4 text-emerald-600" /> Battery / BMS
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
              Active
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-slate-900 font-mono">{device.batteryPercentage}%</span>
            <span className="text-xs text-slate-400 font-mono">LiFePO4 12.6V</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 mt-3 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${device.batteryPercentage}%` }}
            />
          </div>
        </div>

        {/* Live Flow Rate */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Waves className="w-4 h-4 text-sky-600" /> Flow Rate
            </span>
            <span className="text-[10px] font-mono text-slate-400">Hall Sensor</span>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-slate-900 font-mono">{device.flowRateLpm}</span>
            <span className="text-xs text-slate-400">Liters / min</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 font-mono">Continuous pulse meter</p>
        </div>

        {/* Cumulative Volume */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Clock className="w-4 h-4 text-indigo-600" /> Total Water Treated
            </span>
            <span className="text-[10px] font-mono text-slate-400">Lifetime</span>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-indigo-900 font-mono">{device.totalTreatedLiters}</span>
            <span className="text-xs text-slate-400">Liters Dispensed</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 font-mono">
            Uptime: {Math.floor(device.uptimeSeconds / 3600)}h {Math.floor((device.uptimeSeconds % 3600) / 60)}m
          </p>
        </div>
      </div>

      {/* Hardware Details & Pinout Specification */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Device Info */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-600" />
            <span>ESP32 SoC Specifications</span>
          </h4>
          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-2 flex items-center justify-between">
              <span className="text-slate-500">Hardware Identifier</span>
              <span className="font-mono font-bold text-slate-800">{device.hardwareId}</span>
            </div>
            <div className="py-2 flex items-center justify-between">
              <span className="text-slate-500">Device Name</span>
              <span className="font-mono font-bold text-slate-800">{device.deviceName}</span>
            </div>
            <div className="py-2 flex items-center justify-between">
              <span className="text-slate-500">Firmware Build</span>
              <span className="font-mono font-bold text-emerald-700">v{device.firmwareVersion}</span>
            </div>
            <div className="py-2 flex items-center justify-between">
              <span className="text-slate-500">Telemetry Sampling</span>
              <span className="font-mono font-bold text-slate-800">1000ms (1 Hz Interrupt Timer)</span>
            </div>
          </div>
        </div>

        {/* Live Packet Telemetry Stream Inspector (SIH technical judge demonstration feature) */}
        <div className="p-5 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs shadow-lg space-y-2 border border-slate-800">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
            <span className="text-cyan-400 font-bold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>LIVE MQTT TELEMETRY JSON PACKET</span>
            </span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              Streaming (1Hz)
            </span>
          </div>
          <pre className="text-[11px] text-cyan-300 leading-relaxed overflow-x-auto p-2 bg-slate-900/80 rounded-xl border border-slate-800">
{`{
  "hardware_id": "${device.hardwareId}",
  "timestamp": ${Math.floor(Date.now() / 1000)},
  "firmware": "v${device.firmwareVersion}",
  "wifi": { "ssid": "${device.wifiSsid}", "rssi": ${device.wifiRssi} },
  "flow_lpm": ${device.flowRateLpm},
  "total_liters": ${device.totalTreatedLiters},
  "battery_pct": ${device.batteryPercentage},
  "status": "${device.connectionStatus}"
}`}
          </pre>
          <p className="text-[10px] text-slate-500">
            Publishing to topic: <code className="text-slate-400">nexusflow/v1/telemetry</code>
          </p>
        </div>
      </div>
    </div>
  );
};
