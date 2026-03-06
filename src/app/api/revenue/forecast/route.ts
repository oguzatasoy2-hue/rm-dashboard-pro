import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * API Endpoint: /api/revenue/forecast
 * Algorithmic demand forecasting for Hôtel Le Provençal.
 */
export async function GET() {
    try {
        const now = new Date();

        // Generate a 30-day forecast grid
        const forecastData = Array.from({ length: 30 }).map((_, i) => {
            const date = new Date(now);
            date.setDate(date.getDate() + i);
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            const isWeekend = date.getDay() === 0 || date.getDay() === 6 || date.getDay() === 5;

            // Simulation logic
            const baseOcc = isWeekend ? 75 : 45;
            const variance = Math.sin(i * 0.5) * 15;
            const occupancy = Math.min(100, Math.max(0, Math.round(baseOcc + variance + (i * 0.5))));

            const basePrice = 145;
            const priceVariance = (occupancy > 80 ? 40 : occupancy > 60 ? 20 : 0);
            const price = basePrice + priceVariance + (isWeekend ? 30 : 0);

            const wtp = price + 15 + Math.random() * 10;
            const pace = Math.round(Math.sin(i * 0.8) * 5 + (occupancy / 20));

            // Random local event mapping
            let event = undefined;
            if (i === 2) event = "CONGRESS";
            if (i === 12) event = "MATCH";
            if (i === 22) event = "EXPO";

            return {
                date: dateStr,
                fullDate: date.toISOString().split('T')[0],
                occupancy: occupancy,
                price: price,
                wtp: Math.round(wtp),
                pace: pace,
                demand: occupancy > 85 ? "High" : occupancy > 50 ? "Medium" : "Low",
                isWeekend: isWeekend,
                event: event
            };
        });

        return NextResponse.json(forecastData, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            }
        });
    } catch (error) {
        console.error("Critical API Error (Forecast):", error);
        return NextResponse.json({
            error: "Failed to generate forecasting data",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
