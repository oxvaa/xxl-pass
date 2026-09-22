import React, {useEffect, useMemo, useState} from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import LineupScreen from './screens/LineupScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import PassScreen from './screens/PassScreen';
import HubScreen from './screens/HubScreen';
import DetailScreen from './screens/DetailScreen';
import BottomNav from './components/BottomNav';
import { COLORS } from './theme';

const STORAGE='xxl-pass-v1-state';
const DEFAULT={favourites:['headliner'],reminders:['s6'],reservedMerch:[],points:2450,level:2,crewShare:false,livePreview:false,scheduleFilter:'all'};

export default function App(){
 const [tab,setTab]=useState('home');
 const [route,setRoute]=useState(null);
 const [state,setState]=useState(DEFAULT);
 const [ready,setReady]=useState(false);

 useEffect(()=>{(async()=>{try{const raw=await AsyncStorage.getItem(STORAGE);if(raw)setState({...DEFAULT,...JSON.parse(raw)});}catch{}finally{setReady(true);}})()},[]);
 useEffect(()=>{if(ready)AsyncStorage.setItem(STORAGE,JSON.stringify(state)).catch(()=>{});},[state,ready]);

 const patch=p=>setState(s=>({...s,...(typeof p==='function'?p(s):p)}));
 const toggleIn=(key,id)=>patch(s=>({[key]:s[key].includes(id)?s[key].filter(x=>x!==id):[...s[key],id]}));
 const navigate=(name,params)=>{if(['home','lineup','schedule','pass','hub'].includes(name)){setRoute(null);setTab(name);}else setRoute({name,params});};
 const actions=useMemo(()=>({
   toggleFavourite:id=>toggleIn('favourites',id),
   toggleReminder:id=>toggleIn('reminders',id),
   toggleMerch:id=>patch(s=>{const has=s.reservedMerch.includes(id);return {reservedMerch:has?s.reservedMerch.filter(x=>x!==id):[...s.reservedMerch,id],points:has?s.points:Math.min(9999,s.points+100)};}),
   setCrewShare:v=>patch({crewShare:v}),
   setLive:v=>patch({livePreview:v}),
   setScheduleFilter:v=>patch({scheduleFilter:v}),
   reset:()=>setState(DEFAULT),
 }),[]);

 let content;
 if(route) content=<DetailScreen route={route} state={state} actions={actions} goBack={()=>setRoute(null)}/>;
 else if(tab==='lineup') content=<LineupScreen state={state} actions={actions} navigate={navigate}/>;
 else if(tab==='schedule') content=<ScheduleScreen state={state} actions={actions} navigate={navigate}/>;
 else if(tab==='pass') content=<PassScreen state={state} actions={actions} navigate={navigate}/>;
 else if(tab==='hub') content=<HubScreen state={state} actions={actions} navigate={navigate}/>;
 else content=<HomeScreen state={state} actions={actions} navigate={navigate}/>;

 return <View style={styles.app}><StatusBar barStyle="light-content" backgroundColor={COLORS.bg}/>{content}{!route&&<BottomNav tab={tab} onChange={navigate}/>}</View>;
}

const styles=StyleSheet.create({app:{flex:1,backgroundColor:COLORS.bg}});
