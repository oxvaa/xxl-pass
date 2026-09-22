import React from 'react';
import {View,Pressable,StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Screen,Txt,Pill} from '../components/UI';
import {SCHEDULE} from '../data';
import {COLORS} from '../theme';

export default function ScheduleScreen({state,actions}){
 const onlyMine=state.scheduleFilter==='mine';
 const visible=onlyMine?SCHEDULE.filter(x=>!x.artistId||state.favourites.includes(x.artistId)):SCHEDULE;
 return <Screen>
  <View style={styles.header}><View><Txt faint style={styles.eyebrow}>ARENA TAKEDOWN · ONE NIGHT</Txt><Txt style={styles.title}>SCHEDULE</Txt></View><Pill danger={state.eventPhase==='live'}>{state.eventPhase==='live'?'● LIVE':'SEPT 2027'}</Pill></View>
  <View style={styles.tabs}><Tab label="ALL SETS" active={!onlyMine} onPress={()=>actions.setScheduleFilter('all')}/><Tab label="MY XXL" active={onlyMine} onPress={()=>actions.setScheduleFilter('mine')}/></View>

  <View style={styles.dayCard}><View><Txt faint style={styles.dayEyebrow}>EVENT DAY</Txt><Txt style={styles.dayTitle}>SATURDAY</Txt></View><View style={{alignItems:'flex-end'}}><Txt style={styles.dayDate}>SEP</Txt><Txt style={styles.dayNum}>27</Txt></View></View>

  <View style={styles.timeline}>{visible.map((x,i)=>{
   const reminder=state.reminders.includes(x.id);
   const isLive=state.eventPhase==='live'&&x.id==='s4';
   return <View key={x.id} style={styles.row}>
    <View style={styles.timeCol}><Txt style={[styles.time,isLive&&{color:COLORS.redSoft}]}>{x.time}</Txt><Txt faint style={styles.end}>{x.end}</Txt></View>
    <View style={styles.rail}><View style={[styles.dot,isLive&&styles.dotLive]}/>{i<visible.length-1&&<View style={[styles.vline,isLive&&{backgroundColor:'rgba(255,51,77,.35)'}]}/>}</View>
    <View style={[styles.setCard,isLive&&styles.setLive]}>
     <View style={{flex:1}}>
      <Txt faint style={[styles.stage,isLive&&{color:'#FF92A0'}]}>{isLive?'● LIVE · ':''}{x.stage}</Txt>
      <Txt style={styles.setTitle}>{x.title}</Txt>
      {isLive&&<Txt muted style={styles.liveCopy}>Now playing · 31 min remaining</Txt>}
     </View>
     {x.kind==='SET'&&<Pressable onPress={()=>actions.toggleReminder(x.id)} style={[styles.bell,reminder&&styles.bellActive]}><Ionicons name={reminder?'notifications':'notifications-outline'} size={18} color={reminder?'#050506':'#fff'}/></Pressable>}
    </View>
   </View>
  })}</View>
 </Screen>
}

function Tab({label,active,onPress}){return <Pressable onPress={onPress} style={[styles.tab,active&&styles.tabActive]}><Txt style={[styles.tabText,active&&{color:'#050506'}]}>{label}</Txt></Pressable>}

const styles=StyleSheet.create({
 header:{height:96,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
 eyebrow:{fontSize:9,fontWeight:'900',letterSpacing:1.55},
 title:{fontSize:40,fontWeight:'900',letterSpacing:-2,marginTop:2},
 tabs:{flexDirection:'row',gap:8},
 tab:{paddingHorizontal:16,paddingVertical:10,borderRadius:999,borderWidth:1,borderColor:COLORS.borderStrong},
 tabActive:{backgroundColor:'#fff'},
 tabText:{fontSize:9,fontWeight:'900',letterSpacing:.9},
 dayCard:{marginTop:16,minHeight:104,borderRadius:27,borderWidth:1,borderColor:COLORS.border,backgroundColor:'#111115',padding:18,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
 dayEyebrow:{fontSize:8,fontWeight:'900',letterSpacing:1.4},
 dayTitle:{fontSize:23,fontWeight:'900',letterSpacing:-.8,marginTop:6},
 dayDate:{fontSize:9,fontWeight:'900',letterSpacing:1.5,color:COLORS.redSoft},
 dayNum:{fontSize:34,fontWeight:'900',letterSpacing:-1.6,lineHeight:34},
 timeline:{marginTop:22},
 row:{flexDirection:'row'},
 timeCol:{width:58,paddingTop:3},
 time:{fontSize:14,fontWeight:'900',fontVariant:['tabular-nums']},
 end:{fontSize:9,marginTop:3},
 rail:{width:21,alignItems:'center'},
 dot:{width:11,height:11,borderRadius:6,backgroundColor:'#4A4A52',marginTop:4,zIndex:2},
 dotLive:{backgroundColor:COLORS.red,shadowColor:COLORS.red,shadowOpacity:.7,shadowRadius:8},
 vline:{position:'absolute',top:15,bottom:-10,width:1,backgroundColor:COLORS.borderStrong},
 setCard:{flex:1,minHeight:92,borderRadius:24,borderWidth:1,borderColor:COLORS.border,backgroundColor:COLORS.panel,padding:15,marginBottom:10,flexDirection:'row',alignItems:'center',gap:10},
 setLive:{backgroundColor:'#1B0C10',borderColor:'rgba(255,51,77,.3)'},
 stage:{fontSize:8,fontWeight:'900',letterSpacing:1.25},
 setTitle:{fontSize:18,fontWeight:'900',letterSpacing:-.45,marginTop:5},
 liveCopy:{fontSize:10,marginTop:5},
 bell:{width:40,height:40,borderRadius:20,borderWidth:1,borderColor:COLORS.borderStrong,alignItems:'center',justifyContent:'center'},
 bellActive:{backgroundColor:'#fff'},
});
