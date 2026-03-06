import { NextResponse } from 'next/server';

/**
 * API Endpoint: /api/market/benchmark (STR)
 */
export async function GET() {
    try {
        const benchmarkData = [
            { subject: 'Occupancy', hotel: 82, compset: 75, fullMark: 100 },
            { subject: 'ADR', hotel: 94, compset: 85, fullMark: 100 },
            { subject: 'RevPAR', hotel: 88, compset: 72, fullMark: 100 },
            { subject: 'MPI', hotel: 109, compset: 100, fullMark: 120 },
            { subject: 'ARI', hotel: 110, compset: 100, fullMark: 120 },
            { subject: 'RGI', hotel: 120, compset: 100, fullMark: 130 },
        ];

        return NextResponse.json(benchmarkData, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch benchmark data" }, { status: 500 });
    }
}
