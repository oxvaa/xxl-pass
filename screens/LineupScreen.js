import React,{useState} from 'react';
import {View,Pressable,StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Screen,TopBar,Txt,GlassCard,Pill,SectionTitle} from '../components/UI';
import {DAYS} from '../data';
import {COLORS} from '../theme';
import {t} from '../i18n';

export default function LineupScreen({state,actions,navigate}){
 const lang=state.language;
 const [day,setDay]=useState('fri');
 const d=DAYS.find(x=>x.id===day)||DAYS[0];
 const all=[...d.headliners,...d.artists];
 return <Screen>
  <TopBar state={state} onProfile={()=>navigate('profile')} onNotifications={()=>navigate('notifications')}/>
  <View style={styles.header}><View><Txt faint style={styles.eyebrow}>O2 ARENA PRAGUE</Txt><Txt style={styles.title}>LINEUP</Txt></View><Pill green>3 DAYS</Pill></View>
  <View style={styles.tabs}>{DAYS.map(x=><Pressable key={x.id} onPress={()=>setDay(x.id)} style={[styles.tab,day===x.id&&styles.tabOn]}><Txt style={[styles.tabTxt,day===x.id&&{color:'#050506'}]}>{lang==='cs'?x.labelCs:x.labelEn}</Txt><Txt style={[styles.tabDate,day===x.id&&{color:'#333'}]}>{x.date}</Txt></Pressable>)}</View>
  <SectionTitle eyebrow={`${all.length} ARTISTS`} title={d.headliners.join(' · ')} action={state.session?t(lang,'myXXL'):t(lang,'login')} onAction={()=>state.session?null:navigate('auth',{mode:'login'})}/>
  {all.map((name,i)=>{
   const fav=state.favourites.includes(name);
   const head=i<d.headliners.length;
   return <GlassCard key={name} style={[styles.artist,head&&styles.headliner]}>
    <View style={[styles.accent,{backgroundColor:head?COLORS.green:COLORS.borderStrong}]}/>
    <View style={{flex:1}}><Txt faint style={styles.small}>{head?'HEADLINER':d.date}</Txt><Txt style={[styles.name,head&&styles.headName]}>{name}</Txt><Txt muted style={{fontSize:9,marginTop:5}}>SET TIME · TBA</Txt></View>
    <Pressable onPress={()=>{if(!state.session)return navigate('auth',{mode:'login'});actions.toggleFavourite(name);actions.completeMission('m2')}} style={[styles.heart,fav&&styles.heartOn]}><Ionicons name={fav?'heart':'heart-outline'} size={19} color={fav?'#050506':'#fff'}/></Pressable>
   </GlassCard>
  })}
  <SectionTitle eyebrow="DJS" title="DJ lineup"/>
  <GlassCard><Txt muted style={{fontSize:11,lineHeight:20}}>{d.djs.join(' · ')}</Txt></GlassCard>
 </Screen>
}
const styles=StyleSheet.create({
 header:{height:94,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},eyebrow:{fontSize:8,fontWeight:'900',letterSpacing:1.5},title:{fontSize:43,fontWeight:'900',letterSpacing:-2.3,marginTop:2},
 tabs:{flexDirection:'row',gap:7},tab:{flex:1,minHeight:57,borderRadius:19,borderWidth:1,borderColor:COLORS.borderStrong,alignItems:'center',justifyContent:'center'},tabOn:{backgroundColor:'#fff'},tabTxt:{fontSize:8,fontWeight:'900'},tabDate:{fontSize:7,color:COLORS.faint,marginTop:4},
 artist:{marginBottom:9,flexDirection:'row',alignItems:'center',gap:11,overflow:'hidden'},headliner:{minHeight:135},accent:{position:'absolute',left:0,top:0,bottom:0,width:4},small:{fontSize:7,fontWeight:'900',letterSpacing:1.2},name:{fontSize:18,fontWeight:'900',letterSpacing:-.5,marginTop:5},headName:{fontSize:29,letterSpacing:-1.4},heart:{height:42,width:42,borderRadius:21,borderWidth:1,borderColor:COLORS.borderStrong,alignItems:'center',justifyContent:'center'},heartOn:{backgroundColor:'#fff'},
});
