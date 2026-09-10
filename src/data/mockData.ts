import {
  DemoScenario,
  DeviceTelemetry,
  FilterItem,
  HistoricalReading,
  SensorHealthItem,
  SystemAlert,
  ValveSystemControl,
  WaterStageData,
} from '../types';

export const INITIAL_INPUT_WATER: WaterStageData = {
  ph: {
    id: 'ph',
    name: 'pH',
    value: 5.8,
    unit: 'pH',
    status: 'WARNING',
    normalRange: '6.5 – 8.5',
    minSafe: 6.5,
    maxSafe: 8.5,
    trend: [6.4, 6.2, 6.0, 5.9, 5.8],
    lastUpdated: 'Just now',
  },
  tds: {
    id: 'tds',
    name: 'TDS (Total Dissolved Solids)',
    value: 1250,
    unit: 'ppm',
    status: 'WARNING',
    normalRange: '< 500 ppm',
    minSafe: 50,
    maxSafe: 500,
    trend: [1100, 1180, 1220, 1240, 1250],
    lastUpdated: 'Just now',
  },
  turbidity: {
    id: 'turbidity',
    name: 'Turbidity (Cloudiness)',
    value: 38.0,
    unit: 'NTU',
    status: 'CRITICAL',
    normalRange: '< 5.0 NTU',
    minSafe: 0.0,
    maxSafe: 5.0,
    trend: [22, 28, 32, 36, 38],
    lastUpdated: 'Just now',
  },
  temperature: {
    id: 'temperature',
    name: 'Temperature',
    value: 28.4,
    unit: '°C',
    status: 'NORMAL',
    normalRange: '15 – 35 °C',
    minSafe: 15,
    maxSafe: 35,
    trend: [28.1, 28.2, 28.3, 28.4, 28.4],
    lastUpdated: 'Just now',
  },
};

export const INITIAL_OUTPUT_WATER: WaterStageData = {
  ph: {
    id: 'ph',
    name: 'pH',
    value: 7.1,
    unit: 'pH',
    status: 'NORMAL',
    normalRange: '6.5 – 8.5',
    minSafe: 6.5,
    maxSafe: 8.5,
    trend: [7.2, 7.1, 7.1, 7.0, 7.1],
    lastUpdated: 'Just now',
  },
  tds: {
    id: 'tds',
    name: 'TDS (Total Dissolved Solids)',
    value: 180,
    unit: 'ppm',
    status: 'NORMAL',
    normalRange: '< 500 ppm',
    minSafe: 50,
    maxSafe: 500,
    trend: [210, 195, 188, 182, 180],
    lastUpdated: 'Just now',
  },
  turbidity: {
    id: 'turbidity',
    name: 'Turbidity (Cloudiness)',
    value: 1.4,
    unit: 'NTU',
    status: 'NORMAL',
    normalRange: '< 5.0 NTU',
    minSafe: 0.0,
    maxSafe: 1.0,
    trend: [1.8, 1.6, 1.5, 1.4, 1.4],
    lastUpdated: 'Just now',
  },
  temperature: {
    id: 'temperature',
    name: 'Temperature',
    value: 27.8,
    unit: '°C',
    status: 'NORMAL',
    normalRange: '15 – 35 °C',
    minSafe: 15,
    maxSafe: 35,
    trend: [27.9, 27.8, 27.8, 27.8, 27.8],
    lastUpdated: 'Just now',
  },
};

export const INITIAL_FILTERS: FilterItem[] = [
  {
    id: 'sediment',
    name: 'Sediment Filter',
    type: '5-Micron Spun Polypropylene',
    lifespanPercentage: 82,
    estimatedDaysRemaining: 74,
    operatingHours: 412,
    totalVolumeProcessedLiters: 12400,
    ratedCapacityLiters: 20000,
    flowRestrictionStatus: 'Normal (0.04 bar drop)',
    installationDate: '2026-06-15',
    lastReplacement: '2026-06-15',
    recommendation: 'Filter is in prime operating condition. Inspect in 45 days.',
    status: 'GOOD',
  },
  {
    id: 'carbon',
    name: 'Activated Carbon Filter',
    type: 'Coconut Shell Carbon Block',
    lifespanPercentage: 61,
    estimatedDaysRemaining: 42,
    operatingHours: 580,
    totalVolumeProcessedLiters: 17400,
    ratedCapacityLiters: 25000,
    flowRestrictionStatus: 'Moderate adsorption load',
    installationDate: '2026-05-10',
    lastReplacement: '2026-05-10',
    recommendation: 'Adsorption capacity nearing mid-life. Recommended replacement in 40 days.',
    status: 'GOOD',
  },
  {
    id: 'ro',
    name: 'UF / RO Membrane',
    type: 'Thin-Film Composite (TFC) 75 GPD',
    lifespanPercentage: 91,
    estimatedDaysRemaining: 160,
    operatingHours: 320,
    totalVolumeProcessedLiters: 9600,
    ratedCapacityLiters: 45000,
    flowRestrictionStatus: 'Flux: 14.8 L/hr, Rejection: 95.8%',
    installationDate: '2026-07-01',
    lastReplacement: '2026-07-01',
    recommendation: 'Membrane salt rejection exceeds target threshold. Excellent condition.',
    status: 'GOOD',
  },
  {
    id: 'uv',
    name: 'UV Sterilizer Chamber',
    type: '254nm Cold-Cathode Germicidal Lamp',
    lifespanPercentage: 72,
    estimatedDaysRemaining: 77,
    operatingHours: 6480,
    totalVolumeProcessedLiters: 28000,
    ratedCapacityLiters: 50000,
    flowRestrictionStatus: 'UV Intensity: 34 mJ/cm²',
    installationDate: '2026-04-01',
    lastReplacement: '2026-04-01',
    recommendation: 'Quartz sleeve clean; ballast output steady. Approx 620 lamp hours remaining.',
    status: 'GOOD',
  },
];

export const INITIAL_SENSORS: SensorHealthItem[] = [
  {
    id: 'ph_sensor',
    name: 'pH Sensor Probe',
    metric: 'pH (Hydrogen Ion Activity)',
    currentReading: '5.8 In / 7.1 Out',
    status: 'ONLINE',
    calibrationStatus: 'Calibrated (3-point pH 4.01, 7.00, 10.01)',
    lastCalibrationDate: '2026-08-20',
    healthPercentage: 94,
    diagnosticNote: 'Electrode impedance 180 MΩ; zero potential drift < 2mV.',
    errorDetected: false,
  },
  {
    id: 'tds_sensor',
    name: 'TDS Conductivity Probe',
    metric: 'Total Dissolved Solids (ppm)',
    currentReading: '1250 In / 180 Out ppm',
    status: 'ONLINE',
    calibrationStatus: 'Calibrated (Standard 342 ppm NaCl solution)',
    lastCalibrationDate: '2026-08-15',
    healthPercentage: 91,
    diagnosticNote: 'K-factor 1.02; temperature compensation curve active.',
    errorDetected: false,
  },
  {
    id: 'turbidity_sensor',
    name: 'Turbidity Sensor (Nephelometric)',
    metric: 'Turbidity (NTU @ 90° IR Scatter)',
    currentReading: '38.0 In / 1.4 Out NTU',
    status: 'ONLINE',
    calibrationStatus: 'Calibrated (Formazin standard 0.0 & 20.0 NTU)',
    lastCalibrationDate: '2026-08-28',
    healthPercentage: 88,
    diagnosticNote: 'Photodiode voltage 3.65V; lens clear of biofilm.',
    errorDetected: false,
  },
  {
    id: 'temp_sensor',
    name: 'Temperature Sensor',
    metric: 'Water Temperature (°C)',
    currentReading: '28.4 In / 27.8 Out °C',
    status: 'ONLINE',
    calibrationStatus: 'Factory Calibrated (DS18B20 12-bit digital)',
    lastCalibrationDate: '2026-05-01',
    healthPercentage: 98,
    diagnosticNote: 'CRC verified on OneWire bus; 0.06°C resolution.',
    errorDetected: false,
  },
];

export const INITIAL_ALERTS: SystemAlert[] = [];

export const INITIAL_CONTROLS: ValveSystemControl = {
  pump: true,
  uv: true,
  inletValve: true,
  outputValve: true,
  rejectValve: false,
  mode: 'AUTO',
  emergencyStopped: false,
};

export const INITIAL_DEVICE: DeviceTelemetry = {
  deviceName: 'NexusFlow Portable Purifier',
  hardwareId: 'ESP32-NF-26040',
  connectionStatus: 'ONLINE',
  lastDataReceivedSecs: 6,
  wifiSsid: 'JalShakti_IoT_Mesh',
  wifiRssi: -58,
  batteryPercentage: 78,
  uptimeSeconds: 52320, // 14h 32m
  flowRateLpm: 1.8,
  totalTreatedLiters: 148.5,
  firmwareVersion: 'v2.4.1-SIH',
};

// Generate realistic historical time-series data
export function generateHistoricalData(range: '1h' | '6h' | '24h' | '7d'): HistoricalReading[] {
  const pointsCount = range === '1h' ? 12 : range === '6h' ? 24 : range === '24h' ? 24 : 28;
  const list: HistoricalReading[] = [];
  const now = Date.now();
  const stepMs =
    range === '1h'
      ? 5 * 60 * 1000
      : range === '6h'
      ? 15 * 60 * 1000
      : range === '24h'
      ? 60 * 60 * 1000
      : 6 * 60 * 60 * 1000;

  for (let i = pointsCount - 1; i >= 0; i--) {
    const time = new Date(now - i * stepMs);
    const timeLabel =
      range === '1h' || range === '6h'
        ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : range === '24h'
        ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : `${time.toLocaleDateString([], { month: 'short', day: 'numeric' })} ${time.getHours()}:00`;

    // Add mild natural fluctuation
    const noise = Math.sin(i / 2) * 0.15;
    list.push({
      timestamp: time.toISOString(),
      timeLabel,
      input_ph: Number((5.7 + Math.sin(i * 0.4) * 0.3).toFixed(1)),
      input_tds: Math.round(1200 + Math.cos(i * 0.5) * 80 + Math.random() * 20),
      input_turbidity: Number((35 + Math.sin(i * 0.6) * 6 + noise * 5).toFixed(1)),
      input_temperature: Number((28.1 + Math.sin(i * 0.3) * 0.8).toFixed(1)),
      output_ph: Number((7.1 + Math.sin(i * 0.2) * 0.1).toFixed(1)),
      output_tds: Math.round(175 + Math.cos(i * 0.3) * 15),
      output_turbidity: Number((1.2 + Math.random() * 0.3).toFixed(1)),
      output_temperature: Number((27.7 + Math.sin(i * 0.3) * 0.4).toFixed(1)),
    });
  }

  return list;
}

// Preset configurations for Demo Scenarios
export const SCENARIO_PRESETS: Record<
  DemoScenario,
  {
    title: string;
    description: string;
    input: Partial<WaterStageData>;
    output: Partial<WaterStageData>;
    deviceStatus?: 'ONLINE' | 'OFFLINE';
    alertTrigger?: SystemAlert;
    valveOverride?: Partial<ValveSystemControl>;
    filterOverride?: Partial<FilterItem>[];
    sensorOverride?: Partial<SensorHealthItem>[];
  }
> = {
  normal: {
    title: '1. Normal Tap / Surface Water',
    description: 'Moderate mineral baseline with rapid complete purification and safe parameters.',
    input: {
      ph: { id: 'ph', name: 'pH', value: 7.2, unit: 'pH', status: 'NORMAL', normalRange: '6.5 – 8.5', minSafe: 6.5, maxSafe: 8.5, trend: [7.2, 7.2, 7.3, 7.2, 7.2], lastUpdated: 'Just now' },
      tds: { id: 'tds', name: 'TDS', value: 340, unit: 'ppm', status: 'NORMAL', normalRange: '< 500 ppm', minSafe: 50, maxSafe: 500, trend: [330, 335, 340, 340, 340], lastUpdated: 'Just now' },
      turbidity: { id: 'turbidity', name: 'Turbidity', value: 3.5, unit: 'NTU', status: 'NORMAL', normalRange: '< 5.0 NTU', minSafe: 0.0, maxSafe: 5.0, trend: [3.8, 3.7, 3.6, 3.5, 3.5], lastUpdated: 'Just now' },
      temperature: { id: 'temperature', name: 'Temperature', value: 26.5, unit: '°C', status: 'NORMAL', normalRange: '15 – 35 °C', minSafe: 15, maxSafe: 35, trend: [26.4, 26.5, 26.5, 26.5, 26.5], lastUpdated: 'Just now' },
    },
    output: {
      ph: { id: 'ph', name: 'pH', value: 7.3, unit: 'pH', status: 'NORMAL', normalRange: '6.5 – 8.5', minSafe: 6.5, maxSafe: 8.5, trend: [7.3, 7.3, 7.3, 7.3, 7.3], lastUpdated: 'Just now' },
      tds: { id: 'tds', name: 'TDS', value: 110, unit: 'ppm', status: 'NORMAL', normalRange: '< 500 ppm', minSafe: 50, maxSafe: 500, trend: [115, 112, 110, 110, 110], lastUpdated: 'Just now' },
      turbidity: { id: 'turbidity', name: 'Turbidity', value: 0.8, unit: 'NTU', status: 'NORMAL', normalRange: '< 5.0 NTU', minSafe: 0.0, maxSafe: 5.0, trend: [0.9, 0.8, 0.8, 0.8, 0.8], lastUpdated: 'Just now' },
      temperature: { id: 'temperature', name: 'Temperature', value: 26.2, unit: '°C', status: 'NORMAL', normalRange: '15 – 35 °C', minSafe: 15, maxSafe: 35, trend: [26.2, 26.2, 26.2, 26.2, 26.2], lastUpdated: 'Just now' },
    },
    valveOverride: { outputValve: true, rejectValve: false },
  },

  high_turbidity: {
    title: '2. High Turbidity (Monsoon / River Runoff)',
    description: 'Muddy flood/river water (48.0 NTU). Demonstrates sediment + UF pre-filter efficiency reducing to 1.6 NTU.',
    input: {
      ph: { id: 'ph', name: 'pH', value: 6.8, unit: 'pH', status: 'NORMAL', normalRange: '6.5 – 8.5', minSafe: 6.5, maxSafe: 8.5, trend: [6.9, 6.8, 6.8, 6.8, 6.8], lastUpdated: 'Just now' },
      tds: { id: 'tds', name: 'TDS', value: 620, unit: 'ppm', status: 'ATTENTION', normalRange: '< 500 ppm', minSafe: 50, maxSafe: 500, trend: [580, 600, 610, 620, 620], lastUpdated: 'Just now' },
      turbidity: { id: 'turbidity', name: 'Turbidity', value: 48.0, unit: 'NTU', status: 'CRITICAL', normalRange: '< 5.0 NTU', minSafe: 0.0, maxSafe: 5.0, trend: [25, 34, 40, 45, 48], lastUpdated: 'Just now' },
      temperature: { id: 'temperature', name: 'Temperature', value: 27.5, unit: '°C', status: 'NORMAL', normalRange: '15 – 35 °C', minSafe: 15, maxSafe: 35, trend: [27.4, 27.5, 27.5, 27.5, 27.5], lastUpdated: 'Just now' },
    },
    output: {
      ph: { id: 'ph', name: 'pH', value: 7.2, unit: 'pH', status: 'NORMAL', normalRange: '6.5 – 8.5', minSafe: 6.5, maxSafe: 8.5, trend: [7.2, 7.2, 7.2, 7.2, 7.2], lastUpdated: 'Just now' },
      tds: { id: 'tds', name: 'TDS', value: 140, unit: 'ppm', status: 'NORMAL', normalRange: '< 500 ppm', minSafe: 50, maxSafe: 500, trend: [150, 145, 142, 140, 140], lastUpdated: 'Just now' },
      turbidity: { id: 'turbidity', name: 'Turbidity', value: 1.6, unit: 'NTU', status: 'NORMAL', normalRange: '< 5.0 NTU', minSafe: 0.0, maxSafe: 5.0, trend: [1.9, 1.8, 1.7, 1.6, 1.6], lastUpdated: 'Just now' },
      temperature: { id: 'temperature', name: 'Temperature', value: 27.2, unit: '°C', status: 'NORMAL', normalRange: '15 – 35 °C', minSafe: 15, maxSafe: 35, trend: [27.2, 27.2, 27.2, 27.2, 27.2], lastUpdated: 'Just now' },
    },
    alertTrigger: {
      id: `alt-${Date.now()}`,
      type: 'HIGH TURBIDITY',
      title: 'Monsoon Runoff: High Turbidity Warning',
      message: 'Input water turbidity reached 48.0 NTU! Sediment filter under heavy particle load. 96.6% turbidity reduction active.',
      severity: 'WARNING',
      timestamp: 'Just now',
      sensorValue: '48.0 NTU',
      resolved: false,
      acknowledged: false,
      channels: ['in-app', 'dashboard', 'push'],
    },
  },

  high_tds: {
    title: '3. High TDS (Borewell / Saline Groundwater)',
    description: 'Groundwater with high dissolved solids (1,580 ppm). RO membrane drops TDS to 145 ppm.',
    input: {
      ph: { id: 'ph', name: 'pH', value: 7.6, unit: 'pH', status: 'NORMAL', normalRange: '6.5 – 8.5', minSafe: 6.5, maxSafe: 8.5, trend: [7.5, 7.6, 7.6, 7.6, 7.6], lastUpdated: 'Just now' },
      tds: { id: 'tds', name: 'TDS', value: 1580, unit: 'ppm', status: 'CRITICAL', normalRange: '< 500 ppm', minSafe: 50, maxSafe: 500, trend: [1420, 1490, 1530, 1560, 1580], lastUpdated: 'Just now' },
      turbidity: { id: 'turbidity', name: 'Turbidity', value: 6.2, unit: 'NTU', status: 'ATTENTION', normalRange: '< 5.0 NTU', minSafe: 0.0, maxSafe: 5.0, trend: [5.8, 6.0, 6.1, 6.2, 6.2], lastUpdated: 'Just now' },
      temperature: { id: 'temperature', name: 'Temperature', value: 29.0, unit: '°C', status: 'NORMAL', normalRange: '15 – 35 °C', minSafe: 15, maxSafe: 35, trend: [28.9, 29.0, 29.0, 29.0, 29.0], lastUpdated: 'Just now' },
    },
    output: {
      ph: { id: 'ph', name: 'pH', value: 7.1, unit: 'pH', status: 'NORMAL', normalRange: '6.5 – 8.5', minSafe: 6.5, maxSafe: 8.5, trend: [7.1, 7.1, 7.1, 7.1, 7.1], lastUpdated: 'Just now' },
      tds: { id: 'tds', name: 'TDS', value: 145, unit: 'ppm', status: 'NORMAL', normalRange: '< 500 ppm', minSafe: 50, maxSafe: 500, trend: [160, 152, 148, 145, 145], lastUpdated: 'Just now' },
      turbidity: { id: 'turbidity', name: 'Turbidity', value: 0.7, unit: 'NTU', status: 'NORMAL', normalRange: '< 5.0 NTU', minSafe: 0.0, maxSafe: 5.0, trend: [0.9, 0.8, 0.7, 0.7, 0.7], lastUpdated: 'Just now' },
      temperature: { id: 'temperature', name: 'Temperature', value: 28.5, unit: '°C', status: 'NORMAL', normalRange: '15 – 35 °C', minSafe: 15, maxSafe: 35, trend: [28.5, 28.5, 28.5, 28.5, 28.5], lastUpdated: 'Just now' },
    },
    alertTrigger: {
      id: `alt-${Date.now()}`,
      type: 'HIGH TDS',
      title: 'High Salinity / TDS Inflow Warning',
      message: 'Groundwater TDS is 1580 ppm (exceeds 500 ppm limit). RO high-pressure booster pump engaged with 90.8% salt rejection.',
      severity: 'WARNING',
      timestamp: 'Just now',
      sensorValue: '1580 ppm',
      resolved: false,
      acknowledged: false,
      channels: ['in-app', 'dashboard'],
    },
  },

  abnormal_ph: {
    title: '4. Abnormal pH (Mining Runoff / Acid Drainage)',
    description: 'Acidic industrial or mining drainage (pH 4.6). Purification neutralizes to pH 7.2 using alkaline/re-mineralizer stage.',
    input: {
      ph: { id: 'ph', name: 'pH', value: 4.6, unit: 'pH', status: 'CRITICAL', normalRange: '6.5 – 8.5', minSafe: 6.5, maxSafe: 8.5, trend: [5.8, 5.2, 4.9, 4.7, 4.6], lastUpdated: 'Just now' },
      tds: { id: 'tds', name: 'TDS', value: 920, unit: 'ppm', status: 'WARNING', normalRange: '< 500 ppm', minSafe: 50, maxSafe: 500, trend: [880, 900, 910, 920, 920], lastUpdated: 'Just now' },
      turbidity: { id: 'turbidity', name: 'Turbidity', value: 14.5, unit: 'NTU', status: 'WARNING', normalRange: '< 5.0 NTU', minSafe: 0.0, maxSafe: 5.0, trend: [12, 13, 14, 14.5, 14.5], lastUpdated: 'Just now' },
      temperature: { id: 'temperature', name: 'Temperature', value: 30.2, unit: '°C', status: 'NORMAL', normalRange: '15 – 35 °C', minSafe: 15, maxSafe: 35, trend: [30.0, 30.1, 30.2, 30.2, 30.2], lastUpdated: 'Just now' },
    },
    output: {
      ph: { id: 'ph', name: 'pH', value: 7.2, unit: 'pH', status: 'NORMAL', normalRange: '6.5 – 8.5', minSafe: 6.5, maxSafe: 8.5, trend: [6.8, 7.0, 7.1, 7.2, 7.2], lastUpdated: 'Just now' },
      tds: { id: 'tds', name: 'TDS', value: 165, unit: 'ppm', status: 'NORMAL', normalRange: '< 500 ppm', minSafe: 50, maxSafe: 500, trend: [180, 172, 168, 165, 165], lastUpdated: 'Just now' },
      turbidity: { id: 'turbidity', name: 'Turbidity', value: 1.1, unit: 'NTU', status: 'NORMAL', normalRange: '< 5.0 NTU', minSafe: 0.0, maxSafe: 5.0, trend: [1.3, 1.2, 1.1, 1.1, 1.1], lastUpdated: 'Just now' },
      temperature: { id: 'temperature', name: 'Temperature', value: 29.8, unit: '°C', status: 'NORMAL', normalRange: '15 – 35 °C', minSafe: 15, maxSafe: 35, trend: [29.8, 29.8, 29.8, 29.8, 29.8], lastUpdated: 'Just now' },
    },
    alertTrigger: {
      id: `alt-${Date.now()}`,
      type: 'ABNORMAL pH',
      title: 'Critical Acidic pH Inflow Detected',
      message: 'Raw water pH is 4.6 (severely acidic). Potential mining drainage or industrial effluent. Note: Mining runoff requires certified metal testing.',
      severity: 'CRITICAL',
      timestamp: 'Just now',
      sensorValue: '4.6 pH',
      resolved: false,
      acknowledged: false,
      channels: ['in-app', 'dashboard', 'push', 'buzzer'],
    },
  },

  filter_life_low: {
    title: '5. Filter Nearing End of Life (<20%)',
    description: 'Activated Carbon filter drops to 16% remaining life and Sediment to 18%. Triggers automated filter health warning.',
    input: { ...INITIAL_INPUT_WATER },
    output: { ...INITIAL_OUTPUT_WATER },
    filterOverride: [
      { id: 'sediment', lifespanPercentage: 18, estimatedDaysRemaining: 12, status: 'REPLACE SOON' },
      { id: 'carbon', lifespanPercentage: 16, estimatedDaysRemaining: 9, status: 'REPLACE SOON', flowRestrictionStatus: 'High differential pressure (0.28 bar drop)' },
    ],
    alertTrigger: {
      id: `alt-${Date.now()}`,
      type: 'FILTER LIFE LOW',
      title: 'Filter Maintenance Required',
      message: 'Activated carbon filter has only 16% estimated life remaining (<20% threshold). Replace cartridge within 7 days.',
      severity: 'WARNING',
      timestamp: 'Just now',
      sensorValue: '16% Carbon Life',
      resolved: false,
      acknowledged: false,
      channels: ['in-app', 'dashboard', 'push'],
    },
  },

  sensor_failure: {
    title: '6. Sensor Failure (Turbidity Disconnected)',
    description: 'Turbidity sensor optical photodiode stops responding (0.00V / Sensor Error). Failsafe triggers alarm & diversions.',
    input: {
      ...INITIAL_INPUT_WATER,
      turbidity: { id: 'turbidity', name: 'Turbidity', value: 0.0, unit: 'NTU', status: 'CRITICAL', normalRange: '< 5.0 NTU', minSafe: 0.0, maxSafe: 5.0, trend: [0, 0, 0, 0, 0], lastUpdated: 'Signal Lost' },
    },
    output: { ...INITIAL_OUTPUT_WATER },
    sensorOverride: [
      { id: 'turbidity_sensor', status: 'SENSOR ERROR', healthPercentage: 12, errorDetected: true, diagnosticNote: 'ADC reading 0 mV; open-circuit fault detected on GPIO 34.' },
    ],
    alertTrigger: {
      id: `alt-${Date.now()}`,
      type: 'SENSOR ERROR',
      title: 'Turbidity Sensor Signal Lost',
      message: 'Turbidity sensor is not responding on analog pin 34. Check wiring harness or replace nephelometric probe.',
      severity: 'CRITICAL',
      timestamp: 'Just now',
      sensorValue: 'SENSOR TIMEOUT',
      resolved: false,
      acknowledged: false,
      channels: ['in-app', 'dashboard', 'push', 'buzzer'],
    },
  },

  system_offline: {
    title: '7. System Offline (ESP32 Disconnected)',
    description: 'Simulates complete IoT loss of signal from ESP32 microcontroller with status warning and valve lockdown.',
    input: { ...INITIAL_INPUT_WATER },
    output: { ...INITIAL_OUTPUT_WATER },
    deviceStatus: 'OFFLINE',
    alertTrigger: {
      id: `alt-${Date.now()}`,
      type: 'SYSTEM OFFLINE',
      title: 'No Data Received from ESP32 Purifier',
      message: 'Heartbeat signal lost for > 60 seconds. Purifier controller is offline or out of Wi-Fi range. Auto-safe lockout active.',
      severity: 'CRITICAL',
      timestamp: 'Just now',
      sensorValue: 'NO HEARTBEAT',
      resolved: false,
      acknowledged: false,
      channels: ['in-app', 'dashboard', 'push', 'buzzer'],
    },
    valveOverride: { pump: false, outputValve: false, inletValve: false, emergencyStopped: true },
  },
};
