'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
    title: string
    subtitle?: string
    light?: boolean
}

export function SectionHeader({ title, subtitle, light = false }: SectionHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
        >
            <h2
                className={`text-3xl lg:text-4xl font-extrabold tracking-tight ${light ? 'text-white' : 'text-dark'
                    }`}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    className={`mt-3 text-sm max-w-xl mx-auto leading-relaxed ${light ? 'text-white/70' : 'text-gray-500'
                        }`}
                >
                    {subtitle}
                </p>
            )}
            <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-primary" />
        </motion.div>
    )
}
