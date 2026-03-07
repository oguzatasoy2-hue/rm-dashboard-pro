import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * API Endpoint: /api/market/comparison
 * Returns a robust simulation of the competitive set for Hôtel Le Provençal.
 */
export async function GET() {
    try {
        // High-precision competitor mapping for Bordeaux Lac
        const competitors = [
            { id: "comp_1", name: "Pullman Bordeaux Lac", distance: "0.2km", segment: "Luxury/Upscale" },
            { id: "comp_2", name: "Mercure Bordeaux Lac", distance: "0.4km", segment: "Midscale" },
            { id: "comp_3", name: "Novotel Bordeaux Lac", distance: "0.5km", segment: "Midscale" },
            { id: "comp_4", name: "Ibis Bordeaux Lac", distance: "0.6km", segment: "Economy" },
            { id: "comp_5", name: "Campanile Bordeaux Lac", distance: "0.8km", segment: "Economy" }
        ];

        // 14-day timeline with deterministic noise for "realism"
        const timeline = Array.from({ length: 14 }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];

            // Base price varies by weekday
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const basePrice = isWeekend ? 175 : 145;

            return {
                date: dateStr,
                provençal: Math.round(basePrice + Math.sin(i) * 5),
                "Pullman Bordeaux Lac": Math.round((basePrice * 1.25) + Math.cos(i) * 10),
                "Mercure Bordeaux Lac": Math.round((basePrice * 1.1) + Math.sin(i * 1.5) * 8),
                "Novotel Bordeaux Lac": Math.round((basePrice * 1.05) + Math.cos(i * 0.8) * 6),
                "Ibis Bordeaux Lac": Math.round((basePrice * 0.85) + Math.sin(i * 2) * 4),
                "Campanile Bordeaux Lac": Math.round((basePrice * 0.8) + Math.cos(i * 1.2) * 5)
            };
        });

        // Computed summary
        const currentAverages = competitors.map(c => {
            const prices = timeline.map(t => t[c.name as keyof typeof t] as number);
            return {
                name: c.name,
                avg: prices.reduce((a, b) => a + b, 0) / prices.length
            };
        });

        const marketAvg = currentAverages.reduce((acc, c) => acc + c.avg, 0) / currentAverages.length;
        const ourAvg = timeline.reduce((acc, t) => acc + t.provençal, 0) / timeline.length;

        const response = {
            hotel_name: "Hôtel Le Provençal",
            location: "Bordeaux Lac",
            currency: "EUR",
            competitors: competitors,
            timeline: timeline,
            summary: {
                market_average: Math.round(marketAvg),
                our_average: Math.round(ourAvg),
                positioning_index: parseFloat((ourAvg / marketAvg).toFixed(3)),
                cheapest_competitor: currentAverages.sort((a, b) => a.avg - b.avg)[0].name,
                most_expensive_comp: currentAverages.sort((a, b) => b.avg - a.avg)[0].name,
                status: "Optimal"
            },
            last_update: new Date().toISOString()
        };

        return NextResponse.json(response, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            }
        });
    } catch (error) {
        console.error("Critical API Error (Comparison):", error);
        return NextResponse.json({
            error: "Failed to generate market comparison data",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
