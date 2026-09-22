import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Txt } from './UI';
import { COLORS } from '../theme';

const ITEMS = [
  ['Home','home-outline','home'],
  ['Lineup','flash-outline','lineup'],
  ['Schedule','time-outline','schedule'],
  ['Pass','ticket-outline','pass'],
  ['More','grid-outline','hub'],
];

export default function BottomNav({ tab, onChange }) {
  return <View style={styles.wrap}><View style={styles.nav}>
    {ITEMS.map(([label,icon,key])=>{
      const active=tab===key;
      return <Pressable key={key} onPress={()=>onChange(key)} style={styles.item}>
        <View style={[styles.iconWrap,active&&styles.iconActive]}><Ionicons name={active?icon.replace('-outline',''):icon} size={20} color={active?'#050505':'#9C9CA5'} /></View>
        <Txt style={[styles.label,active&&styles.labelActive]}>{label}</Txt>
      </Pressable>;
    })}
  </View></View>;
}

const styles=StyleSheet.create({
  wrap:{position:'absolute',left:0,right:0,bottom:0,paddingHorizontal:12,paddingBottom:14},
  nav:{height:78,borderRadius:27,backgroundColor:'rgba(17,17,21,.96)',borderWidth:1,borderColor:COLORS.borderStrong,flexDirection:'row',alignItems:'center',justifyContent:'space-around',paddingHorizontal:4},
  item:{flex:1,alignItems:'center',justifyContent:'center',gap:4},
  iconWrap:{height:34,minWidth:44,borderRadius:17,alignItems:'center',justifyContent:'center'},
  iconActive:{backgroundColor:'#FFFFFF'},
  label:{fontSize:8,fontWeight:'800',color:'#888891'},
  labelActive:{color:'#FFFFFF'},
});
