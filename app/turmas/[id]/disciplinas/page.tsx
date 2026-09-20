'use client'

export const dynamic = 'force-dynamic'
import { FormEvent,useEffect,useState } from 'react'
import Link from 'next/link'
import { ArrowLeft,BookOpen,Plus } from 'lucide-react'
import { createClient } from '../../../../lib/supabase/client'

export default function Disciplinas({params}:{params:{id:string}}){
 const [s,setS]=useState<any>(null); const [subjects,setSubjects]=useState<any[]>([]); const [assigned,setAssigned]=useState<any[]>([]); const [subjectId,setSubjectId]=useState(''); const [weekly,setWeekly]=useState(1); const [msg,setMsg]=useState('')
 async function load(){if(!s)return;const [{data:a},{data:b}]=await Promise.all([s.from('subjects').select('*').eq('active',true).order('name'),s.from('class_subjects').select('subject_id,weekly_lessons,subjects(name)').eq('class_id',params.id)]);setSubjects(a||[]);setAssigned(b||[])}
 useEffect(()=>{const client=createClient();setS(client);(async()=>{const [a,b,c]=await Promise.all([client.from('class_subjects').select('subject_id,subjects(name)').eq('class_id',params.id),client.from('profiles').select('id,full_name').eq('role','teacher').eq('active',true).order('full_name'),client.from('class_schedule_slots').select('*,subjects(name),profiles(full_name)').eq('class_id',params.id).order('weekday').order('slot_order')]);setSubs(a.data||[]);setTeachers(b.data||[]);setSlots(c.data||[])})()},[])
 async function submit(e:FormEvent){if(!s)return;e.preventDefault();setMsg('');const {error}=await s.rpc('assign_subject_to_class',{p_class_id:params.id,p_subject_id:subjectId,p_teacher_id:null,p_weekly_lessons:weekly});setMsg(error?'Não foi possível adicionar.':'Disciplina adicionada.');if(!error)load()}
 return <main className="formPage"><div className="formWrap wide"><Link href={'/turmas/'+params.id} className="back"><ArrowLeft size={17}/> Voltar à turma</Link><div className="listHead"><div><span className="eyebrow">ESTRUTURA ACADÊMICA</span><h1>Disciplinas</h1><p>Defina as matérias e a carga semanal desta turma.</p></div></div>
 <form className="inlineForm" onSubmit={submit}><label>Disciplina<select required value={subjectId} onChange={e=>setSubjectId(e.target.value)}><option value="">Selecione...</option>{subjects.map(x=><option value={x.id} key={x.id}>{x.name}</option>)}</select></label><label>Aulas por semana<input type="number" min="0" value={weekly} onChange={e=>setWeekly(Number(e.target.value))}/></label><button className="primaryBtn"><Plus size={17}/> Adicionar</button></form>{msg&&<div className="formMessage">{msg}</div>}
 <div className="subjectList">{assigned.map((x:any)=><article key={x.subject_id}><div className="miniCourse"><BookOpen size={19}/></div><div><strong>{x.subjects?.name}</strong><span>{x.weekly_lessons} aulas/semana</span></div></article>)}</div></div></main>
}
