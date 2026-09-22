import React,{useEffect,useMemo,useRef,useState} from 'react';
import {Animated,View,StatusBar,StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import HomeScreen from './screens/HomeScreen';
import EventScreen from './screens/EventScreen';
import LineupScreen from './screens/LineupScreen';
import PassScreen from './screens/PassScreen';
import HubScreen from './screens/HubScreen';
import AuthScreen from './screens/AuthScreen';
import AdminScreen from './screens/AdminScreen';
import DetailScreen from './screens/DetailScreen';
import BottomNav from './components/BottomNav';
import {COLORS} from './theme';
import {DEFAULT_NOTIFICATIONS} from './data';

const STORAGE='xxl-czechia-v3-state';
const ADMIN_EMAIL='admin@xxlczechia.local';
const ADMIN_PASSWORD='XXLAdmin2026!';

const DEFAULT={
 language:'cs',
 session:null,
 appMode:'user',
 accounts:[],
 favourites:[],
 reminders:[],
 savedEvent:false,
 points:0,
 level:1,
 passTier:'GA',
 walletBalance:0,
 walletSpend:0,
 vouchers:[],
 completedMissions:[],
 claimedSecrets:[],
 crewShare:false,
 reservedMerch:[],
 notifications:DEFAULT_NOTIFICATIONS,
 adminConfig:{eventPhase:'before',afterHoursUnlocked:false,venueNotice:'',doors:'TBA'},
};


const EMPTY_USER_DATA={
 favourites:[],reminders:[],savedEvent:false,points:0,level:1,passTier:'GA',walletBalance:0,walletSpend:0,vouchers:[],completedMissions:[],claimedSecrets:[],crewShare:false,reservedMerch:[]
};
const pickUserData=s=>({
 favourites:s.favourites,reminders:s.reminders,savedEvent:s.savedEvent,points:s.points,level:s.level,passTier:s.passTier,walletBalance:s.walletBalance,walletSpend:s.walletSpend,vouchers:s.vouchers,completedMissions:s.completedMissions,claimedSecrets:s.claimedSecrets,crewShare:s.crewShare,reservedMerch:s.reservedMerch
});

async function hashPassword(v){
 return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256,'xxl-czechia-v3:'+v);
}

function Experience(){
 const [tab,setTab]=useState('home');
 const [route,setRoute]=useState(null);
 const [state,setState]=useState(DEFAULT);
 const [ready,setReady]=useState(false);
 const [showSplash,setShowSplash]=useState(true);
 const splash=useRef(new Animated.Value(1)).current;

 useEffect(()=>{(async()=>{try{const raw=await AsyncStorage.getItem(STORAGE);if(raw)setState(s=>({...s,...JSON.parse(raw)}))}catch{}finally{setReady(true)}})()},[]);
 useEffect(()=>{if(ready)AsyncStorage.setItem(STORAGE,JSON.stringify(state)).catch(()=>{})},[state,ready]);
 useEffect(()=>{const timer=setTimeout(()=>Animated.timing(splash,{toValue:0,duration:500,useNativeDriver:true}).start(()=>setShowSplash(false)),850);return()=>clearTimeout(timer)},[splash]);

 const patch=p=>setState(s=>({...s,...(typeof p==='function'?p(s):p)}));
 const navigate=(name,params)=>{if(['home','event','lineup','pass','hub'].includes(name)){setRoute(null);setTab(name)}else setRoute({name,params})};

 const register=async form=>{
  if(!form.name?.trim()||!form.email?.trim()||!form.password)return {ok:false,error:'fillFields'};
  if(state.accounts.some(a=>a.email.toLowerCase()===form.email.trim().toLowerCase()))return {ok:false,error:'emailExists'};
  const passwordHash=await hashPassword(form.password);
  const initialData={...EMPTY_USER_DATA,points:100};
  const account={id:'u'+Date.now(),name:form.name.trim(),username:(form.username||form.name).trim(),email:form.email.trim().toLowerCase(),passwordHash,role:'user',createdAt:new Date().toISOString(),data:initialData};
  patch({accounts:[...state.accounts,account],session:{id:account.id,name:account.name,username:account.username,email:account.email,role:'user'},appMode:'user',...initialData});
  return {ok:true};
 };
 const login=async form=>{
  const email=(form.email||'').trim().toLowerCase();
  if(email===ADMIN_EMAIL&&form.password===ADMIN_PASSWORD){
   patch({session:{id:'admin-local',name:'XXL Admin',username:'admin',email:ADMIN_EMAIL,role:'admin'},appMode:'user'});
   return {ok:true};
  }
  const hash=await hashPassword(form.password||'');
  const a=state.accounts.find(x=>x.email.toLowerCase()===email&&x.passwordHash===hash);
  if(!a)return {ok:false,error:'invalidLogin'};
  patch({session:{id:a.id,name:a.name,username:a.username,email:a.email,role:a.role},appMode:'user',...EMPTY_USER_DATA,...(a.data||{})});
  return {ok:true};
 };

 const completeMission=id=>patch(s=>{
  if(!s.session||s.completedMissions.includes(id))return {};
  const xp={m1:150,m2:200,m3:150,m4:150}[id]||100;
  return {completedMissions:[...s.completedMissions,id],points:s.points+xp};
 });

 const actions=useMemo(()=>({
  patch,
  register,
  login,
  logout:()=>patch(s=>({
   accounts:s.session&&s.session.role!=='admin'?s.accounts.map(a=>a.id===s.session.id?{...a,data:pickUserData(s)}:a):s.accounts,
   session:null,appMode:'user',...EMPTY_USER_DATA
  })),
  setLanguage:v=>patch({language:v}),
  setAppMode:v=>patch({appMode:v}),
  toggleFavourite:id=>patch(s=>!s.session?{}:{favourites:s.favourites.includes(id)?s.favourites.filter(x=>x!==id):[...s.favourites,id]}),
  saveEvent:()=>{patch({savedEvent:true});completeMission('m3')},
  setPassTier:v=>patch({passTier:v}),
  addWallet:n=>patch(s=>({walletBalance:s.walletBalance+n})),
  spendWallet:n=>patch(s=>({walletBalance:Math.max(0,s.walletBalance-n),walletSpend:s.walletSpend+Math.min(n,s.walletBalance)})),
  completeMission,
  completeAllMissions:()=>patch(s=>({completedMissions:['m1','m2','m3','m4'],points:Math.max(s.points,650)})),
  resetMissions:()=>patch({completedMissions:[],points:0}),
  setCrewShare:v=>patch({crewShare:v}),
  setEventPhase:v=>patch(s=>({adminConfig:{...s.adminConfig,eventPhase:v}})),
  unlockAfter:()=>patch(s=>({adminConfig:{...s.adminConfig,afterHoursUnlocked:true}})),
  addBroadcast:()=>patch(s=>({notifications:[{id:'admin-'+Date.now(),type:'ADMIN',titleCs:'Zpráva od XXL CZECHIA',titleEn:'Message from XXL CZECHIA',bodyCs:'Testovací admin broadcast byl odeslán.',bodyEn:'A test admin broadcast was sent.'},...s.notifications]})),
  markNotificationsRead:()=>patch(s=>({notifications:s.notifications.map(n=>({...n,read:true}))})),
  resetApp:()=>setState({...DEFAULT}),
 }),[state]);

 let content;
 if(route?.name==='auth')content=<AuthScreen route={route} state={state} actions={actions} goBack={()=>setRoute(null)}/>;
 else if(route?.name==='admin')content=<AdminScreen state={state} actions={actions} goBack={()=>setRoute(null)}/>;
 else if(route)content=<DetailScreen route={route} state={state} actions={actions} navigate={navigate} goBack={()=>setRoute(null)}/>;
 else if(tab==='event')content=<EventScreen state={state} actions={actions} navigate={navigate}/>;
 else if(tab==='lineup')content=<LineupScreen state={state} actions={actions} navigate={navigate}/>;
 else if(tab==='pass')content=<PassScreen state={state} actions={actions} navigate={navigate}/>;
 else if(tab==='hub')content=<HubScreen state={state} actions={actions} navigate={navigate}/>;
 else content=<HomeScreen state={state} actions={actions} navigate={navigate}/>;

 return <View style={styles.app}>
  <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>
  {content}
  {!route&&<BottomNav tab={tab} onChange={navigate} language={state.language}/>}
  {showSplash&&<Animated.View pointerEvents="none" style={[styles.splash,{opacity:splash}]}>
   <Animated.Text style={styles.splashXXL}>XXL</Animated.Text>
   <Animated.Text style={styles.splashCZ}>CZECHIA</Animated.Text>
   <Animated.Text style={styles.splashSub}>3.0 · O2 ARENA</Animated.Text>
  </Animated.View>}
 </View>
}

export default function App(){return <SafeAreaProvider><Experience/></SafeAreaProvider>}
const styles=StyleSheet.create({
 app:{flex:1,backgroundColor:COLORS.bg},
 splash:{...StyleSheet.absoluteFillObject,backgroundColor:'#050506',alignItems:'center',justifyContent:'center',zIndex:999},
 splashXXL:{color:'#fff',fontSize:68,fontWeight:'900',letterSpacing:-5,lineHeight:66},
 splashCZ:{color:'#fff',fontSize:22,fontWeight:'900',fontStyle:'italic',letterSpacing:-1},
 splashSub:{color:'#00C853',fontSize:8,fontWeight:'900',letterSpacing:2.4,marginTop:10},
});
