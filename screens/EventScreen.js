import React,{useState} from 'react';
import {View,Pressable,StyleSheet,Image,ImageBackground} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import {Screen,TopBar,Txt,GlassCard,Pill,Button,SectionTitle,O2ArenaLogo} from '../components/UI';
import {COLORS} from '../theme';
import {ASSETS,EVENT,DAYS,O2_INFO} from '../data';
import {t} from '../i18n';

export default function EventScreen({state,actions,navigate}){
 const lang=state.language;
 const [section,setSection]=useState('overview');
 const [day,setDay]=useState('fri');
 const d=DAYS.find(x=>x.id===day)||DAYS[0];
 return <Screen>
  <TopBar state={state} onProfile={()=>navigate('profile')} onNotifications={()=>navigate('notifications')}/>
  <View style={styles.header}><View><Txt faint style={styles.eyebrow}>XXL CZECHIA · 3.0</Txt><Txt style={styles.title}>O2 ARENA</Txt></View><Pill green>{EVENT.dates}</Pill></View>
  <View style={styles.tabs}>{[['overview',t(lang,'overview')],['program',t(lang,'program')],['venue',t(lang,'venueInfo')]].map(([k,l])=><Pressable key={k} onPress={()=>setSection(k)} style={[styles.tab,section===k&&styles.tabOn]}><Txt style={[styles.tabTxt,section===k&&{color:'#050506'}]}>{l.toUpperCase()}</Txt></Pressable>)}</View>

  {section==='overview'&&<>
   <Image source={{uri:ASSETS.poster}} style={styles.poster} resizeMode="cover"/>
   <View style={styles.dateRow}>{DAYS.map(x=><View key={x.id} style={styles.dateCard}><Txt faint style={styles.small}>{lang==='cs'?x.labelCs:x.labelEn}</Txt><Txt style={styles.date}>{x.date.replace('JULY ','')}</Txt><Txt muted style={{fontSize:8}}>JULY</Txt></View>)}</View>
   <SectionTitle eyebrow={t(lang,'featured').toUpperCase()} title="FUTURE · ESDEEKID · GUNNA"/>
   {DAYS.map(x=><GlassCard key={x.id} style={{marginBottom:9}}><View style={styles.dayHead}><Txt faint style={styles.small}>{lang==='cs'?x.labelCs:x.labelEn} · {x.date}</Txt><Pill green>{x.headliners.length} HEADLINE</Pill></View><Txt style={styles.dayHeadline}>{x.headliners.join(' · ')}</Txt><Txt muted style={{fontSize:10,lineHeight:16,marginTop:7}}>{x.artists.slice(0,5).join(' · ')}{x.artists.length>5?' · …':''}</Txt></GlassCard>)}
   <Button title={state.savedEvent?t(lang,'saved'):'ULOŽIT EVENT'} secondary={state.savedEvent} green={!state.savedEvent} onPress={actions.saveEvent}/>
  </>}

  {section==='program'&&<>
   <View style={styles.dayTabs}>{DAYS.map(x=><Pressable key={x.id} onPress={()=>setDay(x.id)} style={[styles.dayTab,day===x.id&&styles.dayTabOn]}><Txt style={[styles.dayTabTxt,day===x.id&&{color:'#050506'}]}>{lang==='cs'?x.labelCs:x.labelEn}</Txt></Pressable>)}</View>
   <GlassCard style={styles.programIntro}><Txt faint style={styles.small}>{d.date}</Txt><Txt style={styles.programTitle}>{d.headliners.join(' · ')}</Txt><Txt muted style={{fontSize:10,lineHeight:16,marginTop:6}}>{t(lang,'setTimes')}</Txt></GlassCard>
   <SectionTitle eyebrow="ARTISTS" title={lang==='cs'?'Pořadí dne':'Day order'}/>
   {[...d.headliners,...d.artists].map((a,i)=><View key={a+i} style={styles.programRow}><Txt faint style={styles.rank}>{String(i+1).padStart(2,'0')}</Txt><View style={{flex:1}}><Txt style={{fontSize:i<d.headliners.length?20:15,fontWeight:'900',letterSpacing:-.4}}>{a}</Txt><Txt faint style={{fontSize:8,marginTop:3}}>{i<d.headliners.length?'HEADLINER':'SET TIME · TBA'}</Txt></View>{state.session&&<Ionicons name={state.favourites.includes(a)?'heart':'heart-outline'} size={18} color={state.favourites.includes(a)?COLORS.green2:COLORS.faint}/>}</View>)}
   <SectionTitle eyebrow="DJS" title="DJ lineup"/>
   <Txt muted style={{fontSize:11,lineHeight:19}}>{d.djs.join(' · ')}</Txt>
  </>}

  {section==='venue'&&<>
   <ImageBackground source={{uri:ASSETS.o2Exterior}} style={styles.venueHero} imageStyle={{borderRadius:32}}>
    <LinearGradient colors={['rgba(0,0,0,.06)','rgba(0,0,0,.8)']} style={styles.venueOverlay}><View style={{flex:1}}/><O2ArenaLogo/><Txt style={{fontSize:21,fontWeight:'900',marginTop:12}}>{EVENT.address}</Txt></LinearGradient>
   </ImageBackground>
   <SectionTitle eyebrow={t(lang,'transport').toUpperCase()} title={lang==='cs'?'Jak se dostat do O2 areny':'Getting to O2 arena'}/>
   <GlassCard><Info icon="train-outline" title={t(lang,'metro')}/><Info icon="tram-outline" title={t(lang,'tram')}/><Info icon="train-outline" title={t(lang,'train')}/><Info icon="enter-outline" title={t(lang,'entrance')}/><Info icon="car-outline" title={t(lang,'parking')} last/></GlassCard>
   <GlassCard style={styles.notice}><Ionicons name="information-circle-outline" size={20} color={COLORS.green2}/><Txt muted style={{flex:1,fontSize:10,lineHeight:16}}>{t(lang,'doorsInfo')}</Txt></GlassCard>
   {state.session&&<Button title={lang==='cs'?'ULOŽIT VENUE DO MY XXL':'SAVE VENUE TO MY XXL'} secondary onPress={()=>actions.completeMission('m4')} style={{marginTop:10}}/>}
  </>}
 </Screen>
}
function Info({icon,title,last}){return <View style={[styles.info,!last&&styles.border]}><View style={styles.infoIcon}><Ionicons name={icon} size={19} color="#fff"/></View><Txt style={{flex:1,fontSize:11,fontWeight:'800'}}>{title}</Txt></View>}
const styles=StyleSheet.create({
 header:{height:94,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},eyebrow:{fontSize:8,fontWeight:'900',letterSpacing:1.5},title:{fontSize:41,fontWeight:'900',letterSpacing:-2,marginTop:2},
 tabs:{flexDirection:'row',gap:6,marginBottom:12},tab:{flex:1,minHeight:39,borderRadius:16,borderWidth:1,borderColor:COLORS.borderStrong,alignItems:'center',justifyContent:'center'},tabOn:{backgroundColor:'#fff'},tabTxt:{fontSize:8,fontWeight:'900',letterSpacing:.7},
 poster:{width:'100%',height:500,borderRadius:32,borderWidth:1,borderColor:COLORS.borderStrong},
 dateRow:{flexDirection:'row',gap:8,marginTop:10},dateCard:{flex:1,minHeight:88,borderRadius:22,borderWidth:1,borderColor:COLORS.border,backgroundColor:COLORS.panel,padding:13},small:{fontSize:7,fontWeight:'900',letterSpacing:1.2},date:{fontSize:27,fontWeight:'900',letterSpacing:-1.4,marginTop:6},
 dayHead:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},dayHeadline:{fontSize:22,fontWeight:'900',letterSpacing:-.8,marginTop:13},
 dayTabs:{flexDirection:'row',gap:7},dayTab:{flex:1,minHeight:40,borderRadius:16,borderWidth:1,borderColor:COLORS.borderStrong,alignItems:'center',justifyContent:'center'},dayTabOn:{backgroundColor:'#fff'},dayTabTxt:{fontSize:8,fontWeight:'900'},
 programIntro:{marginTop:12},programTitle:{fontSize:25,fontWeight:'900',letterSpacing:-1,marginTop:7},programRow:{minHeight:67,flexDirection:'row',alignItems:'center',gap:12,borderBottomWidth:1,borderColor:COLORS.border},rank:{width:30,fontSize:9,fontWeight:'900'},
 venueHero:{height:310,borderRadius:32,overflow:'hidden'},venueOverlay:{flex:1,padding:20},info:{minHeight:64,flexDirection:'row',alignItems:'center',gap:12},border:{borderBottomWidth:1,borderColor:COLORS.border},infoIcon:{width:39,height:39,borderRadius:14,backgroundColor:'rgba(255,255,255,.07)',alignItems:'center',justifyContent:'center'},notice:{marginTop:10,flexDirection:'row',alignItems:'flex-start',gap:10},
});
