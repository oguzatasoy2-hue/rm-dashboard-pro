import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import DemandClient from "@/components/market/DemandClient";
import { type DemandDay } from "@/lib/api-client";
import { mockDataService } from "@/lib/mock-data";

function DemandLoading() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-[#09090B]">
            <div className="flex flex-col items-center gap-4 text-zinc-500">
                <Loader2 className="w-8 h-8 animate-spin text-primary/30" />
                <p className="text-xs font-medium uppercase tracking-[0.2em] animate-pulse">Calculating Booking Velocity</p>
            </div>
        </div>
    );
}

async function DemandDataWrapper() {
    let data: DemandDay[];
    try {
        data = mockDataService.getDemandCalendar();
    } catch (err) {
        console.error("Failed to load demand calendar:", err);
        return (
            <div className="w-full h-full flex items-center justify-center bg-[#09090B] text-zinc-500">
                <p className="text-sm">Failed to load demand calendar. Please try again later.</p>
            </div>
        );
    }
    return <DemandClient data={data} />;
}

export default function DemandCalendarPage() {
    return (
        <Suspense fallback={<DemandLoading />}>
            <DemandDataWrapper />
        </Suspense>
    );
}
