import { redirect } from 'next/navigation'
import { createServerSupabase } from '../lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function Entrada(){
 const supabase=createServerSupabase()
 const {data:{user}}=await supabase.auth.getUser()
 if(!user) redirect('/login')
 const {data:profile}=await supabase.from('profiles').select('role').eq('id',user.id).maybeSingle()
 if(profile?.role==='student') redirect('/meu-painel')
 redirect('/admin')
}