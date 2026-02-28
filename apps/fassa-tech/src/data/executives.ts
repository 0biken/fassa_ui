export interface Executive {
    name: string
    role: string
    phone?: string
    image?: string
}

export interface AdminMember {
    name: string
    role: string
    title?: string
    phone?: string
    image?: string
}

// ── Student Executives ──────────────────────────────────────────────

export const studentExecutives: Executive[] = [
    {
        name: 'OLAYERA Olajide D.',
        role: 'President',
        phone: '08083107957',
    },
    {
        name: 'ADEDEJI Victor D.',
        role: 'Vice President',
        phone: '09076133644',
    },
    {
        name: 'EZEOCHA Obioma K.',
        role: 'General Secretary',
        phone: '08162860397',
    },
    {
        name: 'AMOSUN Paul K.',
        role: 'Asst. General Secretary',
        phone: '08150563735',
    },
    {
        name: 'AREMU Taiwo A.',
        role: 'Treasurer',
        phone: '07031686782',
    },
    {
        name: 'AKERELE Ifeoluwa D.',
        role: 'Financial Secretary',
        phone: '07081837717',
    },
    {
        name: 'ABDULMALIK Abdullah',
        role: 'Public Relations Officer',
        phone: '08084578455',
    },
    {
        name: 'RAJI Mueez Ollarewaju',
        role: 'Sport Director',
        phone: '07081837717',
    },
    {
        name: 'BUSARI Abdullai O.',
        role: 'Social Director',
        phone: '08044300980',
    },
]

// ── Faculty Administration ──────────────────────────────────────────

export const administration: AdminMember[] = [
    {
        name: 'Prof. I. A. Oladosu',
        role: 'Dean',
        phone: '08036560184',
    },
    {
        name: 'Dr. A. O. Adekanmbi',
        role: 'Sub Dean',
        phone: '+234 803 480 4383',
    },
    {
        name: 'Mr M. A. Raji',
        role: 'Faculty Officer',
        phone: '08075099195',
    },
]

export const staffAdvisers: AdminMember[] = [
    { name: 'Dr. O. S. Oyemakin', role: 'Staff Adviser' },
    { name: 'Prof. A. A. Bakare', role: 'Staff Adviser' },
]

export const patrons: AdminMember[] = [
    { name: 'Dr. Nancy C. Wood', role: 'Grand Patron' },
    { name: 'Prof. A. I. Olayinka', role: 'Patron' },
    { name: 'Prof. Osinbajo', role: 'Patron' },
    { name: 'Prof. A. B. Odiabo', role: 'Patron' },
    { name: 'Prof. A. Osofisan', role: 'Patron' },
]
