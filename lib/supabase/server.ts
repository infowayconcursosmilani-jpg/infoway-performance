import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createServerSupabase(){
  const store=cookies()
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://plcgojbhszurbdqrmdkj.supabase.co'
  const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_7TZDSrb-zE34M03SdxJoUQ_Hc6U4Bb-'
  return createServerClient(url,key,{cookies:{
    get(name:string){return store.get(name)?.value},
    set(name:string,value:string,options:any){try{store.set({name,value,...options})}catch{}},
    remove(name:string,options:any){try{store.set({name,value:'',...options,maxAge:0})}catch{}}
  }})
}
