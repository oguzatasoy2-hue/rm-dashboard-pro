import { NextResponse } from 'next/server';

/**
 * API Endpoint: /api/market/demand (Heatmap Data)
 */
export async function GET() {
    try {
        const days = 35; // 5 weeks
        const demandData = Array.from({ length: days }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);

            // Artificial demand curve
            const dayOfWeek = date.getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const baseDemand = isWeekend ? 75 : 45;
            const randomFlux = Math.floor(Math.random() * 20);
            const demandValue = Math.min(100, baseDemand + randomFlux);

            return {
                date: date.toISOString().split('T')[0],
                demand: demandValue,
                velocity: Math.floor(demandValue * 0.8), // Placeholder logic
                occupancy: Math.min(100, Math.floor(demandValue * 0.9)),
                dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
                dayNum: date.getDate(),
                isWeekend
            };
        });

        return NextResponse.json(demandData, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Failed to fetch demand calendar" }, { status: 500 });
    }
}
