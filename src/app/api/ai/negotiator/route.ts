import { NextResponse } from 'next/server';
import { mockDataService } from '@/lib/mock-data';

export async function GET() {
    try {
        const negotiations = mockDataService.getNegotiations();
        return NextResponse.json(negotiations, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Failed to fetch negotiator logs" }, { status: 500 });
    }
}
