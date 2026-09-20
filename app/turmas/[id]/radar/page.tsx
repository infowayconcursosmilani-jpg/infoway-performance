'use client'
export const dynamic='force-dynamic'
import {useEffect,useMemo,useState} from 'react'
import Link from 'next/link'
import {ArrowLeft,ShieldAlert,Users,Eye,BookCheck} from 'lucide-react'
import {createClient} from '../../../../lib/supabase/client'
export default function Radar({params}:{params:{id:string}}){
 const [rows,setRows]=useState<any[]>([]),[filter,setFilter]=useState('all')
 useEffect(()=>{const s=createClient();s.rpc('class_student_radar',{p_class_id:params.id}).then(({data})=>setRows(data||[]))},[])
 const list=useMemo(()=>filter==='all'?rows:rows.filter(x=>x.risk_level===filter),[rows,filter])
 const count=(x:string)=>rows.filter(r=>r.risk_level===x).length
 return <main className="formPage"><div className="formWrap wide"><Link href={'/turmas/'+params.id} className="back"><ArrowLeft size={17}/> Voltar à turma</Link><span className="eyebrow">COORDENAÇÃO ACADÊMICA</span><h1>Radar da turma</h1><p className="muted">Identifique quem precisa de atenção e o motivo, considerando somente aulas realmente ministradas.</p>
 <div className="radarSummary"><button onClick={()=>setFilter('all')} className={filter==='all'?'selected':''}><Users/><strong>{rows.length}</strong><span>Alunos ativos</span></button><button onClick={()=>setFilter('green')} className={filter==='green'?'selected':''}><i className="dot green"/><strong>{count('green')}</strong><span>Acompanhando</span></button><button onClick={()=>setFilter('yellow')} className={filter==='yellow'?'selected':''}><i className="dot yellow"/><strong>{count('yellow')}</strong><span>Atenção</span></button><button onClick={()=>setFilter('red')} className={filter==='red'?'selected':''}><i className="dot red"/><strong>{count('red')}</strong><span>Intervenção</span></button></div>
 <div className="radarTable">{list.map((x:any)=><article key={x.student_id}><i className={'riskBar '+x.risk_level}/><Link href={'/turmas/'+params.id+'/alunos/'+x.student_id} className="radarName"><strong>{x.student_name}</strong><span>Risco acadêmico {x.risk_score}/100 · abrir ficha</span></Link><div><Eye/><strong>{x.watched}/{x.delivered_lessons}</strong><span>aulas</span></div><div><BookCheck/><strong>{x.consolidated}</strong><span>consolidadas</span></div><div><ShieldAlert/><strong>{x.pending_watch+x.pending_study}</strong><span>pendências</span></div><div><strong>{x.accuracy==null?'—':x.accuracy+'%'}</strong><span>{x.questions} questões</span></div></article>)}{!list.length&&<div className="emptyState"><ShieldAlert/><h2>Nenhum aluno neste grupo</h2><p>O radar será atualizado conforme a turma gerar dados.</p></div>}</div>
 <p className="radarNote">O nível é um sinal operacional para a coordenação, não um diagnóstico definitivo. Ele considera pendências e desempenho já registrado.</p></div></main>
}