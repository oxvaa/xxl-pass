import React from 'react';
import {View,Pressable,StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import {Screen,TopBar,Txt,GlassCard,Pill,SectionTitle,Button,Metric} from '../components/UI';
import {COLORS,GRADIENTS} from '../theme';
import {EVENT,ANNOUNCEMENTS,SCHEDULE} from '../data';

export default function HomeScreen({state,actions,navigate}){
 const next=SCHEDULE.find(x=>x.kind==='SET');
 return <Screen>
  <TopBar onProfile={()=>navigate('profile')} onNotifications={()=>navigate('notifications')} badge={2}/>
  {state.livePreview
   ?<LiveHero onSchedule={()=>navigate('schedule')} onExit={()=>actions.setLive(false)}/>
   :<Hero onPass={()=>navigate('pass')} onLive={()=>actions.setLive(true)}/>}

  <View style={styles.quickRow}>
   <Quick icon="map-outline" label="MAP" onPress={()=>navigate('map')}/>
   <Quick icon="shirt-outline" label="MERCH" onPress={()=>navigate('merch')}/>
   <Quick icon="people-outline" label="CREW" onPress={()=>navigate('crew')}/>
   <Quick icon="gift-outline" label="REWARDS" onPress={()=>navigate('rewards')}/>
  </View>

  <SectionTitle eyebrow="YOUR NIGHT" title="Next on your radar" action="Schedule" onAction={()=>navigate('schedule')}/>
  <GlassCard onPress={()=>navigate('schedule')} style={styles.nextCard}>
   <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start'}}>
    <Pill danger>MAIN STAGE · {next.time}</Pill>
    <View style={styles.roundArrow}><Ionicons name="arrow-up" size={18} color="#050506" style={{transform:[{rotate:'45deg'}]}}/></View>
   </View>
   <Txt style={styles.nextTitle}>{next.title}</Txt>
   <Txt muted style={styles.nextCopy}>Your personal timetable starts here. Add reminders and keep the night moving.</Txt>
  </GlassCard>

  <SectionTitle eyebrow="YOUR ACCESS" title="XXL Pass" action="Open pass" onAction={()=>navigate('pass')}/>
  <Pressable onPress={()=>navigate('pass')} style={styles.miniPassWrap}>
   <LinearGradient colors={GRADIENTS.pass} style={styles.miniPass}>
    <View>
     <Txt faint style={styles.passEyebrow}>ARENA TAKEDOWN · ACTIVE</Txt>
     <Txt style={styles.passName}>ŠIMON SZÁBO</Txt>
     <Txt muted style={styles.passMeta}>GENERAL ADMISSION · ZONE A</Txt>
    </View>
    <View style={styles.passBadge}><Txt style={{fontWeight:'900',color:'#050506'}}>XXL</Txt></View>
   </LinearGradient>
  </Pressable>

  <SectionTitle eyebrow="XXL NOW" title="Inside the event" action="All updates" onAction={()=>navigate('notifications')}/>
  {ANNOUNCEMENTS.slice(0,2).map((a,i)=><GlassCard key={a.id} style={[styles.newsCard,i===0&&{backgroundColor:'#141418'}]}>
   <View style={styles.newsIcon}><Ionicons name={a.type==='DROP'?'sparkles-outline':'megaphone-outline'} size={18} color="#fff"/></View>
   <View style={{flex:1}}><Txt style={{fontWeight:'900',fontSize:15}}>{a.title}</Txt><Txt muted style={{fontSize:11,lineHeight:17,marginTop:5}}>{a.body}</Txt></View>
  </GlassCard>)}

  <SectionTitle eyebrow="MEMBERSHIP" title="Your XXL level" action={`${state.points} XP`} onAction={()=>navigate('rewards')}/>
  <LinearGradient colors={['#1B1B21','#0B0B0E']} style={styles.member}>
   <View style={styles.level}><Txt style={{fontSize:24,fontWeight:'900'}}>{state.level}</Txt><Txt faint style={{fontSize:7,fontWeight:'900',letterSpacing:1.4}}>LEVEL</Txt></View>
   <View style={{flex:1}}><Txt style={{fontSize:18,fontWeight:'900'}}>XXL Insider</Txt><Txt muted style={{fontSize:11,lineHeight:17,marginTop:5}}>Keep earning XP from event activity, merch and future drops.</Txt></View>
  </LinearGradient>
 </Screen>
}

function Hero({onPass,onLive}){
 return <LinearGradient colors={GRADIENTS.hero} start={{x:.05,y:0}} end={{x:.8,y:1}} style={styles.hero}>
  <View style={styles.heroNoiseOne}/><View style={styles.heroNoiseTwo}/>
  <View style={styles.heroTop}><Pill danger>XXL CZECHIA · EDITION 01</Pill><Txt faint style={{fontSize:9,fontWeight:'900',letterSpacing:1.5}}>OSTRAVA</Txt></View>
  <View style={styles.wordStack}><Txt style={styles.heroWord}>ARENA</Txt><Txt style={[styles.heroWord,{color:COLORS.redSoft}]}>TAKEDOWN.</Txt></View>
  <Txt style={styles.heroMeta}>{EVENT.dateLabel} · {EVENT.venue}</Txt>
  <View style={styles.metrics}><Metric value="01" label="NIGHT"/><Metric value="02" label="STAGES"/><Metric value="∞" label="ENERGY"/></View>
  <Button title="OPEN XXL PASS" icon="ticket-outline" onPress={onPass}/>
  <Pressable onPress={onLive} style={styles.livePreview}><View style={styles.liveDot}/><Txt style={{fontSize:10,fontWeight:'900',color:'#D7D7DE'}}>PREVIEW EVENT LIVE MODE</Txt></Pressable>
 </LinearGradient>
}

function LiveHero({onSchedule,onExit}){
 return <LinearGradient colors={GRADIENTS.heroLive} style={styles.hero}>
  <View style={styles.heroTop}><Pill danger>● LIVE NOW</Pill><Pressable onPress={onExit}><Txt faint style={{fontSize:9,fontWeight:'900'}}>EXIT PREVIEW</Txt></Pressable></View>
  <Txt style={styles.liveStage}>MAIN STAGE</Txt>
  <Txt style={[styles.heroWord,{marginTop:8}]}>ARTIST 03</Txt>
  <Txt style={styles.heroMeta}>20:00 — 20:45 · NOW PLAYING</Txt>
  <View style={styles.progress}><View style={styles.progressFill}/></View>
  <View style={styles.progressMeta}><Txt faint style={styles.progressTxt}>20:14</Txt><Txt faint style={styles.progressTxt}>20:45</Txt></View>
  <Button title="OPEN LIVE SCHEDULE" icon="flash-outline" onPress={onSchedule} style={{marginTop:18}}/>
  <View style={styles.nextLive}><Txt faint style={{fontSize:8,fontWeight:'900',letterSpacing:1.3}}>NEXT UP</Txt><Txt style={{fontSize:13,fontWeight:'900',marginTop:4}}>SPECIAL GUEST TBA · 21:15</Txt></View>
 </LinearGradient>
}

function Quick({icon,label,onPress}){return <Pressable onPress={onPress} style={({pressed})=>[styles.quick,pressed&&{opacity:.7}]}><Ionicons name={icon} size={21} color="#fff"/><Txt style={styles.quickText}>{label}</Txt></Pressable>}

const styles=StyleSheet.create({
 hero:{borderRadius:36,padding:21,borderWidth:1,borderColor:'rgba(255,255,255,.12)',overflow:'hidden',marginTop:2},
 heroNoiseOne:{position:'absolute',width:210,height:210,borderRadius:120,borderWidth:1,borderColor:'rgba(255,255,255,.05)',right:-80,top:50},
 heroNoiseTwo:{position:'absolute',width:120,height:120,borderRadius:80,backgroundColor:'rgba(255,255,255,.025)',right:5,bottom:70},
 heroTop:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
 wordStack:{marginTop:34},
 heroWord:{fontSize:49,fontWeight:'900',letterSpacing:-3,lineHeight:44},
 heroMeta:{fontSize:10,fontWeight:'800',letterSpacing:.9,color:'#C5C5CD',marginTop:12},
 metrics:{flexDirection:'row',paddingVertical:22,marginTop:16,borderTopWidth:1,borderBottomWidth:1,borderColor:'rgba(255,255,255,.08)'},
 livePreview:{alignSelf:'center',flexDirection:'row',alignItems:'center',gap:8,padding:13},
 liveDot:{width:7,height:7,borderRadius:4,backgroundColor:COLORS.red},
 quickRow:{flexDirection:'row',gap:8,marginTop:12},
 quick:{flex:1,height:74,borderRadius:22,backgroundColor:COLORS.panel,borderWidth:1,borderColor:COLORS.border,alignItems:'center',justifyContent:'center',gap:8},
 quickText:{fontSize:8,fontWeight:'900',letterSpacing:.9},
 nextCard:{padding:19,overflow:'hidden'},
 roundArrow:{width:42,height:42,borderRadius:21,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'},
 nextTitle:{fontSize:29,fontWeight:'900',letterSpacing:-1.3,marginTop:34},
 nextCopy:{fontSize:11,lineHeight:18,marginTop:6,maxWidth:300},
 miniPassWrap:{borderRadius:28,overflow:'hidden'},
 miniPass:{minHeight:148,borderRadius:28,borderWidth:1,borderColor:COLORS.borderStrong,padding:19,flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between'},
 passEyebrow:{fontSize:8,fontWeight:'900',letterSpacing:1.3},
 passName:{fontSize:21,fontWeight:'900',letterSpacing:-.7,marginTop:10},
 passMeta:{fontSize:10,fontWeight:'800',marginTop:5},
 passBadge:{height:48,width:48,borderRadius:24,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'},
 newsCard:{marginBottom:9,flexDirection:'row',alignItems:'flex-start',gap:12},
 newsIcon:{height:40,width:40,borderRadius:14,backgroundColor:'rgba(255,255,255,.07)',alignItems:'center',justifyContent:'center'},
 member:{borderRadius:28,borderWidth:1,borderColor:COLORS.border,padding:18,flexDirection:'row',alignItems:'center',gap:16},
 level:{height:78,width:78,borderRadius:39,borderWidth:6,borderColor:'#fff',alignItems:'center',justifyContent:'center'},
 liveStage:{fontSize:10,fontWeight:'900',letterSpacing:1.8,color:'#FF98A5',marginTop:32},
 progress:{height:5,borderRadius:5,backgroundColor:'rgba(255,255,255,.14)',overflow:'hidden',marginTop:22},
 progressFill:{width:'34%',height:'100%',backgroundColor:COLORS.red},
 progressMeta:{flexDirection:'row',justifyContent:'space-between',marginTop:7},
 progressTxt:{fontSize:9},
 nextLive:{marginTop:12,paddingTop:15,borderTopWidth:1,borderColor:'rgba(255,255,255,.08)'},
});
