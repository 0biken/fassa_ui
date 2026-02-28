'use client'

import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  )
}
