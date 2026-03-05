import React from 'react';

export const LogoORM = () => {
    return (
        <div className="flex items-center gap-3 group cursor-pointer select-none">

            {/* 1. Symbole Aigle (SVG exact basé sur la structure du logo fourni) */}
            <div className="relative flex items-center justify-center w-10 h-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full text-[#00F2FE]"
                >
                    {/* Le Bec (Rectangle incliné) */}
                    <path d="M4 12 L12 12 V20 L4 20 Z" fill="currentColor" />

                    {/* La Tête et l'Oeil */}
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14 6H30C30 12.6274 24.6274 18 18 18H14V6ZM22 12C22 13.6569 20.6569 15 19 15C17.3431 15 16 13.6569 16 12C16 10.3431 17.3431 9 19 9C20.6569 9 22 10.3431 22 12Z"
                        fill="currentColor"
                    />

                    {/* L'Aile (Courbes segmentées) */}
                    <path d="M14 20C19.5228 20 24 24.4772 24 30H20C20 26.6863 17.3137 24 14 24V20Z" fill="currentColor" />
                    <path d="M14 25C16.7614 25 19 27.2386 19 30H16C16 28.8954 15.1046 28 14 28V25Z" fill="currentColor" />
                </svg>
            </div>

            {/* 2. Logotype (Stacked - Exactement comme sur l'image) */}
            <div className="flex flex-col justify-center leading-none">
                <span className="text-3xl font-bold text-white tracking-tighter">
                    ORM
                </span>
                <span className="text-xl font-light text-white/50 tracking-[0.15em] ml-[1px] mt-[2px]">
                    pro
                </span>
            </div>

        </div>
    );
};
