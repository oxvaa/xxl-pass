import React from 'react';
import { View, Pressable, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Txt, GlassCard, SectionTitle, Pill } from '../components/UI';
import { COLORS } from '../theme';

const ITEMS=[
 ['map-outline','Venue map','Stages, merch, food, lockers & first aid','map'],
 ['shirt-outline','XXL Merch','Reserve limited drops for pickup','merch'],
 ['gift-outline','Rewards','XP, benefits and VIP raffle','rewards'],
 ['people-outline','My Crew','Meet-up tools and shared zones','crew'],
 ['images-outline','Memories','Your post-event XXL recap','memories'],
 ['notifications-outline','Notifications','Lineup drops and important alerts','notifications'],
 ['person-circle-outline','Profile & settings','Your pass, preferences and preview controls','profile'],
];
export default function HubScreen({state,actions,navigate}){
 return <Screen>
  <View style={styles.header}><View><Txt faint style={styles.eyebrow}>XXL HUB</Txt><Txt style={styles.title}>MORE</Txt></View><Pill>{state.points} XP</Pill></View>
  <GlassCard style={styles.preview}>
   <View style={{flex:1}}><Txt faint style={{fontSize:9,fontWeight:'900',letterSpacing:1.3}}>DEVELOPER PREVIEW</Txt><Txt style={{fontSize:17,fontWeight:'900',marginTop:5}}>Festival LIVE mode</Txt><Txt muted style={{fontSize:11,lineHeight:17,marginTop:5}}>Preview how Home transforms while Arena Takedown is live.</Txt></View>
   <Switch value={state.livePreview} onValueChange={actions.setLive} trackColor={{false:'#2A2A30',true:'#F23A4B'}} thumbColor="#fff"/>
  </GlassCard>
  <SectionTitle eyebrow="XXL SERVICES" title="Explore"/>
  <GlassCard style={{paddingVertical:5}}>{ITEMS.map((x,i)=><Pressable key={x[3]} onPress={()=>navigate(x[3])} style={[styles.item,i<ITEMS.length-1&&styles.border]}><View style={styles.icon}><Ionicons name={x[0]} size={20} color="#fff"/></View><View style={{flex:1}}><Txt style={{fontWeight:'900'}}>{x[1]}</Txt><Txt muted style={{fontSize:11,marginTop:3}}>{x[2]}</Txt></View><Ionicons name="chevron-forward" size={17} color={COLORS.faint}/></Pressable>)}</GlassCard>
 </Screen>
}
const styles=StyleSheet.create({header:{height:100,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},eyebrow:{fontSize:9,fontWeight:'900',letterSpacing:1.6},title:{fontSize:42,fontWeight:'1000',letterSpacing:-2.2,marginTop:2},preview:{flexDirection:'row',alignItems:'center',gap:14},item:{minHeight:72,flexDirection:'row',alignItems:'center',gap:12},border:{borderBottomWidth:1,borderColor:COLORS.border},icon:{width:40,height:40,borderRadius:14,backgroundColor:'rgba(255,255,255,.07)',alignItems:'center',justifyContent:'center'}});
