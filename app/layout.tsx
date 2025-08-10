import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Core Talent MVP',
  description: 'Casting & booking platform MVP',
}

export default function RootLayout({ children }:{ children: React.ReactNode }){
  return (
    <html lang="en">
      <body>
        <div className="container py-6">
          <header className="flex items-center justify-between pb-6">
            <h1 className="text-2xl font-bold">Core Talent</h1>
            <nav className="flex gap-4 text-sm">
              <a href="/" className="hover:underline">Home</a>
              <a href="/login" className="hover:underline">Login</a>
              <a href="/dashboard" className="hover:underline">Dashboard</a>
              <a href="/admin" className="hover:underline">Admin</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
