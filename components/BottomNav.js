import React from 'react';
import {View,Pressable,StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import {Txt} from './UI';
import {COLORS} from '../theme';

const ITEMS=[
 ['Home','home-outline','home'],
 ['Lineup','flash-outline','lineup'],
 ['Schedule','time-outline','schedule'],
 ['Pass','ticket-outline','pass'],
 ['More','grid-outline','hub'],
];

export default function BottomNav({tab,onChange}){
 const insets=useSafeAreaInsets();
 return <View pointerEvents="box-none" style={[styles.wrap,{paddingBottom:Math.max(insets.bottom,10)}]}>
  <View style={styles.shell}>
   {ITEMS.map(([label,icon,key])=>{
    const active=tab===key;
    const activeIcon=active?icon.replace('-outline',''):icon;
    return <Pressable key={key} onPress={()=>onChange(key)} style={styles.item}>
     <View style={[styles.iconWrap,active&&styles.iconActive]}><Ionicons name={activeIcon} size={19} color={active?'#050506':'#8F8F99'}/></View>
     <Txt style={[styles.label,active&&styles.labelActive]}>{label}</Txt>
    </Pressable>
   })}
  </View>
 </View>
}

const styles=StyleSheet.create({
 wrap:{position:'absolute',left:0,right:0,bottom:0,paddingHorizontal:12},
 shell:{height:76,borderRadius:28,backgroundColor:'rgba(14,14,18,.97)',borderWidth:1,borderColor:COLORS.borderStrong,flexDirection:'row',alignItems:'center',paddingHorizontal:5,shadowColor:'#000',shadowOpacity:.42,shadowRadius:24,shadowOffset:{width:0,height:10},elevation:15},
 item:{flex:1,alignItems:'center',justifyContent:'center',gap:4},
 iconWrap:{height:34,minWidth:46,borderRadius:17,alignItems:'center',justifyContent:'center'},
 iconActive:{backgroundColor:'#fff'},
 label:{fontSize:8,fontWeight:'800',color:'#74747E'},
 labelActive:{color:'#fff'},
});
