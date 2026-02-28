'use client'

import { motion } from 'framer-motion'
import { Phone, User } from 'lucide-react'
import Image from 'next/image'

interface ExecutiveCardProps {
    name: string
    role: string
    phone?: string
    image?: string
    index?: number
    featured?: boolean
}

/* Deterministic gradient from name string */
const gradients = [
    'from-primary to-primary-dark',
    'from-blue-500 to-indigo-600',
    'from-sky-500 to-blue-600',
    'from-cyan-500 to-blue-600',
    'from-indigo-500 to-blue-700',
    'from-blue-600 to-sky-500',
]

function getGradient(name: string) {
    let hash = 0
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
    return gradients[Math.abs(hash) % gradients.length]
}

function getInitials(name: string) {
    const parts = name.replace(/^(Prof\.|Dr\.|Mr\.?|Mrs\.?)\s*/i, '').trim().split(/\s+/)
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    return parts[0]?.substring(0, 2).toUpperCase() ?? '??'
}

export function ExecutiveCard({
    name,
    role,
    phone,
    image,
    index = 0,
    featured = false,
}: ExecutiveCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className={`group relative bg-white rounded-2xl border border-gray-100 overflow-hidden
        transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
        ${featured ? 'sm:col-span-2 lg:col-span-1' : ''}`}
        >
            {/* Top accent */}
            <div className={`h-1.5 bg-gradient-to-r ${getGradient(name)}`} />

            <div className={`flex flex-col items-center text-center px-6 ${featured ? 'py-10' : 'py-8'}`}>
                {/* Avatar */}
                <div
                    className={`relative rounded-full flex items-center justify-center text-white font-bold
            bg-gradient-to-br ${getGradient(name)} shadow-lg
            ${featured ? 'w-28 h-28 text-3xl' : 'w-20 h-20 text-xl'}`}
                >
                    {image ? (
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover rounded-full"
                        />
                    ) : (
                        <span>{getInitials(name)}</span>
                    )}
                </div>

                {/* Role badge */}
                <span
                    className={`mt-4 inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider
            bg-primary-50 text-primary ${featured ? 'text-xs px-4 py-1.5' : ''}`}
                >
                    {role}
                </span>

                {/* Name */}
                <h3
                    className={`mt-3 font-bold text-dark leading-tight
            ${featured ? 'text-xl' : 'text-base'}`}
                >
                    {name}
                </h3>

                {/* Phone */}
                {phone && (
                    <a
                        href={`tel:${phone}`}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary transition-colors"
                    >
                        <Phone size={13} />
                        {phone}
                    </a>
                )}
            </div>

            {/* Placeholder overlay for missing photo */}
            {!image && (
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                        <User size={14} className="text-gray-400" />
                    </div>
                </div>
            )}
        </motion.div>
    )
}
