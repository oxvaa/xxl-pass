import React,{useState} from 'react';
import {View,TextInput,Pressable,StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Screen,Txt,BrandLogo,Button,GlassCard} from '../components/UI';
import {COLORS} from '../theme';
import {t} from '../i18n';

export default function AuthScreen({route,state,actions,goBack}){
 const lang=state.language;
 const [mode,setMode]=useState(route.params?.mode||'login');
 const [form,setForm]=useState({name:'',username:'',email:'',password:''});
 const [busy,setBusy]=useState(false),[error,setError]=useState('');
 const submit=async()=>{
  setBusy(true);setError('');
  const r=mode==='login'?await actions.login(form):await actions.register(form);
  setBusy(false);
  if(r.ok)goBack();else setError(t(lang,r.error));
 };
 return <Screen>
  <View style={styles.top}><Pressable onPress={goBack} style={styles.back}><Ionicons name="chevron-back" size={20} color="#fff"/></Pressable><BrandLogo width={100} height={52}/><View style={{width:42}}/></View>
  <Txt faint style={styles.eyebrow}>{t(lang,'optionalAccount').toUpperCase()}</Txt>
  <Txt style={styles.title}>{mode==='login'?t(lang,'loginTitle'):t(lang,'registerTitle')}</Txt>
  <Txt muted style={styles.intro}>{t(lang,'loginBenefitText')}</Txt>
  <View style={styles.switch}><SwitchBtn label={t(lang,'login')} active={mode==='login'} onPress={()=>{setMode('login');setError('')}}/><SwitchBtn label={t(lang,'register')} active={mode==='register'} onPress={()=>{setMode('register');setError('')}}/></View>
  {mode==='register'&&<><Field label={t(lang,'name')} value={form.name} onChange={v=>setForm({...form,name:v})}/><Field label={t(lang,'username')} value={form.username} onChange={v=>setForm({...form,username:v})}/></>}
  <Field label={t(lang,'email')} value={form.email} onChange={v=>setForm({...form,email:v})} keyboard="email-address"/>
  <Field label={t(lang,'password')} value={form.password} onChange={v=>setForm({...form,password:v})} secure/>
  {error?<Txt style={styles.error}>{error}</Txt>:null}
  <Button green disabled={busy} title={busy?'…':mode==='login'?t(lang,'login'):t(lang,'createAccount')} onPress={submit} style={{marginTop:10}}/>
  <GlassCard style={styles.benefits}><Txt faint style={styles.small}>{t(lang,'accountBenefits').toUpperCase()}</Txt><Benefit text={t(lang,'benefit1')}/><Benefit text={t(lang,'benefit2')}/><Benefit text={t(lang,'benefit3')}/></GlassCard>
  <Txt faint style={styles.local}>{t(lang,'localOnly')}</Txt>
 </Screen>
}
function Field({label,value,onChange,secure,keyboard}){return <View style={styles.field}><Txt faint style={styles.fieldLabel}>{label.toUpperCase()}</Txt><TextInput value={value} onChangeText={onChange} secureTextEntry={secure} keyboardType={keyboard||'default'} autoCapitalize={keyboard==='email-address'?'none':'sentences'} placeholderTextColor="#55555E" style={styles.input}/></View>}
function SwitchBtn({label,active,onPress}){return <Pressable onPress={onPress} style={[styles.switchBtn,active&&styles.switchOn]}><Txt style={[styles.switchTxt,active&&{color:'#050506'}]}>{label.toUpperCase()}</Txt></Pressable>}
function Benefit({text}){return <View style={styles.benefit}><Ionicons name="checkmark-circle" size={18} color={COLORS.green2}/><Txt style={{fontSize:11,fontWeight:'800'}}>{text}</Txt></View>}
const styles=StyleSheet.create({
 top:{height:70,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},back:{height:42,width:42,borderRadius:21,backgroundColor:'#15151A',borderWidth:1,borderColor:COLORS.border,alignItems:'center',justifyContent:'center'},eyebrow:{fontSize:8,fontWeight:'900',letterSpacing:1.5,marginTop:18},title:{fontSize:37,fontWeight:'900',letterSpacing:-1.9,marginTop:5},intro:{fontSize:11,lineHeight:18,marginTop:8},
 switch:{flexDirection:'row',gap:7,marginTop:20,marginBottom:8},switchBtn:{flex:1,minHeight:42,borderRadius:17,borderWidth:1,borderColor:COLORS.borderStrong,alignItems:'center',justifyContent:'center'},switchOn:{backgroundColor:'#fff'},switchTxt:{fontSize:8,fontWeight:'900'},
 field:{marginTop:12},fieldLabel:{fontSize:7,fontWeight:'900',letterSpacing:1.2,marginBottom:6},input:{height:54,borderRadius:18,borderWidth:1,borderColor:COLORS.borderStrong,backgroundColor:COLORS.panel,color:'#fff',paddingHorizontal:15,fontSize:14},
 error:{fontSize:10,color:'#FF7E8E',fontWeight:'800',marginTop:10},benefits:{marginTop:18},small:{fontSize:7,fontWeight:'900',letterSpacing:1.2},benefit:{flexDirection:'row',alignItems:'center',gap:9,marginTop:13},local:{fontSize:8,lineHeight:14,textAlign:'center',marginTop:15},
});
