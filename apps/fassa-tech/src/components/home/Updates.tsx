'use client'

import { motion } from 'framer-motion'
import { Calendar, User } from 'lucide-react'
import Link from 'next/link'

const updates = [
  {
    id: 1,
    title: 'Physics and chemistry test date announcements',
    date: 'Nov 15, 2025',
    author: 'Academic Committee',
    excerpt:
      'The mid-semester tests for both departments have been announced. Students are advised to study extensively in preparation.',
    category: 'Academic',
    categoryColor: 'bg-primary text-white',
  },
  {
    id: 2,
    title: 'Impact Campus Tour',
    date: 'Nov 15, 2025',
    author: 'Academic Committee',
    excerpt:
      'The mid semester tests for both departments have been announced. Students are advised to study extensively in preparation.',
    category: 'Event',
    categoryColor: 'bg-amber-400 text-white',
  },
  {
    id: 3,
    title: 'Student exam relief package available for all fassaites',
    date: 'Nov 15, 2025',
    author: 'Academic Committee',
    excerpt:
      'The mid semester tests for both departments have been announced. Students are advised to study extensively in preparation.',
    category: 'Welfare',
    categoryColor: 'bg-emerald-500 text-white',
  },
]

export function Updates() {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-center tracking-tight mb-10">
          Latest Updates
        </h2>

        <div className="flex flex-col gap-5">
          {updates.map((update, idx) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="border border-gray-200 rounded-xl p-5 sm:p-6 hover:border-primary/30 transition-colors bg-white"
            >
              <div className="flex items-start gap-4">
                {/* Category Badge */}
                <span
                  className={`${update.categoryColor} text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shrink-0 mt-0.5`}
                >
                  {update.category}
                </span>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-dark leading-snug mb-1.5">
                    {update.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {update.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      by {update.author}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                    {update.excerpt}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/announcements"
            className="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-primary-dark transition-colors shadow-sm"
          >
            View All Announcements
          </Link>
        </div>
      </div>
    </section>
  )
}
