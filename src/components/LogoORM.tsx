import React from 'react';

export const LogoORM = () => {
    return (
        <div className="flex items-center gap-4 group cursor-pointer select-none">

            {/* 1. L'Aigle Géométrique (Réplique exacte du screenshot) */}
            <div className="relative flex items-center justify-center w-12 h-12 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full text-[#EAC54F]"
                >
                    {/* Bec (Carré/Rectangle à gauche) */}
                    <rect x="10" y="35" width="25" height="25" fill="currentColor" />

                    {/* Tête (Triangle supérieur droit) */}
                    <path d="M35 15 L85 15 L50 45 Z" fill="currentColor" />

                    {/* L'Oeil (Cercle en espace négatif) */}
                    <circle cx="55" cy="30" r="8" fill="#09090B" />

                    {/* Corps / Plumes (Les arcs de cercle en bas) */}
                    <path
                        d="M35 50 C 35 50, 45 85, 85 85"
                        stroke="currentColor"
                        strokeWidth="10"
                        strokeLinecap="round"
                    />
                    <path
                        d="M50 60 C 50 60, 58 75, 85 75"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            {/* 2. Le Logotype (Empilage précis ORM / pro) */}
            <div className="flex flex-col justify-center">
                <span className="text-4xl font-bold tracking-tighter text-white leading-none">
                    ORM
                </span>
                <span className="text-2xl font-light tracking-[0.2em] text-white/30 ml-[2px] mt-1 leading-none">
                    pro
                </span>
            </div>

        </div>
    );
};
