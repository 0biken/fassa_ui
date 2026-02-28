'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const events = [
  {
    id: 1,
    title: 'FASSA Annual General Meeting',
    date: 'Jan 10, 2026',
    time: '2:00 PM',
    location: 'FLT (Lakeside)',
    description:
      'Join us for our annual meeting where we discuss achievements and future plans.',
    category: 'General',
    image: '/event.png',
  },
  {
    id: 2,
    title: 'Impact Campus Tour',
    date: 'Nov 15, 2025',
    time: '10:00 AM',
    location: 'Faculty Square',
    description:
      'A comprehensive tour and orientation for all science students.',
    category: 'Event',
    image: '/event.png',
  },
  {
    id: 3,
    title: 'Science Week Opening Ceremony',
    date: 'Mar 05, 2026',
    time: '9:00 AM',
    location: 'CBN Lecture Theatre',
    description:
      'Kick off science week with keynote speakers and exhibitions.',
    category: 'Academic',
    image: '/event.png',
  },
]

export function Events() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentEvent = events[currentIndex]

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-center tracking-tight mb-10">
          Upcoming <span className="text-primary">Events</span>
        </h2>

        {/* Event Card */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEvent.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl overflow-hidden card-shadow-lg"
            >
              {/* Event Image */}
              <div className="relative h-56 sm:h-64">
                <Image
                  src={currentEvent.image}
                  alt={currentEvent.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Event Details */}
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-dark mb-3">
                  {currentEvent.title}
                </h3>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-primary" />
                    {currentEvent.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-primary" />
                    {currentEvent.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-primary" />
                    {currentEvent.location}
                  </span>
                </div>

                <p className="text-gray-500 leading-relaxed mb-6">
                  {currentEvent.description}
                </p>

                <Link
                  href={`/events/${currentEvent.id}`}
                  className="block w-full bg-primary text-white text-center py-3.5 rounded-full font-semibold hover:bg-primary-dark transition-colors"
                >
                  Learn more
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2.5 mt-6">
            {events.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to event ${idx + 1}`}
                className={`h-3 rounded-full transition-all ${idx === currentIndex
                  ? 'w-8 bg-primary'
                  : 'w-3 bg-gray-300 hover:bg-gray-400'
                  }`}
              />
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-5">
            <Link
              href="/events"
              className="text-sm font-semibold text-gray-500 hover:text-primary transition-colors inline-flex items-center gap-1.5"
            >
              View all events
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
