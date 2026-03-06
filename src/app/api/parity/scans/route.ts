import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * API Endpoint: /api/parity/scans
 * Complete cross-channel meta-search simulation for Hôtel Le Provençal.
 */
export async function GET() {
    try {
        const parityScans = [
            { id: 101, ota: "Booking.com", checkin: "22 MAR", directPrice: 165, otaPrice: 159, diffPerc: 3.6, diffAmount: 6.00, isUndercut: true, status: "Alert" },
            { id: 102, ota: "Expedia", checkin: "22 MAR", directPrice: 165, otaPrice: 165, diffPerc: 0, diffAmount: 0, isUndercut: false, status: "Parity" },
            { id: 103, ota: "Hotels.com", checkin: "23 MAR", directPrice: 185, otaPrice: 172, diffPerc: 7.0, diffAmount: 13.00, isUndercut: true, status: "Critical" },
            { id: 104, ota: "Agoda", checkin: "24 MAR", directPrice: 155, otaPrice: 155, diffPerc: 0, diffAmount: 0, isUndercut: false, status: "Parity" },
            { id: 105, ota: "Airbnb", checkin: "22 MAR", directPrice: 165, otaPrice: 165, diffPerc: 0, diffAmount: 0, isUndercut: false, status: "Parity" },
            { id: 106, ota: "Trip.com", checkin: "25 MAR", directPrice: 145, otaPrice: 135, diffPerc: 6.9, diffAmount: 10.00, isUndercut: true, status: "High" },
            { id: 107, ota: "Booking.com", checkin: "26 MAR", directPrice: 145, otaPrice: 145, diffPerc: 0, diffAmount: 0, isUndercut: false, status: "Parity" },
            { id: 108, ota: "Expedia", checkin: "27 MAR", directPrice: 215, otaPrice: 199, diffPerc: 7.4, diffAmount: 16.00, isUndercut: true, status: "Critical" }
        ];

        return NextResponse.json(parityScans, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            }
        });
    } catch (error) {
        console.error("Critical API Error (Parity):", error);
        return NextResponse.json({
            error: "Failed to fetch parity scans",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
