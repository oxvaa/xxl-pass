import React,{useMemo,useState} from 'react';
import {View,StyleSheet,Pressable} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import {Screen,TopBar,Txt,GlassCard,Pill,Button,SectionTitle,BrandLogo} from '../components/UI';
import {COLORS,GRADIENTS} from '../theme';
import {PASS_TIERS,EVENT} from '../data';
import {t} from '../i18n';

export default function PassScreen({state,actions,navigate}){
 const lang=state.language, guest=!state.session;
 if(guest)return <Screen><TopBar state={state} onProfile={()=>navigate('profile')} onNotifications={()=>navigate('notifications')}/><View style={styles.header}><Txt style={styles.title}>XXL PASS</Txt><Pill>{t(lang,'guest')}</Pill></View><GlassCard style={styles.locked}><View style={styles.lockIcon}><Ionicons name="ticket-outline" size={29} color="#fff"/></View><Txt style={styles.lockTitle}>{t(lang,'accountRequired')}</Txt><Txt muted style={styles.lockCopy}>{t(lang,'signInUnlock')} {t(lang,'benefit1')}.</Txt><Button green title={t(lang,'login')} onPress={()=>navigate('auth',{mode:'login'})} style={{marginTop:20}}/><Button secondary title={t(lang,'register')} onPress={()=>navigate('auth',{mode:'register'})} style={{marginTop:9}}/></GlassCard></Screen>;
 const [qr,setQr]=useState(false);
 const tier=PASS_TIERS[state.passTier]||PASS_TIERS.GA;
 return <Screen>
  <TopBar state={state} onProfile={()=>navigate('profile')} onNotifications={()=>navigate('notifications')}/>
  <View style={styles.header}><View><Txt faint style={styles.eyebrow}>O2 ARENA · ACCESS</Txt><Txt style={styles.title}>XXL PASS</Txt></View><Pill active>{t(lang,'active')}</Pill></View>
  <LinearGradient colors={GRADIENTS.pass} style={styles.pass}>
   <View style={styles.passTop}><BrandLogo width={105} height={54}/><View style={styles.tierBadge}><Txt style={{color:'#050506',fontSize:8,fontWeight:'900'}}>{tier.short}</Txt></View></View>
   {!qr?<>
    <View style={styles.identity}><Txt faint style={styles.small}>{EVENT.name}</Txt><Txt style={styles.name}>{state.session.name.toUpperCase()}</Txt><Txt muted style={{fontSize:10,fontWeight:'800',marginTop:6}}>{tier.label} · ZONE {tier.zone}</Txt></View>
    <View style={styles.details}><Detail l="VENUE" v="O2 ARENA"/><Detail l="DATE" v="17–19 JUL"/><Detail l="PASS" v="XXL-300"/></View>
    <View style={styles.ready}><View><Txt faint style={styles.small}>ENTRY STATUS</Txt><Txt style={{fontSize:14,fontWeight:'900',marginTop:4}}>READY FOR ENTRY</Txt></View><Ionicons name="shield-checkmark" size={24} color="#fff"/></View>
    <Button title="REVEAL ENTRY CODE" icon="qr-code-outline" onPress={()=>{setQr(true);actions.completeMission('m1')}} style={{marginTop:20}}/>
   </>:<>
    <View style={styles.qr}><FakeQR seed={state.session.email+state.passTier}/><Txt style={styles.qrCode}>XXL-300 · {tier.short}</Txt><Txt style={styles.qrHint}>LOCAL PROTOTYPE ENTRY CODE</Txt></View>
    <Button secondary title="HIDE CODE" onPress={()=>setQr(false)} style={{marginTop:18}}/>
   </>}
  </LinearGradient>
  <SectionTitle eyebrow="MY XXL" title={state.session.username||state.session.name} action={`${state.points} XP`} onAction={()=>navigate('profile')}/>
  <GlassCard><Tool icon="wallet-outline" title={t(lang,'wallet')} sub={`${state.walletBalance} Kč`}/><Tool icon="heart-outline" title="My XXL" sub={`${state.favourites.length} artists`}/><Tool icon="gift-outline" title={t(lang,'rewards')} sub={`${state.completedMissions.length}/4 missions`} last/></GlassCard>
 </Screen>
}
function Detail({l,v}){return <View style={{flex:1}}><Txt faint style={styles.small}>{l}</Txt><Txt style={{fontSize:11,fontWeight:'900',marginTop:5}}>{v}</Txt></View>}
function Tool({icon,title,sub,last}){return <View style={[styles.tool,!last&&styles.toolBorder]}><View style={styles.toolIcon}><Ionicons name={icon} size={19} color="#fff"/></View><View style={{flex:1}}><Txt style={{fontWeight:'900'}}>{title}</Txt><Txt muted style={{fontSize:10,marginTop:3}}>{sub}</Txt></View></View>}
function FakeQR({seed}){const cells=useMemo(()=>Array.from({length:144},(_,i)=>{let n=0;for(let c=0;c<seed.length;c++)n=(n+seed.charCodeAt(c)*(i+7)*(c+3))%113;return((n+i*11)%7)<3}),[seed]);return <View style={styles.qrGrid}>{cells.map((on,i)=><View key={i} style={[styles.cell,{backgroundColor:on?'#050506':'#fff'}]}/>)}</View>}
const styles=StyleSheet.create({
 header:{height:94,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},eyebrow:{fontSize:8,fontWeight:'900',letterSpacing:1.5},title:{fontSize:40,fontWeight:'900',letterSpacing:-2},
 locked:{minHeight:440,alignItems:'center',justifyContent:'center',paddingHorizontal:25},lockIcon:{height:66,width:66,borderRadius:33,backgroundColor:'rgba(255,255,255,.07)',alignItems:'center',justifyContent:'center'},lockTitle:{fontSize:26,fontWeight:'900',letterSpacing:-1.2,marginTop:20,textAlign:'center'},lockCopy:{fontSize:11,lineHeight:18,textAlign:'center',marginTop:8},
 pass:{minHeight:550,borderRadius:36,borderWidth:1,borderColor:COLORS.borderStrong,padding:22,overflow:'hidden'},passTop:{flexDirection:'row',alignItems:'flex-start',justifyContent:'space-between'},tierBadge:{height:44,minWidth:44,paddingHorizontal:9,borderRadius:22,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'},identity:{marginTop:76},small:{fontSize:7,fontWeight:'900',letterSpacing:1.2},name:{fontSize:30,fontWeight:'900',letterSpacing:-1.1,marginTop:8},details:{flexDirection:'row',borderTopWidth:1,borderBottomWidth:1,borderColor:COLORS.border,marginTop:28,paddingVertical:18},ready:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:22},
 qr:{backgroundColor:'#fff',borderRadius:28,padding:19,alignItems:'center',marginTop:40},qrGrid:{width:228,height:228,flexDirection:'row',flexWrap:'wrap',padding:6},cell:{width:18,height:18},qrCode:{color:'#050506',fontSize:14,fontWeight:'900',marginTop:11},qrHint:{color:'#777',fontSize:8,fontWeight:'900',marginTop:4,letterSpacing:.8},
 tool:{minHeight:66,flexDirection:'row',alignItems:'center',gap:12},toolBorder:{borderBottomWidth:1,borderColor:COLORS.border},toolIcon:{height:39,width:39,borderRadius:14,backgroundColor:'rgba(255,255,255,.07)',alignItems:'center',justifyContent:'center'},
});
