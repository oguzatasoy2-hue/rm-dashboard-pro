import { NextResponse } from 'next/server';

/**
 * API Endpoint: /api/revenue/forecast
 */
export async function GET() {
    try {
        const forecastData = [
            { date: "Mar 10", occupancy: 45, price: 125, wtp: 135, pace: 2, demand: "Low", isWeekend: false },
            { date: "Mar 11", occupancy: 52, price: 125, wtp: 135, pace: 4, demand: "Medium", isWeekend: false },
            { date: "Mar 12", occupancy: 68, price: 135, wtp: 145, pace: 8, demand: "High", isWeekend: false, event: "TECH" },
            { date: "Mar 13", occupancy: 85, price: 155, wtp: 165, pace: 12, demand: "High", isWeekend: true },
            { date: "Mar 14", occupancy: 92, price: 175, wtp: 185, pace: 15, demand: "High", isWeekend: true },
            { date: "Mar 15", occupancy: 60, price: 135, wtp: 140, pace: -2, demand: "Medium", isWeekend: false },
            { date: "Mar 16", occupancy: 55, price: 125, wtp: 130, pace: 1, demand: "Low", isWeekend: false }
        ];

        return NextResponse.json(forecastData, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch forecast" }, { status: 500 });
    }
}
