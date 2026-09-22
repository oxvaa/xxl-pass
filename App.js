import React,{useEffect,useMemo,useRef,useState} from 'react';
import {Animated,View,StatusBar,StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import LineupScreen from './screens/LineupScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import PassScreen from './screens/PassScreen';
import HubScreen from './screens/HubScreen';
import DetailScreen from './screens/DetailScreen';
import BottomNav from './components/BottomNav';
import {COLORS} from './theme';

const STORAGE='xxl-pass-v25-state';
const DEFAULT={
 favourites:['headliner'],
 reminders:['s6'],
 reservedMerch:[],
 points:2450,
 level:2,
 crewShare:false,
 scheduleFilter:'all',
 eventPhase:'before',
 passTier:'GA',
 walletBalance:1840,
 walletSpend:660,
 vouchers:['WELCOME10','WATER1'],
 completedMissions:[],
 claimedSecrets:[],
 afterHoursUnlocked:false,
};

function Experience(){
 const [tab,setTab]=useState('home');
 const [route,setRoute]=useState(null);
 const [state,setState]=useState(DEFAULT);
 const [ready,setReady]=useState(false);
 const [showSplash,setShowSplash]=useState(true);
 const splash=useRef(new Animated.Value(1)).current;

 useEffect(()=>{(async()=>{try{const raw=await AsyncStorage.getItem(STORAGE);if(raw)setState({...DEFAULT,...JSON.parse(raw)});}catch{}finally{setReady(true)}})()},[]);
 useEffect(()=>{if(ready)AsyncStorage.setItem(STORAGE,JSON.stringify(state)).catch(()=>{})},[state,ready]);
 useEffect(()=>{const t=setTimeout(()=>Animated.timing(splash,{toValue:0,duration:520,useNativeDriver:true}).start(()=>setShowSplash(false)),760);return()=>clearTimeout(t)},[splash]);

 const patch=p=>setState(s=>({...s,...(typeof p==='function'?p(s):p)}));
 const toggleIn=(key,id)=>patch(s=>({[key]:s[key].includes(id)?s[key].filter(x=>x!==id):[...s[key],id]}));
 const navigate=(name,params)=>{if(['home','lineup','schedule','pass','hub'].includes(name)){setRoute(null);setTab(name)}else setRoute({name,params})};

 const actions=useMemo(()=>({
  toggleFavourite:id=>toggleIn('favourites',id),
  toggleReminder:id=>toggleIn('reminders',id),
  toggleMerch:id=>patch(s=>{const has=s.reservedMerch.includes(id);return {reservedMerch:has?s.reservedMerch.filter(x=>x!==id):[...s.reservedMerch,id],points:has?s.points:Math.min(9999,s.points+100)}}),
  setCrewShare:v=>patch({crewShare:v}),
  setScheduleFilter:v=>patch({scheduleFilter:v}),
  setEventPhase:v=>patch({eventPhase:v}),
  setPassTier:v=>patch({passTier:v}),
  addWallet:amount=>patch(s=>({walletBalance:s.walletBalance+amount})),
  spendWallet:amount=>patch(s=>({walletBalance:Math.max(0,s.walletBalance-amount),walletSpend:s.walletSpend+Math.min(amount,s.walletBalance)})),
  completeMission:id=>patch(s=>{
    if(s.completedMissions.includes(id))return {};
    const missionXp={mission1:150,mission2:300,mission3:250,mission4:200,mission5:500}[id]||100;
    const completed=[...s.completedMissions,id];
    return {completedMissions:completed,points:Math.min(9999,s.points+missionXp),afterHoursUnlocked:s.afterHoursUnlocked||completed.length>=4};
  }),
  claimSecret:id=>patch(s=>s.claimedSecrets.includes(id)?{}:{claimedSecrets:[...s.claimedSecrets,id]}),
  unlockAfterHours:()=>patch({afterHoursUnlocked:true}),
  reset:()=>setState(DEFAULT),
 }),[]);

 let content;
 if(route)content=<DetailScreen route={route} state={state} actions={actions} navigate={navigate} goBack={()=>setRoute(null)}/>;
 else if(tab==='lineup')content=<LineupScreen state={state} actions={actions} navigate={navigate}/>;
 else if(tab==='schedule')content=<ScheduleScreen state={state} actions={actions} navigate={navigate}/>;
 else if(tab==='pass')content=<PassScreen state={state} actions={actions} navigate={navigate}/>;
 else if(tab==='hub')content=<HubScreen state={state} actions={actions} navigate={navigate}/>;
 else content=<HomeScreen state={state} actions={actions} navigate={navigate}/>;

 return <View style={styles.app}>
  <StatusBar barStyle="light-content" translucent backgroundColor="transparent"/>
  {content}
  {!route&&<BottomNav tab={tab} onChange={navigate}/>}
  {showSplash&&<Animated.View pointerEvents="none" style={[styles.splash,{opacity:splash}]}>
   <Animated.Text style={styles.splashXXL}>XXL</Animated.Text>
   <Animated.Text style={styles.splashSub}>CZECHIA · LIVE EXPERIENCE 2.5</Animated.Text>
  </Animated.View>}
 </View>
}

export default function App(){return <SafeAreaProvider><Experience/></SafeAreaProvider>}

const styles=StyleSheet.create({
 app:{flex:1,backgroundColor:COLORS.bg},
 splash:{...StyleSheet.absoluteFillObject,backgroundColor:'#050506',alignItems:'center',justifyContent:'center',zIndex:99},
 splashXXL:{color:'#fff',fontSize:64,fontWeight:'900',letterSpacing:-4},
 splashSub:{color:'#777781',fontSize:8,fontWeight:'900',letterSpacing:2.5,marginTop:6},
});
