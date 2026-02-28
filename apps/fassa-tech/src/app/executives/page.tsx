'use client'

import { PageLayout } from '@/components/layout/PageLayout'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ExecutiveCard } from '@/components/executives/ExecutiveCard'
import {
    studentExecutives,
    administration,
    staffAdvisers,
    patrons,
} from '@/data/executives'
import { motion } from 'framer-motion'
import { Shield, GraduationCap } from 'lucide-react'

export default function ExecutivesPage() {
    const president = studentExecutives[0]
    const others = studentExecutives.slice(1)

    return (
        <PageLayout>
            {/* ── Hero Banner ────────────────────────────────────────── */}
            <section className="relative py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-blue-900">
                {/* Decorative blobs */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-wider mb-6">
                            <Shield size={14} />
                            Leadership
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                            Meet Our <span className="text-accent-yellow">Executives</span>
                        </h1>
                        <p className="mt-4 text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                            The dedicated team driving FASSA&apos;s mission of academic excellence,
                            social engagement, and student welfare at the University of Ibadan.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Student Executives ─────────────────────────────────── */}
            <section className="py-16 lg:py-20 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="Student Executives"
                        subtitle="Elected representatives serving the Faculty of Science students."
                    />

                    {/* Featured President Card */}
                    <div className="max-w-sm mx-auto mb-10">
                        <ExecutiveCard
                            name={president.name}
                            role={president.role}
                            phone={president.phone}
                            image={president.image}
                            index={0}
                            featured
                        />
                    </div>

                    {/* Other Executives Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {others.map((exec, idx) => (
                            <ExecutiveCard
                                key={exec.name}
                                name={exec.name}
                                role={exec.role}
                                phone={exec.phone}
                                image={exec.image}
                                index={idx + 1}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Faculty Administration ─────────────────────────────── */}
            <section className="py-16 lg:py-20 px-4 sm:px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="Faculty Administration"
                        subtitle="Academic leadership and administrative support of the Faculty of Science."
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {administration.map((member, idx) => (
                            <ExecutiveCard
                                key={member.name}
                                name={member.name}
                                role={member.role}
                                phone={member.phone}
                                image={member.image}
                                index={idx}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Staff Advisers & Patrons ───────────────────────────── */}
            <section className="py-16 lg:py-20 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Staff Advisers */}
                    <div className="mb-16">
                        <SectionHeader
                            title="Staff Advisers"
                            subtitle="Faculty members guiding FASSA's operations and initiatives."
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-3xl mx-auto">
                            {staffAdvisers.map((member, idx) => (
                                <ExecutiveCard
                                    key={member.name}
                                    name={member.name}
                                    role={member.role}
                                    phone={member.phone}
                                    image={member.image}
                                    index={idx}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Patrons */}
                    <SectionHeader
                        title="Patrons"
                        subtitle="Distinguished personalities supporting FASSA's vision."
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {patrons.map((member, idx) => (
                            <ExecutiveCard
                                key={member.name}
                                name={member.name}
                                role={member.role}
                                phone={member.phone}
                                image={member.image}
                                index={idx}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ────────────────────────────────────────────────── */}
            <section className="py-16 lg:py-20 bg-gradient-to-r from-primary to-primary-dark">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <GraduationCap size={40} className="text-white/80 mx-auto mb-4" />
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
                            Have a concern?
                        </h2>
                        <p className="text-white/70 text-sm mb-8 max-w-lg mx-auto">
                            Your executives are here to listen. Reach out directly or submit
                            a complaint through our portal.
                        </p>
                        <a
                            href="/complaint"
                            className="inline-block bg-white text-primary px-8 py-3.5 rounded-full font-bold text-sm hover:bg-white/90 transition-colors shadow-md"
                        >
                            Submit a Complaint
                        </a>
                    </motion.div>
                </div>
            </section>
        </PageLayout>
    )
}
