import Link from 'next/link'
import { ArrowLeft, Plus, GraduationCap, CalendarDays, Users, ChevronRight } from 'lucide-react'
import { createServerSupabase } from '../../lib/supabase/server'

function br(d:string){return new Intl.DateTimeFormat('pt-BR',{timeZone:'UTC'}).format(new Date(d+'T00:00:00Z'))}

export default async function Turmas(){
 const supabase=createServerSupabase()
 const {data:{user}}=await supabase.auth.getUser()
 if(user){await supabase.rpc('ensure_my_profile')}
 const {data:turmas}=await supabase.from('classes').select('id,name,start_date,end_date,status,class_start_time,class_end_time,courses(name),academic_weeks(count),enrollments(count)').order('start_date',{ascending:false})
 return <main className="formPage"><div className="formWrap wide"><div className="listHead"><div><Link href="/" className="back"><ArrowLeft size={17}/> Visão geral</Link><span className="eyebrow">GESTÃO ACADÊMICA</span><h1>Turmas</h1><p>Gerencie os ciclos de preparação da Infoway.</p></div><Link href="/turmas/nova" className="primaryBtn"><Plus size={18}/> Nova turma</Link></div>
 <div className="classList">{turmas?.map((t:any)=><Link href={'/turmas/'+t.id} className="classRow" key={t.id}><div className="miniCourse"><GraduationCap size={21}/></div><div className="classMain"><span className="rowStatus">{t.status==='preparation'?'Preparação':t.status}</span><h2>{t.name}</h2><p>{t.courses?.name}</p></div><div className="rowMetric"><CalendarDays size={15}/><span>{br(t.start_date)} → {br(t.end_date)}</span></div><div className="rowMetric"><strong>{t.academic_weeks?.[0]?.count||0}</strong><span>semanas</span></div><div className="rowMetric"><Users size={15}/><span>{t.enrollments?.[0]?.count||0} alunos</span></div><ChevronRight size={19}/></Link>)}
 {!turmas?.length&&<div className="emptyState"><GraduationCap size={30}/><h2>Nenhuma turma cadastrada</h2><p>Crie a primeira turma para iniciar o acompanhamento.</p></div>}</div></div></main>
}
