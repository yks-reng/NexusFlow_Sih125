/**
 * Core type definitions for NexusFlow
 * Smart Water Purification & Quality Monitoring System (SIH Problem Statement 26040)
 */

export type WaterOverallStatus = 'SAFE' | 'WARNING' | 'UNSAFE' | 'SYSTEM OFFLINE';

export type MetricStatus = 'NORMAL' | 'ATTENTION' | 'WARNING' | 'CRITICAL';

export type SensorOperationalStatus =
  | 'ONLINE'
  | 'OFFLINE'
  | 'CALIBRATION REQUIRED'
  | 'SENSOR ERROR'
  | 'MAINTENANCE REQUIRED';

export type FilterStatusLevel = 'GOOD' | 'ATTENTION' | 'REPLACE SOON' | 'CRITICAL';

export type AlertSeverity = 'CRITICAL' | 'WARNING' | 'ATTENTION' | 'NORMAL';

export interface ParameterMetric {
  id: 'ph' | 'tds' | 'turbidity' | 'temperature';
  name: string;
  value: number;
  unit: string;
  status: MetricStatus;
  normalRange: string;
  minSafe: number;
  maxSafe: number;
  trend: number[];
  lastUpdated: string;
}

export interface WaterStageData {
  ph: ParameterMetric;
  tds: ParameterMetric;
  turbidity: ParameterMetric;
  temperature: ParameterMetric;
}

export interface WaterImprovement {
  turbidityReductionPct: number;
  tdsReductionPct: number;
  phStabilized: boolean;
  phDelta: number;
  tempDelta: number;
}

export interface FilterItem {
  id: 'sediment' | 'carbon' | 'ro' | 'uv';
  name: string;
  type: string;
  lifespanPercentage: number;
  estimatedDaysRemaining: number;
  operatingHours: number;
  totalVolumeProcessedLiters: number;
  ratedCapacityLiters: number;
  flowRestrictionStatus: string;
  installationDate: string;
  lastReplacement: string;
  recommendation: string;
  status: FilterStatusLevel;
}

export interface SensorHealthItem {
  id: 'ph_sensor' | 'tds_sensor' | 'turbidity_sensor' | 'temp_sensor';
  name: string;
  metric: string;
  currentReading: string;
  status: SensorOperationalStatus;
  calibrationStatus: string;
  lastCalibrationDate: string;
  healthPercentage: number;
  diagnosticNote: string;
  errorDetected: boolean;
}

export interface SystemAlert {
  id: string;
  type: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  timestamp: string;
  sensorValue?: string;
  resolved: boolean;
  acknowledged: boolean;
  channels: ('in-app' | 'dashboard' | 'push' | 'buzzer')[];
}

export interface ValveSystemControl {
  pump: boolean;
  uv: boolean;
  inletValve: boolean;
  outputValve: boolean;
  rejectValve: boolean;
  mode: 'AUTO' | 'MANUAL';
  emergencyStopped: boolean;
}

export interface DeviceTelemetry {
  deviceName: string;
  hardwareId: string;
  connectionStatus: 'ONLINE' | 'OFFLINE';
  lastDataReceivedSecs: number;
  wifiSsid: string;
  wifiRssi: number;
  batteryPercentage: number;
  uptimeSeconds: number;
  flowRateLpm: number;
  totalTreatedLiters: number;
  firmwareVersion: string;
}

export type DemoScenario =
  | 'normal'
  | 'high_turbidity'
  | 'high_tds'
  | 'abnormal_ph'
  | 'filter_life_low'
  | 'sensor_failure'
  | 'system_offline';

export type SupportedLanguage = 'en' | 'hi' | 'te';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  detectedLang?: string;
  speechLangCode?: string;
  inputLang?: string;
}

export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export type TimeRangeOption = '1h' | '6h' | '24h' | '7d';

export interface HistoricalReading {
  timestamp: string;
  timeLabel: string;
  input_ph: number;
  input_tds: number;
  input_turbidity: number;
  input_temperature: number;
  output_ph: number;
  output_tds: number;
  output_turbidity: number;
  output_temperature: number;
}
