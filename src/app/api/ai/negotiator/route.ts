import { NextResponse } from 'next/server';

/**
 * API Endpoint: /api/ai/negotiator (Agent Logs & Actions)
 */
export async function GET() {
    try {
        const negotiations = [
            {
                id: "NEG-001",
                ota: "Booking.com",
                status: "resolved",
                issue: "Undercut Detected (-12€)",
                action: "Contractual parity reminder sent",
                result: "Price corrected by OTA",
                timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
                impact: "+450€ Recouped"
            },
            {
                id: "NEG-002",
                ota: "Expedia",
                status: "active",
                issue: "Hidden member discount (-5%)",
                action: "AI negotiation in progress",
                result: "Awaiting OTA response",
                timestamp: new Date(Date.now() - 3600000 * 0.5).toISOString(),
                impact: "Est. 1,200€ Risk"
            },
            {
                id: "NEG-003",
                ota: "Agoda",
                status: "resolved",
                issue: "Taxes not included in public rate",
                action: "Automated ticket #8892",
                result: "Listing updated",
                timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
                impact: "+120€ Recouped"
            }
        ];

        return NextResponse.json(negotiations, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Failed to fetch negotiator logs" }, { status: 500 });
    }
}
