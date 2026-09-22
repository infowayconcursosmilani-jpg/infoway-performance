'use client'
export const dynamic='force-dynamic'
import {useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {createClient} from '../lib/supabase/client'
export default function Entrada(){
 const router=useRouter()
 useEffect(()=>{const s=createClient();s.rpc('my_app_context').then(({data,error})=>{if(error){router.replace('/login');return}const role=data?.role;if(role==='student')router.replace('/meu-painel');else router.replace('/admin')})},[router])
 return <main className="entryPage"><div className="entryLoader"><div className="brandMark">IW</div><strong>INFOWAY PERFORMANCE</strong><span>Preparando seu ambiente...</span></div></main>
}