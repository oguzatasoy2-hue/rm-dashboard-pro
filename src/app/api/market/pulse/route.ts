import { NextResponse } from 'next/server';
import { getSemanticPulseData } from '@/lib/market/pulse';

export async function GET() {
    const sentimentData = await getSemanticPulseData();
    return NextResponse.json(sentimentData);
}
