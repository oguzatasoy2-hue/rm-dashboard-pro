import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import STRClient from "@/components/market/STRClient";
import { apiClient, type BenchmarkIndex } from "@/lib/api-client";

function STRLoading() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-[#09090B]">
            <div className="flex flex-col items-center gap-4 text-zinc-500">
                <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
                <p className="text-xs font-medium uppercase tracking-[0.2em] animate-pulse">Computing Market Indices</p>
            </div>
        </div>
    );
}

import { mockDataService } from "@/lib/mock-data";

async function STRDataWrapper() {
    let data: BenchmarkIndex[];
    try {
        data = mockDataService.getBenchmark();
    } catch (error) {
        console.error("Failed to load benchmark data:", error);
        return (
            <div className="w-full h-full flex items-center justify-center bg-[#09090B] text-zinc-500">
                <p className="text-sm">Failed to load benchmark data. Please try again later.</p>
            </div>
        );
    }
    return <STRClient data={data as unknown as BenchmarkIndex[]} />;
}

export default function STRBenchmarkPage() {
    return (
        <Suspense fallback={<STRLoading />}>
            <STRDataWrapper />
        </Suspense>
    );
}
