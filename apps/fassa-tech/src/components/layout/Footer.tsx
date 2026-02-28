'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin, Clock } from 'lucide-react'

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)


const quickLinks = [
  { name: 'About', href: '/about' },
  { name: 'Events', href: '/events' },
  { name: 'Secretariat', href: '/secretariat' },
  { name: 'Contact', href: '/contact' },
  { name: 'Innotech', href: '/innotech' },
]

const resourceLinks = [
  { name: 'Executives', href: '/executives' },
  { name: 'Announcements', href: '/announcements' },
  { name: 'Resources', href: '/resources' },
  { name: 'Privacy Policy', href: '/privacy' },
]

export function Footer() {
  return (
    <footer className="bg-dark text-white pt-16 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
        {/* Brand */}
        <div className="flex flex-col gap-5">
          <Link href="/" className="flex items-center gap-2.5 w-fit">
            <Image
              src="/logo.png"
              alt="FASSA Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-xl font-bold tracking-tight">FASSA</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            The Faculty of Science Students Association represents and serves all students in our faculty, promoting academic excellence, social engagement, and student welfare.
          </p>
          <div className="flex gap-3 mt-1">
            {[
              { Icon: Instagram, href: 'https://www.instagram.com/fassa_ui/' },
              { Icon: Facebook, href: '#' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/company/108015167/' },
              { Icon: XIcon, href: 'https://x.com/fassa_ui' },
            ].map(({ Icon, href }, idx) => (
              <a
                key={idx}
                href={href}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Quick Links</h4>
          <ul className="flex flex-col gap-3">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Resources</h4>
          <ul className="flex flex-col gap-3">
            {resourceLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Contact Info</h4>
          <ul className="flex flex-col gap-4">
            <li className="flex gap-3 items-start">
              <Mail size={16} className="text-primary mt-0.5 shrink-0" />
              <a href="mailto:info@fassa.edu.ng" className="text-sm text-gray-400 hover:text-white transition-colors">
                info@fassa.edu.ng
              </a>
            </li>
            <li className="flex gap-3 items-start">
              <Phone size={16} className="text-primary mt-0.5 shrink-0" />
              <span className="text-sm text-gray-400">+234 XXX XXX XXXX</span>
            </li>
            <li className="flex gap-3 items-start">
              <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
              <span className="text-sm text-gray-400">CBN Lecture Theatre</span>
            </li>
            <li className="flex gap-3 items-start">
              <Clock size={16} className="text-primary mt-0.5 shrink-0" />
              <span className="text-sm text-gray-400">Mon-Fri 10AM-4PM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} FASSA UI. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-gray-500">
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
        </div>
      </div>
    </footer>
  )
}
