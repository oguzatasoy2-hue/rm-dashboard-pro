import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import MarketClient from "@/components/market/MarketClient";
import { apiClient } from "@/lib/api-client";

function MarketLoading() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-[#09090B]">
            <div className="flex flex-col items-center gap-4 text-zinc-500">
                <Loader2 className="w-8 h-8 animate-spin text-white/20" />
                <p className="text-xs font-medium uppercase tracking-[0.2em] animate-pulse">Scanning Forward Data</p>
            </div>
        </div>
    );
}

import { mockDataService } from "@/lib/mock-data";

async function MarketDataWrapper() {
    let data: Record<string, unknown>[];
    try {
        data = mockDataService.getMarketInsight() as unknown as Record<string, unknown>[];
    } catch (err) {
        console.error("Failed to load market insight:", err);
        return (
            <div className="w-full h-full flex items-center justify-center bg-[#09090B] text-zinc-500">
                <p className="text-sm">Failed to load market data. Please try again later.</p>
            </div>
        );
    }
    return <MarketClient data={data as Record<string, unknown>[]} />;
}

export default function MarketInsightPage() {
    return (
        <Suspense fallback={<MarketLoading />}>
            <MarketDataWrapper />
        </Suspense>
    );
}
