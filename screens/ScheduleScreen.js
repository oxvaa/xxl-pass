import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Txt, Pill } from '../components/UI';
import { SCHEDULE } from '../data';
import { COLORS } from '../theme';

export default function ScheduleScreen({ state, actions }){
 const onlyMine=state.scheduleFilter==='mine';
 const visible=onlyMine?SCHEDULE.filter(x=>!x.artistId||state.favourites.includes(x.artistId)):SCHEDULE;
 return <Screen>
  <View style={styles.header}><View><Txt faint style={styles.eyebrow}>ARENA TAKEDOWN</Txt><Txt style={styles.title}>SCHEDULE</Txt></View><Pill>{state.livePreview?'● LIVE':'SEPT 2027'}</Pill></View>
  <View style={styles.filters}>
    <Filter title="ALL" active={!onlyMine} onPress={()=>actions.setScheduleFilter('all')}/><Filter title="MY XXL" active={onlyMine} onPress={()=>actions.setScheduleFilter('mine')}/>
  </View>
  <View style={{marginTop:18}}>{visible.map((x,i)=>{
    const reminder=state.reminders.includes(x.id);
    const isLive=state.livePreview&&x.id==='s4';
    return <View key={x.id} style={styles.row}>
      <View style={styles.timeCol}><Txt style={[styles.time,isLive&&{color:COLORS.red}]}>{x.time}</Txt><Txt faint style={{fontSize:9}}>{x.end}</Txt></View>
      <View style={[styles.line,{backgroundColor:isLive?COLORS.red:COLORS.borderStrong}]}>{i<visible.length-1&&<View style={styles.vline}/>}</View>
      <View style={{flex:1,paddingBottom:22}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',gap:10}}><View style={{flex:1}}><Txt faint style={{fontSize:9,fontWeight:'900',letterSpacing:1.2}}>{isLive?'● LIVE · ':''}{x.stage}</Txt><Txt style={{fontSize:18,fontWeight:'900',letterSpacing:-.4,marginTop:4}}>{x.title}</Txt></View>
          {x.kind==='SET'&&<Pressable onPress={()=>actions.toggleReminder(x.id)} style={[styles.bell,reminder&&styles.bellActive]}><Ionicons name={reminder?'notifications':'notifications-outline'} size={18} color={reminder?'#050505':'#fff'}/></Pressable>}
        </View>
      </View>
    </View>;
  })}</View>
 </Screen>
}
function Filter({title,active,onPress}){return <Pressable onPress={onPress} style={[styles.filter,active&&styles.filterActive]}><Txt style={[styles.filterText,active&&{color:'#050505'}]}>{title}</Txt></Pressable>}
const styles=StyleSheet.create({header:{height:100,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},eyebrow:{fontSize:9,fontWeight:'900',letterSpacing:1.6},title:{fontSize:39,fontWeight:'1000',letterSpacing:-2,marginTop:2},filters:{flexDirection:'row',gap:8},filter:{paddingHorizontal:16,paddingVertical:10,borderRadius:999,borderWidth:1,borderColor:COLORS.borderStrong},filterActive:{backgroundColor:'#fff'},filterText:{fontSize:10,fontWeight:'900',letterSpacing:1},row:{flexDirection:'row'},timeCol:{width:54,paddingTop:2},time:{fontSize:14,fontWeight:'900',fontVariant:['tabular-nums']},line:{width:11,height:11,borderRadius:7,marginTop:4,marginRight:15},vline:{position:'absolute',width:1,left:5,top:11,height:63,backgroundColor:COLORS.borderStrong},bell:{width:40,height:40,borderRadius:20,borderWidth:1,borderColor:COLORS.borderStrong,alignItems:'center',justifyContent:'center'},bellActive:{backgroundColor:'#fff'}});
