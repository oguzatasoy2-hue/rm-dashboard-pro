import { NextResponse } from 'next/server';

/**
 * API Endpoint: /api/revenue/recommendations
 */
export async function GET() {
    try {
        const recommendations = [
            {
                id: "rec_001",
                category: "Price Adjustment",
                impact: "High",
                title: "Augmenter le tarif public de +5€",
                description: "Le compset (ibis) est complet à 80%. Votre ADR actuel est de 64€, vous avez de la marge.",
                actioned: false
            },
            {
                id: "rec_002",
                category: "Inventory",
                impact: "Medium",
                title: "Restreindre les OTA (Booking/Expedia)",
                description: "La demande directe est en hausse pour le weekend prochain. Priorisez les réservations directes.",
                actioned: true
            }
        ];

        return NextResponse.json(recommendations, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 });
    }
}
