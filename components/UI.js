import React from 'react';
import {View,Text,Pressable,ScrollView,StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import {COLORS,SHADOW} from '../theme';

export function Txt({children,style,muted=false,faint=false,mono=false,...props}){
 return <Text {...props} style={[styles.txt,muted&&styles.muted,faint&&styles.faint,mono&&styles.mono,style]}>{children}</Text>
}

export function Screen({children,scroll=true,contentStyle,safeTop=true}){
 const insets=useSafeAreaInsets();
 const top=safeTop?Math.max(insets.top,12)+8:0;
 const bottom=Math.max(insets.bottom,10);
 const body=<View style={[styles.screenInner,{paddingTop:top},contentStyle]}>{children}</View>;
 return <View style={styles.screen}>{scroll
  ?<ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="never" contentContainerStyle={{paddingBottom:116+bottom}}>{body}</ScrollView>
  :body}</View>
}

export function XXLMark({small=false}){
 return <View><Txt style={[styles.mark,small&&{fontSize:21,lineHeight:22}]}>XXL</Txt><Txt style={[styles.markSub,small&&{fontSize:7}]}>CZECHIA · PASS</Txt></View>
}

export function GlassCard({children,style,onPress,gradient,accessibilityLabel}){
 const content=gradient?<LinearGradient colors={gradient} style={[styles.card,style]}>{children}</LinearGradient>:<View style={[styles.card,style]}>{children}</View>;
 if(!onPress)return content;
 return <Pressable accessibilityRole="button" accessibilityLabel={accessibilityLabel} onPress={onPress} style={({pressed})=>({opacity:pressed?.88:1})}>{content}</Pressable>
}

export function Pill({children,active=false,danger=false,style}){
 return <View style={[styles.pill,active&&styles.pillActive,danger&&styles.pillDanger,style]}><Txt style={[styles.pillText,active&&{color:'#050506'},danger&&{color:'#FFDCE2'}]}>{children}</Txt></View>
}

export function Button({title,onPress,secondary=false,disabled=false,icon,style}){
 return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({pressed})=>[styles.button,secondary&&styles.buttonSecondary,disabled&&{opacity:.4},pressed&&!disabled&&{transform:[{scale:.985}]},style]}>
   {icon?<Ionicons name={icon} size={18} color={secondary?'#fff':'#050506'}/>:null}
   <Txt style={[styles.buttonText,secondary&&{color:'#fff'}]}>{title}</Txt>
 </Pressable>
}

export function SectionTitle({eyebrow,title,action,onAction}){
 return <View style={styles.sectionHead}>
  <View style={{flex:1}}>{eyebrow?<Txt style={styles.eyebrow}>{eyebrow}</Txt>:null}<Txt style={styles.sectionTitle}>{title}</Txt></View>
  {action?<Pressable onPress={onAction} hitSlop={10}><Txt style={styles.action}>{action}</Txt></Pressable>:null}
 </View>
}

export function TopBar({onProfile,onNotifications,badge=0}){
 return <View style={styles.topBar}>
  <XXLMark/>
  <View style={styles.topActions}>
   <Pressable onPress={onNotifications} style={styles.circle}><Ionicons name="notifications-outline" size={20} color="#fff"/>{badge>0&&<View style={styles.dot}/>}</Pressable>
   <Pressable onPress={onProfile} style={styles.avatar}><Txt style={styles.avatarText}>ŠS</Txt></Pressable>
  </View>
 </View>
}

export function Metric({value,label,style}){
 return <View style={[styles.metric,style]}><Txt style={styles.metricValue}>{value}</Txt><Txt faint style={styles.metricLabel}>{label}</Txt></View>
}

const styles=StyleSheet.create({
 screen:{flex:1,backgroundColor:COLORS.bg},
 screenInner:{paddingHorizontal:16},
 txt:{color:COLORS.text,fontSize:14},
 muted:{color:COLORS.muted},
 faint:{color:COLORS.faint},
 mono:{fontVariant:['tabular-nums']},
 mark:{fontSize:25,fontWeight:'900',letterSpacing:-1.4,lineHeight:26},
 markSub:{fontSize:8,fontWeight:'900',letterSpacing:2.2,color:COLORS.muted,marginTop:3},
 card:{backgroundColor:COLORS.panel,borderRadius:28,borderWidth:1,borderColor:COLORS.border,padding:18,...SHADOW},
 pill:{alignSelf:'flex-start',borderRadius:999,borderWidth:1,borderColor:COLORS.borderStrong,paddingHorizontal:10,paddingVertical:7,backgroundColor:'rgba(255,255,255,.045)'},
 pillActive:{backgroundColor:'#fff',borderColor:'#fff'},
 pillDanger:{backgroundColor:'rgba(255,51,77,.13)',borderColor:'rgba(255,51,77,.38)'},
 pillText:{fontSize:9,fontWeight:'900',letterSpacing:1.05},
 button:{minHeight:54,borderRadius:18,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',flexDirection:'row',gap:8,paddingHorizontal:18},
 buttonSecondary:{backgroundColor:'rgba(255,255,255,.07)',borderWidth:1,borderColor:COLORS.borderStrong},
 buttonText:{color:'#050506',fontSize:13,fontWeight:'900',letterSpacing:.15},
 sectionHead:{flexDirection:'row',alignItems:'flex-end',marginTop:26,marginBottom:12,gap:14},
 eyebrow:{fontSize:9,fontWeight:'900',letterSpacing:1.7,color:COLORS.faint,marginBottom:6},
 sectionTitle:{fontSize:25,fontWeight:'900',letterSpacing:-.8},
 action:{fontSize:12,fontWeight:'800',color:'#D4D4DC',paddingBottom:4},
 topBar:{minHeight:70,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
 topActions:{flexDirection:'row',gap:9,alignItems:'center'},
 circle:{height:42,width:42,borderRadius:21,alignItems:'center',justifyContent:'center',backgroundColor:COLORS.panel2,borderWidth:1,borderColor:COLORS.border},
 avatar:{height:42,width:42,borderRadius:21,alignItems:'center',justifyContent:'center',backgroundColor:'#fff'},
 avatarText:{fontSize:11,fontWeight:'900',color:'#050506'},
 dot:{position:'absolute',right:9,top:8,width:7,height:7,borderRadius:4,backgroundColor:COLORS.red,borderWidth:1,borderColor:COLORS.panel2},
 metric:{flex:1},
 metricValue:{fontSize:22,fontWeight:'900',letterSpacing:-.7},
 metricLabel:{fontSize:8,fontWeight:'900',letterSpacing:1.2,marginTop:3},
});
