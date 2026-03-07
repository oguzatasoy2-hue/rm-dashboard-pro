import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import NegotiatorClient from "@/components/agent/NegotiatorClient";
import { apiClient, type NegotiationLog } from "@/lib/api-client";

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
    let data;
    try {
        data = await apiClient.getNegotiations();
    } catch (err) {
        console.error("Failed to load negotiator logs:", err);
        return (
            <div className="w-full h-full flex items-center justify-center bg-[#09090B] text-zinc-500">
                <p className="text-sm">Negotiator offline. Checking OTA secure protocols...</p>
            </div>
        );
    }
    return <NegotiatorClient data={data as NegotiationLog[]} />;
}

export default function NegotiatorPage() {
    return (
        <Suspense fallback={<NegotiatorLoading />}>
            <NegotiatorDataWrapper />
        </Suspense>
    );
}
