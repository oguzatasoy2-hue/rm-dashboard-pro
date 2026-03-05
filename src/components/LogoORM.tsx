import React from 'react';

export const LogoORM = () => {
    return (
        <div className="flex items-center gap-4 group cursor-pointer select-none">

            {/* Icon: L'Aigle Géométrique (Logo N1 de l'image) */}
            <div className="relative flex items-center justify-center w-11 h-11 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
                <svg
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full text-[#EAC54F] drop-shadow-[0_0_8px_rgba(234,197,79,0.2)]"
                >
                    {/* Beak (Pointu vers la gauche) */}
                    <path d="M4 18 L12 14 V22 L4 18 Z" fill="currentColor" />

                    {/* Head Block (Géométrie angulaire) */}
                    <path d="M12 10 H32 V26 H22 L12 34 V10 Z" fill="currentColor" />

                    {/* Eye Cutout (Cercle négatif) */}
                    <circle cx="22" cy="18" r="3.5" fill="#09090B" />

                    {/* Neck Feathers / Arcs (Lignes de vitesse) */}
                    <path d="M16 38 C 16 38, 22 41, 32 41" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <path d="M20 32 C 20 32, 25 35, 32 35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
            </div>

            {/* Logotype: Stacked Layout (Comme sur l'image N1) */}
            <div className="flex flex-col leading-[0.85]">
                <span className="text-3xl font-black tracking-tighter text-white">
                    ORM
                </span>
                <span className="text-xl font-light tracking-widest text-white/40 ml-[2px]">
                    pro
                </span>
            </div>

        </div>
    );
};
