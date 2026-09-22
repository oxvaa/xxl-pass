import React from 'react';
import {View,Pressable,StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import {Screen,TopBar,Txt,GlassCard,Pill,SectionTitle,Button,Metric} from '../components/UI';
import {COLORS,GRADIENTS} from '../theme';
import {EVENT,SCHEDULE,RADAR,CROWD} from '../data';

export default function HomeScreen({state,actions,navigate}){
 return <Screen>
  <TopBar onProfile={()=>navigate('profile')} onNotifications={()=>navigate('notifications')} badge={2}/>
  <PhaseSwitch value={state.eventPhase} onChange={actions.setEventPhase}/>
  {state.eventPhase==='live'
   ?<LiveHome state={state} navigate={navigate}/>
   :state.eventPhase==='after'
    ?<AfterHome state={state} navigate={navigate}/>
    :<BeforeHome state={state} navigate={navigate}/>}
 </Screen>
}

function PhaseSwitch({value,onChange}){
 return <View style={styles.phase}>
  {['before','live','after'].map(x=><Pressable key={x} onPress={()=>onChange(x)} style={[styles.phaseBtn,value===x&&styles.phaseOn]}>
   <Txt style={[styles.phaseTxt,value===x&&{color:'#050506'}]}>{x==='before'?'BEFORE':x==='live'?'LIVE':'AFTER'}</Txt>
  </Pressable>)}
 </View>
}

function BeforeHome({state,navigate}){
 const next=SCHEDULE.find(x=>x.kind==='SET');
 return <>
  <LinearGradient colors={GRADIENTS.hero} style={styles.hero}>
   <View style={styles.heroTop}><Pill danger>XXL CZECHIA · EDITION 01</Pill><Txt faint style={styles.city}>OSTRAVA</Txt></View>
   <Txt style={styles.heroWord}>ARENA</Txt><Txt style={[styles.heroWord,{color:COLORS.redSoft}]}>TAKEDOWN.</Txt>
   <Txt style={styles.heroMeta}>{EVENT.dateLabel} · {EVENT.venue}</Txt>
   <View style={styles.metrics}><Metric value="01" label="NIGHT"/><Metric value="02" label="STAGES"/><Metric value="∞" label="ENERGY"/></View>
   <Button title="OPEN XXL PASS" icon="ticket-outline" onPress={()=>navigate('pass')}/>
  </LinearGradient>

  <QuickRow navigate={navigate}/>
  <SectionTitle eyebrow="YOUR NIGHT" title="Next on your radar" action="Schedule" onAction={()=>navigate('schedule')}/>
  <GlassCard onPress={()=>navigate('schedule')} style={styles.bigCard}>
   <Pill danger>MAIN STAGE · {next.time}</Pill>
   <Txt style={styles.bigTitle}>{next.title}</Txt><Txt muted style={styles.copy}>Build your personal timetable before doors open.</Txt>
  </GlassCard>

  <SectionTitle eyebrow="XXL WALLET" title="Ready for the arena" action="Open wallet" onAction={()=>navigate('wallet')}/>
  <WalletMini state={state} onPress={()=>navigate('wallet')}/>
 </>;
}

function LiveHome({state,navigate}){
 const completed=state.completedMissions.length;
 return <>
  <LinearGradient colors={GRADIENTS.heroLive} style={styles.hero}>
   <View style={styles.heroTop}><Pill danger>● LIVE NOW</Pill><Txt faint style={styles.city}>20:14 · OSTRAVA</Txt></View>
   <Txt style={styles.liveStage}>MAIN STAGE</Txt><Txt style={styles.heroWord}>ARTIST 03</Txt>
   <Txt style={styles.heroMeta}>20:00 — 20:45 · NOW PLAYING</Txt>
   <View style={styles.progress}><View style={styles.progressFill}/></View>
   <View style={styles.progressTimes}><Txt faint style={styles.tiny}>20:14</Txt><Txt faint style={styles.tiny}>20:45</Txt></View>
   <Button title="ENTER STAGE MODE" icon="flash-outline" onPress={()=>navigate('stage',{stage:'MAIN STAGE'})}/>
  </LinearGradient>

  <View style={styles.liveQuick}>
   <LiveAction icon="radio-outline" title="RADAR" sub="5 updates" onPress={()=>navigate('radar')}/>
   <LiveAction icon="wallet-outline" title={`${state.walletBalance} Kč`} sub="XXL Wallet" onPress={()=>navigate('wallet')}/>
  </View>

  <SectionTitle eyebrow="XXL RADAR" title="Happening right now" action="Open radar" onAction={()=>navigate('radar')}/>
  {RADAR.slice(0,3).map((r,i)=><Pressable key={r.id} onPress={()=>navigate(r.route,r.route==='stage'?{stage:'MAIN STAGE'}:undefined)} style={styles.radarRow}>
   <View style={[styles.radarIcon,i===0&&{backgroundColor:'rgba(255,51,77,.16)'}]}><Ionicons name={r.icon} size={18} color="#fff"/></View>
   <View style={{flex:1}}><Txt faint style={styles.radarType}>{r.type} · {r.time}</Txt><Txt style={styles.radarTitle}>{r.title}</Txt><Txt muted style={styles.radarBody}>{r.body}</Txt></View>
   <Ionicons name="chevron-forward" size={16} color={COLORS.faint}/>
  </Pressable>)}

  <SectionTitle eyebrow="LIVE CROWD" title="Where it's moving" action="Stage mode" onAction={()=>navigate('stage',{stage:'MAIN STAGE'})}/>
  <View style={styles.crowdGrid}>{CROWD.map(c=><GlassCard key={c.id} style={styles.crowdCard}><Txt faint style={styles.crowdName}>{c.name}</Txt><Txt style={styles.crowdStatus}>{c.status}</Txt><View style={styles.crowdBar}><View style={[styles.crowdFill,{width:`${c.level*100}%`,backgroundColor:c.color}]}/></View><Txt muted style={styles.crowdWait}>{c.wait}</Txt></GlassCard>)}</View>

  <SectionTitle eyebrow="XXL MISSIONS" title={`${completed}/5 completed`} action="Missions" onAction={()=>navigate('missions')}/>
  <GlassCard onPress={()=>navigate('missions')} style={styles.missionMini}>
   <View style={styles.missionRing}><Txt style={{fontSize:20,fontWeight:'900'}}>{completed}</Txt><Txt faint style={{fontSize:7,fontWeight:'900'}}>DONE</Txt></View>
   <View style={{flex:1}}><Txt style={{fontSize:16,fontWeight:'900'}}>Unlock the night.</Txt><Txt muted style={styles.copy}>Complete missions to reveal Secret Drops and After Hours access.</Txt></View>
  </GlassCard>
 </>;
}

function AfterHome({state,navigate}){
 return <>
  <LinearGradient colors={GRADIENTS.heroAfter} style={styles.hero}>
   <Pill>XXL 2027 · COMPLETE</Pill>
   <Txt style={[styles.heroWord,{marginTop:34}]}>YOU WERE</Txt><Txt style={[styles.heroWord,{color:COLORS.chrome}]}>THERE.</Txt>
   <Txt style={styles.heroMeta}>ARENA TAKEDOWN · YOUR PERSONAL RECAP</Txt>
   <View style={styles.metrics}><Metric value="7" label="ARTISTS"/><Metric value="8H" label="IN ARENA"/><Metric value="3" label="DROPS"/></View>
   <Button title="OPEN XXL MEMORIES" icon="images-outline" onPress={()=>navigate('memories')}/>
  </LinearGradient>

  <SectionTitle eyebrow="YOUR NIGHT" title="XXL 2027 recap"/>
  <View style={styles.crowdGrid}>
   <Recap n="14.2K" t="STEPS"/><Recap n="MAIN" t="TOP STAGE"/><Recap n={`${state.points}`} t="XP"/><Recap n="67%" t="CREW TIME"/>
  </View>

  <SectionTitle eyebrow="AFTER HOURS" title={state.afterHoursUnlocked?'Still not over.':'One last lock.'} action="Open" onAction={()=>navigate('afterhours')}/>
  <GlassCard onPress={()=>navigate('afterhours')} style={styles.afterCard}>
   <Ionicons name={state.afterHoursUnlocked?'moon':'lock-closed-outline'} size={24} color="#fff"/>
   <View style={{flex:1}}><Txt style={{fontWeight:'900',fontSize:17}}>{state.afterHoursUnlocked?'XXL AFTER HOURS':'AFTER HOURS LOCKED'}</Txt><Txt muted style={styles.copy}>{state.afterHoursUnlocked?'Secret location unlocked for your pass.':'Complete missions or claim the secret drop to reveal it.'}</Txt></View>
  </GlassCard>
 </>;
}

function QuickRow({navigate}){return <View style={styles.quickRow}><Quick icon="map-outline" label="MAP" onPress={()=>navigate('map')}/><Quick icon="shirt-outline" label="MERCH" onPress={()=>navigate('merch')}/><Quick icon="gift-outline" label="REWARDS" onPress={()=>navigate('rewards')}/><Quick icon="wallet-outline" label="WALLET" onPress={()=>navigate('wallet')}/></View>}
function Quick({icon,label,onPress}){return <Pressable onPress={onPress} style={styles.quick}><Ionicons name={icon} size={21} color="#fff"/><Txt style={styles.quickText}>{label}</Txt></Pressable>}
function LiveAction({icon,title,sub,onPress}){return <Pressable onPress={onPress} style={styles.liveAction}><View style={styles.liveActionIcon}><Ionicons name={icon} size={20} color="#fff"/></View><Txt style={{fontSize:16,fontWeight:'900',marginTop:12}}>{title}</Txt><Txt muted style={{fontSize:9,marginTop:3}}>{sub}</Txt></Pressable>}
function WalletMini({state,onPress}){return <Pressable onPress={onPress}><LinearGradient colors={GRADIENTS.wallet} style={styles.walletMini}><View><Txt faint style={styles.walletEyebrow}>XXL CASHLESS</Txt><Txt style={styles.walletBalance}>{state.walletBalance.toLocaleString('cs-CZ')} Kč</Txt><Txt muted style={styles.walletSub}>{state.vouchers.length} vouchers · Pass {state.passTier}</Txt></View><Ionicons name="wallet-outline" size={27} color="#fff"/></LinearGradient></Pressable>}
function Recap({n,t}){return <GlassCard style={styles.recap}><Txt style={{fontSize:23,fontWeight:'900'}}>{n}</Txt><Txt faint style={{fontSize:7,fontWeight:'900',letterSpacing:1.2,marginTop:5}}>{t}</Txt></GlassCard>}

const styles=StyleSheet.create({
 phase:{flexDirection:'row',gap:5,backgroundColor:'#0D0D11',borderRadius:18,padding:4,borderWidth:1,borderColor:COLORS.border,marginBottom:10},
 phaseBtn:{flex:1,minHeight:34,borderRadius:14,alignItems:'center',justifyContent:'center'},
 phaseOn:{backgroundColor:'#fff'},
 phaseTxt:{fontSize:8,fontWeight:'900',letterSpacing:1,color:COLORS.faint},
 hero:{borderRadius:36,padding:21,borderWidth:1,borderColor:'rgba(255,255,255,.12)',overflow:'hidden'},
 heroTop:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
 city:{fontSize:8,fontWeight:'900',letterSpacing:1.5},
 heroWord:{fontSize:49,fontWeight:'900',letterSpacing:-3,lineHeight:44,marginTop:32},
 heroMeta:{fontSize:10,fontWeight:'800',letterSpacing:.9,color:'#C5C5CD',marginTop:12},
 metrics:{flexDirection:'row',paddingVertical:22,marginTop:16,borderTopWidth:1,borderBottomWidth:1,borderColor:'rgba(255,255,255,.08)'},
 quickRow:{flexDirection:'row',gap:8,marginTop:12},
 quick:{flex:1,height:74,borderRadius:22,backgroundColor:COLORS.panel,borderWidth:1,borderColor:COLORS.border,alignItems:'center',justifyContent:'center',gap:8},
 quickText:{fontSize:8,fontWeight:'900',letterSpacing:.9},
 bigCard:{padding:19},
 bigTitle:{fontSize:29,fontWeight:'900',letterSpacing:-1.3,marginTop:32},
 copy:{fontSize:10,lineHeight:16,marginTop:5},
 walletMini:{minHeight:138,borderRadius:28,borderWidth:1,borderColor:COLORS.borderStrong,padding:19,flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between'},
 walletEyebrow:{fontSize:8,fontWeight:'900',letterSpacing:1.4},
 walletBalance:{fontSize:29,fontWeight:'900',letterSpacing:-1.4,marginTop:8},
 walletSub:{fontSize:10,marginTop:4},
 liveStage:{fontSize:9,fontWeight:'900',letterSpacing:1.7,color:'#FF9BA7',marginTop:30},
 progress:{height:5,borderRadius:5,backgroundColor:'rgba(255,255,255,.14)',overflow:'hidden',marginTop:22},
 progressFill:{width:'34%',height:'100%',backgroundColor:COLORS.red},
 progressTimes:{flexDirection:'row',justifyContent:'space-between',marginTop:7},
 tiny:{fontSize:8},
 liveQuick:{flexDirection:'row',gap:10,marginTop:12},
 liveAction:{flex:1,minHeight:126,borderRadius:27,borderWidth:1,borderColor:COLORS.border,backgroundColor:COLORS.panel,padding:15},
 liveActionIcon:{height:38,width:38,borderRadius:13,backgroundColor:'rgba(255,255,255,.07)',alignItems:'center',justifyContent:'center'},
 radarRow:{minHeight:78,flexDirection:'row',alignItems:'center',gap:11,borderBottomWidth:1,borderColor:COLORS.border},
 radarIcon:{height:40,width:40,borderRadius:14,backgroundColor:'rgba(255,255,255,.07)',alignItems:'center',justifyContent:'center'},
 radarType:{fontSize:7,fontWeight:'900',letterSpacing:1.2},
 radarTitle:{fontSize:14,fontWeight:'900',marginTop:3},
 radarBody:{fontSize:9,marginTop:3},
 crowdGrid:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',gap:9},
 crowdCard:{width:'48.5%',padding:14},
 crowdName:{fontSize:7,fontWeight:'900',letterSpacing:1.2},
 crowdStatus:{fontSize:14,fontWeight:'900',marginTop:6},
 crowdBar:{height:4,borderRadius:4,backgroundColor:'rgba(255,255,255,.08)',overflow:'hidden',marginTop:13},
 crowdFill:{height:'100%'},
 crowdWait:{fontSize:8,marginTop:7},
 missionMini:{flexDirection:'row',alignItems:'center',gap:14},
 missionRing:{height:70,width:70,borderRadius:35,borderWidth:6,borderColor:'#fff',alignItems:'center',justifyContent:'center'},
 recap:{width:'48.5%',alignItems:'center'},
 afterCard:{flexDirection:'row',alignItems:'center',gap:13},
});
