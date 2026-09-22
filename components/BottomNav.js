import React from 'react';
import {View,Pressable,StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import {Txt} from './UI';
import {COLORS} from '../theme';
import {t} from '../i18n';

const ITEMS=[
 ['home','home-outline','home'],
 ['event','calendar-outline','event'],
 ['lineup','flash-outline','lineup'],
 ['pass','ticket-outline','pass'],
 ['more','grid-outline','hub'],
];
export default function BottomNav({tab,onChange,language}){
 const insets=useSafeAreaInsets();
 return <View style={[styles.wrap,{paddingBottom:Math.max(insets.bottom,10)}]}><View style={styles.nav}>
  {ITEMS.map(([label,icon,key])=>{const active=tab===key;return <Pressable key={key} onPress={()=>onChange(key)} style={styles.item}><View style={[styles.icon,active&&styles.iconOn]}><Ionicons name={active?icon.replace('-outline',''):icon} size={19} color={active?'#050506':'#8C8C96'}/></View><Txt style={[styles.label,active&&styles.labelOn]}>{t(language,label)}</Txt></Pressable>})}
 </View></View>
}
const styles=StyleSheet.create({
 wrap:{position:'absolute',left:0,right:0,bottom:0,paddingHorizontal:12},
 nav:{height:76,borderRadius:28,backgroundColor:'rgba(14,14,18,.97)',borderWidth:1,borderColor:COLORS.borderStrong,flexDirection:'row',alignItems:'center',paddingHorizontal:4,shadowColor:'#000',shadowOpacity:.45,shadowRadius:22,shadowOffset:{width:0,height:10},elevation:15},
 item:{flex:1,alignItems:'center',justifyContent:'center',gap:4},icon:{height:34,minWidth:45,borderRadius:17,alignItems:'center',justifyContent:'center'},iconOn:{backgroundColor:'#fff'},label:{fontSize:7.5,fontWeight:'800',color:'#74747E'},labelOn:{color:'#fff'}
});
