import { NextResponse } from 'next/server';
import { mockDataService } from '@/lib/mock-data';

export async function GET() {
    try {
        const insightData = mockDataService.getMarketInsight();
        return NextResponse.json(insightData, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Failed to fetch market insight" }, { status: 500 });
    }
}
