import React from 'react';

export const LogoORM = () => {
    return (
        <div className="flex items-center gap-4 group cursor-pointer select-none">

            {/* 
        LOGUE CONCEPT : "L'Aigle Polyvalent"
        3 Parties distinctes pour 3 piliers RMpro :
        1. Le Bec (Précision / Yield)
        2. L'Oeil (Vision / Market Insight)
        3. L'Aile (Puissance / Automisation)
      */}
            <div className="relative flex items-center justify-center w-12 h-12 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[5deg]">
                <svg
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                >
                    {/* 1. LE BEC (Précision Chirurgicale) - Triangle net et tranchant */}
                    <path
                        d="M6 16 L14 12 V20 L6 16 Z"
                        fill="#EAC54F"
                        className="transition-transform duration-500 group-hover:-translate-x-1"
                    />

                    {/* 2. L'OEIL (Vision Panoramique / Insight) - Carré avec cercle négatif */}
                    <rect
                        x="14" y="8" width="18" height="18"
                        fill="#EAC54F"
                        rx="2"
                        className="transition-opacity duration-500 group-hover:opacity-80"
                    />
                    <circle cx="23" cy="17" r="3.5" fill="#09090B" />

                    {/* 3. L'AILE (Agilité / Performance) - Segment modulaire courbé */}
                    <path
                        d="M14 26 C 14 26, 20 26, 30 36 L 24 36 C 24 36, 18 31, 14 31 V 26 Z"
                        fill="#EAC54F"
                        className="transition-transform duration-700 delay-75 group-hover:translate-y-1 group-hover:translate-x-1"
                    />

                    {/* Support Line (Cohésion) */}
                    <rect x="14" y="26" width="2" height="5" fill="#EAC54F" opacity="0.3" />
                </svg>
            </div>

            {/* Logotype Branding */}
            <div className="flex flex-col leading-none">
                <div className="flex items-baseline">
                    <span className="text-3xl font-black tracking-tighter text-white">
                        RM
                    </span>
                    <span className="text-3xl font-black tracking-tighter text-[#EAC54F] ml-[1px]">
                        pro
                    </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mt-1">
                    Revenue Engine
                </span>
            </div>

        </div>
    );
};
