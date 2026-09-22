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

const STORAGE='xxl-pass-v2-state';
const DEFAULT={favourites:['headliner'],reminders:['s6'],reservedMerch:[],points:2450,level:2,crewShare:false,livePreview:false,scheduleFilter:'all'};

function Experience(){
 const [tab,setTab]=useState('home');
 const [route,setRoute]=useState(null);
 const [state,setState]=useState(DEFAULT);
 const [ready,setReady]=useState(false);
 const [showSplash,setShowSplash]=useState(true);
 const splash=useRef(new Animated.Value(1)).current;

 useEffect(()=>{(async()=>{try{const raw=await AsyncStorage.getItem(STORAGE);if(raw)setState({...DEFAULT,...JSON.parse(raw)});}catch{}finally{setReady(true)}})()},[]);
 useEffect(()=>{if(ready)AsyncStorage.setItem(STORAGE,JSON.stringify(state)).catch(()=>{})},[state,ready]);
 useEffect(()=>{const t=setTimeout(()=>Animated.timing(splash,{toValue:0,duration:520,useNativeDriver:true}).start(()=>setShowSplash(false)),700);return()=>clearTimeout(t)},[splash]);

 const patch=p=>setState(s=>({...s,...(typeof p==='function'?p(s):p)}));
 const toggleIn=(key,id)=>patch(s=>({[key]:s[key].includes(id)?s[key].filter(x=>x!==id):[...s[key],id]}));
 const navigate=(name,params)=>{if(['home','lineup','schedule','pass','hub'].includes(name)){setRoute(null);setTab(name)}else setRoute({name,params})};
 const actions=useMemo(()=>({
  toggleFavourite:id=>toggleIn('favourites',id),
  toggleReminder:id=>toggleIn('reminders',id),
  toggleMerch:id=>patch(s=>{const has=s.reservedMerch.includes(id);return {reservedMerch:has?s.reservedMerch.filter(x=>x!==id):[...s.reservedMerch,id],points:has?s.points:Math.min(9999,s.points+100)}}),
  setCrewShare:v=>patch({crewShare:v}),
  setLive:v=>patch({livePreview:v}),
  setScheduleFilter:v=>patch({scheduleFilter:v}),
  reset:()=>setState(DEFAULT),
 }),[]);

 let content;
 if(route)content=<DetailScreen route={route} state={state} actions={actions} goBack={()=>setRoute(null)}/>;
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
   <Animated.Text style={styles.splashSub}>CZECHIA · PASS 2.0</Animated.Text>
  </Animated.View>}
 </View>
}

export default function App(){return <SafeAreaProvider><Experience/></SafeAreaProvider>}

const styles=StyleSheet.create({
 app:{flex:1,backgroundColor:COLORS.bg},
 splash:{...StyleSheet.absoluteFillObject,backgroundColor:'#050506',alignItems:'center',justifyContent:'center',zIndex:99},
 splashXXL:{color:'#fff',fontSize:64,fontWeight:'900',letterSpacing:-4},
 splashSub:{color:'#777781',fontSize:9,fontWeight:'900',letterSpacing:3,marginTop:6},
});
