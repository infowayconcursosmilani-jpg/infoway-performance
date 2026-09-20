'use client'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '../lib/supabase/client'
export default function LogoutButton(){const router=useRouter();async function out(){await createClient().auth.signOut();router.push('/login');router.refresh()}return <button className="logoutBtn" onClick={out}><LogOut size={15}/> Sair</button>}
