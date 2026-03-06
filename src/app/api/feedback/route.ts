import { NextResponse } from 'next/server';

/**
 * API Endpoint: /api/feedback
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Simulation d'envoi vers un service tiers ou BDD
        console.log("Feedback received:", body);

        return NextResponse.json({ success: true, message: "Feedback saved" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 });
    }
}
