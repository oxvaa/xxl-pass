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

export const ANNOUNCEMENTS = [
  {id:'a1',type:'DROP',title:'XXL PASS 2.0 is live',body:'The new Arena Takedown experience is now inside your pass.'},
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

export const MAP_SPOTS = [
  {id:'entrance',name:'MAIN ENTRANCE',icon:'enter-outline',zone:'A',x:50,y:86,sub:'Ticket scan · security'},
  {id:'main',name:'MAIN STAGE',icon:'flash-outline',zone:'M',x:50,y:18,sub:'Headline performances'},
  {id:'next',name:'NEXT STAGE',icon:'musical-notes-outline',zone:'N',x:79,y:48,sub:'Next wave artists'},
  {id:'merch',name:'XXL MERCH',icon:'shirt-outline',zone:'D',x:22,y:58,sub:'Reserved pickup + drop'},
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
