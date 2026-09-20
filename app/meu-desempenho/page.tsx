'use client'
export const dynamic='force-dynamic'
import {useEffect,useState} from 'react'
import Link from 'next/link'
import {ArrowLeft,BarChart3,ChevronRight,Target} from 'lucide-react'
import {createClient} from '../../lib/supabase/client'
export default function MeuDesempenho(){
 const [subjects,setSubjects]=useState<any[]>([]),[queue,setQueue]=useState<any[]>([])
 useEffect(()=>{const s=createClient();Promise.all([s.rpc('my_subject_performance'),s.rpc('my_priority_queue')]).then(([a,b])=>{setSubjects(a.data||[]);setQueue(b.data||[])})},[])
 return <main className="studentPage"><div className="studentShell"><Link href="/meu-painel" className="back"><ArrowLeft size={17}/> Meu painel</Link><span className="eyebrow">INTELIGÊNCIA ACADÊMICA</span><h1>Meu desempenho</h1><p className="muted">Veja onde sua preparação está avançando e o que merece atenção primeiro.</p>
 <section className="priorityBox"><div className="sectionTitle"><div><Target/><div><span className="eyebrow">PRIORIDADES</span><h2>O que fazer primeiro</h2></div></div><small>ordem calculada pelo seu progresso</small></div><div className="priorityList">{queue.map((x:any,i)=><Link href="/minhas-aulas" key={x.lesson_id}><b>{i+1}</b><div><strong>{x.title}</strong><span>{x.subject_name} · {x.reason}</span></div><ChevronRight/></Link>)}{!queue.length&&<p className="emptyTiny">Nenhuma pendência acadêmica no momento.</p>}</div></section>
 <section className="performanceBox"><div className="sectionTitle"><div><BarChart3/><div><span className="eyebrow">POR DISCIPLINA</span><h2>Seu desempenho</h2></div></div></div><div className="subjectPerformance">{subjects.map((x:any)=><article key={x.subject_id}><div className="subjectPerfHead"><strong>{x.subject_name}</strong><span>{x.accuracy==null?'Sem questões':x.accuracy+'% de acertos'}</span></div><div className="perfBar"><i style={{width:(x.accuracy||0)+'%'}}/></div><div className="perfStats"><span>{x.watched}/{x.lessons} aulas</span><span>{x.consolidated} consolidadas</span><span>{x.questions} questões</span><span>{Math.floor(x.study_minutes/60)}h {x.study_minutes%60}min</span></div></article>)}{!subjects.length&&<p className="emptyTiny">Seus dados aparecerão conforme você registrar seus estudos.</p>}</div></section></div></main>
}