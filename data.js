export const EVENT = {
  id:'xxl-arena-takedown-2027',
  brand:'XXL CZECHIA',
  name:'ARENA TAKEDOWN',
  dateLabel:'SEPTEMBER 2027',
  venue:'OSTRAVAR ARÉNA',
  city:'OSTRAVA',
  doors:'17:00',
  edition:'01',
  status:'COMING',
};

export const PASS_TIERS = {
  GA:{label:'GENERAL ADMISSION',short:'GA',zone:'A',access:'MAIN FLOOR',gradient:'ga'},
  'GA+':{label:'GENERAL ADMISSION+',short:'GA+',zone:'A+',access:'FAST ENTRY',gradient:'gaplus'},
  VIP:{label:'VIP',short:'VIP',zone:'V',access:'VIP LOUNGE',gradient:'vip'},
  'VIP+':{label:'VIP+',short:'VIP+',zone:'V+',access:'VIP + FRONT ZONE',gradient:'vipplus'},
  BACKSTAGE:{label:'BACKSTAGE',short:'B/S',zone:'B',access:'ALL ACCESS',gradient:'backstage'},
};

export const ANNOUNCEMENTS = [
  {id:'a1',type:'DROP',title:'XXL PASS 2.5 is live',body:'Radar, Missions, Wallet, Secret Drops and After Hours are now inside your pass.'},
  {id:'a2',type:'INFO',title:'Lineup drop incoming',body:'Enable alerts to be first in when the next artist reveal goes live.'},
  {id:'a3',type:'MERCH',title:'Arena Takedown capsule',body:'Reserve limited event pieces and pick them up at XXL Merch.'},
];

export const ARTISTS = [
  {id:'headliner',name:'HEADLINER TBA',time:'22:30',stage:'MAIN STAGE',tag:'HEADLINER',accent:'#FF334D',rank:'01',bio:'The Arena Takedown headliner reveal lands in the first major XXL lineup drop.'},
  {id:'special',name:'SPECIAL GUEST TBA',time:'21:15',stage:'MAIN STAGE',tag:'SPECIAL GUEST',accent:'#FFFFFF',rank:'02',bio:'A special guest slot reserved for one of the biggest moments of the night.'},
  {id:'artist3',name:'ARTIST 03',time:'20:00',stage:'MAIN STAGE',tag:'LINEUP DROP 01',accent:'#BDBDC8',rank:'03',bio:'Reserved slot for the first official XXL CZECHIA lineup reveal.'},
  {id:'artist4',name:'ARTIST 04',time:'19:30',stage:'NEXT STAGE',tag:'LINEUP DROP 01',accent:'#FFD166',rank:'04',bio:'Reserved artist slot for the first official XXL CZECHIA lineup reveal.'},
  {id:'artist5',name:'ARTIST 05',time:'18:45',stage:'NEXT STAGE',tag:'RISING',accent:'#61E294',rank:'05',bio:'A rising slot for the next wave of rap and alternative sound.'},
  {id:'artist6',name:'ARTIST 06',time:'18:15',stage:'MAIN STAGE',tag:'OPENING',accent:'#9AAEFF',rank:'06',bio:'Opening slot that kicks off the Arena Takedown main show.'},
];

export const SCHEDULE = [
  {id:'s0',time:'17:00',end:'18:00',artistId:null,title:'DOORS OPEN',stage:'ARENA',kind:'INFO'},
  {id:'s1',time:'18:15',end:'18:45',artistId:'artist6',title:'ARTIST 06',stage:'MAIN STAGE',kind:'SET'},
  {id:'s2',time:'18:45',end:'19:20',artistId:'artist5',title:'ARTIST 05',stage:'NEXT STAGE',kind:'SET'},
  {id:'s3',time:'19:30',end:'20:05',artistId:'artist4',title:'ARTIST 04',stage:'NEXT STAGE',kind:'SET'},
  {id:'s4',time:'20:00',end:'20:45',artistId:'artist3',title:'ARTIST 03',stage:'MAIN STAGE',kind:'SET'},
  {id:'s5',time:'21:15',end:'22:00',artistId:'special',title:'SPECIAL GUEST TBA',stage:'MAIN STAGE',kind:'SET'},
  {id:'s6',time:'22:30',end:'23:40',artistId:'headliner',title:'HEADLINER TBA',stage:'MAIN STAGE',kind:'SET'},
  {id:'s7',time:'23:45',end:'00:00',artistId:null,title:'XXL FINALE',stage:'MAIN STAGE',kind:'INFO'},
];

export const RADAR = [
  {id:'rad1',time:'NOW',type:'LIVE',title:'ARTIST 03 is live',body:'Main Stage · set ends 20:45',icon:'flash-outline',route:'stage'},
  {id:'rad2',time:'4 MIN',type:'QUEUE',title:'Bar B is moving fast',body:'Estimated wait · 4 minutes',icon:'beer-outline',route:'map'},
  {id:'rad3',time:'10 MIN',type:'SECRET',title:'Mystery reveal incoming',body:'A hidden XXL moment unlocks at 20:45',icon:'eye-outline',route:'secret'},
  {id:'rad4',time:'LIVE',type:'DROP',title:'Merch Drop #02',body:'Arena-only piece · XXL Merch Zone D',icon:'shirt-outline',route:'merch'},
  {id:'rad5',time:'21:00',type:'ALERT',title:'VIP entrance reopened',body:'Fast lane available at Gate V',icon:'diamond-outline',route:'map'},
];

export const CROWD = [
  {id:'c1',name:'MAIN STAGE',status:'VERY BUSY',wait:'—',level:.9,color:'#FF334D'},
  {id:'c2',name:'NEXT STAGE',status:'BUSY',wait:'—',level:.68,color:'#FFD166'},
  {id:'c3',name:'BAR B',status:'LOW QUEUE',wait:'4 MIN',level:.28,color:'#61E294'},
  {id:'c4',name:'XXL MERCH',status:'MEDIUM',wait:'9 MIN',level:.48,color:'#72E7FF'},
];

export const MISSIONS = [
  {id:'mission1',title:'Touch down',body:'Open your XXL PASS on event day.',xp:150,icon:'ticket-outline'},
  {id:'mission2',title:'Two-stage run',body:'Visit Main Stage and Next Stage.',xp:300,icon:'musical-notes-outline'},
  {id:'mission3',title:'Drop hunter',body:'Reserve or scan at XXL Merch.',xp:250,icon:'shirt-outline'},
  {id:'mission4',title:'Crew together',body:'Enable your crew zone for one meet-up.',xp:200,icon:'people-outline'},
  {id:'mission5',title:'Night unlocked',body:'Complete 3 missions to unlock a Secret Drop.',xp:500,icon:'lock-open-outline'},
];

export const SECRET_DROPS = [
  {id:'secret1',title:'XXL NIGHT WALLPAPER',sub:'Digital collectible',require:1,icon:'phone-portrait-outline'},
  {id:'secret2',title:'BLACKOUT STICKER',sub:'Arena-only merch claim',require:2,icon:'pricetag-outline'},
  {id:'secret3',title:'VIP UPGRADE RAFFLE',sub:'One extra raffle entry',require:3,icon:'diamond-outline'},
  {id:'secret4',title:'AFTER HOURS LOCATION',sub:'Unlocks the secret afterparty',require:4,icon:'moon-outline'},
];

export const AFTER_HOURS = {
  title:'XXL AFTER HOURS',
  time:'00:30 — LATE',
  venue:'LOCATION LOCKED',
  unlockedVenue:'WAREHOUSE 17 · OSTRAVA',
  guestlist:'XXL PASS HOLDERS',
};

export const MAP_SPOTS = [
  {id:'entrance',name:'MAIN ENTRANCE',icon:'enter-outline',zone:'A',x:50,y:86,sub:'Ticket scan · security'},
  {id:'main',name:'MAIN STAGE',icon:'flash-outline',zone:'M',x:50,y:18,sub:'Headline performances'},
  {id:'next',name:'NEXT STAGE',icon:'musical-notes-outline',zone:'N',x:79,y:48,sub:'Next wave artists'},
  {id:'merch',name:'XXL MERCH',icon:'shirt-outline',zone:'D',x:22,y:58,sub:'Reserved pickup + drop'},
  {id:'barb',name:'BAR B',icon:'beer-outline',zone:'B',x:18,y:44,sub:'Low queue · approx. 4 min'},
  {id:'food',name:'FOOD COURT',icon:'fast-food-outline',zone:'C',x:22,y:35,sub:'Food & drinks'},
  {id:'vip',name:'VIP',icon:'diamond-outline',zone:'V',x:75,y:24,sub:'VIP lounge'},
  {id:'aid',name:'FIRST AID',icon:'medkit-outline',zone:'+',x:78,y:72,sub:'Medical assistance'},
  {id:'lockers',name:'LOCKERS',icon:'lock-closed-outline',zone:'L',x:38,y:73,sub:'Storage & charging'},
];

export const MERCH = [
  {id:'m1',name:'ARENA TAKEDOWN TEE',price:1499,tag:'LIMITED 250',size:'S–XXL'},
  {id:'m2',name:'XXL CZECHIA HOODIE',price:2499,tag:'EVENT EXCLUSIVE',size:'S–XXL'},
  {id:'m3',name:'XXL CHROME CAP',price:899,tag:'LIMITED',size:'ONE SIZE'},
  {id:'m4',name:'XXL STICKER PACK',price:299,tag:'DROP 01',size:'8 PCS'},
];

export const REWARDS = [
  {id:'r1',name:'Priority Entry',points:1200,icon:'flash-outline'},
  {id:'r2',name:'Free Locker',points:1800,icon:'lock-closed-outline'},
  {id:'r3',name:'Merch −20%',points:2500,icon:'shirt-outline'},
  {id:'r4',name:'VIP Upgrade Raffle',points:4000,icon:'diamond-outline'},
];
