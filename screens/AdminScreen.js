import React from 'react';
import {View,Pressable,StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Screen,Txt,GlassCard,Pill,Button,SectionTitle} from '../components/UI';
import {COLORS} from '../theme';
import {PASS_TIERS} from '../data';
import {t} from '../i18n';

export default function AdminScreen({state,actions,goBack}){
 const lang=state.language;
 if(state.session?.role!=='admin'||state.appMode!=='admin')return <Screen><Header goBack={goBack}/><GlassCard><Txt style={{fontSize:20,fontWeight:'900'}}>{t(lang,'adminOnly')}</Txt></GlassCard></Screen>;
 return <Screen>
  <Header goBack={goBack}/>
  <GlassCard style={styles.warning}><Ionicons name="shield-checkmark" size={24} color="#fff"/><View style={{flex:1}}><Txt style={{fontSize:17,fontWeight:'900'}}>XXL CZECHIA ADMIN</Txt><Txt muted style={{fontSize:10,lineHeight:16,marginTop:4}}>{t(lang,'adminNotice')}</Txt></View></GlassCard>

  <SectionTitle eyebrow="EVENT CONTROL" title={t(lang,'eventPhase')}/>
  <View style={styles.row3}>{[['before',t(lang,'before')],['live',t(lang,'live')],['after',t(lang,'after')]].map(([k,l])=><Pressable key={k} onPress={()=>actions.setEventPhase(k)} style={[styles.phase,state.adminConfig.eventPhase===k&&styles.phaseOn]}><Txt style={[styles.phaseTxt,state.adminConfig.eventPhase===k&&{color:'#050506'}]}>{l}</Txt></Pressable>)}</View>

  <SectionTitle eyebrow="PASS CONTROL" title="Default PASS tier"/>
  <View style={styles.wrap}>{Object.keys(PASS_TIERS).map(k=><Pressable key={k} onPress={()=>actions.setPassTier(k)} style={[styles.chip,state.passTier===k&&styles.chipOn]}><Txt style={[styles.chipTxt,state.passTier===k&&{color:'#050506'}]}>{k}</Txt></Pressable>)}</View>

  <SectionTitle eyebrow="ACCOUNT SIMULATION" title={t(lang,'wallet')}/>
  <GlassCard><AdminRow title={`${t(lang,'balance')}: ${state.walletBalance} Kč`}><SmallBtn text="+500" onPress={()=>actions.addWallet(500)}/><SmallBtn text="-120" onPress={()=>actions.spendWallet(120)}/></AdminRow><AdminRow title={`${t(lang,'xp')}: ${state.points}`} last><SmallBtn text="+500 XP" onPress={()=>actions.patch(s=>({points:s.points+500}))}/></AdminRow></GlassCard>

  <SectionTitle eyebrow="MISSIONS / UNLOCKS" title="Demo state"/>
  <GlassCard><Button secondary title={t(lang,'completeAll')} onPress={actions.completeAllMissions}/><Button secondary title={t(lang,'resetMissions')} onPress={actions.resetMissions} style={{marginTop:8}}/><Button secondary title={t(lang,'unlockAfter')} onPress={actions.unlockAfter} style={{marginTop:8}}/></GlassCard>

  <SectionTitle eyebrow="COMMUNICATION" title={t(lang,'notifications')}/>
  <Button title={t(lang,'broadcast')} icon="megaphone-outline" onPress={actions.addBroadcast}/>

  <SectionTitle eyebrow="LOCAL DATABASE" title={t(lang,'registeredUsers')} action={`${state.accounts.length}`}/>
  <GlassCard>{state.accounts.length?state.accounts.map((a,i)=><View key={a.id} style={[styles.account,i<state.accounts.length-1&&styles.border]}><View style={styles.avatar}><Txt style={{color:'#050506',fontWeight:'900'}}>{a.name[0]}</Txt></View><View style={{flex:1}}><Txt style={{fontWeight:'900'}}>{a.name}</Txt><Txt muted style={{fontSize:9,marginTop:3}}>{a.email}</Txt></View><Pill>{a.role.toUpperCase()}</Pill></View>):<Txt muted>No local accounts yet.</Txt>}</GlassCard>

  <SectionTitle eyebrow="RESET" title="XXL CZECHIA 3.0"/>
  <Button secondary title="RESET ALL LOCAL APP DATA" onPress={actions.resetApp}/>
 </Screen>
}
function Header({goBack}){return <View style={styles.header}><Pressable onPress={goBack} style={styles.back}><Ionicons name="chevron-back" size={20} color="#fff"/></Pressable><View style={{flex:1}}><Txt faint style={{fontSize:8,fontWeight:'900',letterSpacing:1.5}}>XXL CZECHIA 3.0</Txt><Txt style={{fontSize:27,fontWeight:'900',marginTop:2}}>ADMIN PANEL</Txt></View><Pill danger>ADMIN</Pill></View>}
function AdminRow({title,children,last}){return <View style={[styles.adminRow,!last&&styles.border]}><Txt style={{flex:1,fontWeight:'900'}}>{title}</Txt><View style={{flexDirection:'row',gap:6}}>{children}</View></View>}
function SmallBtn({text,onPress}){return <Pressable onPress={onPress} style={styles.smallBtn}><Txt style={{fontSize:8,fontWeight:'900'}}>{text}</Txt></Pressable>}
const styles=StyleSheet.create({
 header:{height:82,flexDirection:'row',alignItems:'center',gap:12},back:{height:42,width:42,borderRadius:21,backgroundColor:COLORS.panel2,borderWidth:1,borderColor:COLORS.border,alignItems:'center',justifyContent:'center'},warning:{flexDirection:'row',alignItems:'center',gap:12,backgroundColor:'#220A0F',borderColor:'rgba(255,70,90,.25)'},
 row3:{flexDirection:'row',gap:7},phase:{flex:1,minHeight:48,borderRadius:17,borderWidth:1,borderColor:COLORS.borderStrong,alignItems:'center',justifyContent:'center',paddingHorizontal:5},phaseOn:{backgroundColor:'#fff'},phaseTxt:{fontSize:7.5,fontWeight:'900',textAlign:'center'},
 wrap:{flexDirection:'row',gap:7,flexWrap:'wrap'},chip:{paddingHorizontal:14,paddingVertical:10,borderRadius:999,borderWidth:1,borderColor:COLORS.borderStrong},chipOn:{backgroundColor:'#fff'},chipTxt:{fontSize:8,fontWeight:'900'},
 adminRow:{minHeight:64,flexDirection:'row',alignItems:'center',gap:8},border:{borderBottomWidth:1,borderColor:COLORS.border},smallBtn:{paddingHorizontal:11,paddingVertical:9,borderRadius:999,borderWidth:1,borderColor:COLORS.borderStrong},
 account:{minHeight:62,flexDirection:'row',alignItems:'center',gap:10},avatar:{height:38,width:38,borderRadius:19,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'},
});
