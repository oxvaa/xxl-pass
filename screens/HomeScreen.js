import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Screen, TopBar, Txt, GlassCard, Pill, SectionTitle, Button } from '../components/UI';
import { COLORS, GRADIENTS } from '../theme';
import { EVENT, ANNOUNCEMENTS, SCHEDULE } from '../data';

export default function HomeScreen({ state, actions, navigate }) {
  const next=SCHEDULE.find(x=>x.kind==='SET');
  return <Screen>
    <TopBar onProfile={()=>navigate('profile')} onNotifications={()=>navigate('notifications')} badge={2}/>

    {state.livePreview ? <LiveHero onOpen={()=>navigate('schedule')} onDisable={()=>actions.setLive(false)} /> : <Hero onPass={()=>navigate('pass')} onLive={()=>actions.setLive(true)} />}

    <View style={styles.quickRow}>
      <Quick icon="map-outline" label="MAP" onPress={()=>navigate('map')}/>
      <Quick icon="shirt-outline" label="MERCH" onPress={()=>navigate('merch')}/>
      <Quick icon="people-outline" label="CREW" onPress={()=>navigate('crew')}/>
      <Quick icon="gift-outline" label="REWARDS" onPress={()=>navigate('rewards')}/>
    </View>

    <SectionTitle eyebrow="YOUR NIGHT" title="Next up" action="Full schedule" onAction={()=>navigate('schedule')}/>
    <GlassCard onPress={()=>navigate('schedule')} style={{padding:0,overflow:'hidden'}}>
      <View style={styles.nextCard}>
        <View style={{flex:1}}><Pill danger>MAIN STAGE</Pill><Txt style={styles.nextTime}>{next.time}</Txt><Txt style={styles.nextTitle}>{next.title}</Txt><Txt muted style={{marginTop:6,fontSize:12}}>Set reminder and add it to your personal XXL timetable.</Txt></View>
        <View style={styles.arrow}><Ionicons name="arrow-up" size={20} color="#050505" style={{transform:[{rotate:'45deg'}]}}/></View>
      </View>
    </GlassCard>

    <SectionTitle eyebrow="XXL NOW" title="Announcements" action="View all" onAction={()=>navigate('notifications')}/>
    {ANNOUNCEMENTS.slice(0,2).map((a,i)=><GlassCard key={a.id} style={{marginBottom:10,backgroundColor:i===0?'#131318':COLORS.panel}}>
      <View style={{flexDirection:'row',gap:13,alignItems:'flex-start'}}><View style={styles.announceIcon}><Ionicons name={a.type==='DROP'?'sparkles-outline':'megaphone-outline'} size={19} color="#fff"/></View><View style={{flex:1}}><Txt style={{fontWeight:'900',fontSize:15}}>{a.title}</Txt><Txt muted style={{fontSize:12,lineHeight:18,marginTop:5}}>{a.body}</Txt></View></View>
    </GlassCard>)}

    <SectionTitle eyebrow="MEMBERSHIP" title="XXL Rewards" action={`${state.points} XP`} onAction={()=>navigate('rewards')}/>
    <LinearGradient colors={['#1C1C22','#0C0C10']} style={styles.rewardCard}>
      <View style={styles.rewardRing}><Txt style={{fontSize:23,fontWeight:'1000'}}>{state.level}</Txt><Txt faint style={{fontSize:8,fontWeight:'900',letterSpacing:1.3}}>LEVEL</Txt></View>
      <View style={{flex:1}}><Txt style={{fontSize:17,fontWeight:'900'}}>Keep your pass active.</Txt><Txt muted style={{fontSize:12,lineHeight:18,marginTop:5}}>Earn XP from events, merch reservations and XXL drops.</Txt><Button title="Open rewards" secondary style={{marginTop:14,minHeight:46}} onPress={()=>navigate('rewards')}/></View>
    </LinearGradient>
  </Screen>;
}

function Hero({onPass,onLive}){
  return <LinearGradient colors={GRADIENTS.hero} start={{x:.1,y:0}} end={{x:.8,y:1}} style={styles.hero}>
    <View style={styles.heroTop}><Pill danger>XXL CZECHIA · 2027</Pill><Ionicons name="star" size={15} color="#fff" /></View>
    <Txt style={styles.heroTitle}>ARENA{`\n`}TAKEDOWN</Txt>
    <Txt style={styles.heroMeta}>{EVENT.dateLabel} · {EVENT.venue}</Txt>
    <View style={styles.heroStats}><Stat n="01" label="NIGHT"/><Stat n="2" label="STAGES"/><Stat n="∞" label="ENERGY"/></View>
    <Button title="OPEN XXL PASS" icon="ticket-outline" onPress={onPass}/>
    <Pressable onPress={onLive} style={{alignSelf:'center',padding:12}}><Txt faint style={{fontSize:10,fontWeight:'800'}}>Preview LIVE mode</Txt></Pressable>
  </LinearGradient>;
}

function LiveHero({onOpen,onDisable}){
  return <LinearGradient colors={GRADIENTS.live} style={styles.hero}>
    <View style={styles.heroTop}><Pill danger>● LIVE NOW</Pill><Pressable onPress={onDisable}><Txt faint style={{fontSize:10,fontWeight:'900'}}>EXIT PREVIEW</Txt></Pressable></View>
    <Txt style={{fontSize:12,fontWeight:'900',letterSpacing:1.8,color:'#FF98A4',marginTop:26}}>MAIN STAGE</Txt>
    <Txt style={[styles.heroTitle,{fontSize:40}]}>ARTIST 03</Txt>
    <Txt style={styles.heroMeta}>20:00 — 20:45 · NOW PLAYING</Txt>
    <View style={styles.liveBar}><View style={styles.liveFill}/></View>
    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:8}}><Txt faint style={{fontSize:9}}>20:14</Txt><Txt faint style={{fontSize:9}}>20:45</Txt></View>
    <Button title="SEE LIVE SCHEDULE" icon="flash-outline" onPress={onOpen} style={{marginTop:18}}/>
  </LinearGradient>;
}

function Quick({icon,label,onPress}){return <Pressable onPress={onPress} style={styles.quick}><Ionicons name={icon} size={21} color="#fff"/><Txt style={{fontSize:8,fontWeight:'900',letterSpacing:.8}}>{label}</Txt></Pressable>}
function Stat({n,label}){return <View style={{flex:1}}><Txt style={{fontSize:22,fontWeight:'1000'}}>{n}</Txt><Txt faint style={{fontSize:8,fontWeight:'900',letterSpacing:1}}>{label}</Txt></View>}

const styles=StyleSheet.create({
 hero:{borderRadius:34,padding:20,borderWidth:1,borderColor:'rgba(255,255,255,.12)',overflow:'hidden',marginTop:2},
 heroTop:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
 heroTitle:{fontSize:48,fontWeight:'1000',letterSpacing:-2.7,lineHeight:43,marginTop:30},
 heroMeta:{fontSize:11,fontWeight:'800',letterSpacing:.8,color:'#C0C0C8',marginTop:12},
 heroStats:{flexDirection:'row',paddingVertical:22,marginTop:8,borderTopWidth:1,borderBottomWidth:1,borderColor:'rgba(255,255,255,.08)'},
 quickRow:{flexDirection:'row',gap:8,marginTop:12},
 quick:{flex:1,height:76,borderRadius:21,backgroundColor:COLORS.panel,borderWidth:1,borderColor:COLORS.border,alignItems:'center',justifyContent:'center',gap:8},
 nextCard:{padding:18,flexDirection:'row',alignItems:'center'},nextTime:{fontSize:13,fontWeight:'900',color:'#FF7B89',marginTop:18},nextTitle:{fontSize:26,fontWeight:'1000',letterSpacing:-1,marginTop:3},
 arrow:{width:44,height:44,borderRadius:22,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'},
 announceIcon:{height:40,width:40,borderRadius:14,backgroundColor:'rgba(255,255,255,.08)',alignItems:'center',justifyContent:'center'},
 rewardCard:{borderRadius:28,borderWidth:1,borderColor:COLORS.border,padding:18,flexDirection:'row',alignItems:'center',gap:18},
 rewardRing:{height:88,width:88,borderRadius:44,borderWidth:8,borderColor:'#fff',alignItems:'center',justifyContent:'center'},
 liveBar:{height:5,borderRadius:9,backgroundColor:'rgba(255,255,255,.14)',overflow:'hidden',marginTop:22},liveFill:{width:'34%',height:'100%',backgroundColor:'#F23A4B'},
});
