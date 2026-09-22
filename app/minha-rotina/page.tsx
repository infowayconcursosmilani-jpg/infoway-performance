'use client'
export const dynamic='force-dynamic'
import {useEffect,useState} from 'react'
import Link from 'next/link'
import {ArrowLeft,CalendarClock,CheckCircle2} from 'lucide-react'
import {createClient} from '../../lib/supabase/client'
const days=['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo']
export default function MinhaRotina(){
 const [s,setS]=useState<any>(null),[mins,setMins]=useState<number[]>(Array(7).fill(0)),[saved,setSaved]=useState(false),[busy,setBusy]=useState(false)
 useEffect(()=>{const c=createClient();setS(c);c.rpc('my_weekly_availability').then(({data})=>{const a=Array(7).fill(0);(data||[]).forEach((x:any)=>a[x.weekday-1]=x.available_minutes);setMins(a)})},[])
 async function save(){if(!s)return;setBusy(true);setSaved(false);const rs=await Promise.all(mins.map((m,i)=>s.rpc('save_my_availability',{p_weekday:i+1,p_available_minutes:m})));setBusy(false);setSaved(!rs.some(x=>x.error))}
 const total=mins.reduce((a,b)=>a+b,0)
 return <main className="studentPage"><div className="studentShell"><Link href="/meu-painel" className="back"><ArrowLeft size={17}/> Meu painel</Link><span className="eyebrow">MINHA ROTINA</span><h1>Quanto tempo você realmente tem?</h1><p className="muted">Informe apenas o tempo disponível fora das aulas da Infoway. Isso será usado para organizar prioridades sem criar uma rotina impossível de cumprir.</p>
 <div className="availabilityTotal"><CalendarClock/><div><span>Disponibilidade semanal</span><strong>{Math.floor(total/60)}h {total%60}min</strong></div></div>
 <div className="availabilityGrid">{days.map((d,i)=><label key={d}><span>{d}</span><div><input type="number" min="0" max="24" value={Math.floor(mins[i]/60)} onChange={e=>{const a=[...mins];a[i]=Math.max(0,Number(e.target.value))*60+(a[i]%60);setMins(a);setSaved(false)}}/><small>h</small><input type="number" min="0" max="59" value={mins[i]%60} onChange={e=>{const a=[...mins];a[i]=Math.floor(a[i]/60)*60+Math.min(59,Math.max(0,Number(e.target.value)));setMins(a);setSaved(false)}}/><small>min</small></div></label>)}</div>
 <button className="primaryStudentButton" onClick={save} disabled={busy}>{busy?'Salvando...':'Salvar minha disponibilidade'}</button>{saved&&<div className="availabilitySaved"><CheckCircle2/> Rotina salva. O Performance já pode considerar seu tempo real.</div>}
 </div></main>
}