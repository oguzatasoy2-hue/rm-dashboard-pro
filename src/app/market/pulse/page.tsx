import React, { Suspense } from "react";
import SemanticPulseClient from "@/components/market/pulse/SemanticPulseClient";
import SkeletonPulse from "@/components/market/pulse/SkeletonPulse";
import { getSemanticPulseData } from "@/lib/market/pulse";

export default async function SemanticPulsePage() {
    // Data fetching on the server
    const data = await getSemanticPulseData();

    return (
        <Suspense fallback={<SkeletonPulse />}>
            <SemanticPulseClient data={data} />
        </Suspense>
    );
}
