import { NextResponse } from 'next/server';

/**
 * API Endpoint: /api/parity/scans
 * Returns real-time simulation of price parity for Hôtel Le Provençal
 */
export async function GET() {
    try {
        const parityScans = [
            { id: 1, ota: "Booking.com", checkin: "18 MAR", directPrice: 165, otaPrice: 159, diffPerc: 3.6, diffAmount: 6.00, isUndercut: true },
            { id: 2, ota: "Expedia", checkin: "18 MAR", directPrice: 165, otaPrice: 165, diffPerc: 0, diffAmount: 0, isUndercut: false },
            { id: 3, ota: "Hotels.com", checkin: "19 MAR", directPrice: 175, otaPrice: 168, diffPerc: 4.0, diffAmount: 7.00, isUndercut: true },
            { id: 4, ota: "Agoda", checkin: "20 MAR", directPrice: 155, otaPrice: 155, diffPerc: 0, diffAmount: 0, isUndercut: false },
            { id: 5, ota: "Airbnb", checkin: "18 MAR", directPrice: 165, otaPrice: 165, diffPerc: 0, diffAmount: 0, isUndercut: false }
        ];

        return NextResponse.json(parityScans, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            }
        });
    } catch (error) {
        console.error("API Parity Error:", error);
        return NextResponse.json({ error: "Failed to fetch parity scans" }, { status: 500 });
    }
}
