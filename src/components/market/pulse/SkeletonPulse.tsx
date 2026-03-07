import React from "react";
import { BrainCircuit } from "lucide-react";

export default function SkeletonPulse() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-[#09090B]">
            <div className="flex flex-col items-center gap-4">
                <BrainCircuit className="w-8 h-8 animate-pulse text-primary/30" />
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em] animate-pulse">Analyzing Semantic Patterns</p>
            </div>
        </div>
    );
}
