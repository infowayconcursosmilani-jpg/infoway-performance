'use client'
export const dynamic='force-dynamic'
import {FormEvent,useEffect,useState} from 'react'
import Link from 'next/link'
import {ArrowLeft,ClipboardList,Plus} from 'lucide-react'
import {createClient} from '../../../../lib/supabase/client'
export default function SimuladosTurma({params}:{params:{id:string}}){
 const [s,setS]=useState<any>(null),[rows,setRows]=useState<any[]>([]),[name,setName]=useState(''),[date,setDate]=useState(''),[total,setTotal]=useState(60),[msg,setMsg]=useState('')
 async function load(client=s){if(!client)return;const {data}=await client.from('simulations').select('id,name,simulation_date,total_questions,active,simulation_results(count)').eq('class_id',params.id).order('simulation_date',{ascending:false});setRows(data||[])}
 useEffect(()=>{const client=createClient();setS(client);load(client)},[])
 async function create(e:FormEvent){e.preventDefault();if(!s)return;const {error}=await s.from('simulations').insert({class_id:params.id,name,simulation_date:date,total_questions:total});setMsg(error?'Não foi possível criar o simulado.':'Simulado criado com sucesso.');if(!error){setName('');setDate('');load()}}
 return <main className="formPage"><div className="formWrap wide"><Link href={'/turmas/'+params.id} className="back"><ArrowLeft size={17}/> Voltar à turma</Link><span className="eyebrow">AVALIAÇÃO</span><h1>Simulados da turma</h1><p className="muted">Registre avaliações para acompanhar a evolução dos alunos ao longo do ciclo.</p>
 <form className="simulationCreate" onSubmit={create}><label>Nome<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Ex.: Simulado 01 — Diagnóstico"/></label><label>Data<input required type="date" value={date} onChange={e=>setDate(e.target.value)}/></label><label>Questões<input required type="number" min="1" value={total} onChange={e=>setTotal(Number(e.target.value))}/></label><button><Plus size={15}/> Criar simulado</button></form>{msg&&<div className="formMessage">{msg}</div>}
 <div className="simulationList">{rows.map((x:any)=><article key={x.id}><div className="simIcon"><ClipboardList/></div><div><strong>{x.name}</strong><span>{new Date(x.simulation_date+'T00:00:00').toLocaleDateString('pt-BR')} · {x.total_questions} questões</span></div><div className="simCount"><strong>{x.simulation_results?.[0]?.count||0}</strong><span>resultados</span></div></article>)}{!rows.length&&<div className="emptyState"><ClipboardList/><h2>Nenhum simulado cadastrado</h2><p>Crie a primeira avaliação desta turma.</p></div>}</div></div></main>
}