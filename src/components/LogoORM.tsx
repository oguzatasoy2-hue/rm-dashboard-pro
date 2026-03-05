import React from 'react';

export const LogoORM = () => {
    return (
        <div className="flex items-baseline gap-1 group cursor-pointer select-none">

            {/* Le "O" (Symbole Aigle Géométrique - SVG Inline optimisé) */}
            <div className="relative flex items-center justify-center w-8 h-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[2px]">
                <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full text-[#EAC54F]"
                >
                    {/* Aile / Base (Arc de cercle inférieur) */}
                    <path d="M8 24 C 14 24, 20 28, 24 32 L 28 28 C 24 20, 16 16, 8 16 Z" fill="currentColor" />
                    {/* Tête / Bec (Triangle supérieur gauche) */}
                    <path d="M4 8 L 16 8 L 10 14 Z" fill="currentColor" />
                    {/* L'Oeil (Le centre du "O") */}
                    <circle cx="18" cy="12" r="4" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
            </div>

            {/* Le "RM" (Typographie massive) */}
            <span className="text-2xl font-bold tracking-tight text-white/90">
                RM
            </span>

            {/* Le badge "pro" (Typographie fine, contraste gris) */}
            <span className="text-xl font-light tracking-normal text-white/40 ml-1">
                pro
            </span>

        </div>
    );
};
