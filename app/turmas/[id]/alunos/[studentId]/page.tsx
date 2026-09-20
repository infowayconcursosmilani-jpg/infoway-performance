'use client'
export const dynamic='force-dynamic'
import {useEffect,useState} from 'react'
import Link from 'next/link'
import {ArrowLeft,BookOpen,CheckCircle2,Clock3,Target,TriangleAlert} from 'lucide-react'
import {createClient} from '../../../../../../lib/supabase/client'
export default function FichaAluno({params}:{params:{id:string;studentId:string}}){
 const [d,setD]=useState<any>(null)
 useEffect(()=>{const s=createClient();s.rpc('student_academic_detail',{p_class_id:params.id,p_student_id:params.studentId}).then(({data})=>setD(data))},[])
 if(!d)return <main className="formPage"><div className="formWrap wide">Carregando ficha acadêmica...</div></main>
 const x=d.summary||{}
 return <main className="formPage"><div className="formWrap wide"><Link href={'/turmas/'+params.id+'/radar'} className="back"><ArrowLeft size={17}/> Radar da turma</Link><span className="eyebrow">FICHA ACADÊMICA</span><h1>{d.student?.name}</h1><p className="muted">{d.student?.email||'Aluno da turma'} · acompanhamento individual</p>
 <div className="profileMetrics"><article><BookOpen/><strong>{x.watched||0}/{x.delivered_lessons||0}</strong><span>Aulas acompanhadas</span></article><article><CheckCircle2/><strong>{x.consolidated||0}</strong><span>Consolidadas</span></article><article><Target/><strong>{x.accuracy==null?'—':x.accuracy+'%'}</strong><span>{x.questions||0} questões</span></article><article><Clock3/><strong>{Math.floor((x.study_minutes||0)/60)}h {x.study_minutes%60}min</strong><span>Estudo registrado</span></article></div>
 <section className="performanceBox"><div className="sectionTitle"><div><Target/><div><span className="eyebrow">DIAGNÓSTICO</span><h2>Desempenho por disciplina</h2></div></div></div><div className="subjectPerformance">{(d.subjects||[]).map((s:any)=><article key={s.subject_id}><div className="subjectPerfHead"><strong>{s.subject_name}</strong><span>{s.accuracy==null?'Sem questões':s.accuracy+'% de acertos'}</span></div><div className="perfBar"><i style={{width:(s.accuracy||0)+'%'}}/></div><div className="perfStats"><span>{s.watched}/{s.delivered} aulas</span><span>{s.consolidated} consolidadas</span><span>{s.questions} questões</span><span>{Math.floor(s.study_minutes/60)}h {s.study_minutes%60}min</span></div></article>)}</div></section>
 <section className="performanceBox"><div className="sectionTitle"><div><TriangleAlert/><div><span className="eyebrow">PENDÊNCIAS</span><h2>Onde agir agora</h2></div></div></div><div className="pendingDetail">{(d.pending||[]).map((p:any)=><article key={p.id}><div><strong>{p.title}</strong><span>{p.subject_name} · {new Date(p.lesson_date+'T00:00:00').toLocaleDateString('pt-BR')}</span></div><b>{p.reason}</b></article>)}{!d.pending?.length&&<p className="emptyTiny">Nenhuma pendência registrada.</p>}</div></section></div></main>
}