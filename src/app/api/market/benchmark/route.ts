import { NextResponse } from 'next/server';
import { mockDataService } from '@/lib/mock-data';

export async function GET() {
    try {
        const benchmarkData = mockDataService.getBenchmark();
        return NextResponse.json(benchmarkData, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Failed to fetch benchmark data" }, { status: 500 });
    }
}
