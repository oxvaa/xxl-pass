import React,{useState} from 'react';
import {View,Pressable,StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Screen,Txt,Pill,SectionTitle,GlassCard} from '../components/UI';
import {ARTISTS} from '../data';
import {COLORS} from '../theme';

export default function LineupScreen({state,actions,navigate}){
 const [filter,setFilter]=useState('ALL');
 const list=ARTISTS.filter(a=>filter==='ALL'||filter==='MY XXL'&&state.favourites.includes(a.id)||filter==='MAIN'&&a.stage==='MAIN STAGE'||filter==='NEXT'&&a.stage==='NEXT STAGE');
 return <Screen>
  <View style={styles.header}><View><Txt faint style={styles.eyebrow}>XXL CZECHIA · 2027</Txt><Txt style={styles.title}>LINEUP</Txt></View><Pill>DROP 01</Pill></View>

  <View style={styles.filters}>
   {['ALL','MY XXL','MAIN','NEXT'].map(x=><Filter key={x} label={x} active={filter===x} onPress={()=>setFilter(x)}/>)}
  </View>

  <SectionTitle eyebrow={`${list.length} ARTIST SLOTS`} title={filter==='MY XXL'?'Your XXL':'Arena lineup'}/>
  {list.map((a,i)=><ArtistCard key={a.id} a={a} featured={i===0&&filter!=='MY XXL'} favourite={state.favourites.includes(a.id)} onHeart={()=>actions.toggleFavourite(a.id)} onOpen={()=>navigate('artist',{artistId:a.id})}/>)}
 </Screen>
}

function ArtistCard({a,featured,favourite,onHeart,onOpen}){
 return <Pressable onPress={onOpen} style={({pressed})=>[styles.card,featured&&styles.featured,pressed&&{opacity:.88}]}>
  <View style={[styles.accent,{backgroundColor:a.accent}]}/>
  <View style={styles.rank}><Txt faint style={{fontSize:10,fontWeight:'900',letterSpacing:1.4}}>#{a.rank}</Txt></View>
  <View style={{flex:1,paddingTop:featured?26:14}}>
   <Txt faint style={styles.tag}>{a.tag}</Txt>
   <Txt style={[styles.name,featured&&styles.nameFeatured]}>{a.name}</Txt>
   <Txt muted style={styles.meta}>{a.stage} · {a.time}</Txt>
  </View>
  <Pressable onPress={e=>{e.stopPropagation?.();onHeart()}} style={[styles.heart,favourite&&styles.heartActive]}><Ionicons name={favourite?'heart':'heart-outline'} size={19} color={favourite?'#050506':'#fff'}/></Pressable>
  {featured&&<View style={styles.bigType}><Txt style={{fontSize:84,fontWeight:'900',color:'rgba(255,255,255,.035)'}}>XXL</Txt></View>}
 </Pressable>
}

function Filter({label,active,onPress}){return <Pressable onPress={onPress} style={[styles.filter,active&&styles.filterActive]}><Txt style={[styles.filterText,active&&{color:'#050506'}]}>{label}</Txt></Pressable>}

const styles=StyleSheet.create({
 header:{height:96,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
 eyebrow:{fontSize:9,fontWeight:'900',letterSpacing:1.7},
 title:{fontSize:43,fontWeight:'900',letterSpacing:-2.3,marginTop:2},
 filters:{flexDirection:'row',gap:7,flexWrap:'wrap'},
 filter:{paddingHorizontal:13,paddingVertical:9,borderRadius:999,borderWidth:1,borderColor:COLORS.borderStrong,backgroundColor:'rgba(255,255,255,.025)'},
 filterActive:{backgroundColor:'#fff',borderColor:'#fff'},
 filterText:{fontSize:9,fontWeight:'900',letterSpacing:.9},
 card:{minHeight:132,borderRadius:29,borderWidth:1,borderColor:COLORS.border,backgroundColor:COLORS.panel,marginBottom:10,padding:17,paddingLeft:21,flexDirection:'row',alignItems:'flex-start',overflow:'hidden'},
 featured:{minHeight:222,backgroundColor:'#111115'},
 accent:{position:'absolute',left:0,top:0,bottom:0,width:4},
 rank:{position:'absolute',right:18,bottom:16},
 tag:{fontSize:8,fontWeight:'900',letterSpacing:1.45},
 name:{fontSize:25,fontWeight:'900',letterSpacing:-1.15,marginTop:8,maxWidth:'82%'},
 nameFeatured:{fontSize:34,letterSpacing:-1.7,marginTop:12},
 meta:{fontSize:10,fontWeight:'800',marginTop:7},
 heart:{width:42,height:42,borderRadius:21,borderWidth:1,borderColor:COLORS.borderStrong,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(255,255,255,.04)',zIndex:2},
 heartActive:{backgroundColor:'#fff'},
 bigType:{position:'absolute',right:-20,top:73},
});
