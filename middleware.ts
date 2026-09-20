import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request:NextRequest){
 let response=NextResponse.next({request:{headers:request.headers}})
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL
 const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
 if(!url||!key) return response
 const supabase=createServerClient(url,key,{cookies:{
  get(name:string){return request.cookies.get(name)?.value},
  set(name:string,value:string,options:any){request.cookies.set({name,value,...options});response.cookies.set({name,value,...options})},
  remove(name:string,options:any){request.cookies.set({name,value:'',...options});response.cookies.set({name,value:'',...options})}
 }})
 const {data:{user}}=await supabase.auth.getUser()
 const path=request.nextUrl.pathname
 if(!user && path!='/login'){const u=request.nextUrl.clone();u.pathname='/login';return NextResponse.redirect(u)}
 if(user && path==='/login'){const u=request.nextUrl.clone();u.pathname='/';return NextResponse.redirect(u)}
 return response
}
export const config={matcher:['/((?!_next/static|_next/image|favicon.ico).*)']}
