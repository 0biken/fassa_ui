'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const stats = [
  { value: '2300+', label: 'Students Reached' },
  { value: '120+', label: 'Events Hosted' },
  { value: '98%', label: 'Complaint Resolution Rate' },
  { value: '5000+', label: 'Resources Available' },
]

export function Hero() {
  return (
    <section className="relative py-10 lg:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-dark">
              Welcome To{' '}
              <br />
              <span className="text-primary">FASSA</span>
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed max-w-md">
              Your voice, Your community,
              <br />
              Your success.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/events"
                className="bg-primary text-white px-7 py-3 rounded-full font-semibold text-sm hover:bg-primary-dark transition-colors shadow-sm"
              >
                Explore Events
              </Link>
              <Link
                href="/complaint"
                className="border-2 border-primary text-primary px-7 py-3 rounded-full font-semibold text-sm hover:bg-primary-50 transition-colors"
              >
                Submit a complaint
              </Link>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <Image
                src="/hero.png"
                alt="FASSA students at a campus event"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center py-5 px-4 border border-primary/20 rounded-xl bg-white"
            >
              <span className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs text-gray-500 mt-1 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
