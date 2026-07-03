import { ModelSpecs, ChargingSolution, StoryBlock } from "./types";

export const MODELS_DATA: ModelSpecs[] = [
  {
    name: "E-XDV",
    tagline: "The Perfect Urban Adventure crossover",
    class: "Standard",
    priceEstimate: "Urban Baseline",
    topSpeed: 100,
    range: 130,
    accel: 4.0,
    peakPower: 15,
    motorType: "6000W Mid Drive Motor",
    batterySpecs: "Removable Solid-state Lithium 2×75V 30Ah",
    chargerType: "72V 15A Outside Removable",
    chargeTime: "2.5 Hours",
    dimensions: "1935 x 1285 x 745 mm",
    weightNetGross: "140 / 165 kg",
    wheelbase: 1325,
    groundClearance: 165,
    seatHeight: 800,
    maxLoad: 300,
    brakes: "Front & Rear Disc + Dual Channel CBS",
    suspension: "Upright Front Absorber / Gas Rear Absorber",
    tyres: "Front 110/70-14, Rear 130/70-13",
    tyreBrand: "CST Vacuum Tyres",
    smartSystem: "HECHHI Intelligence + Go APP",
    displayType: "TFT Intelligent Board + GPS Navigation",
    waterproof: "IP67 (All Electric Parts)",
    hasTriMonitor: false,
    hasCameras: false,
    colors: [
      { name: "Storm Grey", hex: "#7a8088" },
      { name: "Glacier White", hex: "#e8e4dc" },
      { name: "Carbon Black", hex: "#1a1a1a" },
      { name: "Ocean Blue", hex: "#3a5a7a" }
    ],
    loadingCapacity: "48 PCS / 40HQ Container"
  },
  {
    name: "E-XDV Pro",
    tagline: "Extended Range and Nissin dual ABS",
    class: "Advanced",
    priceEstimate: "Global Spec V2",
    topSpeed: 115,
    range: 180,
    accel: 3.75,
    peakPower: 15,
    motorType: "6000W Mid Drive Motor",
    batterySpecs: "Removable LG 21700 Cylindrical 2×72V 45Ah",
    chargerType: "84V 25A On-Board Charger (OBC), T2 Socket",
    chargeTime: "4 Hours",
    dimensions: "1935 x 1285 x 745 mm",
    weightNetGross: "140 / 165 kg",
    wheelbase: 1325,
    groundClearance: 165,
    seatHeight: 800,
    maxLoad: 300,
    brakes: "Front & Rear Nissin Calipers + Dual Channel ABS",
    suspension: "Upside Down Front Forks / Gas Rear Absorber",
    tyres: "Front 110/70-14, Rear 130/70-13",
    tyreBrand: "CST Vacuum Tyres",
    smartSystem: "HECHHI Intelligence + Go APP",
    displayType: "TFT Intelligent Board + GPS Navigation",
    waterproof: "IP67 (All Electric Parts)",
    hasTriMonitor: true,
    hasCameras: true,
    colors: [
      { name: "Storm Grey", hex: "#7a8088" },
      { name: "Glacier White", hex: "#e8e4dc" },
      { name: "Carbon Black", hex: "#1a1a1a" },
      { name: "Matte Grey", hex: "#8a8a8a" }
    ],
    loadingCapacity: "48 PCS / 40HQ Container"
  },
  {
    name: "E-XDV Pro Max",
    tagline: "Water-Cooled Flagship with Michelin Grip",
    class: "Flagship",
    priceEstimate: "Ultimate Peak",
    topSpeed: 130,
    range: 230,
    accel: 3.0,
    peakPower: 29,
    motorType: "11000W Water-Cooled Mid Drive Motor",
    batterySpecs: "Removable Solid-state 2×75V 60Ah in Parallel",
    chargerType: "Standard OBC & Car Charger Pile (CCS1/CCS2) Compatible",
    chargeTime: "3 Hours",
    dimensions: "1935 x 1285 x 745 mm",
    weightNetGross: "140 / 165 kg",
    wheelbase: 1325,
    groundClearance: 165,
    seatHeight: 800,
    maxLoad: 300,
    brakes: "Front & Rear Nissin Calipers + Dual Channel ABS",
    suspension: "Upside Down Front Forks / Gas Rear Absorber",
    tyres: "Front 110/70-14, Rear 130/70-13",
    tyreBrand: "Michelin Vacuum Tyres",
    smartSystem: "Easycool Intelligence + Go APP",
    displayType: "TFT Intelligent Board + GPS Navigation",
    waterproof: "IP67 (All Electric Parts)",
    hasTriMonitor: true,
    hasCameras: true,
    colors: [
      { name: "Storm Grey", hex: "#7a8088" },
      { name: "Glacier White", hex: "#e8e4dc" },
      { name: "Carbon Black", hex: "#1a1a1a" },
      { name: "Matte Grey", hex: "#8a8a8a" }
    ],
    loadingCapacity: "48 PCS / 40HQ Container"
  }
];

export const CHARGING_SOLUTIONS: ChargingSolution[] = [
  {
    id: "ccs",
    num: "SOLUTION 01",
    timeLabel: "30 min",
    hours: 0.5,
    title: "Car Charging Station",
    desc: "OBC compatible with CCS1 & CCS2 car charging piles. Pull up to any public car charger and reach full charge in under 30 minutes.",
    fillPercentage: 95
  },
  {
    id: "dedicated",
    num: "SOLUTION 02",
    timeLabel: "20 min",
    hours: 0.33,
    title: "Motorcycle Charging Pile",
    desc: "HECHHI's dedicated high-power pile — 12+12 kW or 6.7+6.7 kW configurations — delivers a full charge in just 20 minutes.",
    fillPercentage: 100
  },
  {
    id: "home",
    num: "SOLUTION 03",
    timeLabel: "2-4 hrs",
    hours: 3.0,
    title: "Home Wall Outlet",
    desc: "Every battery is portable and removable. Carry it inside and charge from any standard 220V plug — no special equipment needed.",
    fillPercentage: 55
  }
];

export const STORY_BLOCKS: StoryBlock[] = [
  {
    id: "architecture",
    num: "01 / ARCHITECTURE",
    title: "Mid-Mounted High-Speed Motor",
    desc: "Every E-XDV is built around HECHHI's mid-mounted Mild Drive architecture — a synchronous belt drive rated for 50,000 km without replacement, with low motor noise and efficiency up to 93%. The Pro Max steps up to an 11 kW water-cooled motor with IP67 protection."
  },
  {
    id: "battery",
    num: "02 / BATTERY",
    title: "Dual-Battery Parallel Technology",
    desc: "Removable solid-state batteries in parallel — the Pro Max runs 2×75V 60Ah for a tested 230 km range at 50 km/h. The dedicated BMS automatically identifies and adjusts differential pressure between battery groups for longer life, with 160A max discharge and 40A charging current."
  },
  {
    id: "intelligence",
    num: "03 / INTELLIGENCE",
    title: "Intelligent Smart System + Go App",
    desc: "The HECHHI Intelligent TFT Board connects to the Go App for GPS navigation, vehicle positioning, track playback, anti-theft, electronic fencing, music, and long-distance intercom — with OTA updates keeping the system current. Pro and Pro Max add tri-monitor and front/rear cameras."
  },
  {
    id: "control",
    num: "04 / CONTROL",
    title: "Braking & Handling",
    desc: "Pro and Pro Max variants are fitted with Nissin calipers and dual-channel ABS, upside-down front forks, and gas rear absorbers. The Pro Max rides on Michelin vacuum tyres — control engineered for triple-digit speeds."
  },
  {
    id: "origin",
    num: "05 / ORIGIN",
    title: "Engineered in Taizhou, Built for the World",
    desc: "Zhejiang Easycool Motorcycle Co., Ltd. operates from China's electric two-wheeler manufacturing heartland with EEC, EPA, ISO9001, CE, and ROHS certifications. Hundreds of motorcycles sold across Europe on the strength of craftsmanship, aesthetic value, and leading technical standards."
  }
];

export const CERTIFICATIONS = ["E13 EEC", "CE", "EPA", "ISO 9001", "ROHS", "DOT"];
