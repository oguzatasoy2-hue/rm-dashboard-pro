import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import ForecastClient from "@/components/revenue/ForecastClient";
import { type ForecastDay } from "@/lib/api-client";
import { mockDataService } from "@/lib/mock-data";

function ForecastLoading() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-[#09090B]">
            <div className="flex flex-col items-center gap-4 text-zinc-500">
                <Loader2 className="w-8 h-8 animate-spin text-white/20" />
                <p className="text-xs font-medium uppercase tracking-[0.2em] animate-pulse">Compiling Yield Grid</p>
            </div>
        </div>
    );
}

async function ForecastDataWrapper() {
    let data: ForecastDay[];
    try {
        data = mockDataService.getForecast();
    } catch (err) {
        console.error("Failed to load forecast data:", err);
        return (
            <div className="w-full h-full flex items-center justify-center bg-[#09090B] text-zinc-500">
                <p className="text-sm">Failed to load forecast data. Please try again later.</p>
            </div>
        );
    }
    return <ForecastClient data={data} />;
}

export default function ForecastingPage() {
    return (
        <Suspense fallback={<ForecastLoading />}>
            <ForecastDataWrapper />
        </Suspense>
    );
}
