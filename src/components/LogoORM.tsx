import React from 'react';

export const LogoORM = () => {
    return (
        <div className="flex items-center gap-3 group cursor-pointer select-none">

            {/* 
        LOGUE CONCEPT : "L'Aigle Majestueux"
        Un design architectural plus net pour éviter l'effet 'chauve-souris'.
        Profil de rapace marqué : Bec crochu, regard perçant, ailes structurées.
      */}
            <div className="relative flex items-center justify-center w-12 h-12 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-[0_0_12px_rgba(234,197,79,0.3)]"
                >
                    {/* L'AIGLE - PROFIL RAPACE ARCHITECTURAL */}
                    <g className="transition-all duration-500">

                        {/* L'Aile (Forme aérodynamique, plumes pointues vers le bas/arrière) */}
                        <path
                            d="M45 45 C 45 45, 60 75, 95 70 L 75 60 L 90 50 L 65 40 L 80 30 L 55 30 Z"
                            fill="url(#goldGradient)"
                            stroke="#EAC54F"
                            strokeWidth="1"
                        />

                        {/* Le Corps / Cou (Lignes tendues) */}
                        <path
                            d="M45 45 L 55 30 L 45 10 L 25 25 L 45 45 Z"
                            fill="#EAC54F"
                        />

                        {/* La Tête (Profil d'aigle : Bec crochu vers le bas) */}
                        <path
                            d="M25 25 L 5 35 L 15 40 L 25 45 L 25 25 Z"
                            fill="#EAC54F"
                        />

                        {/* L'Oeil (Cercle de focalisation) */}
                        <circle cx="30" cy="28" r="3" fill="#09090B" />
                        <circle cx="30" cy="28" r="5" stroke="#09090B" strokeWidth="0.5" opacity="0.5" />

                        {/* Lignes de structure (Lumière) */}
                        <path d="M50 35 L 75 50" stroke="#09090B" strokeWidth="0.5" opacity="0.4" />
                        <path d="M55 45 L 80 60" stroke="#09090B" strokeWidth="0.5" opacity="0.4" />
                    </g>

                    {/* Gradients */}
                    <defs>
                        <linearGradient id="goldGradient" x1="45" y1="30" x2="95" y2="70" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#EAC54F" />
                            <stop offset="1" stopColor="#D4AF37" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Logotype Branding - Reversion to RMpro */}
            <div className="flex flex-col justify-center leading-none">
                <div className="flex items-baseline">
                    <span className="text-4xl font-black tracking-tighter text-white uppercase italic">
                        RM
                    </span>
                    <span className="text-4xl font-light tracking-tight text-[#EAC54F] ml-1 uppercase">
                        pro
                    </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <div className="h-[1px] w-4 bg-[#EAC54F]/40"></div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 whitespace-nowrap">
                        Revenue Suite
                    </span>
                </div>
            </div>

        </div>
    );
};
