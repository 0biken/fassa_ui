'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Innotech', href: 'https://innotech-website-qaau.vercel.app/' },
  { name: 'Executives', href: '/executives' },
]

const teamLinks = [
  { name: 'President', href: '/team/president' },
  { name: 'Vice President', href: '/team/vice-president' },
  { name: 'General Secretary', href: '/team/secretary' },
  { name: 'All Executives', href: '/executives' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [teamOpen, setTeamOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="FASSA Logo"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="text-xl font-bold text-dark tracking-tight">
            FASSA
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {/* Our Team Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setTeamOpen(true)}
            onMouseLeave={() => setTeamOpen(false)}
          >
            <button className="text-sm font-medium text-gray-600 hover:text-primary transition-colors flex items-center gap-1">
              Our Team
              <ChevronDown size={14} className={`transition-transform ${teamOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {teamOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 overflow-hidden"
                >
                  {teamLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link
            href="/complaint"
            className="bg-primary text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-primary-dark transition-colors shadow-sm"
          >
            Submit a complaint
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-700 hover:text-primary transition-colors p-1"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-gray-700 hover:text-primary py-3 px-3 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-gray-100 mt-2 pt-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">Our Team</p>
                {teamLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-gray-600 hover:text-primary py-2.5 px-3 rounded-lg hover:bg-primary-50 transition-colors block"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/complaint"
                onClick={() => setIsOpen(false)}
                className="bg-primary text-white px-6 py-3 rounded-full font-semibold text-center mt-3 shadow-sm"
              >
                Submit a complaint
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
