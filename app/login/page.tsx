'use client'

export const dynamic = 'force-dynamic'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LockKeyhole, Mail } from 'lucide-react'
import { createClient } from '../../lib/supabase/client'

export default function Login(){
 const router=useRouter(); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState(''); const [loading,setLoading]=useState(false)
 async function submit(e:FormEvent){e.preventDefault();setLoading(true);setError('');const supabase=createClient();const {error}=await supabase.auth.signInWithPassword({email,password});if(error){setError('E-mail ou senha inválidos.');setLoading(false);return}router.push('/');router.refresh()}
 return <main className="loginPage"><div className="loginCard"><div className="brand loginBrand"><div className="brandMark">IW</div><div><strong>INFOWAY</strong><span>PERFORMANCE</span></div></div><div className="loginCopy"><span className="eyebrow">ACESSO AO SISTEMA</span><h1>Bem-vindo.</h1><p>Entre para acompanhar a preparação acadêmica.</p></div><form onSubmit={submit}><label><span><Mail size={15}/> E-mail</span><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@email.com"/></label><label><span><LockKeyhole size={15}/> Senha</span><input type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"/></label>{error&&<div className="loginError">{error}</div>}<button disabled={loading}>{loading?'Entrando...':'Entrar no Performance'}</button></form><small>Infoway Concursos · Ambiente acadêmico</small></div></main>
}
