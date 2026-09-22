import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Txt, GlassCard, Pill, SectionTitle } from '../components/UI';
import { ARTISTS } from '../data';
import { COLORS } from '../theme';

export default function LineupScreen({ state, actions, navigate }){
 return <Screen>
  <View style={styles.header}><View><Txt faint style={styles.eyebrow}>XXL CZECHIA · 2027</Txt><Txt style={styles.title}>LINEUP</Txt></View><Pill>DROP 01</Pill></View>
  <Txt muted style={{lineHeight:20,maxWidth:320}}>Build your personal lineup now. Official artist reveals can replace the reserved slots without changing the app structure.</Txt>
  <SectionTitle title="Main lineup" eyebrow={`${ARTISTS.length} SLOTS`}/>
  {ARTISTS.map((a,i)=>{
    const fav=state.favourites.includes(a.id);
    return <GlassCard key={a.id} onPress={()=>navigate('artist',{artistId:a.id})} style={[styles.card,{marginBottom:11,padding:0,overflow:'hidden'}]}>
      <View style={[styles.accent,{backgroundColor:a.accent}]}/>
      <View style={{padding:18,paddingLeft:20}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',gap:12}}>
          <View style={{flex:1}}><Txt faint style={{fontSize:9,fontWeight:'900',letterSpacing:1.4}}>{a.tag}</Txt><Txt style={{fontSize:i<2?29:23,fontWeight:'1000',letterSpacing:-1.1,marginTop:7}}>{a.name}</Txt><Txt muted style={{fontSize:11,fontWeight:'800',marginTop:7}}>{a.meta}</Txt></View>
          <Pressable onPress={()=>actions.toggleFavourite(a.id)} style={[styles.heart,fav&&styles.heartActive]}><Ionicons name={fav?'heart':'heart-outline'} size={19} color={fav?'#050505':'#fff'}/></Pressable>
        </View>
      </View>
    </GlassCard>;
  })}
 </Screen>
}

const styles=StyleSheet.create({
 header:{height:100,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},eyebrow:{fontSize:9,fontWeight:'900',letterSpacing:1.6},title:{fontSize:42,fontWeight:'1000',letterSpacing:-2.2,marginTop:2},
 card:{backgroundColor:COLORS.panel},accent:{position:'absolute',left:0,top:0,bottom:0,width:4},heart:{width:42,height:42,borderRadius:21,borderWidth:1,borderColor:COLORS.borderStrong,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(255,255,255,.05)'},heartActive:{backgroundColor:'#FFFFFF'}
});
