import React from 'react';
import {View,Pressable,StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Screen,Txt,GlassCard,Pill,SectionTitle} from '../components/UI';
import {COLORS} from '../theme';

const TILES=[
 ['radio-outline','XXL Radar','Live event feed','radar'],
 ['wallet-outline','XXL Wallet','Cashless & vouchers','wallet'],
 ['flag-outline','Missions','Earn XP & unlocks','missions'],
 ['eye-outline','Secret Drops','Hidden rewards','secret'],
 ['flash-outline','Stage Mode','Live crowd & sets','stage'],
 ['moon-outline','After Hours','Secret late-night mode','afterhours'],
 ['map-outline','Venue Map','Stages & services','map'],
 ['shirt-outline','XXL Merch','Reserve the drop','merch'],
 ['people-outline','My Crew','Meet-up zones','crew'],
 ['bus-outline','Transport','Get home safe','transport'],
 ['medkit-outline','Need Help?','First aid & security','emergency'],
 ['images-outline','Memories','Your recap','memories'],
];

export default function HubScreen({state,actions,navigate}){
 return <Screen>
  <View style={styles.header}><View><Txt faint style={styles.eyebrow}>XXL HUB</Txt><Txt style={styles.title}>MORE</Txt></View><Pill>{state.points} XP</Pill></View>
  <GlassCard style={styles.phaseCard}><View style={{flex:1}}><Txt faint style={styles.small}>EVENT PHASE</Txt><Txt style={styles.phaseTitle}>{state.eventPhase.toUpperCase()}</Txt><Txt muted style={styles.phaseCopy}>Switch the prototype state from Home to preview before, live and after-festival experiences.</Txt></View><View style={styles.phaseBtns}>{['before','live','after'].map(x=><Pressable key={x} onPress={()=>actions.setEventPhase(x)} style={[styles.phaseDot,state.eventPhase===x&&styles.phaseOn]}/>)}</View></GlassCard>
  <SectionTitle eyebrow="LIVE EXPERIENCE" title="Your festival OS"/>
  <View style={styles.grid}>{TILES.map(t=><Pressable key={t[3]} onPress={()=>navigate(t[3],t[3]==='stage'?{stage:'MAIN STAGE'}:undefined)} style={({pressed})=>[styles.tile,pressed&&{opacity:.75}]}>
   <View style={styles.icon}><Ionicons name={t[0]} size={21} color="#fff"/></View><Txt style={styles.tileTitle}>{t[1]}</Txt><Txt muted style={styles.tileSub}>{t[2]}</Txt><Ionicons name="arrow-up" size={17} color={COLORS.faint} style={styles.arrow}/>
  </Pressable>)}</View>
  <SectionTitle eyebrow="ACCOUNT" title="Your XXL"/>
  <Pressable onPress={()=>navigate('profile')} style={styles.profile}><View style={styles.avatar}><Txt style={{color:'#050506',fontWeight:'900'}}>ŠS</Txt></View><View style={{flex:1}}><Txt style={{fontWeight:'900',fontSize:16}}>Šimon Szábo</Txt><Txt muted style={{fontSize:10,marginTop:3}}>XXL Insider · {state.passTier} · {state.walletBalance} Kč</Txt></View><Ionicons name="chevron-forward" size={18} color={COLORS.faint}/></Pressable>
 </Screen>
}

const styles=StyleSheet.create({
 header:{height:96,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},eyebrow:{fontSize:9,fontWeight:'900',letterSpacing:1.6},title:{fontSize:43,fontWeight:'900',letterSpacing:-2.2,marginTop:2},
 phaseCard:{flexDirection:'row',alignItems:'center',gap:12},small:{fontSize:7,fontWeight:'900',letterSpacing:1.3},phaseTitle:{fontSize:20,fontWeight:'900',marginTop:5},phaseCopy:{fontSize:9,lineHeight:15,marginTop:4},phaseBtns:{gap:8},phaseDot:{width:12,height:12,borderRadius:6,backgroundColor:'#34343B'},phaseOn:{backgroundColor:'#fff'},
 grid:{flexDirection:'row',flexWrap:'wrap',gap:10},tile:{width:'48.4%',minHeight:150,borderRadius:28,borderWidth:1,borderColor:COLORS.border,backgroundColor:COLORS.panel,padding:16},icon:{width:42,height:42,borderRadius:14,backgroundColor:'rgba(255,255,255,.07)',alignItems:'center',justifyContent:'center'},tileTitle:{fontSize:15,fontWeight:'900',marginTop:20},tileSub:{fontSize:9,marginTop:4},arrow:{position:'absolute',right:15,top:17,transform:[{rotate:'45deg'}]},
 profile:{minHeight:82,borderRadius:27,borderWidth:1,borderColor:COLORS.border,backgroundColor:COLORS.panel,padding:15,flexDirection:'row',alignItems:'center',gap:12},avatar:{width:48,height:48,borderRadius:24,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'},
});
