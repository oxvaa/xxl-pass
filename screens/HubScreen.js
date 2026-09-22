import React from 'react';
import {View,Pressable,StyleSheet,Switch} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Screen,Txt,GlassCard,Pill,SectionTitle} from '../components/UI';
import {COLORS} from '../theme';

const TILES=[
 ['map-outline','Venue Map','Stages & services','map'],
 ['shirt-outline','XXL Merch','Reserve the drop','merch'],
 ['gift-outline','Rewards','XP & upgrades','rewards'],
 ['people-outline','My Crew','Meet-up zones','crew'],
 ['images-outline','Memories','Your recap','memories'],
 ['notifications-outline','XXL Now','Alerts & drops','notifications'],
];

export default function HubScreen({state,actions,navigate}){
 return <Screen>
  <View style={styles.header}><View><Txt faint style={styles.eyebrow}>XXL HUB</Txt><Txt style={styles.title}>MORE</Txt></View><Pill>{state.points} XP</Pill></View>

  <GlassCard style={styles.liveControl}>
   <View style={{flex:1}}><Txt faint style={styles.liveEyebrow}>EVENT MODE</Txt><Txt style={styles.liveTitle}>Festival LIVE mode</Txt><Txt muted style={styles.liveCopy}>Preview the event-day Home experience and live schedule.</Txt></View>
   <Switch value={state.livePreview} onValueChange={actions.setLive} trackColor={{false:'#2A2A30',true:'#FF334D'}} thumbColor="#fff"/>
  </GlassCard>

  <SectionTitle eyebrow="XXL SERVICES" title="Everything around your night"/>
  <View style={styles.grid}>{TILES.map(t=><Pressable key={t[3]} onPress={()=>navigate(t[3])} style={({pressed})=>[styles.tile,pressed&&{opacity:.75}]}>
   <View style={styles.icon}><Ionicons name={t[0]} size={21} color="#fff"/></View>
   <Txt style={styles.tileTitle}>{t[1]}</Txt><Txt muted style={styles.tileSub}>{t[2]}</Txt>
   <Ionicons name="arrow-up" size={17} color={COLORS.faint} style={styles.tileArrow}/>
  </Pressable>)}</View>

  <SectionTitle eyebrow="ACCOUNT" title="Your XXL"/>
  <Pressable onPress={()=>navigate('profile')} style={styles.profile}>
   <View style={styles.avatar}><Txt style={{color:'#050506',fontWeight:'900'}}>ŠS</Txt></View>
   <View style={{flex:1}}><Txt style={{fontWeight:'900',fontSize:16}}>Šimon Szábo</Txt><Txt muted style={{fontSize:10,marginTop:3}}>XXL Insider · Pass active</Txt></View>
   <Ionicons name="chevron-forward" size={18} color={COLORS.faint}/>
  </Pressable>
 </Screen>
}

const styles=StyleSheet.create({
 header:{height:96,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
 eyebrow:{fontSize:9,fontWeight:'900',letterSpacing:1.6},
 title:{fontSize:43,fontWeight:'900',letterSpacing:-2.2,marginTop:2},
 liveControl:{flexDirection:'row',alignItems:'center',gap:14},
 liveEyebrow:{fontSize:8,fontWeight:'900',letterSpacing:1.4},
 liveTitle:{fontSize:18,fontWeight:'900',marginTop:5},
 liveCopy:{fontSize:10,lineHeight:16,marginTop:5},
 grid:{flexDirection:'row',flexWrap:'wrap',gap:10},
 tile:{width:'48.4%',minHeight:154,borderRadius:28,borderWidth:1,borderColor:COLORS.border,backgroundColor:COLORS.panel,padding:16},
 icon:{width:42,height:42,borderRadius:14,backgroundColor:'rgba(255,255,255,.07)',alignItems:'center',justifyContent:'center'},
 tileTitle:{fontSize:16,fontWeight:'900',marginTop:22},
 tileSub:{fontSize:10,marginTop:4},
 tileArrow:{position:'absolute',right:15,top:17,transform:[{rotate:'45deg'}]},
 profile:{minHeight:82,borderRadius:27,borderWidth:1,borderColor:COLORS.border,backgroundColor:COLORS.panel,padding:15,flexDirection:'row',alignItems:'center',gap:12},
 avatar:{width:48,height:48,borderRadius:24,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'},
});
