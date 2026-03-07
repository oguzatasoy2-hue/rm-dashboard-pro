import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import NegotiatorClient from "@/components/agent/NegotiatorClient";
import { type NegotiationLog } from "@/lib/api-client";
import { mockDataService } from "@/lib/mock-data";

function NegotiatorLoading() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-[#09090B]">
            <div className="flex flex-col items-center gap-4 text-zinc-500">
                <Loader2 className="w-8 h-8 animate-spin text-primary/30" />
                <p className="text-xs font-medium uppercase tracking-[0.2em] animate-pulse">Initializing Agent Negotiator</p>
            </div>
        </div>
    );
}

async function NegotiatorDataWrapper() {
    let data: NegotiationLog[];
    try {
        data = await mockDataService.getNegotiations();
    } catch (err) {
        console.error("Failed to load negotiator logs:", err);
        return (
            <div className="w-full h-full flex items-center justify-center bg-[#09090B] text-zinc-500">
                <p className="text-sm">Failed to load negotiator logs. Please try again later.</p>
            </div>
        );
    }
    return <NegotiatorClient data={data} />;
}

export default function NegotiatorPage() {
    return (
        <Suspense fallback={<NegotiatorLoading />}>
            <NegotiatorDataWrapper />
        </Suspense>
    );
}
