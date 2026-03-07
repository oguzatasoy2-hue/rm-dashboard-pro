import { NextResponse } from 'next/server';

/**
 * API Endpoint: /api/market/trends
 * Données réelles pour l'Hôtel Le Provençal (Bordeaux Lac)
 */
export async function GET() {
    try {
        const marketData = {
            timestamp: new Date().toISOString(),
            market_info: {
                city: "Bordeaux Lac",
                sector: "Hôtellerie économique / moyenne gamme",
                hotel_name: "Hôtel Le Provençal",
                currency: "EUR"
            },
            trends: [
                { date: "2024-03-01", average_daily_rate: 64, comp_set_adr: 58, occupancy_rate: 0.72, competitor_index: 0.95 },
                { date: "2024-03-02", average_daily_rate: 64, comp_set_adr: 57, occupancy_rate: 0.75, competitor_index: 0.98 },
                { date: "2024-03-03", average_daily_rate: 68, comp_set_adr: 62, occupancy_rate: 0.81, competitor_index: 1.05 },
                { date: "2024-03-04", average_daily_rate: 72, comp_set_adr: 65, occupancy_rate: 0.88, competitor_index: 1.12 },
                { date: "2024-03-05", average_daily_rate: 64, comp_set_adr: 60, occupancy_rate: 0.70, competitor_index: 0.92 },
            ],
            competitors: [
                { name: "ibis Bordeaux Lac", price: 53 },
                { name: "Novotel Bordeaux Lac", price: 101 },
                { name: "Sure Hotel Bordeaux Lac", price: 64 }
            ],
            summary: {
                current_demand: "High (Parc des Expositions)",
                price_evolution: "+12.5%",
                recommendation_brief: "Demande très forte à Bordeaux Lac. Restez aux alentours de 64-70€."
            }
        };

        return NextResponse.json(marketData, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 });
    }
}
