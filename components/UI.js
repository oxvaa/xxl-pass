import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOW } from '../theme';

export function Txt({ children, style, muted=false, faint=false, mono=false, ...props }) {
  return <Text {...props} style={[styles.txt, muted && styles.muted, faint && styles.faint, mono && styles.mono, style]}>{children}</Text>;
}

export function Screen({ children, scroll=true, contentStyle, safeTop=true }) {
  const body = <View style={[styles.screenInner, safeTop && { paddingTop: Platform.OS === 'android' ? 22 : 8 }, contentStyle]}>{children}</View>;
  return <View style={styles.screen}>{scroll ? <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>{body}</ScrollView> : body}</View>;
}

export function GlassCard({ children, style, onPress, gradient, accessibilityLabel }) {
  const content = gradient
    ? <LinearGradient colors={gradient} style={[styles.card, style]}>{children}</LinearGradient>
    : <View style={[styles.card, style]}>{children}</View>;
  if (!onPress) return content;
  return <Pressable accessibilityRole="button" accessibilityLabel={accessibilityLabel} onPress={onPress} style={({pressed})=>({opacity:pressed?.86:1})}>{content}</Pressable>;
}

export function Pill({ children, active=false, danger=false, style }) {
  return <View style={[styles.pill, active && styles.pillActive, danger && styles.pillDanger, style]}><Txt style={[styles.pillText, active && {color:'#050505'}, danger && {color:'#FFDDE2'}]}>{children}</Txt></View>;
}

export function IconBox({ name, size=20, active=false, color }) {
  return <View style={[styles.iconBox, active && {backgroundColor:'#FFFFFF'}]}><Ionicons name={name} size={size} color={color || (active ? '#050505' : '#FFFFFF')} /></View>;
}

export function SectionTitle({ eyebrow, title, action, onAction }) {
  return <View style={styles.sectionHead}>
    <View style={{flex:1}}>{eyebrow ? <Txt style={styles.eyebrow}>{eyebrow}</Txt> : null}<Txt style={styles.sectionTitle}>{title}</Txt></View>
    {action ? <Pressable onPress={onAction} hitSlop={10}><Txt style={styles.action}>{action}</Txt></Pressable> : null}
  </View>;
}

export function Button({ title, onPress, secondary=false, disabled=false, icon, style }) {
  return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({pressed})=>[styles.button, secondary && styles.buttonSecondary, disabled && {opacity:.4}, pressed && !disabled && {transform:[{scale:.985}]}, style]}>
    {icon ? <Ionicons name={icon} size={18} color={secondary ? '#FFFFFF' : '#050505'} /> : null}
    <Txt style={[styles.buttonText, secondary && {color:'#FFFFFF'}]}>{title}</Txt>
  </Pressable>;
}

export function TopBar({ onProfile, onNotifications, badge=0 }) {
  return <View style={styles.topBar}>
    <View>
      <Txt style={styles.brand}>XXL</Txt>
      <Txt style={styles.brandSub}>CZECHIA · PASS</Txt>
    </View>
    <View style={{flexDirection:'row',gap:9}}>
      <Pressable onPress={onNotifications} style={styles.circle}><Ionicons name="notifications-outline" size={20} color="#fff" />{badge>0 && <View style={styles.dot} />}</Pressable>
      <Pressable onPress={onProfile} style={styles.avatar}><Txt style={{fontWeight:'900',fontSize:11}}>ŠS</Txt></Pressable>
    </View>
  </View>;
}

export const uiStyles = StyleSheet.create({});

const styles = StyleSheet.create({
  screen:{flex:1,backgroundColor:COLORS.bg},
  screenInner:{paddingHorizontal:16},
  txt:{color:COLORS.text,fontSize:14},
  muted:{color:COLORS.muted}, faint:{color:COLORS.faint},
  mono:{fontVariant:['tabular-nums']},
  card:{backgroundColor:COLORS.panel,borderRadius:28,borderWidth:1,borderColor:COLORS.border,padding:18,...SHADOW},
  pill:{alignSelf:'flex-start',borderRadius:999,borderWidth:1,borderColor:COLORS.borderStrong,paddingHorizontal:10,paddingVertical:7,backgroundColor:'rgba(255,255,255,0.04)'},
  pillActive:{backgroundColor:'#FFFFFF',borderColor:'#FFFFFF'},
  pillDanger:{backgroundColor:'rgba(242,58,75,.12)',borderColor:'rgba(242,58,75,.35)'},
  pillText:{fontSize:9,fontWeight:'900',letterSpacing:1.1},
  iconBox:{height:42,width:42,borderRadius:14,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(255,255,255,.08)',borderWidth:1,borderColor:COLORS.border},
  sectionHead:{flexDirection:'row',alignItems:'flex-end',marginTop:24,marginBottom:12,gap:14},
  eyebrow:{fontSize:9,fontWeight:'900',letterSpacing:1.6,color:COLORS.faint,marginBottom:5},
  sectionTitle:{fontSize:24,fontWeight:'900',letterSpacing:-.8},
  action:{fontSize:12,fontWeight:'800',color:'#D7D7DF',paddingBottom:4},
  button:{minHeight:54,borderRadius:18,backgroundColor:'#FFFFFF',alignItems:'center',justifyContent:'center',flexDirection:'row',gap:8,paddingHorizontal:18},
  buttonSecondary:{backgroundColor:'rgba(255,255,255,.07)',borderWidth:1,borderColor:COLORS.borderStrong},
  buttonText:{color:'#050505',fontSize:13,fontWeight:'900',letterSpacing:.2},
  topBar:{height:72,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
  brand:{fontSize:23,fontWeight:'1000',letterSpacing:-1.2,lineHeight:24},
  brandSub:{fontSize:8,fontWeight:'900',letterSpacing:2,color:COLORS.muted,marginTop:2},
  circle:{height:42,width:42,borderRadius:21,alignItems:'center',justifyContent:'center',backgroundColor:COLORS.panel2,borderWidth:1,borderColor:COLORS.border},
  avatar:{height:42,width:42,borderRadius:21,alignItems:'center',justifyContent:'center',backgroundColor:'#FFFFFF'},
  dot:{position:'absolute',right:9,top:8,width:7,height:7,borderRadius:4,backgroundColor:COLORS.red,borderWidth:1,borderColor:COLORS.panel2},
});
