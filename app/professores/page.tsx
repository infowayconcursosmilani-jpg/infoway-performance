'use client'

export const dynamic = 'force-dynamic'
import {useEffect,useState} from 'react'
import Link from 'next/link'
import {ArrowLeft,UsersRound} from 'lucide-react'
import {createClient} from '../../lib/supabase/client'
export default function Professores(){const [s,setS]=useState<any>(null);const [rows,setRows]=useState<any[]>([]);useEffect(()=>{const s=createClient();setS(s);s.from('profiles').select('id,full_name,specialty,active').eq('role','teacher').order('full_name').then(({data})=>setRows(data||[]))},[]);return <main className="formPage"><div className="formWrap wide"><Link href="/" className="back"><ArrowLeft size={17}/> Visão geral</Link><span className="eyebrow">EQUIPE ACADÊMICA</span><h1>Professores</h1><p className="muted">Diretório de professores disponíveis para as turmas.</p><div className="teacherGrid">{rows.map(x=><article key={x.id}><div className="miniCourse"><UsersRound size={19}/></div><div><strong>{x.full_name}</strong><span>{x.specialty||'Professor'}</span></div></article>)}{!rows.length&&<div className="emptyState"><UsersRound/><h2>Nenhum professor cadastrado ainda</h2><p>Os perfis com função Professor aparecerão aqui.</p></div>}</div></div></main>}
