'use client'

import { motion } from 'framer-motion'
import { Landmark, GraduationCap, CreditCard, MessageSquare } from 'lucide-react'
import Link from 'next/link'

const actions = [
  {
    title: 'Secretariat Hub',
    description: 'Access secretariat services and resources.',
    icon: Landmark,
    href: '/secretariat',
    bg: 'bg-primary',
  },
  {
    title: 'Study Resources',
    description: 'Browse academic materials and guidelines.',
    icon: GraduationCap,
    href: 'https://drive.google.com/drive/folders/12O9iJVXYSbD1q7_6eVG9IU3V4V1G2tqm?usp=drive_link',
    bg: 'bg-pink-500',
  },
  {
    title: 'Pay Your Dues',
    description: 'Pay your faculty dues.',
    icon: CreditCard,
    href: 'https://fassaui.vercel.app/',
    bg: 'bg-primary',
  },
  {
    title: 'Contact Us',
    description: 'Get in touch with the FASSA team.',
    icon: MessageSquare,
    href: '/contact',
    bg: 'bg-pink-500',
  },
]

export function QuickActions() {
  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, idx) => {
          const Icon = action.icon
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
            >
              <Link
                href={action.href}
                className="flex items-center gap-4 p-5 rounded-xl border border-gray-200 bg-white hover:border-primary/30 hover:shadow-md transition-all group"
              >
                <div
                  className={`${action.bg} w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}
                >
                  <Icon size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-dark text-sm group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {action.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
