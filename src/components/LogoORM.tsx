import React from 'react';

export const LogoORM = () => {
    return (
        <div className="flex items-center gap-3 group cursor-pointer select-none">

            {/* 1. Le Symbole (L'Aigle Géométrique - Proposition 1) */}
            <div className="relative flex items-center justify-center w-9 h-9 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full text-[#00F2FE]"
                >
                    {/* Le Bec (Triangle supérieur inversé) */}
                    <path d="M6 4 L26 4 L16 12 Z" fill="currentColor" />

                    {/* L'Oeil (Cercle central) */}
                    <circle cx="16" cy="18" r="3" fill="currentColor" />

                    {/* L'Aile (Courbe inférieure asymétrique) */}
                    <path d="M6 28 C 12 28, 16 24, 16 20 C 16 24, 22 26, 28 22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
            </div>

            {/* 2. Le Logotype (Hiérarchie Typographique Brutale) */}
            <div className="flex items-baseline tracking-tight">
                {/* Le "O" lié visuellement à l'icône */}
                <span className="text-2xl font-bold text-[#00F2FE]">
                    O
                </span>
                {/* Le "RM" mis en valeur (Revenue Management) */}
                <span className="text-2xl font-bold text-white/90 ml-[1px]">
                    RM
                </span>
                {/* Le "pro" en retrait (Grisé) */}
                <span className="text-xl font-light text-white/40 ml-1.5">
                    pro
                </span>
            </div>

        </div>
    );
};
