import { NextResponse } from 'next/server';
import { mockDataService } from '@/lib/mock-data';

export async function GET() {
    try {
        const forecastData = mockDataService.getForecast();
        return NextResponse.json(forecastData, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch forecast" }, { status: 500 });
    }
}
