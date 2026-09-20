'use client'
export const dynamic='force-dynamic'
import {FormEvent,useEffect,useState} from 'react'
import Link from 'next/link'
import {ArrowLeft,Search,UserPlus,Users} from 'lucide-react'
import {createClient} from '../../../../lib/supabase/client'

export default function AlunosTurma({params}:{params:{id:string}}){
 const [s,setS]=useState<any>(null),[students,setStudents]=useState<any[]>([]),[enrolled,setEnrolled]=useState<any[]>([]),[studentId,setStudentId]=useState(''),[q,setQ]=useState(''),[msg,setMsg]=useState('')
 async function load(client=s){if(!client)return;const [a,b]=await Promise.all([client.from('profiles').select('id,full_name,email').eq('role','student').eq('active',true).order('full_name'),client.from('enrollments').select('id,status,student_id,profiles!enrollments_student_id_fkey(full_name,email)').eq('class_id',params.id).order('enrolled_at',{ascending:false})]);setStudents(a.data||[]);setEnrolled(b.data||[])}
 useEffect(()=>{const client=createClient();setS(client);load(client)},[])
 async function enroll(e:FormEvent){e.preventDefault();if(!s||!studentId)return;const {error}=await s.rpc('enroll_existing_student',{p_class_id:params.id,p_student_id:studentId});setMsg(error?'Não foi possível matricular o aluno.':'Aluno matriculado com sucesso.');if(!error){setStudentId('');load()}}
 async function status(id:string,value:string){if(!s)return;await s.rpc('set_enrollment_status',{p_enrollment_id:id,p_status:value});load()}
 const filtered=enrolled.filter((x:any)=>((x.profiles?.full_name||'')+' '+(x.profiles?.email||'')).toLowerCase().includes(q.toLowerCase()))
 return <main className="formPage"><div className="formWrap wide"><Link href={'/turmas/'+params.id} className="back"><ArrowLeft size={17}/> Voltar à turma</Link><div className="listHead"><div><span className="eyebrow">MATRÍCULAS</span><h1>Alunos da turma</h1><p>Gerencie quem participa deste ciclo de preparação.</p></div></div>
 <form className="enrollBar" onSubmit={enroll}><select required value={studentId} onChange={e=>setStudentId(e.target.value)}><option value="">Selecione um aluno existente...</option>{students.map(x=><option key={x.id} value={x.id}>{x.full_name}{x.email?' — '+x.email:''}</option>)}</select><button><UserPlus size={16}/> Matricular</button></form>{msg&&<div className="formMessage">{msg}</div>}
 <div className="studentToolbar"><div><Search size={15}/><input placeholder="Buscar aluno..." value={q} onChange={e=>setQ(e.target.value)}/></div><span>{enrolled.filter(x=>x.status==='active').length} ativos</span></div>
 <div className="studentTable">{filtered.map((x:any)=><article key={x.id}><div className="studentAvatar">{(x.profiles?.full_name||'?').slice(0,1).toUpperCase()}</div><div><strong>{x.profiles?.full_name||'Aluno'}</strong><span>{x.profiles?.email||'Sem e-mail cadastrado'}</span></div><select value={x.status} onChange={e=>status(x.id,e.target.value)}><option value="active">Ativo</option><option value="paused">Pausado</option><option value="completed">Concluído</option><option value="cancelled">Cancelado</option></select></article>)}{!filtered.length&&<div className="emptyState"><Users/><h2>Nenhum aluno nesta turma</h2><p>Quando houver matrículas, os alunos aparecerão aqui.</p></div>}</div></div></main>
}