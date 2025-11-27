import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Task Manager Application',
  description: 'Application de gestion de tâches pour équipes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
