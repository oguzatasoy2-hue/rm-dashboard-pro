import { NextResponse } from 'next/server';
import { mockDataService } from '@/lib/mock-data';

export async function GET() {
    try {
        const negotiatorData = await mockDataService.getNegotiations();
        return NextResponse.json(negotiatorData, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Failed to fetch negotiator logs" }, { status: 500 });
    }
}
