import React from 'react';
import {View,Text,Pressable,ScrollView,StyleSheet,Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import {COLORS,SHADOW} from '../theme';
import {ASSETS} from '../data';

export function Txt({children,style,muted=false,faint=false,...props}){
 return <Text {...props} style={[styles.txt,muted&&styles.muted,faint&&styles.faint,style]}>{children}</Text>
}
export function Screen({children,scroll=true,contentStyle}){
 const insets=useSafeAreaInsets();
 const body=<View style={[styles.inner,{paddingTop:Math.max(insets.top,12)+8},contentStyle]}>{children}</View>;
 return <View style={styles.screen}>{scroll?<ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="never" contentContainerStyle={{paddingBottom:116+Math.max(insets.bottom,10)}}>{body}</ScrollView>:body}</View>
}
export function BrandLogo({width=118,height=58}){
 return <Image source={{uri:ASSETS.logo}} resizeMode="contain" style={{width,height}}/>
}
export function O2ArenaLogo({dark=false,compact=false}){
 return <View style={[styles.o2Logo,compact&&{transform:[{scale:.86}]}]}>
   <View style={[styles.o2Bubble,{borderColor:dark?'#0A6CD7':'#58A7FF'}]}><Txt style={[styles.o2Text,{color:dark?'#0A6CD7':'#fff'}]}>O₂</Txt></View>
   <Txt style={[styles.arenaText,{color:dark?'#15151A':'#fff'}]}>arena</Txt>
 </View>
}
export function GlassCard({children,style,onPress}){
 const c=<View style={[styles.card,style]}>{children}</View>;
 return onPress?<Pressable onPress={onPress} style={({pressed})=>({opacity:pressed?.84:1})}>{c}</Pressable>:c;
}
export function Pill({children,active=false,green=false,danger=false,style}){
 return <View style={[styles.pill,active&&styles.pillActive,green&&styles.pillGreen,danger&&styles.pillDanger,style]}><Txt style={[styles.pillText,active&&{color:'#050506'}]}>{children}</Txt></View>
}
export function Button({title,onPress,secondary=false,green=false,disabled=false,icon,style}){
 return <Pressable disabled={disabled} onPress={onPress} style={({pressed})=>[styles.btn,secondary&&styles.btnSecondary,green&&styles.btnGreen,disabled&&{opacity:.35},pressed&&!disabled&&{transform:[{scale:.985}]},style]}>
  {icon?<Ionicons name={icon} size={18} color={secondary?'#fff':'#050506'}/>:null}
  <Txt style={[styles.btnText,secondary&&{color:'#fff'}]}>{title}</Txt>
 </Pressable>
}
export function SectionTitle({eyebrow,title,action,onAction}){
 return <View style={styles.section}><View style={{flex:1}}>{eyebrow?<Txt faint style={styles.eyebrow}>{eyebrow}</Txt>:null}<Txt style={styles.sectionTitle}>{title}</Txt></View>{action?<Pressable onPress={onAction}><Txt style={styles.action}>{action}</Txt></Pressable>:null}</View>
}
export function TopBar({state,onProfile,onNotifications}){
 const guest=!state.session;
 return <View style={styles.topbar}>
  <BrandLogo width={100} height={50}/>
  <View style={styles.actions}>
   {state.appMode==='admin'&&<View style={styles.adminBadge}><Txt style={{fontSize:7,fontWeight:'900'}}>ADMIN</Txt></View>}
   <Pressable onPress={onNotifications} style={styles.circle}><Ionicons name="notifications-outline" size={20} color="#fff"/>{state.notifications?.some(n=>!n.read)&&<View style={styles.dot}/>}</Pressable>
   <Pressable onPress={onProfile} style={[styles.avatar,guest&&styles.guestAvatar]}>{guest?<Ionicons name="person-outline" size={18} color="#fff"/>:<Txt style={styles.avatarTxt}>{(state.session?.name||'U')[0]}</Txt>}</Pressable>
  </View>
 </View>
}
const styles=StyleSheet.create({
 screen:{flex:1,backgroundColor:COLORS.bg},inner:{paddingHorizontal:16},
 txt:{color:'#fff',fontSize:14},muted:{color:COLORS.muted},faint:{color:COLORS.faint},
 card:{backgroundColor:COLORS.panel,borderRadius:28,borderWidth:1,borderColor:COLORS.border,padding:18,...SHADOW},
 pill:{alignSelf:'flex-start',paddingHorizontal:10,paddingVertical:7,borderRadius:999,borderWidth:1,borderColor:COLORS.borderStrong,backgroundColor:'rgba(255,255,255,.04)'},
 pillActive:{backgroundColor:'#fff',borderColor:'#fff'},pillGreen:{backgroundColor:'rgba(0,200,83,.12)',borderColor:'rgba(0,200,83,.4)'},pillDanger:{backgroundColor:'rgba(255,51,77,.12)',borderColor:'rgba(255,51,77,.35)'},
 pillText:{fontSize:8,fontWeight:'900',letterSpacing:1},
 btn:{minHeight:54,borderRadius:18,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',flexDirection:'row',gap:8,paddingHorizontal:18},
 btnSecondary:{backgroundColor:'rgba(255,255,255,.07)',borderWidth:1,borderColor:COLORS.borderStrong},btnGreen:{backgroundColor:COLORS.green},btnText:{color:'#050506',fontSize:13,fontWeight:'900'},
 section:{flexDirection:'row',alignItems:'flex-end',marginTop:25,marginBottom:12,gap:12},eyebrow:{fontSize:8,fontWeight:'900',letterSpacing:1.5,marginBottom:5},sectionTitle:{fontSize:24,fontWeight:'900',letterSpacing:-.8},action:{fontSize:11,fontWeight:'800',color:'#D5D5DC',paddingBottom:4},
 topbar:{minHeight:68,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},actions:{flexDirection:'row',alignItems:'center',gap:8},circle:{height:42,width:42,borderRadius:21,backgroundColor:COLORS.panel2,borderWidth:1,borderColor:COLORS.border,alignItems:'center',justifyContent:'center'},avatar:{height:42,width:42,borderRadius:21,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'},guestAvatar:{backgroundColor:COLORS.panel2,borderWidth:1,borderColor:COLORS.border},avatarTxt:{fontSize:12,fontWeight:'900',color:'#050506'},dot:{position:'absolute',right:8,top:7,width:7,height:7,borderRadius:4,backgroundColor:COLORS.green},adminBadge:{height:28,paddingHorizontal:9,borderRadius:14,backgroundColor:'#6A0C1C',alignItems:'center',justifyContent:'center'},
 o2Logo:{flexDirection:'row',alignItems:'center',gap:8},o2Bubble:{width:47,height:47,borderRadius:24,borderWidth:3,alignItems:'center',justifyContent:'center'},o2Text:{fontSize:18,fontWeight:'900',letterSpacing:-1},arenaText:{fontSize:27,fontWeight:'700',letterSpacing:-1.4},
});
