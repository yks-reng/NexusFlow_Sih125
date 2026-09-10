import { SupportedLanguage } from '../types';

export interface AppTranslations {
  // Brand & Header
  appTitle: string;
  appSubtitle: string;
  waterStatusLabel: string;
  statusSafe: string;
  statusWarning: string;
  statusUnsafe: string;
  statusOffline: string;
  liveMode: string;
  demoMode: string;
  esp32Online: string;
  esp32Offline: string;
  resumeSystem: string;
  stopSystem: string;
  emergencyActiveTitle: string;
  emergencyActiveDesc: string;
  scenarioLabel: string;
  
  // Navigation
  navDashboard: string;
  navWaterQuality: string;
  navFilterHealth: string;
  navSensorHealth: string;
  navAlerts: string;
  navControls: string;
  navAquaAi: string;
  navReports: string;
  navDevice: string;

  // Dashboard - Treatment Comparison
  treatmentComparisonTitle: string;
  treatmentComparisonSubtitle: string;
  inputWaterTitle: string;
  inputWaterSubtitle: string;
  outputWaterTitle: string;
  outputWaterSubtitle: string;
  safeForConsumption: string;
  requiresPurification: string;
  attentionRecommended: string;
  unfitForDrinking: string;
  
  // Metrics
  phLabel: string;
  tdsLabel: string;
  turbidityLabel: string;
  temperatureLabel: string;
  targetRange: string;
  currentValue: string;
  statusNormal: string;
  statusElevated: string;
  statusUnsafeText: string;
  statusCritical: string;
  
  // Performance / Efficiency
  purificationEfficiency: string;
  turbidityRemoved: string;
  tdsReduced: string;
  phStabilized: string;
  optimalTemp: string;
  optimalStatus: string;
  adjustingStatus: string;

  // ESP32 Telemetry Section
  esp32SectionTitle: string;
  esp32SectionSubtitle: string;
  flowRate: string;
  batteryLevel: string;
  uptime: string;
  totalTreated: string;
  steadyStream: string;
  backupCell: string;
  continuousOperation: string;
  fullyMonitored: string;
  hardwareStatus: string;
  feedPump: string;
  uvPurifier: string;
  outputValve: string;
  bypassValve: string;
  active: string;
  idle: string;
  open: string;
  closed: string;
  
  // Dashboard Filter Health Section
  filterSectionSubtitle: string;
  filterDetailsBtn: string;
  daysLeftLabel: string;

  // Disclaimer & Protocol
  disclaimerTitle: string;
  disclaimerText: string;
  alertsTitle: string;
  alertsSubtitle: string;
  protocolTitle: string;
  protocolText: string;
  noActiveWarningsTitle: string;
  noActiveWarningsDesc: string;
  autoResolvingBadge: string;

  // -------------------------------------------------------------
  // WATER QUALITY READING VIEW (wq*)
  // -------------------------------------------------------------
  wqTitle: string;
  wqSubtitle: string;
  range1h: string;
  range6h: string;
  range24h: string;
  range7d: string;
  turbidityMetric: string;
  turbidityDesc: string;
  tdsMetric: string;
  tdsDesc: string;
  phMetric: string;
  phDesc: string;
  tempMetric: string;
  tempDesc: string;
  compareBoth: string;
  inputOnly: string;
  outputOnly: string;
  trendGraphTitle: string;
  lastUpdatedJustNow: string;
  chartInputSeries: string;
  chartOutputSeries: string;
  maxSafeThreshold: string;
  inputStatsTitle: string;
  outputStatsTitle: string;
  statCurrent: string;
  statMin: string;
  statMax: string;
  statAvg: string;
  regulatoryRefTitle: string;
  turbidityStandardNote: string;
  tdsStandardNote: string;
  phStandardNote: string;
  tempStandardNote: string;

  // -------------------------------------------------------------
  // FILTER HEALTH VIEW (fh*)
  // -------------------------------------------------------------
  fhTitle: string;
  fhSubtitle: string;
  all4StagesBadge: string;
  fhStatusGood: string;
  fhStatusAttention: string;
  fhStatusReplaceSoon: string;
  fhStatusExpired: string;
  remainingLifespan: string;
  estDaysRemaining: string;
  operatingRuntime: string;
  volumeProcessed: string;
  flowMembraneStatus: string;
  installedDate: string;
  lastReplacedDate: string;
  replaceWithNewBtn: string;
  installingNewFilter: string;
  physicalReplacementNote: string;
  confirmModalTitle: string;
  confirmModalSubtitle: string;
  stageLabel: string;
  cartridgeTypeLabel: string;
  currentHealthLabel: string;
  remainingLabel: string;
  modalPhysicalWarning: string;
  confirmCheckboxText: string;
  cancelBtn: string;
  confirmInstallBtn: string;
  toastInstalledSuccess: string;
  // Filter stage names & descriptions
  filterSedimentName: string;
  filterSedimentType: string;
  filterSedimentStatusText: string;
  filterCarbonName: string;
  filterCarbonType: string;
  filterCarbonStatusText: string;
  filterRoName: string;
  filterRoType: string;
  filterRoStatusText: string;
  filterUvName: string;
  filterUvType: string;
  filterUvStatusText: string;

  // -------------------------------------------------------------
  // CONTROLS VIEW (ctrl*)
  // -------------------------------------------------------------
  ctrlTitle: string;
  ctrlSubtitle: string;
  operatingModeTitle: string;
  modeAutoBadge: string;
  modeManualBadge: string;
  emergencyHaltTitle: string;
  emergencyHaltDesc: string;
  clearHaltBtn: string;
  hydraulicTitle: string;
  logicAutoBadge: string;
  logicManualBadge: string;
  stage1Badge: string;
  stage2Badge: string;
  purificationCoreBadge: string;
  sterilizerBadge: string;
  fourStageFiltration: string;
  inletValveName: string;
  boosterPumpName: string;
  uvLampName: string;
  cleanOutputName: string;
  retreatmentName: string;
  autoFailsafeExplanation: string;
  boosterCardTitle: string;
  boosterCardDesc: string;
  uvCardTitle: string;
  uvCardDesc: string;
  inletCardTitle: string;
  inletCardDesc: string;
  cleanCardTitle: string;
  cleanCardDesc: string;
  rejectCardTitle: string;
  rejectCardDesc: string;
  emergencyCardTitle: string;
  emergencyCardDesc: string;
  hardwareRelayNote: string;
  turnOnBtn: string;
  turnOffBtn: string;
  openValveBtn: string;
  closeValveBtn: string;
  statusRunningOn: string;
  statusIlluminated: string;
  statusDispensingOpen: string;
  statusDivertingOpen: string;
  statusShutClosed: string;
  statusDivertedWarning: string;
  statusOpenCheck: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, AppTranslations> = {
  en: {
    // Brand & Header
    appTitle: 'NexusFlow',
    appSubtitle: 'Dual-Stage Telemetry & Automatic Safety Diversion',
    waterStatusLabel: 'WATER STATUS',
    statusSafe: 'SAFE',
    statusWarning: 'WARNING',
    statusUnsafe: 'UNSAFE',
    statusOffline: 'SYSTEM OFFLINE',
    liveMode: 'LIVE MODE',
    demoMode: 'DEMO MODE',
    esp32Online: 'ESP32 Online',
    esp32Offline: 'ESP32 Offline',
    resumeSystem: 'Resume System',
    stopSystem: 'STOP SYSTEM',
    emergencyActiveTitle: 'System Emergency Stopped!',
    emergencyActiveDesc: 'Feed pump halted and safety valves engaged. Press Resume System when ready.',
    scenarioLabel: 'Select Evaluation Scenario:',

    // Navigation
    navDashboard: 'Dashboard',
    navWaterQuality: 'Water Quality',
    navFilterHealth: 'Filter Health',
    navSensorHealth: 'Sensors',
    navAlerts: 'Alerts',
    navControls: 'Controls',
    navAquaAi: 'NexusFlow',
    navReports: 'Reports',
    navDevice: 'Device',

    // Dashboard - Treatment Comparison
    treatmentComparisonTitle: 'Real-Time Treatment Comparison',
    treatmentComparisonSubtitle: 'Live sensor readings before and after multi-stage filtration',
    inputWaterTitle: 'INPUT WATER READING',
    inputWaterSubtitle: 'Raw water intake reading',
    outputWaterTitle: 'OUTPUT WATER READING',
    outputWaterSubtitle: 'Purified drinking water stream',
    safeForConsumption: 'Safe for Consumption',
    requiresPurification: 'Requires Purification',
    attentionRecommended: 'Caution / Inspection Required',
    unfitForDrinking: 'Unfit for Drinking — Diverted',

    // Metrics
    phLabel: 'pH Level',
    tdsLabel: 'TDS',
    turbidityLabel: 'Turbidity',
    temperatureLabel: 'Temperature',
    targetRange: 'Target',
    currentValue: 'Current',
    statusNormal: 'Normal',
    statusElevated: 'Elevated',
    statusUnsafeText: 'Unsafe',
    statusCritical: 'Critical',

    // Performance / Efficiency
    purificationEfficiency: 'Purification Efficiency',
    turbidityRemoved: 'Turbidity Removed',
    tdsReduced: 'TDS Reduced',
    phStabilized: 'pH Stabilized',
    optimalTemp: 'Optimal Temp',
    optimalStatus: '✓ Optimal',
    adjustingStatus: 'Adjusting',

    // ESP32 Telemetry Section
    esp32SectionTitle: 'IoT Telemetry & Actuators',
    esp32SectionSubtitle: 'Hardware telemetry, battery status, flow rate and valve actuators',
    flowRate: 'Flow Rate',
    batteryLevel: 'Battery',
    uptime: 'Uptime',
    totalTreated: 'Total Treated',
    steadyStream: '• Steady laminar stream',
    backupCell: 'LiFePO4 Backup Cell',
    continuousOperation: 'Continuous Operation',
    fullyMonitored: '100% Monitored',
    hardwareStatus: 'Hardware Status',
    feedPump: 'Feed Pump',
    uvPurifier: 'UV Purifier',
    outputValve: 'Output Solenoid Valve',
    bypassValve: 'Bypass / Reject Valve',
    active: 'Active',
    idle: 'Idle',
    open: 'Open',
    closed: 'Closed',

    // Dashboard Filter Health Section
    filterSectionSubtitle: 'Calculated from processed liters, hours of operation, and turbidity differential',
    filterDetailsBtn: 'Details',
    daysLeftLabel: 'days left',

    // Disclaimer & Protocol
    disclaimerTitle: 'Monitoring vs Laboratory Verification:',
    disclaimerText:
      'NexusFlow continuously tracks physical parameters (pH, TDS, Turbidity, Temperature) to verify treatment performance. For chemical, heavy metal (arsenic/lead), or mining runoff sources, accredited laboratory testing is recommended.',
    alertsTitle: 'Active Warnings',
    alertsSubtitle: 'Warnings resolve automatically once water parameters normalize',
    protocolTitle: 'Important Water Safety Protocol:',
    protocolText: 'Physical sensors verify filtration quality; certified lab testing is required for chemical runoff or heavy metals.',
    noActiveWarningsTitle: 'No Active Warnings',
    noActiveWarningsDesc: 'All monitored water parameters are within safe limits. Warnings will appear here automatically when thresholds are exceeded and self-resolve once water is safe.',
    autoResolvingBadge: 'Auto-resolves when parameters normalize',

    // WATER QUALITY READING VIEW
    wqTitle: 'Real-Time Water Quality & Analytics',
    wqSubtitle: 'Live time-series analysis comparing raw input against treated output water',
    range1h: 'Last 1 Hour',
    range6h: 'Last 6 Hours',
    range24h: 'Last 24 Hours',
    range7d: 'Last 7 Days',
    turbidityMetric: 'Turbidity (Cloudiness)',
    turbidityDesc: 'Light scattering by suspended particulates',
    tdsMetric: 'Total Dissolved Solids (TDS)',
    tdsDesc: 'Inorganic salts, minerals & organic matter',
    phMetric: 'pH (Acidity / Alkalinity)',
    phDesc: 'Hydrogen ion concentration in solution',
    tempMetric: 'Water Temperature',
    tempDesc: 'Direct thermal influence on kinetic diffusion',
    compareBoth: 'Compare Both',
    inputOnly: 'Input Water Only',
    outputOnly: 'Output Water Only',
    trendGraphTitle: 'Trend Graph',
    lastUpdatedJustNow: 'Last updated: Just now',
    chartInputSeries: 'Input Water',
    chartOutputSeries: 'Output Water',
    maxSafeThreshold: 'Max Safe',
    inputStatsTitle: 'Input Water Statistics',
    outputStatsTitle: 'Output Water Statistics',
    statCurrent: 'Current',
    statMin: 'Minimum',
    statMax: 'Maximum',
    statAvg: 'Average',
    regulatoryRefTitle: 'Regulatory Standard Reference',
    turbidityStandardNote: 'WHO / BIS 10500 recommends turbidity < 1.0 NTU for drinking water (acceptable up to 5.0 NTU only when no alternative exists). Elevated turbidity compromises UV sterilization.',
    tdsStandardNote: 'BIS 10500 specifies acceptable limit is 500 ppm, permissible up to 2000 ppm. Ideal drinking taste is 50–300 ppm.',
    phStandardNote: 'WHO and BIS standards mandate potable drinking water maintain pH between 6.5 and 8.5. Values outside this corrosive/basic range trigger auto-diversion.',
    tempStandardNote: 'Ambient drinking temperature is ideally 10°C to 25°C. Warmer water accelerates microbial proliferation and affects membrane efficiency.',

    // FILTER HEALTH VIEW
    fhTitle: 'Multi-Stage Filter Health & Diagnostics',
    fhSubtitle: 'Dynamic lifespan calculations based on operating hours, processed volume, and differential pressure',
    all4StagesBadge: 'All 4 Purification Stages Monitored',
    fhStatusGood: 'GOOD',
    fhStatusAttention: 'ATTENTION',
    fhStatusReplaceSoon: 'REPLACE SOON',
    fhStatusExpired: 'EXPIRED',
    remainingLifespan: 'Remaining Lifespan',
    estDaysRemaining: 'Est. Days Remaining',
    operatingRuntime: 'Operating Runtime',
    volumeProcessed: 'Volume Processed',
    flowMembraneStatus: 'Flow / Membrane Status',
    installedDate: 'Installed:',
    lastReplacedDate: 'Last Replaced:',
    replaceWithNewBtn: 'Replace with New Filter',
    installingNewFilter: 'Installing New Filter...',
    physicalReplacementNote: 'Health metrics only change when a new filter is replaced',
    confirmModalTitle: 'Confirm New Filter Replacement',
    confirmModalSubtitle: 'Physical cartridge installation verification',
    stageLabel: 'Filter Stage:',
    cartridgeTypeLabel: 'Cartridge Type:',
    currentHealthLabel: 'Current Health:',
    remainingLabel: 'remaining',
    modalPhysicalWarning: 'Filter health and operational lifespan only change when a new filter cartridge has been physically replaced and installed in the housing.',
    confirmCheckboxText: 'I confirm that a brand new replacement filter cartridge has been installed and properly seated in the filter housing.',
    cancelBtn: 'Cancel',
    confirmInstallBtn: 'Confirm New Filter Installed',
    toastInstalledSuccess: 'New cartridge installed successfully! Diagnostics updated.',
    filterSedimentName: 'Sediment Pre-Filter',
    filterSedimentType: 'Spun Polypropylene 5μm',
    filterSedimentStatusText: 'Optimal mechanical capture. Minimal differential pressure drop.',
    filterCarbonName: 'Activated Carbon Cartridge',
    filterCarbonType: 'Extruded Block Carbon',
    filterCarbonStatusText: 'Active chlorine and VOC adsorption within optimal capacity.',
    filterRoName: 'RO Membrane',
    filterRoType: 'Thin-Film Composite (TFC) 75 GPD',
    filterRoStatusText: 'Membrane pores clean and intact. Permeate flux nominal.',
    filterUvName: 'UV Sterilizer Lamp',
    filterUvType: '254nm Cold Cathode Germicidal',
    filterUvStatusText: '254nm germicidal output active. Pathogen neutralization verified.',

    // CONTROLS VIEW
    ctrlTitle: 'System Control & Solenoid Valves',
    ctrlSubtitle: 'Automated fail-safe water diversion, actuator status, and manual override panel',
    operatingModeTitle: 'Operating Mode:',
    modeAutoBadge: 'AUTO',
    modeManualBadge: 'MANUAL',
    emergencyHaltTitle: 'EMERGENCY SYSTEM HALT ACTIVE',
    emergencyHaltDesc: 'Pump shut off and all solenoid valves forced closed. Physical flow ceased.',
    clearHaltBtn: 'Clear Halt & Restart Normal Flow',
    hydraulicTitle: 'Hydraulic Flow & Automated Diversion Path',
    logicAutoBadge: 'Dual-Solenoid Auto Failsafe',
    logicManualBadge: 'Manual Actuator Override',
    stage1Badge: 'STAGE 1',
    stage2Badge: 'STAGE 2',
    purificationCoreBadge: 'PURIFICATION CORE',
    sterilizerBadge: 'STERILIZER',
    fourStageFiltration: '4-Stage Filtration',
    inletValveName: 'Inlet Valve',
    boosterPumpName: 'Booster Pump',
    uvLampName: 'UV Lamp',
    cleanOutputName: 'Clean Output',
    retreatmentName: 'Re-treatment',
    autoFailsafeExplanation: 'Automatic Fail-Safe Logic: If output turbidity exceeds 4.0 NTU, TDS exceeds 500 ppm, or pH leaves the 6.5–8.5 envelope, the Clean Output Valve closes immediately and diverts effluent to the Re-treatment/Reject path to prevent ingestion of sub-standard water.',
    boosterCardTitle: 'Booster Feed Pump',
    boosterCardDesc: 'Pressurizes RO membrane feed',
    uvCardTitle: 'UV Sterilization Chamber',
    uvCardDesc: '254nm pathogen eradication',
    inletCardTitle: 'Inlet Solenoid Valve',
    inletCardDesc: 'Raw source fluid gate',
    cleanCardTitle: 'Clean Dispense Valve',
    cleanCardDesc: 'Releases verified permeate',
    rejectCardTitle: 'Re-Treatment / Reject Valve',
    rejectCardDesc: 'Recirculation safety loop',
    emergencyCardTitle: 'Emergency Shutdown',
    emergencyCardDesc: 'Complete hydraulic lockout',
    hardwareRelayNote: 'Hardware Relay Overwrite',
    turnOnBtn: 'TURN ON',
    turnOffBtn: 'TURN OFF',
    openValveBtn: 'OPEN VALVE',
    closeValveBtn: 'CLOSE VALVE',
    statusRunningOn: 'RUNNING (ON)',
    statusIlluminated: 'ILLUMINATED',
    statusDispensingOpen: 'DISPENSING (OPEN)',
    statusDivertingOpen: 'DIVERTING (OPEN)',
    statusShutClosed: 'SHUT',
    statusDivertedWarning: 'DIVERTED ⚠',
    statusOpenCheck: 'OPEN ✓',
  },

  hi: {
    // Brand & Header
    appTitle: 'NexusFlow',
    appSubtitle: 'मल्टी-स्टेज जल टेलीमेट्री और स्वचालित सुरक्षा प्रणाली',
    waterStatusLabel: 'जल स्थिति',
    statusSafe: 'सुरक्षित',
    statusWarning: 'चेतावनी',
    statusUnsafe: 'असुरक्षित',
    statusOffline: 'ऑफ़लाइन',
    liveMode: 'लाइव मोड',
    demoMode: 'डेमो मोड',
    esp32Online: 'ESP32 ऑनलाइन',
    esp32Offline: 'ESP32 ऑफ़लाइन',
    resumeSystem: 'सिस्टम पुनः शुरू करें',
    stopSystem: 'सिस्टम रोकें',
    emergencyActiveTitle: 'आपातकालीन रोक सक्रिय!',
    emergencyActiveDesc: 'फ़ीड पंप और वाल्व बंद कर दिए गए हैं। चालू करने के लिए "सिस्टम पुनः शुरू करें" दबाएं।',
    scenarioLabel: 'मूल्यांकन परिदृश्य चुनें:',

    // Navigation
    navDashboard: 'डैशबोर्ड',
    navWaterQuality: 'जल गुणवत्ता',
    navFilterHealth: 'फ़िल्टर स्थिति',
    navSensorHealth: 'सेंसर',
    navAlerts: 'अलर्ट',
    navControls: 'नियंत्रण',
    navAquaAi: 'NexusFlow',
    navReports: 'रिपोर्ट',
    navDevice: 'डिवाइस',

    // Dashboard - Treatment Comparison
    treatmentComparisonTitle: 'रियल-टाइम जल शोधन तुलना',
    treatmentComparisonSubtitle: 'मल्टी-स्टेज फ़िल्ट्रेशन से पहले और बाद के लाइव सेंसर आंकड़े',
    inputWaterTitle: 'इनपुट जल रीडिंग',
    inputWaterSubtitle: 'कच्चा पानी स्रोत रीडिंग',
    outputWaterTitle: 'आउटपुट रीडिंग',
    outputWaterSubtitle: 'शुद्ध पेयजल आपूर्ति धारा',
    safeForConsumption: 'पीने के लिए सुरक्षित',
    requiresPurification: 'शुद्धिकरण आवश्यक',
    attentionRecommended: 'सावधानी / जांच आवश्यक',
    unfitForDrinking: 'पीने योग्य नहीं — स्वचालित डायवर्जन',

    // Metrics
    phLabel: 'pH स्तर',
    tdsLabel: 'TDS (घुलित ठोस)',
    turbidityLabel: 'टर्बिडिटी (गंदलापन)',
    temperatureLabel: 'तापमान',
    targetRange: 'मानक लक्ष्य',
    currentValue: 'वर्तमान मान',
    statusNormal: 'सामान्य',
    statusElevated: 'अधिक',
    statusUnsafeText: 'असुरक्षित',
    statusCritical: 'गंभीर',

    // Performance / Efficiency
    purificationEfficiency: 'शुद्धिकरण दक्षता',
    turbidityRemoved: 'गंदलापन हटाया गया',
    tdsReduced: 'TDS कम हुआ',
    phStabilized: 'pH संतुलित',
    optimalTemp: 'अनुकूल तापमान',
    optimalStatus: '✓ अनुकूल',
    adjustingStatus: 'समायोजन जारी',

    // ESP32 Telemetry Section
    esp32SectionTitle: 'IoT टेलीमेट्री और उपकरण',
    esp32SectionSubtitle: 'हार्डवेयर स्थिति, बैटरी, प्रवाह दर और वाल्व नियंत्रण',
    flowRate: 'प्रवाह दर',
    batteryLevel: 'बैटरी',
    uptime: 'कार्यकाल',
    totalTreated: 'कुल शुद्ध जल',
    steadyStream: '• स्थिर एवं निरंतर प्रवाह',
    backupCell: 'LiFePO4 बैकअप सेल',
    continuousOperation: 'निरंतर सक्रिय संचालन',
    fullyMonitored: '100% सेंसर निगरानी',
    hardwareStatus: 'हार्डवेयर स्थिति',
    feedPump: 'फ़ीड पंप',
    uvPurifier: 'UV प्यूरिफ़ायर',
    outputValve: 'आउटपुट वाल्व',
    bypassValve: 'बायपास/रिजेक्ट वाल्व',
    active: 'सक्रिय',
    idle: 'निष्क्रिय',
    open: 'खुला',
    closed: 'बंद',

    // Dashboard Filter Health Section
    filterSectionSubtitle: 'संसाधित पानी, संचालन के घंटे और दबाव के आधार पर गणना',
    filterDetailsBtn: 'विवरण',
    daysLeftLabel: 'दिन शेष',

    // Disclaimer & Protocol
    disclaimerTitle: 'निगरानी बनाम प्रयोगशाला जांच:',
    disclaimerText:
      'NexusFlow भौतिक मापदंडों (pH, TDS, टर्बिडिटी, तापमान) की लाइव निगरानी करता है। रासायनिक संदूषण, भारी धातुओं (आर्सेनिक/लेड) या खनन क्षेत्र के पानी के लिए प्रमाणित लैब परीक्षण आवश्यक है।',
    alertsTitle: 'सक्रिय चेतावनियाँ',
    alertsSubtitle: 'पैरामीटर सामान्य होते ही चेतावनियाँ अपने आप समाप्त हो जाती हैं',
    protocolTitle: 'महत्वपूर्ण जल सुरक्षा प्रोटोकॉल:',
    protocolText: 'भौतिक सेंसर शुद्धिकरण क्षमता की जांच करते हैं; रासायनिक अपवाह या भारी धातुओं के लिए लैब टेस्ट आवश्यक है।',
    noActiveWarningsTitle: 'कोई सक्रिय चेतावनी नहीं',
    noActiveWarningsDesc: 'सभी जल पैरामीटर सुरक्षित सीमा में हैं। सीमा पार होने पर चेतावनियां यहां दिखाई देंगी और पानी सुरक्षित होते ही अपने आप हल हो जाएंगी।',
    autoResolvingBadge: 'पैरामीटर सामान्य होने पर स्वतः समाप्त',

    // WATER QUALITY READING VIEW
    wqTitle: 'रियल-टाइम जल गुणवत्ता और विश्लेषण',
    wqSubtitle: 'कच्चे इनपुट पानी और शुद्ध आउटपुट पानी की लाइव समय-श्रृंखला तुलना',
    range1h: 'पिछला 1 घंटा',
    range6h: 'पिछले 6 घंटे',
    range24h: 'पिछले 24 घंटे',
    range7d: 'पिछले 7 दिन',
    turbidityMetric: 'टर्बिडिटी (मटमैलापन / गंदलापन)',
    turbidityDesc: 'पानी में निलंबित ठोस कणों द्वारा प्रकाश प्रकीर्णन',
    tdsMetric: 'कुल घुलित ठोस (TDS)',
    tdsDesc: 'अकार्बनिक लवण, खनिज और घुलित कार्बनिक पदार्थ',
    phMetric: 'pH (अम्लीयता / क्षारीयता)',
    phDesc: 'पानी में हाइड्रोजन आयन सांद्रता',
    tempMetric: 'जल तापमान',
    tempDesc: 'शुद्धिकरण दर पर प्रत्यक्ष थर्मल प्रभाव',
    compareBoth: 'दोनों की तुलना करें',
    inputOnly: 'केवल इनपुट पानी',
    outputOnly: 'केवल आउटपुट पानी',
    trendGraphTitle: 'ट्रेंड ग्राफ़',
    lastUpdatedJustNow: 'अंतिम अपडेट: अभी',
    chartInputSeries: 'इनपुट जल',
    chartOutputSeries: 'आउटपुट जल',
    maxSafeThreshold: 'अधिकतम सुरक्षित सीमा',
    inputStatsTitle: 'इनपुट जल सांख्यिकी',
    outputStatsTitle: 'आउटपुट जल सांख्यिकी',
    statCurrent: 'वर्तमान',
    statMin: 'न्यूनतम',
    statMax: 'अधिकतम',
    statAvg: 'औसत',
    regulatoryRefTitle: 'नियामक मानक संदर्भ',
    turbidityStandardNote: 'WHO / BIS 10500 मानक पेयजल के लिए टर्बिडिटी < 1.0 NTU की अनुशंसा करता है (अधिकतम 5.0 NTU)। अधिक गंदलापन UV कीटाणुशोधन को बाधित करता है।',
    tdsStandardNote: 'BIS 10500 के अनुसार स्वीकार्य सीमा 500 ppm है। पीने के लिए सबसे आदर्श स्वाद 50–300 ppm के बीच होता है।',
    phStandardNote: 'WHO और BIS मानक के अनुसार पेयजल का pH 6.5 से 8.5 के बीच होना चाहिए। इस सीमा से बाहर पानी होने पर सिस्टम स्वतः डायवर्ट कर देता है।',
    tempStandardNote: 'पीने के पानी का सामान्य तापमान 10°C से 25°C सबसे उपयुक्त होता है। गर्म पानी से मेम्ब्रेन की दक्षता पर असर पड़ता है।',

    // FILTER HEALTH VIEW
    fhTitle: 'मल्टी-स्टेज फ़िल्टर स्वास्थ्य और डायग्नोस्टिक्स',
    fhSubtitle: 'कार्य के घंटे, शुद्ध किए गए पानी की मात्रा और दबाव के आधार पर जीवनकाल की गणना',
    all4StagesBadge: 'सभी 4 शोधन चरण सक्रिय रूप से मॉनिटर',
    fhStatusGood: 'उत्कृष्ट',
    fhStatusAttention: 'ध्यान दें',
    fhStatusReplaceSoon: 'जल्द बदलें',
    fhStatusExpired: 'समाप्त / तुरंत बदलें',
    remainingLifespan: 'शेष जीवनकाल',
    estDaysRemaining: 'अनुमानित शेष दिन',
    operatingRuntime: 'कुल कार्य समय',
    volumeProcessed: 'शुद्ध किया गया पानी',
    flowMembraneStatus: 'प्रवाह / मेम्ब्रेन स्थिति',
    installedDate: 'लगाया गया:',
    lastReplacedDate: 'पिछला बदलाव:',
    replaceWithNewBtn: 'नया फ़िल्टर लगाएं',
    installingNewFilter: 'नया फ़िल्टर लगाया जा रहा है...',
    physicalReplacementNote: 'फ़िल्टर स्वास्थ्य तभी बदलता है जब मशीन में नया फ़िल्टर लगाया जाए',
    confirmModalTitle: 'नया फ़िल्टर लगाने की पुष्टि करें',
    confirmModalSubtitle: 'भौतिक कार्ट्रिज स्थापना सत्यापन',
    stageLabel: 'फ़िल्टर चरण:',
    cartridgeTypeLabel: 'कार्ट्रिज प्रकार:',
    currentHealthLabel: 'वर्तमान स्वास्थ्य:',
    remainingLabel: 'शेष',
    modalPhysicalWarning: 'फ़िल्टर स्वास्थ्य और जीवनकाल तभी अपडेट होता है जब मशीन में नया फ़िल्टर वास्तव में लगाया जाए।',
    confirmCheckboxText: 'मैं पुष्टि करता हूँ कि मशीन में बिल्कुल नया फ़िल्टर सही ढंग से लगा दिया गया है।',
    cancelBtn: 'रद्द करें',
    confirmInstallBtn: 'नया फ़िल्टर पुष्टि करें',
    toastInstalledSuccess: 'नया फ़िल्टर सफलतापूर्वक स्थापित! डायग्नोस्टिक्स अपडेट किए गए।',
    filterSedimentName: 'सेडिमेंट प्री-फ़िल्टर',
    filterSedimentType: 'स्पन पॉलीप्रोपाइलीन 5µm',
    filterSedimentStatusText: 'उत्कृष्ट यांत्रिक पकड़। न्यूनतम दबाव हानि।',
    filterCarbonName: 'एक्टिवेटेड कार्बन कार्ट्रिज',
    filterCarbonType: 'एक्सट्रूडेड ब्लॉक कार्बन',
    filterCarbonStatusText: 'क्लोरीन और गंध अवशोषण पूर्णतः प्रभावी।',
    filterRoName: 'आरओ मेम्ब्रेन',
    filterRoType: 'थिन-फिल्म कम्पोजिट (TFC) 75 GPD',
    filterRoStatusText: 'मेम्ब्रेन छिद्र पूरी तरह स्वच्छ। शुद्ध जल प्रवाह सामान्य।',
    filterUvName: 'यूवी स्टेरलाइज़र लैंप',
    filterUvType: '254nm रोगाणुरोधी लैंप',
    filterUvStatusText: '254nm रोगाणुनाशक किरणें सक्रिय। कीटाणु उन्मूलन सत्यापित।',

    // CONTROLS VIEW
    ctrlTitle: 'सिस्टम नियंत्रण और सोलेनोइड वाल्व',
    ctrlSubtitle: 'स्वचालित सुरक्षा डायवर्जन, एक्चुएटर स्थिति और मैनुअल नियंत्रण पैनल',
    operatingModeTitle: 'ऑपरेटिंग मोड:',
    modeAutoBadge: 'ऑटो',
    modeManualBadge: 'मैन्युअल',
    emergencyHaltTitle: 'आपातकालीन रोक सक्रिय',
    emergencyHaltDesc: 'पंप बंद कर दिया गया है और सभी वाल्व बंद हैं। जल प्रवाह रुका हुआ है।',
    clearHaltBtn: 'रोक हटाएं और सामान्य प्रवाह शुरू करें',
    hydraulicTitle: 'हाइड्रोलिक प्रवाह और स्वचालित डायवर्जन पथ',
    logicAutoBadge: 'द्वि-सोलेनोइड स्वचालित सुरक्षा',
    logicManualBadge: 'मैन्युअल ओवरराइड मोड',
    stage1Badge: 'चरण 1',
    stage2Badge: 'चरण 2',
    purificationCoreBadge: 'शोधन केंद्र',
    sterilizerBadge: 'कीटाणुनाशक',
    fourStageFiltration: '4-चरणीय फ़िल्ट्रेशन',
    inletValveName: 'इनलेट वाल्व',
    boosterPumpName: 'बूस्टर पंप',
    uvLampName: 'UV लैंप',
    cleanOutputName: 'शुद्ध आउटपुट',
    retreatmentName: 'पुनः शोधन (रिजेक्ट)',
    autoFailsafeExplanation: 'स्वचालित सुरक्षा तर्क: यदि आउटपुट टर्बिडिटी 4.0 NTU से अधिक होती है, TDS 500 ppm से अधिक होता है, या pH 6.5–8.5 की सीमा से बाहर जाता है, तो स्वच्छ जल वाल्व तुरंत बंद हो जाता है और पानी को पुनः शोधन के लिए मोड़ दिया जाता है।',
    boosterCardTitle: 'बूस्टर फ़ीड पंप',
    boosterCardDesc: 'आरओ मेम्ब्रेन के लिए दबाव बनाता है',
    uvCardTitle: 'UV स्टेरलाइजेशन चैंबर',
    uvCardDesc: '254nm रोगाणु खात्मा',
    inletCardTitle: 'इनलेट सोलेनोइड वाल्व',
    inletCardDesc: 'कच्चे पानी का मुख्य द्वार',
    cleanCardTitle: 'स्वच्छ पेयजल आउटपुट वाल्व',
    cleanCardDesc: 'प्रमाणित शुद्ध जल की आपूर्ति',
    rejectCardTitle: 'पुनः शोधन / रिजेक्ट वाल्व',
    rejectCardDesc: 'पुनः शोधन सुरक्षा लूप',
    emergencyCardTitle: 'आपातकालीन शटडाउन',
    emergencyCardDesc: 'पूरा सिस्टम तुरंत बंद करें',
    hardwareRelayNote: 'हार्डवेयर रिले नियंत्रण',
    turnOnBtn: 'चालू करें',
    turnOffBtn: 'बंद करें',
    openValveBtn: 'वाल्व खोलें',
    closeValveBtn: 'वाल्व बंद करें',
    statusRunningOn: 'चालू (ON)',
    statusIlluminated: 'सक्रिय (प्रकाशमान)',
    statusDispensingOpen: 'प्रवाहित (खुला)',
    statusDivertingOpen: 'डायवर्ट (खुला)',
    statusShutClosed: 'बंद',
    statusDivertedWarning: 'डायवर्ट ⚠',
    statusOpenCheck: 'खुला ✓',
  },

  te: {
    // Brand & Header
    appTitle: 'NexusFlow',
    appSubtitle: 'నిజ-సమయ నీటి శుద్ధీకరణ & స్వయంచాలక రక్షణ వ్యవస్థ',
    waterStatusLabel: 'నీటి స్థితి',
    statusSafe: 'సురక్షితం',
    statusWarning: 'హెచ్చరిక',
    statusUnsafe: 'ప్రమాదకరం',
    statusOffline: 'ఆఫ్‌లైన్',
    liveMode: 'లైవ్ మోడ్',
    demoMode: 'డెమో మోడ్',
    esp32Online: 'ESP32 ఆన్‌లైన్',
    esp32Offline: 'ESP32 ఆఫ్‌లైన్',
    resumeSystem: 'సిస్టమ్ ప్రారంభించండి',
    stopSystem: 'సిస్టమ్ ఆపండి',
    emergencyActiveTitle: 'ఎమర్జెన్సీ స్టాప్ యాక్టివ్ చేయబడింది!',
    emergencyActiveDesc: 'పంప్ మరియు వాల్వ్‌లు ఆపివేయబడ్డాయి. పునఃప్రారంభించడానికి "సిస్టమ్ ప్రారంభించండి" క్లిక్ చేయండి.',
    scenarioLabel: 'పరిశీలన సందర్భాన్ని ఎంచుకోండి:',

    // Navigation
    navDashboard: 'డ్యాష్‌బోర్డ్',
    navWaterQuality: 'నీటి నాణ్యత',
    navFilterHealth: 'ఫిల్టర్ ఆరోగ్యం',
    navSensorHealth: 'సెన్సార్లు',
    navAlerts: 'అలర్ట్‌లు',
    navControls: 'నియంత్రణలు',
    navAquaAi: 'NexusFlow',
    navReports: 'నివేదికలు',
    navDevice: 'పరికరం',

    // Dashboard - Treatment Comparison
    treatmentComparisonTitle: 'నిజ-సమయ నీటి శుద్దీకరణ పోలిక',
    treatmentComparisonSubtitle: 'ఫిల్ట్రేషన్‌కు ముందు మరియు తర్వాత ప్రత్యక్ష సెన్సార్ రీడింగ్‌లు',
    inputWaterTitle: 'ఇన్‌పుట్ నీటి రీడింగ్',
    inputWaterSubtitle: 'ముడి నీటి రీడింగ్',
    outputWaterTitle: 'అవుట్‌పుట్ నీటి రీడింగ్',
    outputWaterSubtitle: 'శుద్ధి చేసిన తాగునీటి ప్రవాహం',
    safeForConsumption: 'తాగడానికి పూర్తి సురక్షితం',
    requiresPurification: 'శుద్దీకరణ అవసరం',
    attentionRecommended: 'జాగ్రత్త / పరిశీలన అవసరం',
    unfitForDrinking: 'తాగడానికి తగదు — మళ్లించబడింది',

    // Metrics
    phLabel: 'pH స్థాయి',
    tdsLabel: 'TDS (కరిగిన లవణాలు)',
    turbidityLabel: 'టర్బిడిటీ (మురికి)',
    temperatureLabel: 'ఉష్ణోగ్రత',
    targetRange: 'లక్ష్యం',
    currentValue: 'ప్రస్తుత విలువ',
    statusNormal: 'సాధారణం',
    statusElevated: 'ఎక్కువ',
    statusUnsafeText: 'ప్రమాదకరం',
    statusCritical: 'తీవ్రమైనది',

    // Performance / Efficiency
    purificationEfficiency: 'శుద్దీకరణ సామర్థ్యం',
    turbidityRemoved: 'మురికి తొలగించబడింది',
    tdsReduced: 'TDS తగ్గించబడింది',
    phStabilized: 'pH స్థిరీకరించబడింది',
    optimalTemp: 'సరైన ఉష్ణోగ్రత',
    optimalStatus: '✓ అనుకూలం',
    adjustingStatus: 'సరిచేస్తోంది',

    // ESP32 Telemetry Section
    esp32SectionTitle: 'IoT టెలిమెట్రీ & పరికరాలు',
    esp32SectionSubtitle: 'హార్డ్‌వేర్ సమాచారం, బ్యాటరీ, నీటి ప్రవాహం మరియు వాల్వ్ స్థితి',
    flowRate: 'ప్రవాహ వేగం',
    batteryLevel: 'బ్యాటరీ',
    uptime: 'నడుస్తున్న సమయం',
    totalTreated: 'మొత్తం శుద్ధి నీరు',
    steadyStream: '• నిరంతర స్థిరమైన ప్రవాహం',
    backupCell: 'LiFePO4 బ్యాకప్ బ్యాటరీ',
    continuousOperation: 'నిరంతర నిరవధిక పనితీరు',
    fullyMonitored: '100% నిరంతర పర్యవేక్షణ',
    hardwareStatus: 'హార్డ్‌వేర్ స్థితి',
    feedPump: 'ఫీడ్ పంప్',
    uvPurifier: 'UV ప్యూరిఫైయర్',
    outputValve: 'అవుట్‌పుట్ వాల్వ్',
    bypassValve: 'బైపాస్ వాల్వ్',
    active: 'యాక్టివ్',
    idle: 'ఐడిల్',
    open: 'తెరిచి ఉంది',
    closed: 'మూసివేయబడింది',

    // Dashboard Filter Health Section
    filterSectionSubtitle: 'శుద్ధి చేసిన నీరు, పని గంటలు మరియు పీడనం ఆధారంగా లెక్కించబడింది',
    filterDetailsBtn: 'వివరాలు',
    daysLeftLabel: 'రోజులు మిగిలి ఉన్నాయి',

    // Disclaimer & Protocol
    disclaimerTitle: 'సెన్సార్ పరిశీలన మరియు ల్యాబ్ పరీక్ష:',
    disclaimerText:
      'NexusFlow భౌతిక పారామితులను (pH, TDS, టర్బిడిటీ, ఉష్ణోగ్రత) ప్రత్యక్షంగా పర్యవేక్షిస్తుంది. రసాయన కాలుష్యం, భారీ లోహాలు లేదా మైనింగ్ ప్రాంతాల నీటికి ధృవీకరించబడిన ల్యాబ్ పరీక్ష తప్పనిసరి.',
    alertsTitle: 'క్రియాశీల హెచ్చరికలు',
    alertsSubtitle: 'పారామితులు సాధారణం కాగానే హెచ్చరికలు స్వయంచాలకంగా తొలగిపోతాయి',
    protocolTitle: 'ముఖ్యమైన నీటి భద్రతా ప్రోటోకాల్:',
    protocolText: 'భౌతిక సెన్సార్లు శుద్దీకరణ నాణ్యతను తనిఖీ చేస్తాయి; రసాయన కాలుష్యం లేదా భారీ లోహాల కోసం ల్యాబ్ పరీక్ష తప్పనిసరి.',
    noActiveWarningsTitle: 'ఎటువంటి క్రియాశీల హెచ్చరికలు లేవు',
    noActiveWarningsDesc: 'అన్ని పారామితులు సురక్షిత పరిమితుల్లో ఉన్నాయి. పరిమితి దాటినప్పుడు హెచ్చరికలు కనిపిస్తాయి మరియు నీరు సురక్షితమైన వెంటనే స్వయంచాలకంగా పరిష్కారమవుతాయి.',
    autoResolvingBadge: 'పారామితులు సాధారణం కాగానే స్వయంచాలక పరిష్కారం',

    // WATER QUALITY READING VIEW
    wqTitle: 'నిజ-సమయ నీటి నాణ్యత & విశ్లేషణ',
    wqSubtitle: 'ముడి ఇన్‌పుట్ నీరు మరియు శుద్ధి చేసిన అవుట్‌పుట్ నీటి ప్రత్యక్ష పోలిక',
    range1h: 'గడచిన 1 గంట',
    range6h: 'గడచిన 6 గంటలు',
    range24h: 'గడచిన 24 గంటలు',
    range7d: 'గడచిన 7 రోజులు',
    turbidityMetric: 'టర్బిడిటీ (మురికి / మడ్డి)',
    turbidityDesc: 'తేలియాడే కణాల ద్వారా కాంతి వెదజల్లే తీవ్రత',
    tdsMetric: 'మొత్తం కరిగిన లవణాలు (TDS)',
    tdsDesc: 'ఖనిజ లవణాలు మరియు కరిగిన పదార్థాల మొత్తం',
    phMetric: 'pH (ఆమ్లత / క్షారత)',
    phDesc: 'ద్రావణంలో హైడ్రోజన్ అయాన్ సాంద్రత',
    tempMetric: 'నీటి ఉష్ణోగ్రత',
    tempDesc: 'శుద్దీకరణ వేగం మరియు నాణ్యతపై ప్రత్యక్ష ప్రభావం',
    compareBoth: 'రెండింటినీ పోల్చండి',
    inputOnly: 'ఇన్‌పుట్ నీరు మాత్రమే',
    outputOnly: 'అవుట్‌పుట్ నీరు మాత్రమే',
    trendGraphTitle: 'ట్రెండ్ గ్రాఫ్',
    lastUpdatedJustNow: 'తాజా సమాచారం: ఇప్పుడే',
    chartInputSeries: 'ఇన్‌పుట్ నీరు',
    chartOutputSeries: 'అవుట్‌పుట్ నీరు',
    maxSafeThreshold: 'గరిష్ట సురక్షిత పరిమితి',
    inputStatsTitle: 'ఇన్‌పుట్ నీటి గణాంకాలు',
    outputStatsTitle: 'అవుట్‌పుట్ నీటి గణాంకాలు',
    statCurrent: 'ప్రస్తుతం',
    statMin: 'కనిష్టం',
    statMax: 'గరిష్టం',
    statAvg: 'సగటు',
    regulatoryRefTitle: 'నిబంధనల ప్రమాణాల సూచన',
    turbidityStandardNote: 'WHO / BIS 10500 ప్రకారం తాగునీటికి టర్బిడిటీ < 1.0 NTU ఉండాలి (గరిష్టంగా 5.0 NTU). అధిక మురికి UV క్రిమిసంహారక సామర్థ్యాన్ని తగ్గిస్తుంది.',
    tdsStandardNote: 'BIS 10500 ప్రకారం 500 ppm ఆమోదయోగ్యమైనది. తాగునీటి రుచికి 50–300 ppm అత్యంత అనుకూలం.',
    phStandardNote: 'WHO & BIS ప్రకారం తాగునీరు 6.5 నుండి 8.5 pH మధ్య ఉండాలి. పరిమితి దాటితే నీరు స్వయంచాలకంగా మళ్లించబడుతుంది.',
    tempStandardNote: 'తాగునీటికి 10°C నుండి 25°C ఉష్ణోగ్రత అనుకూలం. అధిక ఉష్ణోగ్రత బాక్టీరియా పెరుగుదలకు దారితీయవచ్చు.',

    // FILTER HEALTH VIEW
    fhTitle: 'మల్టీ-స్టేజ్ ఫిల్టర్ ఆరోగ్యం & డయాగ్నోస్టిక్స్',
    fhSubtitle: 'పని గంటలు, శుద్ధి చేసిన నీటి పరిమాణం మరియు పీడనం ఆధారంగా జీవితకాల గణన',
    all4StagesBadge: 'అన్ని 4 శుద్ధీకరణ దశలు పర్యవేక్షించబడుతున్నాయి',
    fhStatusGood: 'బాగుంది',
    fhStatusAttention: 'శ్రద్ధ అవసరం',
    fhStatusReplaceSoon: 'త్వరలో మార్చండి',
    fhStatusExpired: 'గడువు ముగిసింది / మార్చండి',
    remainingLifespan: 'మిగిలిన జీవితకాలం',
    estDaysRemaining: 'అంచనా మిగిలిన రోజులు',
    operatingRuntime: 'పని చేసిన సమయం',
    volumeProcessed: 'శుద్ధి చేసిన పరిమాణం',
    flowMembraneStatus: 'ప్రవాహం / మెంబ్రేన్ స్థితి',
    installedDate: 'బిగించిన తేదీ:',
    lastReplacedDate: 'చివరిగా మార్చిన తేదీ:',
    replaceWithNewBtn: 'కొత్త ఫిల్టర్ అమర్చండి',
    installingNewFilter: 'కొత్త ఫిల్టర్ అమర్చబడుతోంది...',
    physicalReplacementNote: 'కొత్త ఫిల్టర్ మార్చినప్పుడు మాత్రమే ఆరోగ్య గణాంకాలు మారతాయి',
    confirmModalTitle: 'కొత్త ఫిల్టర్ మార్పిడిని నిర్ధారించండి',
    confirmModalSubtitle: 'ఫిల్టర్ అమరిక ధృవీకరణ',
    stageLabel: 'ఫిల్టర్ దశ:',
    cartridgeTypeLabel: 'కాట్రిడ్జ్ రకం:',
    currentHealthLabel: 'ప్రస్తుత ఆరోగ్యం:',
    remainingLabel: 'మిగిలి ఉంది',
    modalPhysicalWarning: 'మెషిన్‌లో కొత్త ఫిల్టర్ కార్ట్రిడ్జ్ భౌతికంగా మార్చి అమర్చినప్పుడు మాత్రమే జీవితకాలం అప్‌డేట్ అవుతుంది.',
    confirmCheckboxText: 'నేను కొత్త రీప్లేస్‌మెంట్ ఫిల్టర్ కాట్రిడ్జ్‌ను హౌసింగ్‌లో సరిగ్గా అమర్చినట్లు నిర్ధారిస్తున్నాను.',
    cancelBtn: 'రద్దు చేయి',
    confirmInstallBtn: 'కొత్త ఫిల్టర్ అమరిక నిర్ధారించు',
    toastInstalledSuccess: 'కొత్త ఫిల్టర్ విజయవంతంగా అమర్చబడింది! గణాంకాలు అప్‌డేట్ అయ్యాయి.',
    filterSedimentName: 'సెడిమెంట్ ప్రీ-ఫిల్టర్',
    filterSedimentType: 'స్పన్ పాలీప్రొఫైలిన్ 5µm',
    filterSedimentStatusText: 'అద్భుతమైన యాంత్రిక శుద్దీకరణ. తక్కువ పీడన క్షీణత.',
    filterCarbonName: 'యాక్టివేటెడ్ కార్బన్ కాట్రిడ్జ్',
    filterCarbonType: 'ఎక్స్‌ట్రూడెడ్ బ్లాక్ కార్బన్',
    filterCarbonStatusText: 'క్లోరిన్ మరియు దుర్వాసన శోషణ పూర్తి ప్రభావవంతం.',
    filterRoName: 'RO మెంబ్రేన్',
    filterRoType: 'థిన్-ఫిల్మ్ కాంపోజిట్ (TFC) 75 GPD',
    filterRoStatusText: 'మెంబ్రేన్ రంధ్రాలు శుభ్రంగా ఉన్నాయి. స్వచ్ఛమైన నీటి ప్రవాహం సాధారణం.',
    filterUvName: 'UV స్టెరిలైజర్ ల్యాంప్',
    filterUvType: '254nm జెర్మిసైడల్ ల్యాంప్',
    filterUvStatusText: '254nm కిరణాలు యాక్టివ్‌గా ఉన్నాయి. సూక్ష్మక్రిముల నిర్మూలన ధృవీకరించబడింది.',

    // CONTROLS VIEW
    ctrlTitle: 'సిస్టమ్ నియంత్రణ & సోలనోయిడ్ వాల్వ్‌లు',
    ctrlSubtitle: 'స్వయంచాలక నీటి మళ్లింపు, యాక్యుయేటర్ స్థితి మరియు మాన్యువల్ నియంత్రణ ప్యానెల్',
    operatingModeTitle: 'ఆపరేటింగ్ మోడ్:',
    modeAutoBadge: 'ఆటో',
    modeManualBadge: 'మాన్యువల్',
    emergencyHaltTitle: 'ఎమర్జెన్సీ సిస్టమ్ హాల్ట్ యాక్టివ్',
    emergencyHaltDesc: 'పంప్ ఆపివేయబడింది మరియు అన్ని వాల్వ్‌లు మూసివేయబడ్డాయి. నీటి ప్రవాహం ఆగింది.',
    clearHaltBtn: 'హాల్ట్ తొలగించి సాధారణ ప్రవాహం ప్రారంభించండి',
    hydraulicTitle: 'హైడ్రాలిక్ ప్రవాహం & ఆటోమేటెడ్ డైవర్షన్ మార్గం',
    logicAutoBadge: 'డ్యూయల్-సోలనోయిడ్ ఆటో ఫెయిల్‌సేఫ్',
    logicManualBadge: 'మాన్యువల్ యాక్యుయేటర్ ఓవర్‌రైడ్',
    stage1Badge: 'దశ 1',
    stage2Badge: 'దశ 2',
    purificationCoreBadge: 'శుద్దీకరణ విభాగం',
    sterilizerBadge: 'క్రిమిసంహారకం',
    fourStageFiltration: '4-దశల ఫిల్ట్రేషన్',
    inletValveName: 'ఇన్‌లెట్ వాల్వ్',
    boosterPumpName: 'బూస్టర్ పంప్',
    uvLampName: 'UV ల్యాంప్',
    cleanOutputName: 'శుభ్రమైన అవుట్‌పుట్',
    retreatmentName: 'పునఃశుద్ధి (రిజెక్ట్)',
    autoFailsafeExplanation: 'స్వయంచాలక భద్రతా నియమం: అవుట్‌పుట్ టర్బిడిటీ 4.0 NTU దాటినా, TDS 500 ppm దాటినా, లేదా pH 6.5–8.5 పరిమితి దాటినా, స్వచ్ఛమైన అవుట్‌పుట్ వాల్వ్ వెంటనే మూసివేయబడి, కలుషిత నీరు తాగకుండా రీ-ట్రీట్‌మెంట్‌కు మళ్లించబడుతుంది.',
    boosterCardTitle: 'బూస్టర్ ఫీడ్ పంప్',
    boosterCardDesc: 'RO మెంబ్రేన్ కోసం పీడనాన్ని పెంచుతుంది',
    uvCardTitle: 'UV స్టెరిలైజేషన్ ఛాంబర్',
    uvCardDesc: '254nm క్రిమి నిర్మూలన',
    inletCardTitle: 'ఇన్‌లెట్ సోలనోయిడ్ వాల్వ్',
    inletCardDesc: 'ముడి నీటి ప్రధాన ద్వారం',
    cleanCardTitle: 'శుభ్రమైన తాగునీటి వాల్వ్',
    cleanCardDesc: 'ధృవీకరించిన స్వచ్ఛమైన నీటి సరఫరా',
    rejectCardTitle: 'రీ-ట్రీట్‌మెంట్ / రిజెక్ట్ వాల్వ్',
    rejectCardDesc: 'మళ్లీ శుద్ధి చేసే రక్షణ లూప్',
    emergencyCardTitle: 'ఎమర్జెన్సీ షట్‌డౌన్',
    emergencyCardDesc: 'మొత్తం ప్రవాహాన్ని వెంటనే నిలిపివేయండి',
    hardwareRelayNote: 'హార్డ్‌వేర్ రిలే ఓవర్‌రైట్',
    turnOnBtn: 'ఆన్ చేయండి',
    turnOffBtn: 'ఆఫ్ చేయండి',
    openValveBtn: 'వాల్వ్ తెరవండి',
    closeValveBtn: 'వాల్వ్ మూయండి',
    statusRunningOn: 'నడుస్తోంది (ON)',
    statusIlluminated: 'వెలుగుతోంది (యాక్టివ్)',
    statusDispensingOpen: 'సరఫరా అవుతోంది (తెరిచి ఉంది)',
    statusDivertingOpen: 'మళ్లింపు (తెరిచి ఉంది)',
    statusShutClosed: 'మూసివేయబడింది',
    statusDivertedWarning: 'మళ్లించబడింది ⚠',
    statusOpenCheck: 'తెరిచి ఉంది ✓',
  },
};
