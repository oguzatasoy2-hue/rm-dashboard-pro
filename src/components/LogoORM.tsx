import React from 'react';

export const LogoORM = () => {
    return (
        <div className="flex items-center gap-3 group cursor-pointer select-none">

            {/* 1. Le Symbole (L'Aigle Géométrique Modulaire) */}
            <div className="relative flex items-center justify-center w-10 h-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[2px]">
                <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full text-[#EAC54F]"
                >
                    {/* Le Bec (Polygone massif) */}
                    <path
                        d="M4 10 H12 V16 L4 10 Z"
                        fill="currentColor"
                    />

                    {/* La Tête et l'Oeil (Espace négatif mathématique) */}
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14 4H30C30 11.732 23.732 18 16 18H14V4ZM22 11C22 12.6569 20.6569 14 19 14C17.3431 14 16 12.6569 16 11C16 9.34315 17.3431 8 19 8C20.6569 8 22 9.34315 22 11Z"
                        fill="currentColor"
                    />

                    {/* L'Aile Supérieure (Courbe externe) */}
                    <path
                        d="M14 20C20.6274 20 26 25.3726 26 32H22C22 27.5817 18.4183 24 14 24V20Z"
                        fill="currentColor"
                    />

                    {/* L'Aile Inférieure (Courbe interne) */}
                    <path
                        d="M14 26C17.3137 26 20 28.6863 20 32H16C16 30.8954 15.1046 30 14 30V26Z"
                        fill="currentColor"
                    />
                </svg>
            </div>

            {/* 2. Le Logotype (Hiérarchie typographique brutale) */}
            <div className="flex items-baseline tracking-tight">
                {/* ORM Massif */}
                <span className="text-3xl font-bold text-white/95">
                    ORM
                </span>
                {/* pro Grisé, empattement aligné */}
                <span className="text-2xl font-light text-white/40 ml-1.5 tracking-normal">
                    pro
                </span>
            </div>

        </div>
    );
};
