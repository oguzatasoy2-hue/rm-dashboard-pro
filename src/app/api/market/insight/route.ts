import { NextResponse } from 'next/server';

/**
 * API Endpoint: /api/market/insight
 */
export async function GET() {
    try {
        const insightData = [
            { date: "01 Mar", searchVolume: 45, marketDemand: 52, hasEvent: false },
            { date: "02 Mar", searchVolume: 48, marketDemand: 50, hasEvent: false },
            { date: "03 Mar", searchVolume: 52, marketDemand: 58, hasEvent: false },
            { date: "04 Mar", searchVolume: 61, marketDemand: 65, hasEvent: false },
            { date: "05 Mar", searchVolume: 58, marketDemand: 60, hasEvent: false },
            { date: "06 Mar", searchVolume: 65, marketDemand: 72, hasEvent: false },
            { date: "07 Mar", searchVolume: 72, marketDemand: 85, hasEvent: true }, // Event: Salon de l'Auto
            { date: "08 Mar", searchVolume: 68, marketDemand: 78, hasEvent: false },
            { date: "09 Mar", searchVolume: 60, marketDemand: 62, hasEvent: false },
            { date: "10 Mar", searchVolume: 55, marketDemand: 58, hasEvent: false },
            { date: "11 Mar", searchVolume: 50, marketDemand: 55, hasEvent: false },
            { date: "12 Mar", searchVolume: 58, marketDemand: 64, hasEvent: false },
            { date: "13 Mar", searchVolume: 75, marketDemand: 88, hasEvent: true }, // Logic: Weekend pressure
            { date: "14 Mar", searchVolume: 82, marketDemand: 92, hasEvent: true }
        ];

        return NextResponse.json(insightData, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Failed to fetch market insight" }, { status: 500 });
    }
}
