import React from 'react';
import {View,Pressable,StyleSheet,ImageBackground} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import {Screen,TopBar,Txt,GlassCard,Pill,Button,SectionTitle,O2ArenaLogo} from '../components/UI';
import {COLORS,GRADIENTS} from '../theme';
import {ASSETS,EVENT,FEATURED,DAYS} from '../data';
import {t} from '../i18n';

export default function HomeScreen({state,actions,navigate}){
 const lang=state.language, guest=!state.session;
 return <Screen>
  <TopBar state={state} onProfile={()=>navigate('profile')} onNotifications={()=>navigate('notifications')}/>
  {state.appMode==='admin'&&<Pressable onPress={()=>navigate('admin')} style={styles.adminStrip}><Ionicons name="shield-checkmark-outline" size={17} color="#fff"/><Txt style={{fontSize:10,fontWeight:'900'}}>ADMIN MODE · OTEVŘÍT PANEL</Txt></Pressable>}

  <ImageBackground source={{uri:ASSETS.poster}} imageStyle={styles.heroImage} style={styles.hero}>
   <LinearGradient colors={['rgba(0,0,0,.12)','rgba(0,0,0,.55)','rgba(5,5,6,.95)']} style={styles.overlay}>
    <Pill green>XXL CZECHIA · O2 ARENA</Pill>
    <View style={{flex:1}}/>
    <Txt style={styles.heroTitle}>3 DAYS.{`\n`}ONE XXL.</Txt>
    <Txt style={styles.heroMeta}>{EVENT.dates} · {EVENT.venue}</Txt>
    <View style={styles.heroStats}><Stat n="3" t={t(lang,'days').toUpperCase()}/><Stat n="40+" t={t(lang,'artists').toUpperCase()}/><Stat n="PRG" t={t(lang,'city').toUpperCase()}/></View>
    <Button green title={t(lang,'openEvent')} icon="calendar-outline" onPress={()=>navigate('event')}/>
   </LinearGradient>
  </ImageBackground>

  {guest&&<GlassCard style={styles.guestCard}>
   <View style={styles.guestIcon}><Ionicons name="person-outline" size={22} color="#fff"/></View>
   <View style={{flex:1}}><Txt faint style={styles.small}>{t(lang,'optionalAccount').toUpperCase()}</Txt><Txt style={styles.guestTitle}>{t(lang,'continueGuest')}</Txt><Txt muted style={styles.copy}>{t(lang,'guestCopy')}</Txt>
    <View style={styles.authButtons}><Pressable onPress={()=>navigate('auth',{mode:'login'})}><Txt style={styles.link}>{t(lang,'login')}</Txt></Pressable><Pressable onPress={()=>navigate('auth',{mode:'register'})}><Txt style={styles.link}>{t(lang,'register')}</Txt></Pressable></View>
   </View>
  </GlassCard>}

  <SectionTitle eyebrow={t(lang,'featured').toUpperCase()} title="FUTURE · GUNNA · ESDEEKID" action={t(lang,'fullLineup')} onAction={()=>navigate('lineup')}/>
  <View style={styles.artistRow}>{FEATURED.slice(0,3).map(a=><Pressable key={a.id} onPress={()=>navigate('lineup')} style={styles.artistCard}><View style={[styles.artistAccent,{backgroundColor:a.accent}]}/><Txt faint style={styles.small}>{a.tag}</Txt><Txt style={styles.artistName}>{a.name}</Txt></Pressable>)}</View>

  <SectionTitle eyebrow={t(lang,'venue').toUpperCase()} title={t(lang,'o2Arena')} action={t(lang,'openMap')} onAction={()=>navigate('venue')}/>
  <GlassCard onPress={()=>navigate('venue')} style={styles.venue}>
   <View style={{flex:1}}><O2ArenaLogo/><Txt muted style={{fontSize:10,lineHeight:16,marginTop:12}}>{t(lang,'address')}</Txt><View style={styles.venueTags}><Pill>{t(lang,'metro')}</Pill></View></View>
   <Ionicons name="arrow-up" size={19} color="#fff" style={{transform:[{rotate:'45deg'}]}}/>
  </GlassCard>

  {!guest&&<>
   <SectionTitle eyebrow="MY XXL" title={state.session?.name||''} action={`${state.points} XP`} onAction={()=>navigate('profile')}/>
   <GlassCard onPress={()=>navigate('pass')} style={styles.accountCard}><View style={styles.accountIcon}><Ionicons name="ticket-outline" size={22} color="#050506"/></View><View style={{flex:1}}><Txt style={{fontWeight:'900',fontSize:16}}>XXL PASS · {state.passTier}</Txt><Txt muted style={{fontSize:10,marginTop:4}}>{state.favourites.length} My XXL · {state.completedMissions.length}/4 missions</Txt></View><Ionicons name="chevron-forward" size={17} color={COLORS.faint}/></GlassCard>
  </>}
 </Screen>
}
function Stat({n,t}){return <View style={{flex:1}}><Txt style={{fontSize:21,fontWeight:'900'}}>{n}</Txt><Txt faint style={{fontSize:7,fontWeight:'900',letterSpacing:1.1,marginTop:3}}>{t}</Txt></View>}
const styles=StyleSheet.create({
 adminStrip:{minHeight:38,borderRadius:16,backgroundColor:'#4D0714',borderWidth:1,borderColor:'rgba(255,80,100,.3)',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:7,marginBottom:10},
 hero:{height:520,borderRadius:36,overflow:'hidden',borderWidth:1,borderColor:COLORS.borderStrong},heroImage:{borderRadius:36},overlay:{flex:1,padding:20},
 heroTitle:{fontSize:42,fontWeight:'900',letterSpacing:-2.6,lineHeight:39},heroMeta:{fontSize:10,fontWeight:'900',letterSpacing:.7,marginTop:10,color:'#D0D0D6'},heroStats:{flexDirection:'row',paddingVertical:20,marginVertical:18,borderTopWidth:1,borderBottomWidth:1,borderColor:'rgba(255,255,255,.13)'},
 guestCard:{marginTop:12,flexDirection:'row',gap:13},guestIcon:{height:44,width:44,borderRadius:15,backgroundColor:'rgba(255,255,255,.07)',alignItems:'center',justifyContent:'center'},small:{fontSize:7,fontWeight:'900',letterSpacing:1.3},guestTitle:{fontSize:17,fontWeight:'900',marginTop:5},copy:{fontSize:10,lineHeight:16,marginTop:5},authButtons:{flexDirection:'row',gap:18,marginTop:12},link:{fontSize:11,fontWeight:'900',color:COLORS.green2},
 artistRow:{gap:9},artistCard:{minHeight:105,borderRadius:25,borderWidth:1,borderColor:COLORS.border,backgroundColor:COLORS.panel,padding:16,overflow:'hidden'},artistAccent:{position:'absolute',left:0,top:0,bottom:0,width:4},artistName:{fontSize:21,fontWeight:'900',letterSpacing:-.8,marginTop:8},
 venue:{flexDirection:'row',alignItems:'flex-start',gap:12},venueTags:{marginTop:12},
 accountCard:{flexDirection:'row',alignItems:'center',gap:12},accountIcon:{height:44,width:44,borderRadius:15,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'},
});
