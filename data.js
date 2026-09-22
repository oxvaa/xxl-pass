export const ASSETS = {
 logo:'https://raw.githubusercontent.com/oxvaa/xxl-pass/main/assets/xxl-czechia-logo.png',
 roundLogo:'https://raw.githubusercontent.com/oxvaa/xxl-pass/main/assets/xxl-round-logo.png',
 poster:'https://raw.githubusercontent.com/oxvaa/xxl-pass/main/assets/event-poster.jpg',
 o2Exterior:'https://media.ticketmaster.eu/czechrepublic/c767a5e9d4e1cdea5f8665b1991d68b5.jpg',
};

export const EVENT = {
 id:'xxl-czechia-o2-arena',
 name:'XXL CZECHIA FESTIVAL',
 venue:'O2 ARENA PRAGUE',
 venueDisplay:'O₂ arena Praha',
 address:'Českomoravská 2345/17a, 190 00 Praha 9',
 dates:'17–19 JULY',
 city:'PRAGUE',
 year:'TBA',
};

export const DAYS = [
 {
  id:'fri',labelCs:'PÁTEK',labelEn:'FRIDAY',date:'JULY 17',
  headliners:['FUTURE','METRO BOOMIN & 21 SAVAGE'],
  artists:['FLO MILLI','BIGXTHAPLUG','TERROR REID','YOUNG LEOSIA','YZOMANDIAS & SEPAR','VIKTOR SHEEN','ASTRALKID22 & GUAPANOVA'],
  djs:['METRO BOOMIN','DJ ESCO','HEATHSTONE','DECKY & KK','ASTRALKID22']
 },
 {
  id:'sat',labelCs:'SOBOTA',labelEn:'SATURDAY',date:'JULY 18',
  headliners:['ESDEEKID'],
  artists:['RICO ACE & FIMIGUERRERO','NEMZZ','LEX AMARNI','SECRET GUEST','FAKEMINK','PTK & NIK TENDO','EDDIE FRESCO','WEN','MANIAK','SLUGGER','CHURAQ SPUTNIK'],
  djs:['WRAITH9','ZEL','SECRET DJ','DECKY','STARVIN MARVIN','WEN','NAUME']
 },
 {
  id:'sun',labelCs:'NEDĚLE',labelEn:'SUNDAY',date:'JULY 19',
  headliners:['GUNNA','OFFSET & IDK'],
  artists:['KEN CARSON','HXG & OPIUM LABEL MEMBERS','VOID & REPAIR LONELY','RISK','GORN','MEZATL','EKTOR','SPECIALBEATZ','CALIN & RYCHLÍ KLUCI','HASAN','BUKA','ROBIN ZOOT','RESETEDH','SHIMMI'],
  djs:['TURBO','C.N.O.T.E','EVRGRN','LUCIAN & KP BEATZ','DJ MOON & CURESFUL','SPECIALBEATZ','DECKY & NOBODYLISTEN','HASAN']
 }
];

export const FEATURED = [
 {id:'future',name:'FUTURE',day:'fri',tag:'HEADLINER',accent:'#22E061'},
 {id:'metro21',name:'METRO BOOMIN & 21 SAVAGE',day:'fri',tag:'FRIDAY',accent:'#FFFFFF'},
 {id:'esdeekid',name:'ESDEEKID',day:'sat',tag:'SATURDAY',accent:'#B8FFCB'},
 {id:'gunna',name:'GUNNA',day:'sun',tag:'HEADLINER',accent:'#22E061'},
 {id:'offsetidk',name:'OFFSET & IDK',day:'sun',tag:'SUNDAY',accent:'#FFFFFF'},
 {id:'kencarson',name:'KEN CARSON',day:'sun',tag:'SUNDAY',accent:'#A991FF'},
];

export const PASS_TIERS = {
 GA:{label:'GENERAL ADMISSION',short:'GA',zone:'A',access:'MAIN FLOOR'},
 'GA+':{label:'GENERAL ADMISSION+',short:'GA+',zone:'A+',access:'FAST ENTRY'},
 VIP:{label:'VIP',short:'VIP',zone:'V',access:'VIP LOUNGE'},
 'VIP+':{label:'VIP+',short:'VIP+',zone:'V+',access:'VIP + FRONT ZONE'},
 BACKSTAGE:{label:'BACKSTAGE',short:'B/S',zone:'B',access:'ALL ACCESS'},
};

export const MISSIONS = [
 {id:'m1',titleCs:'Otevři svůj XXL PASS',titleEn:'Open your XXL PASS',xp:150},
 {id:'m2',titleCs:'Přidej interpreta do My XXL',titleEn:'Add an artist to My XXL',xp:200},
 {id:'m3',titleCs:'Ulož si event',titleEn:'Save the event',xp:150},
 {id:'m4',titleCs:'Otevři venue info',titleEn:'Open venue info',xp:150},
];

export const REWARDS = [
 {id:'r1',nameCs:'Prioritní vstup',nameEn:'Priority entry',points:1200},
 {id:'r2',nameCs:'Merch −10 %',nameEn:'Merch −10%',points:1800},
 {id:'r3',nameCs:'VIP raffle entry',nameEn:'VIP raffle entry',points:2500},
];

export const DEFAULT_NOTIFICATIONS = [
 {id:'n1',type:'EVENT',titleCs:'XXL CZECHIA 3.0 je online',titleEn:'XXL CZECHIA 3.0 is live',bodyCs:'Nový O2 Arena event, Guest mode a nový account systém.',bodyEn:'New O2 Arena event, Guest mode and a new account system.'},
 {id:'n2',type:'LINEUP',titleCs:'Lineup byl aktualizován',titleEn:'Lineup updated',bodyCs:'Program je rozdělen na pátek, sobotu a neděli.',bodyEn:'The lineup is split across Friday, Saturday and Sunday.'},
];

export const O2_INFO = {
 address:'Českomoravská 2345/17a, 190 00 Praha 9',
 metro:'Českomoravská · linka B',
 tram:'Arena Libeň jih · tram 8 / 16',
 train:'Praha-Libeň · několik minut pěšky',
 entrance:'Vstup Sever · 1. podlaží · Ocelářská',
 entry:'Vstup je běžně možný přibližně 1,5 hodiny před začátkem akce.',
 parking:'Parkovací dům v bezprostřední blízkosti O2 areny.',
};
