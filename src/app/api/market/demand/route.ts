import { NextResponse } from 'next/server';
import { mockDataService } from '@/lib/mock-data';

export async function GET() {
    try {
        const demandData = mockDataService.getDemandCalendar();
        return NextResponse.json(demandData, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Failed to fetch demand calendar" }, { status: 500 });
    }
}
