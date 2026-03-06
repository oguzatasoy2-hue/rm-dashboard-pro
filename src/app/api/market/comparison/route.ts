import { NextResponse } from 'next/server';

export async function GET() {
    // Simulate a specific set of competitors for Hôtel Le Provençal
    const competitors = [
        { id: 1, name: "Pullman Bordeaux Lac", segment: "Upscale", stars: 4 },
        { id: 2, name: "Mercure Bordeaux Lac", segment: "Midscale", stars: 4 },
        { id: 3, name: "Novotel Bordeaux Lac", segment: "Midscale", stars: 4 },
        { id: 4, name: "Ibis Bordeaux Lac", segment: "Economy", stars: 3 },
        { id: 5, name: "Hôtel Campanile Bordeaux Lac", segment: "Economy", stars: 3 },
    ];

    const days = 14;
    const comparisonData = [];
    const today = new Date();

    for (let i = 0; i < days; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const dateStr = d.toISOString().split('T')[0];
        const isWeekend = d.getDay() === 0 || d.getDay() === 6;

        // Base price for Le Provençal
        const baseProvençal = isWeekend ? 165 : 142;
        const randomProvençal = baseProvençal + Math.floor(Math.random() * 20) - 5;

        const prices: Record<string, number> = {
            provençal: randomProvençal,
        };

        competitors.forEach(comp => {
            const base = isWeekend ? 175 : 150;
            const offset = comp.segment === 'Upscale' ? 20 : comp.segment === 'Economy' ? -30 : 0;
            prices[comp.name] = base + offset + Math.floor(Math.random() * 30) - 10;
        });

        comparisonData.push({
            date: dateStr,
            ...prices
        });
    }

    return NextResponse.json({
        hotel_name: "Hôtel Le Provençal",
        competitors: competitors,
        timeline: comparisonData,
        summary: {
            market_average: 154,
            positioning_index: 0.94, // We are slightly cheaper than market avg
            cheapest_comp: "Ibis Bordeaux Lac",
            most_expensive_comp: "Pullman Bordeaux Lac"
        }
    });
}
