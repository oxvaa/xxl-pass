export const EVENT = {
  id: 'xxl-arena-takedown-2027',
  brand: 'XXL CZECHIA',
  name: 'ARENA TAKEDOWN',
  dateLabel: 'SEPTEMBER 2027',
  venue: 'OSTRAVAR ARÉNA',
  city: 'OSTRAVA',
  doors: '17:00',
  status: 'COMING',
};

export const ANNOUNCEMENTS = [
  { id: 'a1', type: 'DROP', title: 'XXL PASS is live', body: 'Your festival access, lineup, schedule and rewards now live in one place.' },
  { id: 'a2', type: 'INFO', title: 'Lineup drop incoming', body: 'Turn on notifications so you do not miss the first artist reveal.' },
  { id: 'a3', type: 'MERCH', title: 'Arena Takedown capsule', body: 'Limited event merch will be reservable for pickup inside the app.' },
];

export const ARTISTS = [
  { id: 'headliner', name: 'HEADLINER TBA', meta: 'MAIN STAGE · 22:30', tag: 'HEADLINER', accent: '#F23A4B', bio: 'The main Arena Takedown headliner will be revealed in the first XXL lineup drop.' },
  { id: 'special', name: 'SPECIAL GUEST TBA', meta: 'MAIN STAGE · 21:15', tag: 'SPECIAL GUEST', accent: '#FFFFFF', bio: 'A special guest slot reserved for one of the biggest moments of the night.' },
  { id: 'artist3', name: 'ARTIST 03', meta: 'MAIN STAGE · 20:00', tag: 'LINEUP DROP 01', accent: '#BEBEC8', bio: 'Artist slot reserved for the first official XXL CZECHIA lineup reveal.' },
  { id: 'artist4', name: 'ARTIST 04', meta: 'NEXT STAGE · 19:30', tag: 'LINEUP DROP 01', accent: '#F5C451', bio: 'Artist slot reserved for the first official XXL CZECHIA lineup reveal.' },
  { id: 'artist5', name: 'ARTIST 05', meta: 'NEXT STAGE · 18:45', tag: 'RISING', accent: '#56D68B', bio: 'A rising slot for the next wave of rap and alternative sound.' },
  { id: 'artist6', name: 'ARTIST 06', meta: 'MAIN STAGE · 18:15', tag: 'OPENING', accent: '#8EA7FF', bio: 'Opening slot that kicks off the Arena Takedown main show.' },
];

export const SCHEDULE = [
  { id: 's0', time: '17:00', end: '18:00', artistId: null, title: 'DOORS OPEN', stage: 'ARENA', kind: 'INFO' },
  { id: 's1', time: '18:15', end: '18:45', artistId: 'artist6', title: 'ARTIST 06', stage: 'MAIN STAGE', kind: 'SET' },
  { id: 's2', time: '18:45', end: '19:20', artistId: 'artist5', title: 'ARTIST 05', stage: 'NEXT STAGE', kind: 'SET' },
  { id: 's3', time: '19:30', end: '20:05', artistId: 'artist4', title: 'ARTIST 04', stage: 'NEXT STAGE', kind: 'SET' },
  { id: 's4', time: '20:00', end: '20:45', artistId: 'artist3', title: 'ARTIST 03', stage: 'MAIN STAGE', kind: 'SET' },
  { id: 's5', time: '21:15', end: '22:00', artistId: 'special', title: 'SPECIAL GUEST TBA', stage: 'MAIN STAGE', kind: 'SET' },
  { id: 's6', time: '22:30', end: '23:40', artistId: 'headliner', title: 'HEADLINER TBA', stage: 'MAIN STAGE', kind: 'SET' },
  { id: 's7', time: '23:45', end: '00:00', artistId: null, title: 'XXL FINALE', stage: 'MAIN STAGE', kind: 'INFO' },
];

export const MAP_SPOTS = [
  { id: 'entrance', name: 'MAIN ENTRANCE', icon: 'enter-outline', zone: 'A', x: 50, y: 86, sub: 'Ticket scan · security' },
  { id: 'main', name: 'MAIN STAGE', icon: 'flash-outline', zone: 'M', x: 50, y: 18, sub: 'Headline performances' },
  { id: 'next', name: 'NEXT STAGE', icon: 'musical-notes-outline', zone: 'N', x: 79, y: 48, sub: 'Next wave artists' },
  { id: 'merch', name: 'XXL MERCH', icon: 'shirt-outline', zone: 'D', x: 22, y: 58, sub: 'Reserved pickup + drop' },
  { id: 'food', name: 'FOOD COURT', icon: 'fast-food-outline', zone: 'C', x: 22, y: 35, sub: 'Food & drinks' },
  { id: 'vip', name: 'VIP', icon: 'diamond-outline', zone: 'V', x: 75, y: 24, sub: 'VIP lounge' },
  { id: 'aid', name: 'FIRST AID', icon: 'medkit-outline', zone: '+', x: 78, y: 72, sub: 'Medical assistance' },
  { id: 'lockers', name: 'LOCKERS', icon: 'lock-closed-outline', zone: 'L', x: 38, y: 73, sub: 'Storage & charging' },
];

export const MERCH = [
  { id: 'm1', name: 'ARENA TAKEDOWN TEE', price: 1499, tag: 'LIMITED 250', size: 'S–XXL' },
  { id: 'm2', name: 'XXL CZECHIA HOODIE', price: 2499, tag: 'EVENT EXCLUSIVE', size: 'S–XXL' },
  { id: 'm3', name: 'XXL CHROME CAP', price: 899, tag: 'LIMITED', size: 'ONE SIZE' },
  { id: 'm4', name: 'XXL STICKER PACK', price: 299, tag: 'DROP 01', size: '8 PCS' },
];

export const REWARDS = [
  { id: 'r1', name: 'Priority Entry', points: 1200, icon: 'flash-outline' },
  { id: 'r2', name: 'Free Locker', points: 1800, icon: 'lock-closed-outline' },
  { id: 'r3', name: 'Merch −20%', points: 2500, icon: 'shirt-outline' },
  { id: 'r4', name: 'VIP Upgrade Raffle', points: 4000, icon: 'diamond-outline' },
];
