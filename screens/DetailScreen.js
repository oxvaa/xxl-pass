import React from 'react';
import {View,Pressable,StyleSheet,Switch} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Screen,Txt,GlassCard,Pill,Button,SectionTitle} from '../components/UI';
import {COLORS} from '../theme';
import {ARTISTS,MAP_SPOTS,MERCH,REWARDS,ANNOUNCEMENTS} from '../data';

export default function DetailScreen({route,state,actions,goBack}){
 if(route.name==='artist')return <Artist route={route} state={state} actions={actions} goBack={goBack}/>;
 if(route.name==='map')return <Map goBack={goBack}/>;
 if(route.name==='merch')return <Merch state={state} actions={actions} goBack={goBack}/>;
 if(route.name==='rewards')return <Rewards state={state} goBack={goBack}/>;
 if(route.name==='crew')return <Crew state={state} actions={actions} goBack={goBack}/>;
 if(route.name==='notifications')return <Notifications goBack={goBack}/>;
 if(route.name==='memories')return <Memories goBack={goBack}/>;
 return <Profile state={state} actions={actions} goBack={goBack}/>;
}

function Header({title,sub,goBack,right}){
 return <View style={styles.header}><Pressable onPress={goBack} style={styles.back}><Ionicons name="chevron-back" size={20} color="#fff"/></Pressable><View style={{flex:1}}><Txt faint style={styles.headSub}>{sub}</Txt><Txt style={styles.headTitle}>{title}</Txt></View>{right||<View style={{width:42}}/>}</View>
}

function Artist({route,state,actions,goBack}){
 const a=ARTISTS.find(x=>x.id===route.params?.artistId)||ARTISTS[0];
 const fav=state.favourites.includes(a.id);
 return <Screen><Header title={a.name} sub={a.tag} goBack={goBack}/>
  <GlassCard style={styles.artistHero}><View style={[styles.glow,{backgroundColor:a.accent}]}/><Txt faint style={styles.artistMeta}>{a.stage} · {a.time}</Txt><Txt style={styles.artistName}>{a.name}</Txt><Txt muted style={styles.artistBio}>{a.bio}</Txt><View style={styles.artistRank}><Txt faint style={{fontSize:8,fontWeight:'900'}}>SLOT</Txt><Txt style={{fontSize:24,fontWeight:'900'}}>#{a.rank}</Txt></View></GlassCard>
  <Button title={fav?'REMOVE FROM MY XXL':'ADD TO MY XXL'} icon={fav?'heart':'heart-outline'} onPress={()=>actions.toggleFavourite(a.id)} style={{marginTop:12}}/>
  <Button title="REMIND ME 15 MIN BEFORE" secondary icon="notifications-outline" onPress={()=>actions.toggleReminder('artist:'+a.id)} style={{marginTop:9}}/>
 </Screen>
}

function Map({goBack}){
 const [selected,setSelected]=React.useState(MAP_SPOTS[1]);
 return <Screen><Header title="VENUE MAP" sub="ARENA TAKEDOWN" goBack={goBack}/>
  <GlassCard style={styles.map}><View style={styles.arena}><Txt faint style={styles.mapTitle}>OSTRAVAR ARÉNA · CONCEPT MAP</Txt><View style={styles.stage}><Txt style={{fontSize:9,fontWeight:'900'}}>MAIN STAGE</Txt></View>{MAP_SPOTS.map(p=><Pressable key={p.id} onPress={()=>setSelected(p)} style={[styles.pin,{left:`${p.x}%`,top:`${p.y}%`},selected.id===p.id&&styles.pinActive]}><Txt style={[styles.pinText,selected.id===p.id&&{color:'#050506'}]}>{p.zone}</Txt></Pressable>)}</View></GlassCard>
  <GlassCard style={{marginTop:10}}><View style={styles.detailRow}><View style={styles.detailIcon}><Ionicons name={selected.icon} size={20} color="#fff"/></View><View style={{flex:1}}><Txt style={{fontWeight:'900',fontSize:16}}>{selected.name}</Txt><Txt muted style={{fontSize:10,marginTop:4}}>{selected.sub}</Txt></View><Pill>ZONE {selected.zone}</Pill></View></GlassCard>
  <SectionTitle eyebrow="LOCATIONS" title="All venue points"/>
  {MAP_SPOTS.map(p=><Pressable key={p.id} onPress={()=>setSelected(p)} style={styles.location}><Ionicons name={p.icon} size={18} color="#fff"/><View style={{flex:1}}><Txt style={{fontWeight:'800'}}>{p.name}</Txt><Txt muted style={{fontSize:10,marginTop:2}}>{p.sub}</Txt></View><Txt faint style={{fontWeight:'900'}}>{p.zone}</Txt></Pressable>)}
 </Screen>
}

function Merch({state,actions,goBack}){
 return <Screen><Header title="XXL MERCH" sub="ARENA TAKEDOWN CAPSULE" goBack={goBack}/><SectionTitle eyebrow="DROP 01" title="Event-exclusive pieces"/>
  {MERCH.map(m=>{const reserved=state.reservedMerch.includes(m.id);return <GlassCard key={m.id} style={styles.merchCard}><View style={styles.merchArt}><Txt style={{fontSize:46,fontWeight:'900',letterSpacing:-3}}>XXL</Txt><Txt faint style={{fontSize:8,fontWeight:'900',letterSpacing:2}}>{m.tag}</Txt></View><View style={styles.merchBody}><Txt faint style={{fontSize:8,fontWeight:'900'}}>{m.size}</Txt><Txt style={{fontSize:18,fontWeight:'900',marginTop:5}}>{m.name}</Txt><View style={styles.merchFoot}><Txt style={{fontSize:16,fontWeight:'900'}}>{m.price.toLocaleString('cs-CZ')} Kč</Txt><Pressable onPress={()=>actions.toggleMerch(m.id)} style={[styles.reserve,reserved&&styles.reserveOn]}><Txt style={{fontSize:8,fontWeight:'900',color:reserved?'#050506':'#fff'}}>{reserved?'RESERVED':'RESERVE'}</Txt></Pressable></View></View></GlassCard>})}
 </Screen>
}

function Rewards({state,goBack}){
 return <Screen><Header title="XXL REWARDS" sub="MEMBER LEVEL" goBack={goBack} right={<Pill>{state.points} XP</Pill>}/>
  <GlassCard style={styles.levelCard}><View style={styles.levelRing}><Txt style={{fontSize:25,fontWeight:'900'}}>{state.level}</Txt></View><View style={{flex:1}}><Txt faint style={{fontSize:8,fontWeight:'900',letterSpacing:1.2}}>CURRENT LEVEL</Txt><Txt style={{fontSize:24,fontWeight:'900',marginTop:4}}>XXL INSIDER</Txt><Txt muted style={{fontSize:10,lineHeight:16,marginTop:6}}>Earn XP from event activity, merch and future XXL drops.</Txt></View></GlassCard>
  <SectionTitle eyebrow="REDEEM" title="Member rewards"/>
  {REWARDS.map(r=><GlassCard key={r.id} style={{marginBottom:9}}><View style={styles.detailRow}><View style={styles.detailIcon}><Ionicons name={r.icon} size={20} color="#fff"/></View><View style={{flex:1}}><Txt style={{fontWeight:'900'}}>{r.name}</Txt><Txt muted style={{fontSize:10,marginTop:3}}>{r.points} XP</Txt></View><Pill active={state.points>=r.points}>{state.points>=r.points?'UNLOCKED':'LOCKED'}</Pill></View></GlassCard>)}
 </Screen>
}

function Crew({state,actions,goBack}){
 const crew=[['Šimi','YOU','Entrance'],['Alex','ONLINE','Main Stage'],['Tom','ONLINE','Merch'],['Isa','OFFLINE','—']];
 return <Screen><Header title="MY CREW" sub="XXL TOGETHER" goBack={goBack}/>
  <GlassCard><View style={styles.detailRow}><View style={{flex:1}}><Txt style={{fontWeight:'900',fontSize:16}}>Share my festival zone</Txt><Txt muted style={{fontSize:10,lineHeight:16,marginTop:4}}>Only share your selected venue zone with your crew.</Txt></View><Switch value={state.crewShare} onValueChange={actions.setCrewShare} trackColor={{false:'#2A2A30',true:'#FF334D'}} thumbColor="#fff"/></View></GlassCard>
  <SectionTitle eyebrow="4 MEMBERS" title="Crew status"/>
  {crew.map((c,i)=><View key={c[0]} style={styles.crewRow}><View style={styles.crewAvatar}><Txt style={{fontWeight:'900'}}>{c[0][0]}</Txt></View><View style={{flex:1}}><Txt style={{fontWeight:'900'}}>{c[0]}</Txt><Txt faint style={{fontSize:8,marginTop:3}}>{c[1]}</Txt></View><View style={{alignItems:'flex-end'}}><Txt style={{fontWeight:'800',fontSize:10}}>{i===0?(state.crewShare?'Entrance':'Hidden'):c[2]}</Txt><Txt faint style={{fontSize:8,marginTop:3}}>ZONE</Txt></View></View>)}
 </Screen>
}

function Notifications({goBack}){
 return <Screen><Header title="XXL NOW" sub="NOTIFICATIONS" goBack={goBack}/>{ANNOUNCEMENTS.map((a,i)=><GlassCard key={a.id} style={{marginBottom:9}}><View style={styles.detailRow}><View style={styles.detailIcon}><Ionicons name={a.type==='MERCH'?'shirt-outline':a.type==='DROP'?'sparkles-outline':'megaphone-outline'} size={19} color="#fff"/></View><View style={{flex:1}}><View style={{flexDirection:'row',justifyContent:'space-between'}}><Txt style={{fontWeight:'900',fontSize:15}}>{a.title}</Txt>{i<2&&<View style={styles.unread}/>}</View><Txt muted style={{fontSize:10,lineHeight:16,marginTop:5}}>{a.body}</Txt></View></View></GlassCard>)}</Screen>
}

function Memories({goBack}){
 return <Screen><Header title="MEMORIES" sub="YOUR XXL RECAP" goBack={goBack}/><GlassCard style={styles.memory}><Txt faint style={{fontSize:8,fontWeight:'900',letterSpacing:1.6}}>POST-EVENT PREVIEW</Txt><Txt style={styles.memoryTitle}>YOU WERE{`\n`}THERE.</Txt><Txt muted style={{lineHeight:19,marginTop:12}}>After Arena Takedown, this becomes your personal recap with official media and event stats.</Txt></GlassCard><SectionTitle eyebrow="YOUR XXL 2027" title="Recap preview"/><View style={styles.stats}><Stat n="7" t="ARTISTS"/><Stat n="8H" t="IN ARENA"/><Stat n="3" t="DROPS"/><Stat n="2.4K" t="XP"/></View></Screen>
}

function Profile({state,actions,goBack}){
 return <Screen><Header title="PROFILE" sub="XXL MEMBER" goBack={goBack}/><GlassCard><View style={styles.detailRow}><View style={styles.profileAvatar}><Txt style={{color:'#050506',fontWeight:'900'}}>ŠS</Txt></View><View style={{flex:1}}><Txt style={{fontSize:18,fontWeight:'900'}}>Šimon Szábo</Txt><Txt muted style={{fontSize:10,marginTop:3}}>XXL Insider · Pass XXL-001</Txt></View><Pill active>ACTIVE</Pill></View></GlassCard><SectionTitle eyebrow="PREFERENCES" title="Festival settings"/><GlassCard><Setting title="Preview LIVE mode" sub="Transform Home into event mode." value={state.livePreview} onValue={actions.setLive}/><Setting title="Share crew zone" sub="Show only your selected venue zone." value={state.crewShare} onValue={actions.setCrewShare} last/></GlassCard><Button title="RESET LOCAL DEMO DATA" secondary onPress={actions.reset} style={{marginTop:12}}/></Screen>
}

function Setting({title,sub,value,onValue,last}){return <View style={[styles.setting,!last&&styles.settingBorder]}><View style={{flex:1}}><Txt style={{fontWeight:'900'}}>{title}</Txt><Txt muted style={{fontSize:10,lineHeight:16,marginTop:3}}>{sub}</Txt></View><Switch value={value} onValueChange={onValue} trackColor={{false:'#2A2A30',true:'#FF334D'}} thumbColor="#fff"/></View>}
function Stat({n,t}){return <GlassCard style={styles.stat}><Txt style={{fontSize:25,fontWeight:'900'}}>{n}</Txt><Txt faint style={{fontSize:7,fontWeight:'900',letterSpacing:1.2,marginTop:5}}>{t}</Txt></GlassCard>}

const styles=StyleSheet.create({
 header:{height:92,flexDirection:'row',alignItems:'center',gap:12},
 back:{height:42,width:42,borderRadius:21,backgroundColor:COLORS.panel2,borderWidth:1,borderColor:COLORS.border,alignItems:'center',justifyContent:'center'},
 headSub:{fontSize:8,fontWeight:'900',letterSpacing:1.5},
 headTitle:{fontSize:25,fontWeight:'900',letterSpacing:-1,marginTop:2},
 artistHero:{minHeight:390,justifyContent:'flex-end',overflow:'hidden'},
 glow:{position:'absolute',width:300,height:300,borderRadius:180,opacity:.11,right:-90,top:-80},
 artistMeta:{fontSize:9,fontWeight:'900',letterSpacing:1.4},
 artistName:{fontSize:40,fontWeight:'900',letterSpacing:-2,marginTop:9,maxWidth:'92%'},
 artistBio:{fontSize:12,lineHeight:19,marginTop:12,maxWidth:330},
 artistRank:{position:'absolute',top:18,right:18,alignItems:'flex-end'},
 map:{padding:10},
 arena:{height:430,borderRadius:24,backgroundColor:'#0B0B0E',borderWidth:1,borderColor:COLORS.border,alignItems:'center',paddingTop:20,overflow:'hidden'},
 mapTitle:{fontSize:8,fontWeight:'900',letterSpacing:1.8},
 stage:{position:'absolute',top:65,left:'24%',right:'24%',height:42,borderRadius:12,backgroundColor:COLORS.red,alignItems:'center',justifyContent:'center'},
 pin:{position:'absolute',marginLeft:-18,marginTop:-18,width:36,height:36,borderRadius:18,backgroundColor:'#19191F',borderWidth:1,borderColor:COLORS.borderStrong,alignItems:'center',justifyContent:'center'},
 pinActive:{backgroundColor:'#fff'},
 pinText:{fontSize:10,fontWeight:'900'},
 detailRow:{flexDirection:'row',alignItems:'center',gap:12},
 detailIcon:{width:40,height:40,borderRadius:14,backgroundColor:'rgba(255,255,255,.07)',alignItems:'center',justifyContent:'center'},
 location:{minHeight:60,flexDirection:'row',alignItems:'center',gap:12,borderBottomWidth:1,borderColor:COLORS.border},
 merchCard:{marginBottom:10,padding:0,overflow:'hidden'},
 merchArt:{height:188,alignItems:'center',justifyContent:'center',backgroundColor:'#09090C',borderBottomWidth:1,borderColor:COLORS.border},
 merchBody:{padding:17},
 merchFoot:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:14},
 reserve:{borderRadius:999,borderWidth:1,borderColor:COLORS.borderStrong,paddingHorizontal:14,paddingVertical:10},
 reserveOn:{backgroundColor:'#fff'},
 levelCard:{flexDirection:'row',gap:16,alignItems:'center'},
 levelRing:{height:86,width:86,borderRadius:43,borderWidth:8,borderColor:'#fff',alignItems:'center',justifyContent:'center'},
 crewRow:{minHeight:74,flexDirection:'row',alignItems:'center',gap:12,borderBottomWidth:1,borderColor:COLORS.border},
 crewAvatar:{height:42,width:42,borderRadius:21,backgroundColor:COLORS.panel2,borderWidth:1,borderColor:COLORS.borderStrong,alignItems:'center',justifyContent:'center'},
 unread:{width:8,height:8,borderRadius:4,backgroundColor:COLORS.red},
 memory:{minHeight:330,justifyContent:'flex-end'},
 memoryTitle:{fontSize:40,fontWeight:'900',letterSpacing:-2.3,marginTop:14},
 stats:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',gap:10},
 stat:{width:'48%',alignItems:'center'},
 profileAvatar:{height:56,width:56,borderRadius:28,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'},
 setting:{minHeight:76,flexDirection:'row',alignItems:'center',gap:12},
 settingBorder:{borderBottomWidth:1,borderColor:COLORS.border},
});
