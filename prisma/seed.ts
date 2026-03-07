import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import * as dotenv from 'dotenv'
dotenv.config()

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('🌱 Seeding database...')

    // 1. Create Hotel
    const hotel = await prisma.hotel.upsert({
        where: { id: 'provencal-1' },
        update: {},
        create: {
            id: 'provencal-1',
            name: 'Hôtel Le Provençal',
            city: 'Nice',
            currency: '€'
        }
    })

    console.log(`Created hotel: ${hotel.name}`)

    // 2. Create Demand Days (Next 30 days)
    const demandDays = Array.from({ length: 30 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() + i)
        const isWeekend = date.getDay() === 0 || date.getDay() === 6
        const demandValue = Math.floor(40 + Math.random() * 50)

        return {
            hotelId: hotel.id,
            date: new Date(date.toISOString().split('T')[0]),
            demand: demandValue,
            velocity: Math.floor(demandValue * 0.85),
            occupancy: Math.floor(demandValue * 0.9),
            isWeekend
        }
    })

    for (const day of demandDays) {
        await prisma.demandDay.upsert({
            where: {
                hotelId_date: {
                    hotelId: day.hotelId,
                    date: day.date
                }
            },
            update: day,
            create: day
        })
    }

    // 3. Create Negotiations
    // Clear existing to avoid duplicates if re-running
    await prisma.negotiation.deleteMany({ where: { hotelId: hotel.id } })

    const negotiations = [
        {
            hotelId: hotel.id,
            ota: 'Booking.com',
            status: 'resolved',
            issue: 'Undercut Detected (-12€)',
            action: 'Contractual parity reminder sent',
            result: 'Price corrected by OTA',
            impact: '+450€ Recouped',
            timestamp: new Date(Date.now() - 3600000 * 2)
        },
        {
            hotelId: hotel.id,
            ota: 'Expedia',
            status: 'active',
            issue: 'Hidden member discount (-5%)',
            action: 'AI negotiation in progress',
            result: 'Awaiting OTA response',
            impact: 'Est. 1,200€ Risk',
            timestamp: new Date(Date.now() - 3600000 * 0.5)
        }
    ]

    for (const neg of negotiations) {
        await prisma.negotiation.create({
            data: neg
        })
    }

    // 4. Create Forecast Days
    const forecastDays = Array.from({ length: 14 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() + i)
        const isWeekend = date.getDay() === 0 || date.getDay() === 6

        return {
            hotelId: hotel.id,
            date: new Date(date.toISOString().split('T')[0]),
            occupancy: Math.floor(70 + Math.random() * 20),
            price: Math.round(145 + Math.random() * 40),
            wtp: Math.round(160 + Math.random() * 30),
            pace: Number((0.9 + Math.random() * 0.3).toFixed(2)),
            demand: isWeekend ? 'High' : 'Medium',
            isWeekend
        }
    })

    for (const f of forecastDays) {
        await prisma.forecastDay.upsert({
            where: {
                hotelId_date: {
                    hotelId: f.hotelId,
                    date: f.date
                }
            },
            update: f,
            create: f
        })
    }

    console.log('✅ Seeding complete.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await pool.end()
        await prisma.$disconnect()
    })
