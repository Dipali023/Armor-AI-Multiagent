/* ============================================================
   ARMOR AI — Agent System
   app.js — Complete Feature Logic (All English)
   ============================================================ */

// ========================= DISASTER MODES =========================
const DISASTER_MODES = {
  flood: {
    topStatus:'MUMBAI_FLOOD STATUS', temp:'28°C', cond:'Severe Monsoon Downpour', icon:'⛈️',
    weather:{ icon:'⛈️', temp:'31°C', desc:'Heavy Thunderstorm', hum:'94%', wind:'42 km/h', rain:'156mm/hr', vis:'200m',
      warn:'⚠️ IMD Red Alert — Extreme rainfall. Avoid outdoor movement.' },
    ticker:'🌊 Flood Warning ACTIVE — NDRF deployed in 12 districts | 🚨 Mithi River above danger mark | 🏠 Relief camps open at BKC, Dharavi',
    alerts:[
      {type:'critical',text:'🚨 NDRF Team deployed — Dharavi Zone B — Rescue ongoing',time:'2 mins ago'},
      {type:'warning',text:'⚠️ Mithi River above danger level — Dharavi at risk',time:'5 mins ago'},
      {type:'info',text:'📢 BKC Convention Center — 1,110 beds available',time:'8 mins ago'},
      {type:'safe',text:'✅ Eastern Express Highway (North) — Clear for evacuation',time:'11 mins ago'},
      {type:'critical',text:'🚨 Sion Hospital basement flooded — Patients shifted',time:'14 mins ago'},
    ],
  },
  earthquake: {
    topStatus:'GUJARAT_EARTHQUAKE ALERT', temp:'24°C', cond:'Aftershocks Detected', icon:'🌍',
    weather:{ icon:'🌤️', temp:'24°C', desc:'Partly Cloudy', hum:'55%', wind:'18 km/h', rain:'0mm', vis:'6km',
      warn:'⚠️ Aftershocks possible. Stay away from damaged buildings.' },
    ticker:'🌍 Magnitude 6.1 Earthquake — Gujarat — Aftershocks expected | 🏚️ Old buildings at risk — evacuate | ⚠️ Do not use elevators',
    alerts:[
      {type:'critical',text:'🌍 Magnitude 6.1 — Bhuj, Gujarat — Felt across 8 districts',time:'1 min ago'},
      {type:'warning',text:'⚠️ Old structures showing cracks — immediate evacuation required',time:'4 mins ago'},
      {type:'info',text:'🏥 AIIMS trauma center on high alert — accepting patients',time:'7 mins ago'},
      {type:'warning',text:'⚠️ Gas pipeline check underway — avoid open flames',time:'10 mins ago'},
    ],
  },
  cyclone: {
    topStatus:'ODISHA_CYCLONE WARNING', temp:'26°C', cond:'Cyclone VAYU — 4hrs to Landfall', icon:'🌀',
    weather:{ icon:'🌀', temp:'26°C', desc:'Cyclonic Storm Category 3', hum:'98%', wind:'180 km/h', rain:'240mm/hr', vis:'50m',
      warn:'⚠️ Catastrophic winds. Evacuate coastal areas NOW. Seek solid shelter.' },
    ticker:'🌀 Cyclone VAYU — Category 3 — 180km/h winds | 🌊 10-15ft storm surge expected | 148 cyclone shelters open | ✈️ All flights cancelled',
    alerts:[
      {type:'critical',text:'🌀 Cyclone VAYU — 4 hours to landfall — Category 3',time:'Just now'},
      {type:'critical',text:'🚨 Coastal evacuation MANDATORY — 15km from shore',time:'3 mins ago'},
      {type:'warning',text:'⚡ Power shutdown in 6 districts — generators deployed',time:'6 mins ago'},
      {type:'info',text:'🏠 148 cyclone shelters open — 2.8 lakh capacity',time:'9 mins ago'},
    ],
  },
  heatwave: {
    topStatus:'DELHI_NCR HEATWAVE ALERT', temp:'47°C', cond:'Extreme Heat Wave — Red Alert', icon:'☀️',
    weather:{ icon:'☀️', temp:'47°C', desc:'Extreme Heat Wave', hum:'12%', wind:'8 km/h', rain:'0mm', vis:'4km',
      warn:'⚠️ Dangerous heat. Stay indoors 11am-4pm. Drink ORS every hour.' },
    ticker:'🌡️ Heatwave Alert — Delhi, Rajasthan, UP — 47°C+ | 💧 Drink water every hour | Night shelters open for homeless | 🏥 108 on standby for heat stroke',
    alerts:[
      {type:'critical',text:'🌡️ Heat stroke deaths reported — Delhi, UP, Rajasthan',time:'15 mins ago'},
      {type:'warning',text:'⚠️ Do not go outdoors 11am-4pm — IMD Red Alert',time:'20 mins ago'},
      {type:'info',text:'💧 Free ORS distribution at PHCs and government hospitals',time:'25 mins ago'},
      {type:'safe',text:'✅ Night shelters open — Railway stations and municipal buildings',time:'30 mins ago'},
    ],
  },
  landslide: {
    topStatus:'UTTARAKHAND LANDSLIDE EMERGENCY', temp:'18°C', cond:'Heavy Rain — Landslide Risk', icon:'⛰️',
    weather:{ icon:'🌧️', temp:'18°C', desc:'Heavy Rain — Hill Areas', hum:'96%', wind:'35 km/h', rain:'89mm/hr', vis:'100m',
      warn:'⚠️ Landslide risk HIGH. Evacuate hillside areas immediately.' },
    ticker:'⛰️ Landslide — NH-58 blocked — BRO clearing | 🏚️ 12 homes damaged near Kedarnath route | SDRF deployed | 🚁 IAF helicopters rescuing stranded tourists',
    alerts:[
      {type:'critical',text:'⛰️ Major landslide — NH-58 completely blocked — BRO on site',time:'5 mins ago'},
      {type:'critical',text:'🚁 IAF helicopter rescue — 45 tourists stranded near Kedarnath',time:'8 mins ago'},
      {type:'warning',text:'⚠️ More rainfall expected next 24hrs — risk remains HIGH',time:'12 mins ago'},
      {type:'info',text:'🏕️ SDRF camps established at Rishikesh and Haridwar',time:'18 mins ago'},
    ],
  },
};

// ========================= STATE DATA =========================
const STATE_DATA = {
  maharashtra:{name:'Maharashtra',city:'Mumbai',mapCenter:[19.0760,72.8777],zoom:12,
    shelters:[
      {id:1,name:'Dharavi Community Center',lat:19.0454,lng:72.8543,cap:500,cur:320,dist:'2.3km',status:'open',contact:'022-24044012'},
      {id:2,name:'BKC Convention Centre',lat:19.0665,lng:72.8676,cap:2000,cur:890,dist:'6.2km',status:'open',contact:'022-26590000'},
      {id:3,name:'Kurla Sports Complex',lat:19.0703,lng:72.8893,cap:1200,cur:1100,dist:'5.8km',status:'partial',contact:'022-25221445'},
      {id:4,name:'Bandra Relief Camp',lat:19.0596,lng:72.8295,cap:800,cur:450,dist:'4.1km',status:'open',contact:'022-26554321'},
    ],
    hospitals:[
      {id:1,name:'KEM Hospital',lat:19.0033,lng:72.8424,dist:'3.2km',status:'open',beds:45,spec:'Trauma, Emergency'},
      {id:2,name:'Seth GS Medical College',lat:19.0070,lng:72.8420,dist:'3.5km',status:'open',beds:30,spec:'Multi-specialty'},
      {id:3,name:'Hinduja Hospital',lat:19.0586,lng:72.8353,dist:'4.5km',status:'open',beds:22,spec:'ICU, Emergency'},
    ],
    roads:[
      {name:'Eastern Express Highway (North)',status:'safe',info:'Clear — 2 lanes operational. Primary evacuation route.',update:'12 mins ago'},
      {name:'Western Express Highway',status:'caution',info:'1 lane open. Speed limit 40 km/h. Debris on shoulder.',update:'8 mins ago'},
      {name:'LBS Marg (Kurla–Sion)',status:'flooded',info:'3 feet of water. No vehicles can pass.',update:'5 mins ago'},
      {name:'Bandra-Worli Sea Link',status:'blocked',info:'Closed due to high winds. No access.',update:'31 mins ago'},
      {name:'NH-48 (Mumbai–Pune)',status:'safe',info:'Clear. Alternative evacuation route.',update:'14 mins ago'},
    ],
  },
  kerala:{name:'Kerala',city:'Thiruvananthapuram',mapCenter:[8.5241,76.9366],zoom:11,
    shelters:[
      {id:1,name:'Indira Gandhi Stadium',lat:8.5241,lng:76.9366,cap:3000,cur:1200,dist:'1.5km',status:'open',contact:'0471-2302133'},
      {id:2,name:'GMC Medical College Ground',lat:8.5150,lng:76.9290,cap:1500,cur:800,dist:'3.2km',status:'open',contact:'0471-2528386'},
    ],
    hospitals:[
      {id:1,name:'Sree Chitra Tirunal Hospital',lat:8.5200,lng:76.9150,dist:'2.1km',status:'open',beds:55,spec:'Cardiology, Emergency'},
      {id:2,name:'Govt Medical College TVM',lat:8.5090,lng:76.9480,dist:'3.8km',status:'open',beds:38,spec:'Multi-specialty'},
    ],
    roads:[
      {name:'NH-66 (Trivandrum–Kollam)',status:'caution',info:'Waterlogging. Drive cautiously.',update:'10 mins ago'},
      {name:'MC Road (Alappuzha)',status:'flooded',info:'Completely submerged. No vehicles.',update:'6 mins ago'},
      {name:'NH-183 (Wayanad)',status:'blocked',info:'Landslide. Completely closed.',update:'20 mins ago'},
    ],
  },
  odisha:{name:'Odisha',city:'Bhubaneswar',mapCenter:[20.2961,85.8245],zoom:12,
    shelters:[
      {id:1,name:'Kalinga Stadium',lat:20.2961,lng:85.8245,cap:5000,cur:2100,dist:'2.0km',status:'open',contact:'0674-2534177'},
      {id:2,name:'Puri Cyclone Shelter',lat:19.8135,lng:85.8312,cap:3000,cur:1800,dist:'8.5km',status:'open',contact:'06752-222222'},
    ],
    hospitals:[
      {id:1,name:'AIIMS Bhubaneswar',lat:20.2961,lng:85.8245,dist:'1.5km',status:'open',beds:80,spec:'All specialties'},
      {id:2,name:'SCB Medical College',lat:20.4625,lng:85.8828,dist:'12km',status:'open',beds:55,spec:'Trauma, Emergency'},
    ],
    roads:[
      {name:'NH-16 (Bhubaneswar–Kolkata)',status:'caution',info:'Debris. Proceed with caution.',update:'18 mins ago'},
      {name:'Puri–Bhubaneswar Road',status:'blocked',info:'Cyclone damage. NHAI repairing.',update:'22 mins ago'},
      {name:'Coastal Highway',status:'flooded',info:'Storm surge. Completely closed.',update:'5 mins ago'},
    ],
  },
  gujarat:{name:'Gujarat',city:'Ahmedabad',mapCenter:[23.0225,72.5714],zoom:12,
    shelters:[
      {id:1,name:'GMDC Ground',lat:23.0420,lng:72.5600,cap:8000,cur:3200,dist:'2.5km',status:'open',contact:'079-23251900'},
      {id:2,name:'Narendra Modi Stadium Outer',lat:23.0900,lng:72.5800,dist:'5.1km',cap:5000,cur:1800,status:'open',contact:'079-23251900'},
    ],
    hospitals:[
      {id:1,name:'Civil Hospital Ahmedabad',lat:23.0650,lng:72.5850,dist:'3.2km',status:'open',beds:100,spec:'Trauma, Emergency'},
      {id:2,name:'VS Hospital',lat:23.0400,lng:72.5780,dist:'2.1km',status:'open',beds:60,spec:'Multi-specialty'},
    ],
    roads:[
      {name:'NH-48 (Ahmedabad–Mumbai)',status:'safe',info:'Clear. Safe evacuation route.',update:'11 mins ago'},
      {name:'SG Highway',status:'caution',info:'Debris removal underway.',update:'25 mins ago'},
      {name:'Sabarmati Bridge',status:'blocked',info:'River in spate. Bridge closed.',update:'15 mins ago'},
    ],
  },
  uttarakhand:{name:'Uttarakhand',city:'Dehradun',mapCenter:[30.3165,78.0322],zoom:12,
    shelters:[
      {id:1,name:'FRI Dehradun Ground',lat:30.3350,lng:77.9990,cap:2000,cur:450,dist:'3.5km',status:'open',contact:'0135-2710334'},
      {id:2,name:'BHEL Township Hall',lat:30.3400,lng:77.9800,cap:1500,cur:620,dist:'5.2km',status:'open',contact:'0135-2710334'},
    ],
    hospitals:[
      {id:1,name:'AIIMS Rishikesh',lat:30.0869,lng:78.2676,dist:'25km',status:'open',beds:60,spec:'Trauma, All'},
      {id:2,name:'Base Hospital Dehradun',lat:30.3265,lng:78.0422,dist:'1.8km',status:'open',beds:40,spec:'Emergency'},
    ],
    roads:[
      {name:'NH-58 (Delhi–Badrinath)',status:'blocked',info:'Landslide. BRO clearing.',update:'8 mins ago'},
      {name:'Mussoorie Road',status:'blocked',info:'Hill collapse. Closed.',update:'15 mins ago'},
      {name:'Haridwar Bypass',status:'safe',info:'Clear. Route to plains.',update:'20 mins ago'},
    ],
  },
  tamilnadu:{name:'Tamil Nadu',city:'Chennai',mapCenter:[13.0827,80.2707],zoom:12,
    shelters:[
      {id:1,name:'Nehru Indoor Stadium',lat:13.0750,lng:80.2698,cap:5000,cur:2100,dist:'1.2km',status:'open',contact:'044-28592591'},
      {id:2,name:'Marina Beach Cyclone Shelter',lat:13.0550,lng:80.2820,cap:8000,cur:3500,dist:'3.4km',status:'open',contact:'044-25347000'},
    ],
    hospitals:[
      {id:1,name:'Govt General Hospital Chennai',lat:13.0810,lng:80.2720,dist:'0.8km',status:'open',beds:90,spec:'Emergency, Trauma'},
      {id:2,name:'Rajiv Gandhi Govt Hospital',lat:13.0780,lng:80.2810,dist:'1.5km',status:'open',beds:65,spec:'Multi-specialty'},
    ],
    roads:[
      {name:'NH-44 (Chennai–Bangalore)',status:'safe',info:'Clear. Use for evacuation.',update:'12 mins ago'},
      {name:'East Coast Road (ECR)',status:'flooded',info:'Storm surge. Completely closed.',update:'6 mins ago'},
    ],
  },
  westbengal:{name:'West Bengal',city:'Kolkata',mapCenter:[22.5726,88.3639],zoom:12,
    shelters:[
      {id:1,name:'Netaji Indoor Stadium',lat:22.5520,lng:88.3500,cap:5000,cur:2800,dist:'2.5km',status:'open',contact:'033-22143526'},
      {id:2,name:'Salt Lake Stadium',lat:22.5780,lng:88.4160,cap:7000,cur:3100,dist:'6.2km',status:'open',contact:'033-22143526'},
    ],
    hospitals:[
      {id:1,name:'SSKM Hospital Kolkata',lat:22.5380,lng:88.3410,dist:'1.8km',status:'open',beds:80,spec:'Emergency, Trauma'},
      {id:2,name:'NRS Medical College',lat:22.5630,lng:88.3630,dist:'1.2km',status:'open',beds:55,spec:'Multi-specialty'},
    ],
    roads:[
      {name:'NH-12 (Kolkata–Siliguri)',status:'caution',info:'Waterlogging. Drive carefully.',update:'14 mins ago'},
      {name:'Howrah Bridge',status:'open',info:'Open. Normal traffic.',update:'5 mins ago'},
      {name:'Diamond Harbour Road',status:'flooded',info:'Storm surge. Closed.',update:'10 mins ago'},
    ],
  },
  assam:{name:'Assam',city:'Guwahati',mapCenter:[26.1445,91.7362],zoom:12,
    shelters:[
      {id:1,name:'Sarusajai Sports Complex',lat:26.1600,lng:91.7100,cap:4000,cur:1800,dist:'3.2km',status:'open',contact:'0361-2237221'},
      {id:2,name:'Handique College Ground',lat:26.1850,lng:91.7500,cap:2000,cur:900,dist:'5.8km',status:'open',contact:'0361-2237221'},
    ],
    hospitals:[
      {id:1,name:'AIIMS Guwahati',lat:26.1100,lng:91.6900,dist:'6.5km',status:'open',beds:70,spec:'All specialties'},
      {id:2,name:'Gauhati Medical College',lat:26.1800,lng:91.7440,dist:'4.2km',status:'open',beds:50,spec:'Emergency, Trauma'},
    ],
    roads:[
      {name:'NH-27 (Guwahati–Silchar)',status:'flooded',info:'Brahmaputra water. Completely closed.',update:'8 mins ago'},
      {name:'AT Road Guwahati',status:'caution',info:'Waterlogging. Caution.',update:'15 mins ago'},
      {name:'NH-17 (Guwahati–Shillong)',status:'safe',info:'Clear. Evacuation route.',update:'25 mins ago'},
    ],
  },
  delhi:{name:'Delhi/NCR',city:'New Delhi',mapCenter:[28.6139,77.2090],zoom:12,
    shelters:[
      {id:1,name:'JLN Stadium Shelter',lat:28.6014,lng:77.2333,cap:10000,cur:3200,dist:'3.5km',status:'open',contact:'011-23438252'},
      {id:2,name:'Yamuna Sports Complex',lat:28.6430,lng:77.2840,cap:5000,cur:1800,dist:'5.2km',status:'open',contact:'011-23438252'},
    ],
    hospitals:[
      {id:1,name:'AIIMS New Delhi',lat:28.5672,lng:77.2100,dist:'5.8km',status:'open',beds:120,spec:'All specialties, Trauma'},
      {id:2,name:'Safdarjung Hospital',lat:28.5678,lng:77.2083,dist:'5.9km',status:'open',beds:90,spec:'Emergency, Burn'},
    ],
    roads:[
      {name:'Ring Road',status:'safe',info:'Clear. Evacuation route.',update:'15 mins ago'},
      {name:'Yamuna Expressway',status:'caution',info:'Waterlogging near floodplains.',update:'10 mins ago'},
      {name:'DND Flyway',status:'flooded',info:'Yamuna water. Closed.',update:'5 mins ago'},
    ],
  },
  bihar:{name:'Bihar',city:'Patna',mapCenter:[25.5941,85.1376],zoom:12,
    shelters:[
      {id:1,name:'Patna Exhibition Ground',lat:25.6100,lng:85.1200,cap:8000,cur:4200,dist:'2.8km',status:'open',contact:'0612-2294204'},
      {id:2,name:'Gandhi Maidan Patna',lat:25.6000,lng:85.1400,cap:5000,cur:2800,dist:'1.5km',status:'partial',contact:'0612-2294204'},
    ],
    hospitals:[
      {id:1,name:'AIIMS Patna',lat:25.5659,lng:85.0606,dist:'8.2km',status:'open',beds:80,spec:'All specialties'},
      {id:2,name:'PMCH Patna',lat:25.6040,lng:85.1380,dist:'1.2km',status:'open',beds:65,spec:'Emergency, General'},
    ],
    roads:[
      {name:'NH-31 (Patna–Kolkata)',status:'flooded',info:'Ganga floodwater. Closed.',update:'6 mins ago'},
      {name:'Bailey Road Patna',status:'safe',info:'Clear. Safe.',update:'18 mins ago'},
      {name:'Mahatma Gandhi Setu',status:'caution',info:'Ganga high. Heavy vehicles banned.',update:'9 mins ago'},
    ],
  },
};

let currentState = 'maharashtra';
let currentMode = 'flood';

// ========================= REGISTERED PEOPLE (Safety Registry) =========================
let registeredPeople = [
  {name:'raj',notes:'No additional status notes provided.',status:'need_assistance',time:'Just Now'},
  {name:'asoa',notes:'aaaa',status:'safe_shelter',time:'Just Now'},
  {name:'Priya Sharma',notes:'With family, safe at Dadar Relief Hall',status:'safe_shelter',time:'5 mins ago'},
  {name:'Rajesh Kumar',notes:'Power out but structural home safe in Bandra',status:'safe_shelter',time:'6 mins ago'},
  {name:'Meena Devi',notes:'Evacuating to BKC shelter, need transport assistance',status:'need_assistance',time:'12 mins ago'},
  {name:'Suresh Patel',notes:'Family of 6 at Kurla shelter, everyone safe',status:'safe_shelter',time:'18 mins ago'},
  {name:'Anita Nair',notes:'Stranded on rooftop, first floor flooded',status:'need_rescue',time:'22 mins ago'},
];

// ========================= SUPPLY BOARD =========================
let supplyItems = [
  {type:'need',cat:'food',person:'Sunita Patel',loc:'Dharavi Sector 4',desc:'Family of 5, no food for 12 hours. 2 children under 5.',time:'5 mins ago',status:'unmatched'},
  {type:'offer',cat:'food',person:'Asha Foundation',loc:'Andheri West',desc:'200 food packets available for distribution.',time:'7 mins ago',status:'available'},
  {type:'need',cat:'medicine',person:'Dr. R. Kulkarni',loc:'Kurla West, 3rd Floor',desc:'Insulin urgently needed for elderly diabetic patient.',time:'10 mins ago',status:'matched'},
  {type:'offer',cat:'transport',person:'Vikram Singh',loc:'Bandra East',desc:'SUV with 6 seats available for rescue transport.',time:'12 mins ago',status:'matched'},
  {type:'need',cat:'shelter',person:'Fatima Shaikh',loc:'Bandra Station Area',desc:'Family of 3, hut destroyed by floodwater.',time:'20 mins ago',status:'unmatched'},
  {type:'offer',cat:'medicine',person:'CRY Volunteer',loc:'Sion Hospital',desc:'ORS packets, paracetamol and basic meds available.',time:'25 mins ago',status:'available'},
];

// ========================= VOLUNTEER TASKS =========================
const VOL_TASKS = [
  {id:1,title:'Medical Support — Dharavi Relief Camp',urgency:'critical',loc:'Dharavi, Mumbai',skills:'Medical / First Aid',slots:5,filled:2,desc:'Provide basic medical care to 500+ flood evacuees at the camp. Doctors and nurses preferred.'},
  {id:2,title:'NDRF Boat Rescue Assistant',urgency:'critical',loc:'Kurla, Mumbai',skills:'Swimming / Water Rescue',slots:8,filled:5,desc:'Assist NDRF teams with boat rescue operations in flooded zones. Swimming ability mandatory.'},
  {id:3,title:'Emergency Transport Driver',urgency:'critical',loc:'Mumbai Wide',skills:'4WD / Heavy Vehicle Driver',slots:15,filled:8,desc:'Transport evacuees and relief supplies in flooded zones. 4WD vehicle preferred.'},
  {id:4,title:'Food Distribution at BKC Shelter',urgency:'normal',loc:'Bandra-Kurla Complex',skills:'General',slots:20,filled:12,desc:'Pack and distribute meals to 2000+ evacuees. No special skills required.'},
  {id:5,title:'Translation Support (Marathi/Urdu)',urgency:'normal',loc:'Multiple Shelters',skills:'Bilingual Marathi/Urdu',slots:10,filled:3,desc:'Help communicate with evacuees who do not speak English or Hindi.'},
  {id:6,title:'Mental Health Counseling',urgency:'normal',loc:'BKC & Dharavi Shelters',skills:'Psychology / Counseling',slots:6,filled:1,desc:'Provide emotional and psychological support to disaster victims.'},
  {id:7,title:'IT & Communication Support',urgency:'normal',loc:'State EOC Mumbai',skills:'IT / Radio Communication',slots:4,filled:2,desc:'Help maintain communication systems and data management at Emergency Operations Center.'},
];

let signedUpTasks = new Set();

const VOL_NEEDS = [
  {role:'Doctor / Nurse',urgency:'high',count:'125 needed'},
  {role:'NDRF Diver / Swimmer',urgency:'high',count:'45 needed'},
  {role:'Food Distribution',urgency:'medium',count:'500 needed'},
  {role:'Emergency Driver',urgency:'high',count:'80 needed'},
  {role:'Translator (Regional)',urgency:'medium',count:'60 needed'},
  {role:'Mental Health Support',urgency:'low',count:'30 needed'},
];

// ========================= NEWS =========================
const NEWS = [
  {tag:'🔴 BREAKING',tagCls:'red',text:'IMD issues Red Alert for Mumbai, Maharashtra — heavy to very heavy rainfall to continue for next 48 hours.',src:'IMD Official • 35 mins ago'},
  {tag:'🟡 UPDATE',tagCls:'amber',text:'NDRF 12 teams deployed in Mumbai. 2,847 people rescued so far. Operations ongoing in Kurla and Sion.',src:'NDRF PRO • 1 hour ago'},
  {tag:'🟢 RELIEF',tagCls:'green',text:'CM announces 247 relief camps across Maharashtra. Free food and water. Toll-free: 1800-22-6789.',src:'Govt of Maharashtra • 2 hours ago'},
  {tag:'🔴 ALERT',tagCls:'red',text:'Stay away from Kurla, Sion, Dharavi areas. Roads flooded. Do not attempt to drive through water.',src:'Mumbai Police • 2 hrs ago'},
];

const NEW_ALERTS_POOL = [
  {type:'info',text:'📡 Satellite imagery updated — new flood mapping complete'},
  {type:'safe',text:'✅ Bandra West water receding — roads opening soon'},
  {type:'critical',text:'🚨 New rescue request — Sion area, 12 people trapped'},
  {type:'warning',text:'⚠️ Malad landslide risk — evacuate hillside areas'},
  {type:'info',text:'📦 500 food packets distributed at Dharavi shelter'},
];

// ========================= AI RESPONSES =========================
const AI_RESPONSES = {
  shelter:{kw:['shelter','camp','refuge','stay','roof','nearest shelter'],
    r:'🏠 **Nearest Emergency Shelters:**\n\n1. **Dharavi Community Center** — 2.3km\n   📍 90 Feet Road, Dharavi | Capacity: 500 | ✅ Open\n   📞 022-24044012\n\n2. **BKC Convention Center** — 6.2km\n   📍 Bandra-Kurla Complex | Capacity: 2000 | ✅ Open\n   📞 022-26590000\n\n3. **Bandra Relief Camp** — 4.1km\n   📍 Near Bandra Station | Capacity: 800 | ⚠️ Partial\n\n📍 View interactive map in **Live Disaster Map** section.\n\n💡 **Tip:** Carry documents (Aadhaar), medicines, and 3L of water to the shelter.'},
  road:{kw:['road','route','drive','highway','blocked','safe road','travel'],
    r:'🛣️ **Road Safety Status:**\n\n✅ **Safe Routes:**\n• Eastern Express Highway (North) — Clear\n• NH-48 Mumbai–Pune — Open\n\n⚠️ **Use Caution:**\n• Western Express Highway — 1 lane only\n• Sion–Panvel — debris on road\n\n🚫 **Closed/Flooded:**\n• LBS Marg Kurla–Sion — 3 feet water ❌\n• Bandra-Worli Sea Link — closed ❌\n\n📍 Full details in **Shelters & Roads** section.'},
  medical:{kw:['medical','hospital','doctor','ambulance','medicine','sick','injured','hurt'],
    r:'🏥 **Medical Help:**\n\n📞 **Call immediately:** 108 (Ambulance) or 112 (Emergency)\n\n**Nearest Hospitals:**\n• KEM Hospital — 3.2km | ✅ 45 beds available\n• Seth GS Medical College — 3.5km | ✅ Open\n• Hinduja Hospital — 4.5km | ✅ ICU available\n\n🩸 **Blood needed:** O- and AB- — Contact KEM Hospital\n\n💊 **Medicine helpline:** 104 (National Health Helpline)\n\n⚠️ Government hospitals provide FREE emergency treatment.'},
  rescue:{kw:['rescue','trapped','stranded','stuck','help','emergency','flooding','sinking','rooftop'],
    r:'🆘 **You Need Rescue — Act NOW:**\n\n1. **Call 112 immediately** — National Emergency\n2. **Call NDRF:** 9711077372\n3. **Use SOS button** in sidebar (bottom left)\n\n**While waiting:**\n• Move to highest floor or rooftop\n• Wave bright cloth to signal rescue teams\n• Signal with torch at night (3 flashes = SOS)\n• Stay calm, conserve phone battery\n\n**NDRF Boat Service:** Available in flooded zones. Report your exact location.\n\n🚁 Air rescue available for life-threatening situations — call 112.'},
  heatwave:{kw:['heatwave','heat','hot','temperature','heat stroke','sun'],
    r:'🌡️ **Heatwave Safety:**\n\n⛺ **Stay indoors** — avoid outdoors 11am–4pm\n💧 **Drink water** — every hour, minimum 1 liter\n👕 **Wear loose, light, cotton clothing**\n❄️ **Stay in cool places** — AC, fan, shade\n\n**Heat Stroke Symptoms:**\n• Temperature 40°C+, unconscious, vomiting\n• Call 108 immediately\n\n**Free Night Shelters** available at railway stations and municipal buildings.\n\n🧂 **ORS (Oral Rehydration Solution):** Mix in water — prevents dehydration.'},
  ndrf:{kw:['ndrf','ndma','government force','rescue team'],
    r:'🛡️ **NDRF / NDMA Contacts:**\n\n📞 **NDRF Helpline:** 9711077372\n📞 **NDMA Control Room:** 011-26701728\n📞 **Disaster Helpline:** 1078\n\n**NDRF Capabilities:**\n• Flood, earthquake, cyclone rescue\n• Medical first aid\n• Relief distribution\n\n**State Disaster Response Force (SDRF):**\n• Maharashtra: 022-22694725\n• Kerala: 0471-2727800\n\n🌐 Register as volunteer: ndma.gov.in'},
  supplies:{kw:['supply','kit','bag','pack','food','water','what to carry','essential'],
    r:'📦 **Emergency Supply Checklist:**\n\n💧 Water — 3L/person/day (3 days)\n🍱 Dry food — Rice, dal, biscuits, nuts\n💊 Medicines — 7 days prescription medicines\n🔦 Torch — with extra batteries\n📄 Documents — Aadhaar, Ration Card (waterproofed)\n📻 Battery radio — for official updates\n🩹 First Aid kit\n👕 Extra clothes + raincoat\n🌿 ORS packets\n\n✅ Full checklist in the **Prepare** section!'},
  donate:{kw:['donate','donation','contribute','pm cares','fund','money'],
    r:'💝 **Donate to Relief Funds:**\n\n🇮🇳 **PM CARES Fund:** pmcares.gov.in\n   • UPI: pmcares@sbi | 80G Tax exemption\n\n💚 **PMNRF:** pmnrf.gov.in\n\n🔴 **Red Cross India:** indianredcross.org\n\n🌿 **Goonj:** goonj.org (donate goods)\n\n📦 **Give India:** give.do\n\n**All donations are 100% tax deductible under Section 80G.**'},
  cpr:{kw:['cpr','cardiac','heart attack','unconscious','not breathing'],
    r:'💗 **CPR — Step by Step:**\n\n1. **Call 112 immediately**\n2. Lay the person flat on their back on hard surface\n3. **Chest compressions:**\n   • Place heel of hand on center of chest\n   • Press down 5–6 cm deep\n   • 100–120 compressions per minute\n4. **30 compressions → 2 rescue breaths**\n5. Continue until ambulance arrives\n\n✋ **Untrained?** Do chest compressions only — still saves lives!\n\n**Any CPR is better than no CPR.**'},
  default:'🤖 **Hello! I\'m Armor AI — Your 24/7 Emergency Assistant.**\n\nI can help you with:\n\n🏠 Find nearest shelter\n\n🛣️ Safe road routes\n\n🏥 Medical help & hospitals\n\n🆘 Rescue assistance\n\n📦 Emergency supplies list\n\n🛡️ NDRF contact & info\n\n🌡️ Heatwave safety\n\n💗 CPR & first aid\n\n💝 How to donate\n\nType your question in English and I\'ll help immediately.',
};

// ========================= MAP =========================
let mapInst = null, mapTileLayer = null, shelterMarkers = [], hospitalMarkers = [], dangerMarkers = [];

function initMap() {
  const sd = STATE_DATA[currentState];
  mapInst = L.map('emergency-map',{center:sd.mapCenter,zoom:sd.zoom});
  
  const isLight = document.body.classList.contains('light-theme');
  const tileUrl = isLight 
    ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
  
  mapTileLayer = L.tileLayer(tileUrl,{
    attribution:'© OpenStreetMap © CARTO', maxZoom:19
  }).addTo(mapInst);
  
  addStateMarkers(sd);
  renderMIPList('shelters');
}

function mkIcon(emoji) {
  return L.divIcon({html:`<div style="font-size:24px;text-shadow:0 2px 8px rgba(0,0,0,.9);filter:drop-shadow(0 2px 4px rgba(0,0,0,.8))">${emoji}</div>`,iconSize:[32,32],iconAnchor:[16,16],className:''});
}

function addStateMarkers(sd) {
  shelterMarkers.forEach(m=>mapInst.removeLayer(m)); shelterMarkers=[];
  hospitalMarkers.forEach(m=>mapInst.removeLayer(m)); hospitalMarkers=[];
  dangerMarkers.forEach(m=>mapInst.removeLayer(m)); dangerMarkers=[];
  sd.shelters.forEach(s=>{
    const fill=Math.round((s.cur/s.cap)*100);
    const col=fill>85?'#EF4444':fill>60?'#F59E0B':'#10B981';
    const m=L.marker([s.lat,s.lng],{icon:mkIcon('🏠')}).bindPopup(`
      <div style="font-family:Inter,sans-serif;min-width:220px;padding:4px">
        <strong style="font-size:.95rem">🏠 ${s.name}</strong>
        <div style="margin:8px 0 4px;height:6px;background:rgba(255,255,255,.1);border-radius:99px">
          <div style="width:${fill}%;height:100%;background:${col};border-radius:99px"></div>
        </div>
        <small style="color:#94A3B8">📍 ${s.dist} away | 👥 ${s.cur}/${s.cap} capacity</small><br>
        <small style="color:#94A3B8">📞 ${s.contact}</small><br>
        <span style="color:${s.status==='open'?'#10B981':'#F59E0B'};font-weight:700;font-size:.82rem">
          ${s.status==='open'?'✅ Open':'⚠️ Partial'}
        </span>
      </div>`).addTo(mapInst);
    m.on('click', () => focusMapItem(s.lat, s.lng, s.name, 'shelters'));
    shelterMarkers.push(m);
  });
  sd.hospitals.forEach(h=>{
    const m=L.marker([h.lat,h.lng],{icon:mkIcon('🏥')}).bindPopup(`
      <div style="font-family:Inter,sans-serif;min-width:220px;padding:4px">
        <strong style="font-size:.95rem">🏥 ${h.name}</strong><br>
        <small style="color:#94A3B8">📍 ${h.dist} | 🛏️ ${h.beds} beds | ⚕️ ${h.spec}</small><br>
        <span style="color:${h.status==='open'?'#10B981':'#EF4444'};font-weight:700;font-size:.82rem">
          ${h.status==='open'?'✅ Accepting Patients':'⛔ Full'}
        </span>
      </div>`).addTo(mapInst);
    m.on('click', () => focusMapItem(h.lat, h.lng, h.name, 'hospitals'));
    hospitalMarkers.push(m);
  });
  const ndrfM=L.marker(sd.mapCenter,{icon:mkIcon('🛡️')}).bindPopup(`<strong>🛡️ NDRF Control Room</strong><br><small>📞 9711077372 | Helpline: 1078</small>`).addTo(mapInst);
  dangerMarkers.push(ndrfM);
}

function renderMIPList(type) {
  const sd = STATE_DATA[currentState];
  const data = type==='shelters'?sd.shelters:sd.hospitals;
  document.getElementById('mip-list').innerHTML = data.map(item=>`
    <div class="mip-item" onclick="focusMapItem(${item.lat},${item.lng},'${item.name.replace(/'/g,"\\'")}','${type}')">
      <div class="mip-item-name">${type==='shelters'?'🏠':'🏥'} ${item.name}</div>
      <div class="mip-item-detail">📍 ${item.dist}</div>
      ${type==='shelters'
        ?`<div class="mip-item-detail">👥 ${item.cur}/${item.cap} capacity</div><div class="mip-item-status ${item.status}">${item.status==='open'?'✅ Open':'⚠️ Partial'}</div>`
        :`<div class="mip-item-detail">🛏️ ${item.beds} beds • ${item.spec}</div><div class="mip-item-status ${item.status==='open'?'open':'full'}">${item.status==='open'?'✅ Open':'⛔ Full'}</div>`
      }
    </div>`).join('');
}

// ========================= DASHBOARD INIT =========================
function initDashboard() {
  // Stats counter animation
  document.querySelectorAll('.sb-num').forEach(el=>{
    const target=parseInt(el.dataset.target); if(!target) return;
    let cur=0, step=target/80;
    const t=setInterval(()=>{
      cur+=step; if(cur>=target){el.textContent=target.toLocaleString();clearInterval(t);}
      else el.textContent=Math.floor(cur).toLocaleString();
    },16);
  });
  // Alert feed
  renderAlertFeed(DISASTER_MODES[currentMode].alerts);
  // Weather
  updateWeather();
  // News
  renderNews();
  // Ticker
  updateTopBar();
  // Auto-add alerts
  setInterval(()=>{
    const a=NEW_ALERTS_POOL[Math.floor(Math.random()*NEW_ALERTS_POOL.length)];
    const now=new Date().toLocaleTimeString('en',{hour:'2-digit',minute:'2-digit'});
    const feed=document.getElementById('alert-feed');
    const item=document.createElement('div');
    item.className=`alert-item ${a.type}`;
    item.innerHTML=`<div>${a.text}</div><div class="alert-time">Just now — ${now}</div>`;
    feed.insertBefore(item,feed.firstChild);
    if(feed.children.length>10) feed.removeChild(feed.lastChild);
  },14000);
}

function renderAlertFeed(alerts) {
  document.getElementById('alert-feed').innerHTML=alerts.map(a=>`
    <div class="alert-item ${a.type}"><div>${a.text}</div><div class="alert-time">${a.time}</div></div>`).join('');
}

function updateWeather() {
  const w=DISASTER_MODES[currentMode].weather;
  document.getElementById('w-icon').textContent=w.icon;
  document.getElementById('w-temp').textContent=w.temp;
  document.getElementById('w-desc').textContent=w.desc;
  document.getElementById('w-hum').textContent=w.hum;
  document.getElementById('w-wind').textContent=w.wind;
  document.getElementById('w-rain').textContent=w.rain;
  document.getElementById('w-vis').textContent=w.vis;
  document.getElementById('w-warn').textContent=w.warn;
}

function updateTopBar() {
  const d=DISASTER_MODES[currentMode];
  document.getElementById('tb-status-name').textContent=d.topStatus;
  document.getElementById('tb-temp').textContent=d.temp;
  document.getElementById('tb-cond').textContent=d.cond;
  document.getElementById('tb-icon').textContent=d.icon;
  document.getElementById('ticker-inline').textContent=d.ticker;
}

function renderNews() {
  document.getElementById('news-feed').innerHTML=NEWS.map(n=>`
    <div class="news-item">
      <span class="news-tag ${n.tagCls}">${n.tag}</span>
      <div><div>${n.text}</div><div class="news-src">${n.src}</div></div>
    </div>`).join('');
}

// ========================= DISASTER MODE CHANGE =========================
function setDisasterMode(mode) {
  currentMode=mode;
  updateTopBar();
  updateWeather();
  renderAlertFeed(DISASTER_MODES[mode].alerts);
  logAgentAction('SystemAgent', `Toggled disaster event context to: ${mode.toUpperCase()}`, 'system');
  logAgentAction('TriageAgent', `Ingesting weather indicators: ${DISASTER_MODES[mode].cond}`, 'triage');
}

// ========================= STATE CHANGE =========================
function setStateData(state) {
  currentState=state;
  const sd=STATE_DATA[state];
  const label=`${sd.city.toUpperCase()} STATUS`;
  document.getElementById('tb-status-name').textContent=label;
  renderSheltersGrid();
  renderRoadsGrid('all');
  renderHospitalsGrid();
  if(mapInst){
    mapInst.flyTo(sd.mapCenter,sd.zoom,{animate:true,duration:1.5});
    addStateMarkers(sd);
  }
  renderMIPList('shelters');
  logAgentAction('SystemAgent', `Shifted location context to ${sd.name} (${sd.city})`, 'system');
}

// ========================= SHELTERS & ROADS =========================
function renderSheltersGrid() {
  const shelters=STATE_DATA[currentState].shelters;
  document.getElementById('shelters-grid').innerHTML=shelters.map(s=>{
    const fill=Math.round((s.cur/s.cap)*100);
    const fc=fill>85?'full':fill>60?'warn':'ok';
    return `<div class="shelter-card">
      <div class="sc-name">🏠 ${s.name}</div>
      <div class="sc-detail">📍 ${s.dist} away</div>
      <div class="sc-detail">👥 ${s.cur} / ${s.cap} capacity</div>
      <div class="sc-detail">📞 ${s.contact}</div>
      <div class="cap-bar"><div class="cap-fill ${fc}" style="width:${fill}%"></div></div>
      <div class="sc-status ${s.status}">${s.status==='open'?'✅ Open & Accepting':'⚠️ Partially Full'}</div>
    </div>`;
  }).join('');
}

function renderRoadsGrid(filter) {
  const roads=STATE_DATA[currentState].roads;
  const data=filter==='all'?roads:roads.filter(r=>r.status===filter);
  const bl={safe:'✅ SAFE',caution:'⚠️ CAUTION',blocked:'🚫 BLOCKED',flooded:'🌊 FLOODED',open:'✅ OPEN'};
  const rc={safe:'rb-safe',caution:'rb-caution',blocked:'rb-blocked',flooded:'rb-flooded',open:'rb-safe'};
  document.getElementById('roads-grid').innerHTML=data.length
    ?data.map(r=>`<div class="road-card ${r.status}">
        <span class="road-badge ${rc[r.status]||rc.safe}">${bl[r.status]||r.status.toUpperCase()}</span>
        <div class="road-name">${r.name}</div>
        <div class="road-info">${r.info}</div>
        <div class="road-update">🕐 Updated ${r.update}</div>
      </div>`).join('')
    :'<p style="color:var(--txt3);padding:24px;grid-column:1/-1;text-align:center">No roads match this filter.</p>';
}

function renderHospitalsGrid() {
  const hospitals=STATE_DATA[currentState].hospitals;
  document.getElementById('hospitals-grid').innerHTML=hospitals.map(h=>`
    <div class="hospital-card">
      <div class="sc-name">🏥 ${h.name}</div>
      <div class="sc-detail">📍 ${h.dist} away</div>
      <div class="sc-detail">🛏️ ${h.beds} beds available</div>
      <div class="sc-detail">⚕️ ${h.spec}</div>
      <div class="sc-status ${h.status==='open'?'open':'full'}">${h.status==='open'?'✅ Accepting Patients':'⛔ Currently Full'}</div>
    </div>`).join('');
}

// ========================= AI CHAT =========================
let isHindi=false;
function initChat() {
  addMsg('🤖 **Welcome to Armor AI Emergency Assistant!**\n\nI can help you with:\n• 🏠 Find nearest shelters\n• 🛣️ Safe road routes\n• 🏥 Medical help & hospitals\n• 🆘 Rescue assistance\n• 📦 Emergency supplies\n• 🛡️ NDRF contact info\n\nType your question below or use the quick chips. I\'m available 24/7.', false);
}

function addMsg(text,isUser) {
  const msgs=document.getElementById('chat-messages');
  const div=document.createElement('div');
  div.className='message '+(isUser?'user':'ai');
  const time=new Date().toLocaleTimeString('en',{hour:'2-digit',minute:'2-digit'});
  const fmt=text.replace(/\n/g,'<br>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
  div.innerHTML=`<div class="msg-av">${isUser?'👤':'🤖'}</div><div><div class="msg-bubble">${fmt}</div><div class="msg-time">${time}</div></div>`;
  msgs.appendChild(div); msgs.scrollTop=msgs.scrollHeight;
}

function showTyping() {
  const msgs=document.getElementById('chat-messages');
  const d=document.createElement('div'); d.className='message ai'; d.id='typing-ind';
  d.innerHTML=`<div class="msg-av">🤖</div><div class="msg-bubble"><div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div>`;
  msgs.appendChild(d); msgs.scrollTop=msgs.scrollHeight;
}
function removeTyping() { document.getElementById('typing-ind')?.remove(); }

function getAIResponse(text) {
  const lower=text.toLowerCase();
  for(const[key,data] of Object.entries(AI_RESPONSES)){
    if(key==='default'||!data.kw) continue;
    if(data.kw.some(kw=>lower.includes(kw))) return data.r;
  }
  return AI_RESPONSES.default;
}

function sendMessage() {
  const input=document.getElementById('chat-input');
  const text=input.value.trim(); if(!text) return;
  addMsg(text,true); input.value=''; showTyping();
  
  logAgentAction('TriageAgent', `Received user input: "${text}"`, 'triage');
  
  setTimeout(()=>{
    removeTyping();
    const response = getAIResponse(text);
    
    // Log Agent thoughts
    const lower = text.toLowerCase();
    let cat = 'general';
    for (const [key, d] of Object.entries(AI_RESPONSES)) {
      if (key !== 'default' && d.kw && d.kw.some(kw => lower.includes(kw))) {
        cat = key; break;
      }
    }
    
    if (cat === 'shelter') {
      logAgentAction('GeoAgent', `Indexing closest shelter coordinates under state context ${currentState.toUpperCase()}...`, 'geo');
      logAgentAction('GeoAgent', `Found active shelter locations (BKC, Dharavi). Sending geofenced list.`, 'geo');
    } else if (cat === 'road') {
      logAgentAction('GeoAgent', `Scanning local road telemetry... WEH cautioned, LBS Marg blocked.`, 'geo');
    } else if (cat === 'medical') {
      logAgentAction('GeoAgent', `Checking medical bed capacity across Government AIIMS & KEM centers...`, 'geo');
    } else if (cat === 'rescue') {
      logAgentAction('DispatchAgent', `URGENT: Evacuation request parsed. Forwarding coordinates to NDRF control.`, 'dispatch');
    } else {
      logAgentAction('TriageAgent', `No priority trigger keywords matched. Directing to Default conversational response.`, 'triage');
    }
    
    addMsg(response,false);
  },800+Math.random()*600);
}

function sendQR(text) { document.getElementById('chat-input').value=text; sendMessage(); }
function clearChat() { document.getElementById('chat-messages').innerHTML=''; initChat(); }
function toggleLang() {
  isHindi=!isHindi;
  document.getElementById('lang-btn').textContent=isHindi?'🌐 English':'🌐 हिंदी';
  addMsg(isHindi?'🌐 **Hindi mode activated!** You can now type in Hindi. I\'ll respond in both languages.':'🌐 Switched back to English mode. How can I help you?',false);
}

// ========================= SUPPLY MATCHING HUB =========================
function initSupplyBoard() {
  renderSupplyBoard();
}

function renderSupplyBoard() {
  const el=document.getElementById('supply-board-list');
  el.innerHTML=supplyItems.map(item=>{
    const isBadge=item.status==='matched'?'matched':item.type;
    const badge=item.status==='matched'?'🔗 MATCHED':item.type==='need'?'🆘 NEED':'✅ OFFER';
    return `<div class="supply-item ${item.status==='matched'?'matched':item.type}">
      <div class="si-header">
        <div class="si-person">👤 ${item.person}</div>
        <span class="si-badge ${isBadge}">${badge}</span>
      </div>
      <div class="si-loc">📍 ${item.loc} | ${item.cat.toUpperCase()}</div>
      <div class="si-desc">${item.desc}</div>
      <div class="si-time">⏱ ${item.time}</div>
      ${item.status!=='matched'?`<button class="si-connect" onclick="connectSupply('${item.person.replace(/'/g,"\\'")}')">🔗 Connect</button>`:'<span style="font-size:.72rem;color:var(--blue-l);font-weight:700">✅ Already Connected</span>'}
    </div>`;
  }).join('');
}

function postNeed() {
  const type=document.getElementById('need-type').value;
  const loc=document.getElementById('need-loc').value.trim();
  const qty=document.getElementById('need-qty').value.trim();
  const notes=document.getElementById('need-notes').value.trim();
  if(!loc){alert('Please enter your location.');return;}
  const typeLabels={food:'food',medicine:'medicine',clothes:'clothes',transport:'transport',rescue:'rescue',shelter:'shelter'};
  supplyItems.unshift({type:'need',cat:typeLabels[type]||type,person:'You (Anonymous)',loc,desc:`${qty?qty+'. ':''}${notes||'No additional notes.'}`,time:'Just now',status:'unmatched'});
  renderSupplyBoard();
  document.getElementById('need-loc').value=''; document.getElementById('need-qty').value=''; document.getElementById('need-notes').value='';
  alert('✅ Your need has been posted. Matching volunteers will be notified in your area.');
  logAgentAction('MatchAgent', `Registered Supply NEED: ${type} at "${loc}". Matching coordinates...`, 'match');
}

function postOffer() {
  const type=document.getElementById('offer-type').value;
  const loc=document.getElementById('offer-loc').value.trim();
  const qty=document.getElementById('offer-qty').value.trim();
  const contact=document.getElementById('offer-contact').value.trim();
  if(!loc){alert('Please enter your location.');return;}
  supplyItems.unshift({type:'offer',cat:type,person:'You (Volunteer)',loc,desc:`${qty?qty+'. ':''}Contact: ${contact||'Provided on connect'}.`,time:'Just now',status:'available'});
  renderSupplyBoard();
  document.getElementById('offer-loc').value=''; document.getElementById('offer-qty').value=''; document.getElementById('offer-contact').value='';
  alert('✅ Your offer has been posted. We\'ll match you with people in need nearby. Thank you!');
  logAgentAction('MatchAgent', `Registered Supply OFFER: ${type} at "${loc}". Broadcast matching active.`, 'match');
}

function connectSupply(name) {
  alert(`✅ Connection request sent to ${name}!\n\nA coordinator will contact you within 30 minutes to arrange the handover.\n\nHelpline: 1800-22-2222`);
  const item=supplyItems.find(i=>i.person===name);
  if(item) item.status='matched';
  renderSupplyBoard();
  logAgentAction('MatchAgent', `Connected demand node with donor "${name}". Matching links active.`, 'match');
}

// ========================= SAFETY REGISTRY =========================
const STATUS_MAP = {
  'safe_home':   {label:'SAFE (AT HOME)',    cls:'green',cardCls:'safe'},
  'safe_shelter':{label:'SAFE (AT SHELTER)', cls:'green',cardCls:'safe'},
  'need_assistance':{label:'NEEDS ASSISTANCE',cls:'red',cardCls:'assist'},
  'evacuating':  {label:'EVACUATING',        cls:'amber',cardCls:'evacuating'},
  'need_rescue': {label:'NEEDS RESCUE 🆘',   cls:'red', cardCls:'rescue'},
};

function initSafetyRegistry() {
  renderPeopleList(registeredPeople);
}

function renderPeopleList(list) {
  document.getElementById('rp-count').textContent=list.length;
  document.getElementById('people-list').innerHTML=list.map(p=>{
    const s=STATUS_MAP[p.status]||STATUS_MAP['need_assistance'];
    return `<div class="person-card ${s.cardCls}">
      <div class="pc-name">${p.name}</div>
      <div class="pc-notes">${p.notes}</div>
      <span class="pc-badge ${s.cls}">${s.label}</span>
      <div class="pc-footer">
        <span class="pc-time">Logged: ${p.time}</span>
        <button class="pc-subscribe" onclick="subscribeAlert('${p.name.replace(/'/g,"\\'")}')">SUBSCRIBE</button>
      </div>
    </div>`;
  }).join('');
}

function registerSafety() {
  const name=document.getElementById('reg-name').value.trim();
  const status=document.getElementById('reg-status').value;
  const notes=document.getElementById('reg-notes').value.trim();
  if(!name){alert('Please enter your full name.');return;}
  registeredPeople.unshift({name,status,notes:notes||'No additional status notes provided.',time:'Just Now'});
  renderPeopleList(registeredPeople);
  document.getElementById('reg-name').value=''; document.getElementById('reg-notes').value='';
  const s=STATUS_MAP[status];
  alert(`✅ ${name} registered successfully!\n\nStatus: ${s.label}\n\nYour safety status is now visible to family members and NDRF coordinators.`);
  logAgentAction('SafetyAgent', `Safety check-in: "${name}" committed to safety registry as status: ${status.toUpperCase()}.`, 'safety');
}

function searchPeople(q) {
  if(!q){renderPeopleList(registeredPeople);return;}
  const f=registeredPeople.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())||p.notes.toLowerCase().includes(q.toLowerCase()));
  renderPeopleList(f);
  logAgentAction('SafetyAgent', `Searching family directory database for query key: "${q}"`, 'safety');
}

function subscribeAlert(name) {
  alert(`🔔 Subscribed to updates for ${name}.\n\nYou will be notified when their status changes.`);
}

// ========================= VOLUNTEER TASKS =========================
function initVolunteerTasks() {
  const urgent=VOL_TASKS.filter(t=>t.urgency==='critical');
  const normal=VOL_TASKS.filter(t=>t.urgency==='normal');
  document.getElementById('vol-tasks-urgent').innerHTML=urgent.map(t=>renderTaskCard(t)).join('');
  document.getElementById('vol-tasks-normal').innerHTML=normal.map(t=>renderTaskCard(t)).join('');
  renderVolUrgentNeeds();
}

function renderTaskCard(t) {
  const signed=signedUpTasks.has(t.id);
  const pct=Math.round((t.filled/t.slots)*100);
  return `<div class="vol-task">
    <div class="vol-task-header">
      <div class="vol-task-title">${t.title}</div>
      <span class="urgency-badge ${t.urgency}">${t.urgency==='critical'?'🔴 CRITICAL':'🟡 STANDARD'}</span>
    </div>
    <div class="vol-task-meta">
      <span>📍 ${t.loc}</span>
      <span>🛠️ ${t.skills}</span>
      <span>👥 ${t.filled}/${t.slots} signed up</span>
    </div>
    <div class="vol-task-desc">${t.desc}</div>
    <div style="height:4px;background:rgba(255,255,255,.07);border-radius:99px;margin-bottom:10px">
      <div style="width:${pct}%;height:100%;background:${pct>80?'#EF4444':'#3B82F6'};border-radius:99px"></div>
    </div>
    <div class="vol-task-footer">
      <span class="vol-slots">${t.slots-t.filled} spots remaining</span>
      <button class="btn-signup ${signed?'signed':''}" onclick="signUpTask(${t.id})" id="btn-task-${t.id}">
        ${signed?'✅ Signed Up':'Sign Up'}
      </button>
    </div>
  </div>`;
}

function signUpTask(id) {
  if(signedUpTasks.has(id)){alert('You are already signed up for this task!');return;}
  const task=VOL_TASKS.find(t=>t.id===id);
  signedUpTasks.add(id); task.filled++;
  alert(`✅ You've signed up for:\n"${task.title}"\n\nLocation: ${task.loc}\n\nA coordinator will contact you within 1 hour. Thank you for helping! 🙏`);
  initVolunteerTasks();
  logAgentAction('MatchAgent', `Volunteer assigned to task: "${task.title}". Spots remaining: ${task.slots - task.filled}`, 'match');
}

function registerVolunteer() {
  const name=document.getElementById('vol-name').value.trim();
  const phone=document.getElementById('vol-phone').value.trim();
  const skill=document.getElementById('vol-skill').value;
  if(!name||!phone){alert('Please enter your name and phone number.');return;}
  alert(`✅ ${name}, you're registered as a volunteer!\n\nSkill: ${skill}\nPhone: ${phone}\n\nA coordinator will contact you within 30 minutes. Thank you for your service! 🙏`);
  document.getElementById('vol-name').value=''; document.getElementById('vol-phone').value='';
  logAgentAction('MatchAgent', `New volunteer registered: "${name}" [Skillset: ${skill}]`, 'match');
}

function renderVolUrgentNeeds() {
  document.getElementById('vol-urgent-needs').innerHTML=VOL_NEEDS.map(v=>`
    <div class="vun-item">
      <span class="vun-role">${v.role}</span>
      <span class="vun-count ${v.urgency}">${v.count}</span>
    </div>`).join('');
}

// ========================= SOS =========================
function openSOS() {
  document.getElementById('sos-modal').classList.add('active');
  const locEl=document.getElementById('sos-loc');
  locEl.textContent='📍 Detecting your location...';
  navigator.geolocation?.getCurrentPosition(
    pos=>{ locEl.textContent=`📍 ${pos.coords.latitude.toFixed(4)}°N, ${pos.coords.longitude.toFixed(4)}°E (±${Math.round(pos.coords.accuracy)}m)`; },
    ()=>{ const sd=STATE_DATA[currentState]; locEl.textContent=`📍 ${sd.city}, ${sd.name} (approximate)`; }
  );
}

function broadcastSOS() {
  logAgentAction('DispatchAgent', '🚨 SOS EMERGENCY SIGNAL INITIATED BY USER!', 'dispatch');
  const sd = STATE_DATA[currentState];
  const loc = userLocation || [sd.mapCenter[0], sd.mapCenter[1]];
  logAgentAction('DispatchAgent', `Broadcast locked on: Lat ${loc[0].toFixed(4)}, Lng ${loc[1].toFixed(4)}. State context: ${currentState.toUpperCase()}.`, 'dispatch');
  logAgentAction('DispatchAgent', `NDRF dispatch center notified. Alerting volunteers in 5km radius.`, 'dispatch');
  alert('🆘 SOS Broadcast Sent!\n\nYour location has been shared with:\n✅ NDRF Control Room\n✅ State Disaster Management\n✅ Nearest volunteers (5km radius)\n✅ Police & Fire services\n\n⏱️ Estimated response: 15–25 minutes\n\nStay on highest floor and signal with bright cloth or torch.\n\n📞 Call 112 right now for fastest response.');
  closeModal('sos-modal');
}

function closeModal(id) { document.getElementById(id).classList.remove('active'); }

function toggleBandwidth() {
  const pill=document.getElementById('bw-pill');
  pill.classList.toggle('on');
}

function toggleTheme() {
  const isLight = document.body.classList.toggle('light-theme');
  const pill = document.getElementById('theme-pill');
  if (pill) {
    if (isLight) {
      pill.classList.add('on');
    } else {
      pill.classList.remove('on');
    }
  }
  if (mapInst && mapTileLayer) {
    const tileUrl = isLight 
      ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    mapTileLayer.setUrl(tileUrl);
  }
  logAgentAction('SystemAgent', `Theme toggled to ${isLight ? 'LIGHT MODE' : 'DARK MODE'}. Tile layer layers synchronizing...`, 'system');
}

// ========================= PAGE NAVIGATION =========================
function switchPage(pageId) {
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  const page=document.getElementById('page-'+pageId);
  if(page) page.classList.add('active');
  const nav=document.querySelector(`[data-page="${pageId}"]`);
  if(nav) nav.classList.add('active');
  // Lazy init for map
  if(pageId==='map' && mapInst) setTimeout(()=>mapInst.invalidateSize(),300);
  window.scrollTo({top:0,behavior:'smooth'});
}

// ========================= MAIN INIT =========================
document.addEventListener('DOMContentLoaded',()=>{
  // Nav buttons
  document.querySelectorAll('.nav-item').forEach(btn=>{
    btn.addEventListener('click',()=>switchPage(btn.dataset.page));
  });
  // Disaster mode
  document.getElementById('disaster-mode').addEventListener('change',e=>setDisasterMode(e.target.value));
  // State
  document.getElementById('state-select').addEventListener('change',e=>setStateData(e.target.value));
  // SOS
  document.getElementById('sos-trigger').addEventListener('click',openSOS);
  // Chat enter key
  document.getElementById('chat-input').addEventListener('keydown',e=>{if(e.key==='Enter')sendMessage();});
  // Shelter/Roads tabs
  document.querySelectorAll('.sh-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      document.querySelectorAll('.sh-tab').forEach(t=>t.classList.remove('active'));
      document.querySelectorAll('.sh-panel').forEach(p=>p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('sh-'+tab.dataset.sh).classList.add('active');
    });
  });
  // Road filters
  document.querySelectorAll('.road-filter').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.road-filter').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active'); renderRoadsGrid(btn.dataset.rf);
    });
  });
  // Map info panel tabs
  document.querySelectorAll('.mip-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      document.querySelectorAll('.mip-tab').forEach(t=>t.classList.remove('active'));
      tab.classList.add('active'); renderMIPList(tab.dataset.mt);
    });
  });
  // Map layer toggles
  document.getElementById('tog-shelters').addEventListener('change',e=>{
    shelterMarkers.forEach(m=>e.target.checked?m.addTo(mapInst):mapInst.removeLayer(m));
  });
  document.getElementById('tog-hospitals').addEventListener('change',e=>{
    hospitalMarkers.forEach(m=>e.target.checked?m.addTo(mapInst):mapInst.removeLayer(m));
  });
  document.getElementById('tog-danger').addEventListener('change',e=>{
    dangerMarkers.forEach(m=>e.target.checked?m.addTo(mapInst):mapInst.removeLayer(m));
  });
  // Locate btn
  document.getElementById('locate-btn').addEventListener('click',()=>{
    navigator.geolocation?.getCurrentPosition(pos=>{
      userLocation = [pos.coords.latitude,pos.coords.longitude];
      mapInst.flyTo(userLocation,15);
      L.marker(userLocation,{icon:mkIcon('📍')}).addTo(mapInst).bindPopup('<strong>📍 Your Location</strong>').openPopup();
      logAgentAction('GeoAgent', `GPS telemetry received. Coordinates locked.`, 'geo');
    },()=>alert('Could not get your location.'));
  });
  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(m=>{
    m.addEventListener('click',e=>{if(e.target===m)closeModal(m.id);});
  });
  // Search in safety registry
  document.getElementById('people-search').addEventListener('input',e=>searchPeople(e.target.value));

  // Init all sections
  initDashboard();
  initMap();
  initChat();
  renderSheltersGrid();
  renderRoadsGrid('all');
  renderHospitalsGrid();
  initSupplyBoard();
  initSafetyRegistry();
  initVolunteerTasks();
});

// ========================= NEW TACTICAL AGENT FEATURES =========================
let userLocation = null;
let routePolyline = null;
let isSimulating = false;

// Multi-Agent Log System
function logAgentAction(agentName, message, type = 'system') {
  const logEl = document.getElementById('agent-log');
  if (!logEl) return;
  const time = new Date().toLocaleTimeString('en', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const div = document.createElement('div');
  div.className = `log-line agent-${agentName.toLowerCase().replace('agent', '')} ${type}`;
  div.textContent = `[${time}] [${agentName}] ${message}`;
  logEl.appendChild(div);
  logEl.scrollTop = logEl.scrollHeight;
}

// Leaflet Route focus
function focusMapItem(lat, lng, name, type) {
  if (!mapInst) return;
  mapInst.flyTo([lat, lng], 15, { animate: true, duration: 1.2 });
  
  const sd = STATE_DATA[currentState];
  if (!userLocation) {
    userLocation = [sd.mapCenter[0] + 0.008, sd.mapCenter[1] - 0.008];
  }
  
  if (routePolyline) {
    mapInst.removeLayer(routePolyline);
  }
  
  routePolyline = L.polyline([userLocation, [lat, lng]], {
    color: '#00f0ff',
    weight: 4,
    opacity: 0.8,
    dashArray: '8, 8',
    className: 'glowing-route'
  }).addTo(mapInst);
  
  logAgentAction('GeoAgent', `Calculating safe route path to ${type === 'shelters' ? 'shelter' : 'hospital'}: "${name}"...`, 'geo');
  logAgentAction('GeoAgent', `Safe route overlay applied to Leaflet map context.`, 'geo');
}

// Crisis Simulator
function runSimulation() {
  if (isSimulating) return;
  isSimulating = true;
  
  const btn = document.getElementById('btn-run-sim');
  const progressWrap = document.getElementById('sim-progress-wrap');
  const progress = document.getElementById('sim-progress');
  
  if (btn) btn.disabled = true;
  if (progressWrap) progressWrap.style.display = 'block';
  if (progress) progress.style.width = '0%';
  
  logAgentAction('SystemAgent', '🚨 EMERGENCY CRISIS SIMULATION TRIGGERED!', 'system');
  logAgentAction('TriageAgent', 'Scanning geographic sensors... Disaster alert broadcast incoming.', 'triage');
  
  // Step 1 (T=2s): Change Disaster State & Mode
  setTimeout(() => {
    if (progress) progress.style.width = '25%';
    const simulatedStates = ['gujarat', 'odisha', 'uttarakhand', 'delhi'];
    const randomState = simulatedStates[Math.floor(Math.random() * simulatedStates.length)];
    const stateDisasterMap = { gujarat: 'earthquake', odisha: 'cyclone', uttarakhand: 'landslide', delhi: 'heatwave' };
    
    // Set select values
    document.getElementById('state-select').value = randomState;
    document.getElementById('disaster-mode').value = stateDisasterMap[randomState];
    
    setStateData(randomState);
    setDisasterMode(stateDisasterMap[randomState]);
    
    logAgentAction('SystemAgent', `Simulated disaster telemetry set to ${randomState.toUpperCase()} - ${stateDisasterMap[randomState].toUpperCase()}.`, 'system');
    logAgentAction('TriageAgent', `Telemetry parsed. Weather sensors report critical threshold reached.`, 'triage');
  }, 2000);
  
  // Step 2 (T=5s): Spawning Danger Zones on Map
  setTimeout(() => {
    if (progress) progress.style.width = '50%';
    const sd = STATE_DATA[currentState];
    logAgentAction('GeoAgent', `Querying coordinates index for state ${sd.name}. Pinpointing hazard epicentre...`, 'geo');
    
    if (mapInst) {
      const dangerOffset = [sd.mapCenter[0] + 0.005, sd.mapCenter[1] - 0.005];
      const m = L.circle(dangerOffset, {
        color: '#ff0055',
        fillColor: '#ff0055',
        fillOpacity: 0.35,
        radius: 1200
      }).addTo(mapInst).bindPopup('<strong>⚠️ HAZARD AREA: Simulated Danger Zone</strong>').openPopup();
      dangerMarkers.push(m);
      mapInst.flyTo(dangerOffset, 14, { animate: true, duration: 1 });
    }
    logAgentAction('GeoAgent', `Danger radius mapped: 1.2km surrounding hazard coordinates. Map layers updated.`, 'geo');
  }, 5000);
  
  // Step 3 (T=8s): Inject Mock Needs & Offers
  setTimeout(() => {
    if (progress) progress.style.width = '75%';
    logAgentAction('MatchAgent', 'Scanning supply queue for unfulfilled requests...', 'match');
    
    const sd = STATE_DATA[currentState];
    const city = sd.city;
    
    // Push new simulated items
    supplyItems.unshift({
      type: 'need',
      cat: 'medicine',
      person: 'Emergency Center Clinic',
      loc: `${city} Sector 2`,
      desc: 'Simulated Need: Insulin & ORS supplies required immediately for 45 refugees.',
      time: '1 min ago',
      status: 'unmatched'
    });
    supplyItems.unshift({
      type: 'offer',
      cat: 'medicine',
      person: 'Medical Association Group',
      loc: `${city} Central`,
      desc: 'Simulated Offer: Providing 100 insulin doses and first-aid kits.',
      time: 'Just now',
      status: 'available'
    });
    
    renderSupplyBoard();
    logAgentAction('MatchAgent', `Incoming demand: medicine at ${city} Sector 2. Incoming supply: medicine at ${city} Central.`, 'match');
  }, 8000);
  
  // Step 4 (T=11s): Automatic Matching Engine Solves
  setTimeout(() => {
    if (progress) progress.style.width = '90%';
    logAgentAction('MatchAgent', 'Running real-time supply matching engine...', 'match');
    
    // Auto match
    const need = supplyItems.find(i => i.type === 'need' && i.person === 'Emergency Center Clinic');
    const offer = supplyItems.find(i => i.type === 'offer' && i.person === 'Medical Association Group');
    if (need) need.status = 'matched';
    if (offer) offer.status = 'matched';
    
    renderSupplyBoard();
    logAgentAction('MatchAgent', `SUCCESS: Match solved! Connect initiated between Emergency Clinic and Medical Group.`, 'match');
  }, 11000);
  
  // Step 5 (T=14s): Simulation Completion
  setTimeout(() => {
    if (progress) progress.style.width = '100%';
    logAgentAction('SystemAgent', '✅ Crisis Response Simulation completed successfully. All agents returning to standby.', 'system');
    
    isSimulating = false;
    if (btn) btn.disabled = false;
    setTimeout(() => {
      if (progressWrap) progressWrap.style.display = 'none';
    }, 1000);
  }, 14000);
}

// Simulated SMS Portal logic
function sendSMS() {
  const input = document.getElementById('sms-input');
  const text = input.value.trim();
  if (!text) return;
  
  // Render user sent message in phone UI
  const msgList = document.getElementById('sms-messages');
  if (!msgList) return;
  
  const userDiv = document.createElement('div');
  userDiv.className = 'sms-msg user';
  userDiv.textContent = text;
  msgList.appendChild(userDiv);
  input.value = '';
  msgList.scrollTop = msgList.scrollHeight;
  
  // Parse command
  logAgentAction('TriageAgent', `SMS Gateway received message: "${text}"`, 'triage');
  
  setTimeout(() => {
    const parts = text.split(' ');
    const cmd = parts[0].toUpperCase();
    let reply = "";
    
    if (cmd === 'HELP') {
      reply = "📲 SMS Gateway Commands:\n\n1. SOS [DISASTER] [LOCATION] (e.g. SOS FLOOD DHARAVI)\n2. SHELTER [LOCATION] (e.g. SHELTER BANDRA)\n3. STATUS [NAME] [SAFE/NEED] (e.g. STATUS AMIT SAFE)";
      logAgentAction('TriageAgent', `SMS Gateway processed HELP instructions.`, 'triage');
    } else if (cmd === 'SOS') {
      const disaster = parts[1] || 'EMERGENCY';
      const loc = parts.slice(2).join(' ') || 'UNKNOWN';
      reply = `🚨 SOS Broadcast Received!\n\nDisaster: ${disaster.toUpperCase()}\nLocation: ${loc.toUpperCase()}\n\nNDRF alerted. Standby. Avoid low-lying areas.`;
      
      logAgentAction('DispatchAgent', `SMS SOS Alert: ${disaster.toUpperCase()} at ${loc.toUpperCase()}`, 'dispatch');
      logAgentAction('DispatchAgent', `SDRF notified. Pinpointing transmitter area...`, 'dispatch');
    } else if (cmd === 'SHELTER') {
      const loc = parts.slice(1).join(' ') || 'nearby';
      reply = `🏠 Safe Shelters matching "${loc}":\n\n1. BKC Relief Hall (Open)\n2. Dharavi Center (2.3km away)\n\nReply SOS to request immediate pickup.`;
      
      logAgentAction('GeoAgent', `SMS Shelter Query resolved for pattern: "${loc}".`, 'geo');
    } else if (cmd === 'STATUS') {
      const name = parts[1] || 'Anonymous';
      const status = parts[2] || 'SAFE';
      reply = `✅ Safety Registry checked-in: ${name} marked as ${status.toUpperCase()}. Thank you.`;
      
      registeredPeople.unshift({ name, status: status.toLowerCase() === 'safe' ? 'safe_shelter' : 'need_assistance', notes: 'Checked in via Offline SMS Gateway.', time: 'Just Now' });
      renderPeopleList(registeredPeople);
      
      logAgentAction('SafetyAgent', `SMS Registry Write: "${name}" registered via SMS Gateway as ${status.toUpperCase()}.`, 'safety');
    } else {
      reply = "❌ Command not recognized. Send HELP to view available emergency SMS commands.";
      logAgentAction('TriageAgent', `SMS Gateway parse failure on: "${text}"`, 'triage');
    }
    
    // Render phone gateway reply
    const gateDiv = document.createElement('div');
    gateDiv.className = 'sms-msg gateway';
    gateDiv.innerHTML = reply.replace(/\n/g, '<br>');
    msgList.appendChild(gateDiv);
    msgList.scrollTop = msgList.scrollHeight;
  }, 1000);
}
