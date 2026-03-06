import { NextResponse } from 'next/server';

/**
 * API Endpoint: /api/revenue/forecast
 * Returns personalized forecasting for Hôtel Le Provençal
 */
export async function GET() {
    try {
        const forecastData = [
            { date: "Mar 20", occupancy: 48, price: 145, wtp: 155, pace: 3, demand: "Low", isWeekend: false },
            { date: "Mar 21", occupancy: 55, price: 145, wtp: 155, pace: 5, demand: "Medium", isWeekend: false },
            { date: "Mar 22", occupancy: 72, price: 155, wtp: 165, pace: 9, demand: "High", isWeekend: false, event: "TECH" },
            { date: "Mar 23", occupancy: 88, price: 175, wtp: 185, pace: 14, demand: "High", isWeekend: true },
            { date: "Mar 24", occupancy: 94, price: 195, wtp: 215, pace: 18, demand: "High", isWeekend: true },
            { date: "Mar 25", occupancy: 65, price: 155, wtp: 160, pace: -1, demand: "Medium", isWeekend: false },
            { date: "Mar 26", occupancy: 58, price: 145, wtp: 150, pace: 2, demand: "Low", isWeekend: false }
        ];

        return NextResponse.json(forecastData, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            }
        });
    } catch (error) {
        console.error("API Forecast Error:", error);
        return NextResponse.json({ error: "Failed to fetch forecast" }, { status: 500 });
    }
}
