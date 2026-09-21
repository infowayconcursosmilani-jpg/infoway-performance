'use client'
export const dynamic='force-dynamic'
import {useEffect,useState} from 'react'
import Link from 'next/link'
import {BookOpen,CheckCircle2,Clock3,Target,AlertCircle,ChevronRight} from 'lucide-react'
import {createClient} from '../../lib/supabase/client'

export default function MeuPainel(){
 const [data,setData]=useState<any>(null),[loading,setLoading]=useState(true)
 useEffect(()=>{const s=createClient();s.rpc('my_student_dashboard').then(({data})=>{setData(data);setLoading(false)})},[])
 if(loading)return <main className="studentPage"><div className="studentShell"><p>Carregando seu Performance...</p></div></main>
 const m=data?.metrics||{},name=(data?.profile?.name||'Aluno').split(' ')[0],acc=m.questions?Math.round((m.correct/m.questions)*100):0
 return <main className="studentPage"><div className="studentShell"><header className="studentHeader"><div><span className="eyebrow">INFOWAY PERFORMANCE</span><h1>Olá, {name}.</h1><p>{data?.active_class?.name||'Sua preparação começa aqui.'}</p></div><div className="studentScore"><span>ÍNDICE INFOWAY</span><strong>—</strong><small>em construção</small></div></header>
 <section className="mission"><div className="missionIcon"><Target/></div><div><span className="eyebrow">SUA MISSÃO DE HOJE</span><h2>{m.pending>0?'Você tem conteúdo aguardando acompanhamento.':'Mantenha sua preparação em dia.'}</h2><p>{m.pending>0?m.pending+' aula(s) ainda precisam ser assistidas ou registradas.':'Assim que houver novas aulas, elas aparecerão aqui automaticamente.'}</p></div><Link href="/minhas-aulas" className="missionGo">Ver aulas <ChevronRight/></Link></section>
 <div className="studentMetrics"><article><BookOpen/><span>Aulas acompanhadas</span><strong>{m.watched||0}</strong><small>de {m.lessons_total||0} registradas</small></article><article><CheckCircle2/><span>Consolidadas</span><strong>{m.consolidated||0}</strong><small>estudo pós-aula</small></article><article><Clock3/><span>Tempo de estudo</span><strong>{Math.floor((m.study_minutes||0)/60)}h {m.study_minutes%60}min</strong><small>fora das aulas</small></article><article><Target/><span>Questões</span><strong>{m.questions||0}</strong><small>{m.questions?acc+'% de acertos':'sem dados ainda'}</small></article></div>
 <section className="studentPanel"><div><span className="eyebrow">ACOMPANHAMENTO</span><h2>Seu ciclo de preparação</h2></div><div className="cycleSteps"><div className="cycle active"><b>1</b><span>Aula</span></div><i></i><div className="cycle"><b>2</b><span>Estudo</span></div><i></i><div className="cycle"><b>3</b><span>Consolidação</span></div></div><div className="studentQuickLinks"><Link href="/meu-desempenho" className="performanceLink">Desempenho e prioridades →</Link><Link href="/meus-simulados" className="performanceLink">Meus simulados →</Link></div></section>
 {m.pending>0&&<div className="studentAlert"><AlertCircle/><div><strong>Existem pendências</strong><span>O Performance vai priorizar esses conteúdos na sua rotina.</span></div></div>}</div></main>
}