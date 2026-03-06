import { NextResponse } from 'next/server';

/**
 * API Endpoint: /api/parity/scans
 */
export async function GET() {
    try {
        const parityScans = [
            { id: 1, ota: "Booking.com", checkin: "15 MAR", directPrice: 145, otaPrice: 139, diffPerc: 4.1, diffAmount: 6.00, isUndercut: true },
            { id: 2, ota: "Expedia", checkin: "15 MAR", directPrice: 145, otaPrice: 145, diffPerc: 0, diffAmount: 0, isUndercut: false },
            { id: 3, ota: "Hotels.com", checkin: "16 MAR", directPrice: 155, otaPrice: 148, diffPerc: 4.5, diffAmount: 7.00, isUndercut: true },
            { id: 4, ota: "Agoda", checkin: "17 MAR", directPrice: 135, otaPrice: 135, diffPerc: 0, diffAmount: 0, isUndercut: false },
            { id: 5, ota: "Airbnb", checkin: "15 MAR", directPrice: 145, otaPrice: 145, diffPerc: 0, diffAmount: 0, isUndercut: false }
        ];

        return NextResponse.json(parityScans, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch parity scans" }, { status: 500 });
    }
}
