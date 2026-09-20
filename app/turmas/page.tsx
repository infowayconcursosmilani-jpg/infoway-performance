import Link from 'next/link'
import { ArrowLeft, Plus, GraduationCap } from 'lucide-react'

export default function Turmas(){
 return <main className="formPage"><div className="formWrap wide"><div className="listHead"><div><Link href="/" className="back"><ArrowLeft size={17}/> Visão geral</Link><span className="eyebrow">GESTÃO ACADÊMICA</span><h1>Turmas</h1><p>Gerencie os ciclos de preparação da Infoway.</p></div><Link href="/turmas/nova" className="primaryBtn"><Plus size={18}/> Nova turma</Link></div><div className="emptyState"><GraduationCap size={30}/><h2>Gestão de turmas preparada</h2><p>As turmas cadastradas no banco aparecerão aqui com semanas, alunos, calendário e andamento.</p></div></div></main>
}
