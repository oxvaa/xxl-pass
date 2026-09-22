import React from 'react';
import {View,Pressable,StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Screen,TopBar,Txt,GlassCard,Pill,SectionTitle,Button} from '../components/UI';
import {COLORS} from '../theme';
import {t} from '../i18n';

export default function HubScreen({state,actions,navigate}){
 const lang=state.language, guest=!state.session;
 const publicItems=[
  ['location-outline',t(lang,'venueInfo'),'O2 arena · Praha','venue'],
  ['bus-outline',t(lang,'transport'),t(lang,'metro'),'venue'],
  ['shield-checkmark-outline',t(lang,'help'),lang==='cs'?'Bezpečnost a podpora':'Safety & support','emergency'],
  ['notifications-outline',t(lang,'notifications'),`${state.notifications.length}`,'notifications'],
 ];
 const accountItems=[
  ['wallet-outline',t(lang,'wallet'),`${state.walletBalance} Kč`,'wallet'],
  ['gift-outline',t(lang,'rewards'),`${state.points} XP`,'rewards'],
  ['flag-outline',t(lang,'missions'),`${state.completedMissions.length}/4`,'missions'],
  ['people-outline',t(lang,'crew'),state.crewShare?'ON':'OFF','crew'],
  ['shirt-outline',t(lang,'merch'),`${state.reservedMerch.length}`,'merch'],
  ['images-outline',t(lang,'memories'),'XXL 2027','memories'],
 ];
 return <Screen>
  <TopBar state={state} onProfile={()=>navigate('profile')} onNotifications={()=>navigate('notifications')}/>
  <View style={styles.header}><View><Txt faint style={styles.eyebrow}>XXL CZECHIA 3.0</Txt><Txt style={styles.title}>{t(lang,'more').toUpperCase()}</Txt></View><Pill green>{state.session?state.session.role.toUpperCase():t(lang,'guest').toUpperCase()}</Pill></View>

  {guest&&<GlassCard style={styles.signIn}><View style={styles.signIcon}><Ionicons name="person-add-outline" size={22} color="#fff"/></View><View style={{flex:1}}><Txt style={{fontSize:17,fontWeight:'900'}}>{t(lang,'loginBenefitTitle')}</Txt><Txt muted style={styles.copy}>{t(lang,'guestCopy')}</Txt><View style={styles.links}><Pressable onPress={()=>navigate('auth',{mode:'login'})}><Txt style={styles.link}>{t(lang,'login')}</Txt></Pressable><Pressable onPress={()=>navigate('auth',{mode:'register'})}><Txt style={styles.link}>{t(lang,'register')}</Txt></Pressable></View></View></GlassCard>}

  <SectionTitle eyebrow="XXL SERVICES" title={lang==='cs'?'Event služby':'Event services'}/>
  <View style={styles.grid}>{publicItems.map(x=><Tile key={x[3]} x={x} onPress={()=>navigate(x[3])}/>)}</View>

  {!guest&&<><SectionTitle eyebrow="MY XXL" title={state.session.name}/><View style={styles.grid}>{accountItems.map(x=><Tile key={x[3]} x={x} onPress={()=>navigate(x[3])}/>)}</View></>}

  <SectionTitle eyebrow={t(lang,'settings').toUpperCase()} title={t(lang,'language')}/>
  <GlassCard>
   <Row title="Čeština" active={lang==='cs'} onPress={()=>actions.setLanguage('cs')}/>
   <Row title="English" active={lang==='en'} onPress={()=>actions.setLanguage('en')} last/>
  </GlassCard>

  {state.session?.role==='admin'&&<>
   <SectionTitle eyebrow={t(lang,'role').toUpperCase()} title={state.appMode==='admin'?t(lang,'adminMode'):t(lang,'userMode')}/>
   <GlassCard style={styles.adminMode}><View style={{flex:1}}><Txt style={{fontSize:16,fontWeight:'900'}}>{t(lang,'adminNotice')}</Txt><Txt muted style={styles.copy}>User mode keeps the public experience clean. Admin mode reveals all simulation controls.</Txt></View><Pressable onPress={()=>actions.setAppMode(state.appMode==='admin'?'user':'admin')} style={[styles.modeBtn,state.appMode==='admin'&&styles.modeOn]}><Txt style={{fontSize:8,fontWeight:'900',color:state.appMode==='admin'?'#050506':'#fff'}}>{state.appMode==='admin'?'ADMIN':'USER'}</Txt></Pressable></GlassCard>
   {state.appMode==='admin'&&<Button title={t(lang,'adminPanel').toUpperCase()} icon="shield-checkmark-outline" onPress={()=>navigate('admin')} style={{marginTop:10}}/>}
  </>}
 </Screen>
}
function Tile({x,onPress}){return <Pressable onPress={onPress} style={({pressed})=>[styles.tile,pressed&&{opacity:.7}]}><View style={styles.tileIcon}><Ionicons name={x[0]} size={20} color="#fff"/></View><Txt style={styles.tileTitle}>{x[1]}</Txt><Txt muted style={styles.tileSub}>{x[2]}</Txt><Ionicons name="arrow-up" size={16} color={COLORS.faint} style={styles.arrow}/></Pressable>}
function Row({title,active,onPress,last}){return <Pressable onPress={onPress} style={[styles.row,!last&&styles.border]}><Txt style={{flex:1,fontWeight:'900'}}>{title}</Txt>{active?<Ionicons name="checkmark-circle" size={20} color={COLORS.green2}/>:<View style={styles.empty}/>}</Pressable>}
const styles=StyleSheet.create({
 header:{height:94,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},eyebrow:{fontSize:8,fontWeight:'900',letterSpacing:1.5},title:{fontSize:43,fontWeight:'900',letterSpacing:-2.2,marginTop:2},
 signIn:{flexDirection:'row',gap:12},signIcon:{height:44,width:44,borderRadius:15,backgroundColor:'rgba(255,255,255,.07)',alignItems:'center',justifyContent:'center'},copy:{fontSize:10,lineHeight:16,marginTop:5},links:{flexDirection:'row',gap:18,marginTop:12},link:{fontSize:11,fontWeight:'900',color:COLORS.green2},
 grid:{flexDirection:'row',flexWrap:'wrap',gap:10},tile:{width:'48.4%',minHeight:146,borderRadius:27,borderWidth:1,borderColor:COLORS.border,backgroundColor:COLORS.panel,padding:15},tileIcon:{height:40,width:40,borderRadius:14,backgroundColor:'rgba(255,255,255,.07)',alignItems:'center',justifyContent:'center'},tileTitle:{fontSize:15,fontWeight:'900',marginTop:19},tileSub:{fontSize:9,marginTop:4},arrow:{position:'absolute',right:14,top:16,transform:[{rotate:'45deg'}]},
 row:{minHeight:62,flexDirection:'row',alignItems:'center'},border:{borderBottomWidth:1,borderColor:COLORS.border},empty:{width:20,height:20,borderRadius:10,borderWidth:1,borderColor:COLORS.borderStrong},
 adminMode:{flexDirection:'row',alignItems:'center',gap:12},modeBtn:{width:58,height:38,borderRadius:19,borderWidth:1,borderColor:COLORS.borderStrong,alignItems:'center',justifyContent:'center'},modeOn:{backgroundColor:'#fff'},
});
