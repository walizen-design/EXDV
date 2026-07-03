export interface ModelSpecs {
  name: string;
  tagline: string;
  class: string;
  priceEstimate: string; // Dynamic visual addition
  topSpeed: number; // km/h
  range: number; // km @ 50km/h
  accel: number; // 0-50 km/h in s
  peakPower: number; // kW
  motorType: string;
  batterySpecs: string;
  chargerType: string;
  chargeTime: string;
  dimensions: string;
  weightNetGross: string;
  wheelbase: number;
  groundClearance: number;
  seatHeight: number;
  maxLoad: number;
  brakes: string;
  suspension: string;
  tyres: string;
  tyreBrand: string;
  smartSystem: string;
  displayType: string;
  waterproof: string;
  hasTriMonitor: boolean;
  hasCameras: boolean;
  colors: { name: string; hex: string }[];
  loadingCapacity: string;
}

export interface ChargingSolution {
  id: string;
  num: string;
  timeLabel: string;
  hours: number; // numerical for animated bar
  title: string;
  desc: string;
  fillPercentage: number;
}

export interface StoryBlock {
  id: string;
  num: string;
  title: string;
  desc: string;
}
