import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Infoway Performance',
  description: 'Sistema de acompanhamento de preparação da Infoway Concursos',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body>{children}</body></html>
}
