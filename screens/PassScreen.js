import React,{useEffect,useMemo,useRef,useState} from 'react';
import {Animated,View,Pressable,StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import {Screen,Txt,Pill,Button,SectionTitle,GlassCard,XXLMark} from '../components/UI';
import {COLORS,GRADIENTS} from '../theme';
import {EVENT,PASS_TIERS} from '../data';

export default function PassScreen({state,actions,navigate}){
 const [showQr,setShowQr]=useState(false);
 const shimmer=useRef(new Animated.Value(-1)).current;
 useEffect(()=>{const loop=Animated.loop(Animated.sequence([Animated.timing(shimmer,{toValue:1,duration:2200,useNativeDriver:true}),Animated.delay(850),Animated.timing(shimmer,{toValue:-1,duration:0,useNativeDriver:true})]));loop.start();return()=>loop.stop()},[shimmer]);
 const x=shimmer.interpolate({inputRange:[-1,1],outputRange:[-260,360]});
 const tier=PASS_TIERS[state.passTier]||PASS_TIERS.GA;
 const colors=GRADIENTS[tier.gradient]||GRADIENTS.ga;

 return <Screen>
  <View style={styles.header}><View><Txt faint style={styles.eyebrow}>YOUR ACCESS</Txt><Txt style={styles.title}>XXL PASS</Txt></View><Pill active>ACTIVE</Pill></View>

  <View style={styles.tiers}>{Object.keys(PASS_TIERS).map(k=><Pressable key={k} onPress={()=>actions.setPassTier(k)} style={[styles.tierChip,state.passTier===k&&styles.tierChipOn]}><Txt style={[styles.tierTxt,state.passTier===k&&{color:'#050506'}]}>{k}</Txt></Pressable>)}</View>

  <LinearGradient colors={colors} style={styles.pass}>
   <View style={styles.ringOne}/><View style={styles.ringTwo}/>
   <Animated.View pointerEvents="none" style={[styles.shimmer,{transform:[{translateX:x},{rotate:'16deg'}]}]}><LinearGradient colors={['transparent','rgba(255,255,255,.18)','transparent']} style={{flex:1}}/></Animated.View>
   <View style={styles.passTop}><XXLMark small/><View style={[styles.typeBadge,state.passTier==='BACKSTAGE'&&{backgroundColor:'#111',borderWidth:1,borderColor:'#fff'}]}><Txt style={{fontSize:8,fontWeight:'900',color:state.passTier==='BACKSTAGE'?'#fff':'#050506'}}>{tier.short}</Txt></View></View>

   {!showQr?<>
    <View style={styles.identity}><Txt faint style={styles.kicker}>{EVENT.name}</Txt><Txt style={styles.name}>ŠIMON SZÁBO</Txt><Txt muted style={styles.meta}>{tier.label} · ZONE {tier.zone}</Txt></View>
    <View style={styles.details}><Detail label="ACCESS" value={tier.access}/><Detail label="VENUE" value="OSTRAVAR"/><Detail label="PASS" value="XXL-001"/></View>
    <View style={styles.accessRow}><View><Txt faint style={styles.accessLabel}>ENTRY STATUS</Txt><Txt style={styles.accessValue}>READY FOR ENTRY</Txt></View><Ionicons name="shield-checkmark" size={24} color="#fff"/></View>
    <Button title="REVEAL ENTRY CODE" icon="qr-code-outline" onPress={()=>{setShowQr(true);actions.completeMission('mission1')}} style={{marginTop:18}}/>
   </>:<>
    <View style={styles.qrWrap}><FakeQr seed={`XXL-001-${state.passTier}`}/><Txt style={styles.qrCode}>XXL-001 · {state.passTier}</Txt><Txt style={styles.qrHint}>ROTATING DEMO ENTRY CODE</Txt></View>
    <Button title="HIDE ENTRY CODE" secondary onPress={()=>setShowQr(false)} style={{marginTop:18}}/>
   </>}
  </LinearGradient>

  <SectionTitle eyebrow="XXL WALLET" title="Cashless & access" action={`${state.walletBalance} Kč`} onAction={()=>navigate('wallet')}/>
  <GlassCard onPress={()=>navigate('wallet')} style={styles.walletRow}><View style={styles.walletIcon}><Ionicons name="wallet-outline" size={20} color="#fff"/></View><View style={{flex:1}}><Txt style={{fontWeight:'900'}}>XXL Wallet</Txt><Txt muted style={{fontSize:10,marginTop:3}}>{state.vouchers.length} vouchers · {state.reservedMerch.length} merch reservations</Txt></View><Ionicons name="chevron-forward" size={17} color={COLORS.faint}/></GlassCard>

  <SectionTitle eyebrow="PASS ACTIONS" title="Your access tools"/>
  <GlassCard style={{paddingVertical:4}}>
   <Tool icon="wallet-outline" title="Add to Apple Wallet" sub="Production integration placeholder"/>
   <Tool icon="map-outline" title="Find your entrance" sub={`Zone ${tier.zone} · ${tier.access}`} onPress={()=>navigate('map')}/>
   <Tool icon="shield-checkmark-outline" title="Access status" sub="Active · ready for event day" last/>
  </GlassCard>
 </Screen>
}

function Detail({label,value}){return <View style={{flex:1}}><Txt faint style={styles.detailLabel}>{label}</Txt><Txt style={styles.detailValue}>{value}</Txt></View>}
function Tool({icon,title,sub,last,onPress}){return <Pressable onPress={onPress} disabled={!onPress} style={[styles.tool,!last&&styles.toolBorder]}><View style={styles.toolIcon}><Ionicons name={icon} size={19} color="#fff"/></View><View style={{flex:1}}><Txt style={{fontWeight:'900'}}>{title}</Txt><Txt muted style={{fontSize:10,marginTop:3}}>{sub}</Txt></View><Ionicons name="chevron-forward" size={17} color={COLORS.faint}/></Pressable>}
function FakeQr({seed}){const cells=useMemo(()=>Array.from({length:144},(_,i)=>{let n=0;for(let c=0;c<seed.length;c++)n=(n+seed.charCodeAt(c)*(i+11)*(c+5))%131;return ((n+i*13)%7)<3}),[seed]);return <View style={styles.qr}>{cells.map((on,i)=><View key={i} style={[styles.cell,{backgroundColor:on?'#050506':'#fff'}]}/>)}</View>}

const styles=StyleSheet.create({
 header:{height:96,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},eyebrow:{fontSize:9,fontWeight:'900',letterSpacing:1.6},title:{fontSize:40,fontWeight:'900',letterSpacing:-2,marginTop:2},
 tiers:{flexDirection:'row',gap:6,flexWrap:'wrap',marginBottom:12},
 tierChip:{paddingHorizontal:12,paddingVertical:9,borderRadius:999,borderWidth:1,borderColor:COLORS.borderStrong},
 tierChipOn:{backgroundColor:'#fff'},tierTxt:{fontSize:8,fontWeight:'900',letterSpacing:.8},
 pass:{minHeight:560,borderRadius:36,borderWidth:1,borderColor:COLORS.borderStrong,padding:22,overflow:'hidden'},
 passTop:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start'},typeBadge:{height:42,minWidth:42,paddingHorizontal:8,borderRadius:21,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'},
 ringOne:{position:'absolute',height:220,width:220,borderRadius:120,borderWidth:1,borderColor:'rgba(255,255,255,.08)',right:-100,top:65},ringTwo:{position:'absolute',height:120,width:120,borderRadius:70,borderWidth:18,borderColor:'rgba(255,255,255,.02)',left:-45,bottom:55},
 shimmer:{position:'absolute',top:-80,bottom:-80,width:92},identity:{marginTop:72},kicker:{fontSize:8,fontWeight:'900',letterSpacing:1.6},name:{fontSize:31,fontWeight:'900',letterSpacing:-1.2,marginTop:8},meta:{fontSize:10,fontWeight:'800',marginTop:6},
 details:{flexDirection:'row',borderTopWidth:1,borderBottomWidth:1,borderColor:COLORS.border,marginTop:28,paddingVertical:19},detailLabel:{fontSize:7,fontWeight:'900',letterSpacing:1.2},detailValue:{fontSize:11,fontWeight:'900',marginTop:5},
 accessRow:{marginTop:23,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},accessLabel:{fontSize:7,fontWeight:'900',letterSpacing:1.3},accessValue:{fontSize:13,fontWeight:'900',marginTop:5},
 qrWrap:{backgroundColor:'#fff',padding:19,borderRadius:29,alignItems:'center',marginTop:40},qr:{width:228,height:228,flexDirection:'row',flexWrap:'wrap',backgroundColor:'#fff',padding:6},cell:{width:18,height:18},qrCode:{color:'#050506',fontWeight:'900',fontSize:14,marginTop:12},qrHint:{color:'#777',fontWeight:'800',fontSize:9,marginTop:4,letterSpacing:.8},
 walletRow:{flexDirection:'row',alignItems:'center',gap:12},walletIcon:{width:40,height:40,borderRadius:14,backgroundColor:'rgba(255,255,255,.07)',alignItems:'center',justifyContent:'center'},
 tool:{minHeight:68,flexDirection:'row',alignItems:'center',gap:12},toolBorder:{borderBottomWidth:1,borderColor:COLORS.border},toolIcon:{width:40,height:40,borderRadius:14,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(255,255,255,.07)'},
});
