"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

interface TrendsCardProps {
    imgSrc: string;
    location: string;
    price?: number;
    label: string;
}

const TrendsCard: React.FC<TrendsCardProps> = ({ imgSrc: initialImgSrc, location, price, label }) => {
    const [imgSrc, setImgSrc] = useState(initialImgSrc);

    useEffect(() => {
        setImgSrc(initialImgSrc);
    }, [initialImgSrc]);

    return (
        <div className="flex flex-col items-center font-sans w-full mx-auto">
            <div className="relative w-full h-52 rounded-xl overflow-hidden shadow-lg group transition-all duration-300 ease-in-out hover:shadow-2xl">
                <Image
                    src={imgSrc}
                    alt={`${location} - ${label}`}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    onError={() => {
                        setImgSrc(`https://placehold.co/400x300/e2e8f0/94a3b8.png?text=Image+Not+Found`);
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                <div className="absolute inset-0 flex flex-col justify-end items-center p-4 text-white text-center">
                    {price && (
                        <p className="text-lg font-bold">
                            ${price.toLocaleString()}
                        </p>
                    )}
                    <p className="text-xl font-semibold leading-tight">{location}</p>
                </div>
            </div>

            <p className="mt-2 text-base font-medium">{label}</p>
        </div>
    );
};

export default TrendsCard
