'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, GraduationCap } from 'lucide-react'
import { createClient } from '../../../lib/supabase/client'

export default function NovaTurma() {
  const [saving,setSaving]=useState(false)
  const [message,setMessage]=useState('')
  const [form,setForm]=useState({name:'',start_date:'',end_date:'',exam_date:'',class_start_time:'18:20',class_end_time:'22:40',recess_start:'',recess_end:''})

  const change=(key:string,value:string)=>setForm(v=>({...v,[key]:value}))

  async function submit(e:FormEvent){
    e.preventDefault(); setSaving(true); setMessage('')
    const supabase=createClient()
    const { data: course }=await supabase.from('courses').select('id').eq('slug','aluno-oficial-pmsp').single()
    if(!course){setMessage('Não foi possível localizar o curso.');setSaving(false);return}
    const { data: turmaId,error }=await supabase.rpc('create_class_with_weeks',{
      p_course_id:course.id,p_name:form.name,p_start_date:form.start_date,p_end_date:form.end_date,
      p_exam_date:form.exam_date||null,p_class_start_time:form.class_start_time,p_class_end_time:form.class_end_time,
      p_recess_start:form.recess_start||null,p_recess_end:form.recess_end||null
    })
    if(error||!turmaId){setMessage('Não foi possível salvar. Entre com uma conta administrativa para cadastrar turmas.');setSaving(false);return}
    setMessage('Turma e semanas acadêmicas criadas com sucesso.'); setSaving(false)
  }

  return <main className="formPage">
    <div className="formWrap">
      <Link href="/" className="back"><ArrowLeft size={17}/> Voltar ao painel</Link>
      <div className="formHead"><div className="courseIcon"><GraduationCap size={24}/></div><div><span className="eyebrow">GESTÃO DE TURMAS</span><h1>Nova turma</h1><p>Defina o período acadêmico. O Performance usará essas datas para organizar toda a preparação.</p></div></div>
      <form className="classForm" onSubmit={submit}>
        <section><h2>Identificação</h2><label>Nome da turma<input required placeholder="Ex.: Extensivo Barro Branco — Janeiro 2027" value={form.name} onChange={e=>change('name',e.target.value)}/></label><label>Curso<input value="Aluno Oficial PM-SP (Barro Branco)" disabled/></label></section>
        <section><h2><CalendarDays size={18}/> Calendário</h2><div className="grid2"><label>Data de início<input required type="date" value={form.start_date} onChange={e=>change('start_date',e.target.value)}/></label><label>Data de término<input required type="date" value={form.end_date} onChange={e=>change('end_date',e.target.value)}/></label></div><label>Data da prova <small>(opcional)</small><input type="date" value={form.exam_date} onChange={e=>change('exam_date',e.target.value)}/></label></section>
        <section><h2><Clock3 size={18}/> Horário padrão</h2><div className="grid2"><label>Início das aulas<input type="time" value={form.class_start_time} onChange={e=>change('class_start_time',e.target.value)}/></label><label>Término das aulas<input type="time" value={form.class_end_time} onChange={e=>change('class_end_time',e.target.value)}/></label></div></section>
        <section><h2>Recesso <small>(opcional)</small></h2><div className="grid2"><label>Início do recesso<input type="date" value={form.recess_start} onChange={e=>change('recess_start',e.target.value)}/></label><label>Fim do recesso<input type="date" value={form.recess_end} onChange={e=>change('recess_end',e.target.value)}/></label></div></section>
        {message&&<div className="formMessage"><CheckCircle2 size={18}/>{message}</div>}
        <button className="saveBtn" disabled={saving}>{saving?'Salvando...':'Criar turma'}</button>
      </form>
    </div>
  </main>
}
