import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, BookOpen, CalendarDays, Clock3, GraduationCap, Users, Plus, Layers3, Clock, UserRoundPlus, ClipboardCheck, Radar, ClipboardList } from 'lucide-react'
import { createServerSupabase } from '../../../lib/supabase/server'

function br(d:string){return new Intl.DateTimeFormat('pt-BR',{timeZone:'UTC'}).format(new Date(d+'T00:00:00Z'))}
export default async function TurmaDetalhe({params}:{params:{id:string}}){
 const supabase=createServerSupabase()
 const {data:t}=await supabase.from('classes').select('*,courses(name),class_recesses(*),academic_weeks(*)').eq('id',params.id).single()
 if(!t) notFound()
 const {count:alunos}=await supabase.from('enrollments').select('*',{count:'exact',head:true}).eq('class_id',params.id).eq('status','active')
 const {count:aulas}=await supabase.from('lessons').select('*',{count:'exact',head:true}).eq('class_id',params.id)
 return <main className="formPage"><div className="formWrap wide"><Link href="/turmas" className="back"><ArrowLeft size={17}/> Todas as turmas</Link>
 <div className="detailHero"><div><span className="rowStatus">PREPARAÇÃO</span><h1>{t.name}</h1><p>{t.courses?.name}</p></div><div className="courseIcon"><GraduationCap size={25}/></div></div>
 <div className="detailStats"><article><CalendarDays/><span>Período</span><strong>{br(t.start_date)} → {br(t.end_date)}</strong></article><article><Clock3/><span>Horário</span><strong>{String(t.class_start_time).slice(0,5)} → {String(t.class_end_time).slice(0,5)}</strong></article><article><Users/><span>Alunos</span><strong>{alunos||0}</strong></article><article><BookOpen/><span>Aulas cadastradas</span><strong>{aulas||0}</strong></article></div>
 <div className="academicActions four"><Link href={'/turmas/'+params.id+'/simulados'} className="actionCard"><ClipboardList size={20}/><div><strong>Simulados</strong><span>Avaliações e evolução</span></div></Link><Link href={'/turmas/'+params.id+'/radar'} className="actionCard"><Radar size={20}/><div><strong>Radar da turma</strong><span>Risco e intervenção acadêmica</span></div></Link><Link href={'/turmas/'+params.id+'/alunos'} className="actionCard"><UserRoundPlus size={20}/><div><strong>Alunos da turma</strong><span>Matrículas e situação</span></div></Link><Link href={'/turmas/'+params.id+'/disciplinas'} className="actionCard"><Layers3 size={20}/><div><strong>Disciplinas da turma</strong><span>Matérias e carga semanal</span></div></Link><Link href={'/turmas/'+params.id+'/grade'} className="actionCard"><Clock size={20}/><div><strong>Grade semanal</strong><span>Horários, matérias e professores</span></div></Link><Link href={'/turmas/'+params.id+'/diario'} className="actionCard"><ClipboardCheck size={20}/><div><strong>Diário de aula</strong><span>Registrar o que foi ministrado</span></div></Link><Link href={'/turmas/'+params.id+'/aulas/nova'} className="actionCard"><Plus size={20}/><div><strong>Cadastrar aula</strong><span>Data, conteúdo e horário</span></div></Link></div>
 <section className="weeksPanel"><div className="panelHead"><div><span className="eyebrow">CRONOGRAMA</span><h2>Semanas acadêmicas</h2></div><span className="pill">{t.academic_weeks?.length||0} semanas</span></div><div className="weekGrid">{t.academic_weeks?.sort((a:any,b:any)=>a.week_number-b.week_number).map((w:any)=><div className="weekCard" key={w.id}><strong>Semana {w.week_number}</strong><span>{br(w.start_date)} — {br(w.end_date)}</span></div>)}</div></section>
 {t.class_recesses?.length>0&&<section className="recessBox"><strong>Recesso programado</strong>{t.class_recesses.map((r:any)=><span key={r.id}>{br(r.start_date)} → {br(r.end_date)}</span>)}</section>}
 </div></main>
}
