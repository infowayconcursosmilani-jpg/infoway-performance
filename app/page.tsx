import Link from 'next/link'
import { Activity, BookOpen, CalendarDays, ChevronRight, GraduationCap, LayoutDashboard, Plus, Target, TrendingUp, Users } from 'lucide-react'

const turmas = [
  { nome: 'Extensivo Barro Branco — Setembro 2026', periodo: '28/09/2026 → 26/02/2027', semanas: 19, alunos: 0, status: 'Preparação' },
]

export default function Home() {
  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><div className="brandMark">IW</div><div><strong>INFOWAY</strong><span>PERFORMANCE</span></div></div>
        <nav>
          <a className="active"><LayoutDashboard size={19}/> Visão geral</a>
          <Link href="/turmas"><GraduationCap size={19}/> Turmas</Link>
          <a><Users size={19}/> Alunos</a>
          <a><BookOpen size={19}/> Aulas e conteúdos</a>
          <a><Target size={19}/> Simulados</a>
          <a><TrendingUp size={19}/> Desempenho</a>
        </nav>
        <div className="sidebarBottom"><span>PAINEL ADMINISTRATIVO</span><strong>Infoway Concursos</strong></div>
      </aside>

      <section className="content">
        <header><div><span className="eyebrow">GESTÃO ACADÊMICA</span><h1>Visão geral</h1><p>Acompanhe a preparação dos alunos antes que a prova mostre o problema.</p></div><Link className="primaryBtn" href="/turmas/nova"><Plus size={18}/> Nova turma</Link></header>

        <div className="stats">
          <article><span>Turmas ativas</span><strong>1</strong><small><CalendarDays size={15}/> primeira turma configurada</small></article>
          <article><span>Alunos acompanhados</span><strong>0</strong><small><Users size={15}/> aguardando matrículas</small></article>
          <article><span>Índice Infoway médio</span><strong>—</strong><small><Activity size={15}/> disponível após os registros</small></article>
          <article><span>Alunos em risco</span><strong>—</strong><small><Target size={15}/> acompanhamento automático</small></article>
        </div>

        <div className="sectionTitle"><div><span className="eyebrow">TURMAS</span><h2>Preparações em andamento</h2></div><span className="pill">2026 / 2027</span></div>

        <div className="classes">
          {turmas.map(t => <article className="classCard" key={t.nome}>
            <div className="classTop"><div className="courseIcon"><GraduationCap size={24}/></div><span className="status">{t.status}</span></div>
            <h3>{t.nome}</h3><p>{t.periodo}</p>
            <div className="classData"><div><span>DURAÇÃO</span><strong>{t.semanas} semanas</strong></div><div><span>ALUNOS</span><strong>{t.alunos}</strong></div><div><span>AULAS</span><strong>18h20–22h40</strong></div></div>
            <div className="progress"><div></div></div>
            <footer><span>Início em 28 de setembro</span><a>Abrir turma <ChevronRight size={17}/></a></footer>
          </article>)}
          <Link href="/turmas/nova" className="newCard"><div><Plus size={25}/></div><strong>Cadastrar nova turma</strong><span>Defina início, término, recesso e o sistema organiza as semanas.</span></Link>
        </div>

        <section className="vision"><div className="visionIcon"><Target size={28}/></div><div><span className="eyebrow">OBJETIVO DO SISTEMA</span><h2>Da aula assistida ao conteúdo aprendido.</h2><p>O Infoway Performance acompanhará quatro dimensões: <b>acompanhamento das aulas</b>, <b>consolidação do conteúdo</b>, <b>desempenho</b> e <b>constância</b>.</p></div></section>
      </section>
    </main>
  )
}
