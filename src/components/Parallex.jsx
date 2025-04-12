import useParallex from '@/hooks/useParallex';
import Image from 'next/image';
import React from 'react';

const Parallex = ({ image, desc, heading, className }) => {
    let heading_array = heading.split(' ');
    const scrollY = useParallex();
    return (
        <section
            className={`relative w-full h-[40vh] bg-gray-50 overflow-hidden ${className}`}
        >
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    transform: `translateY(${scrollY * 0.5}px) scale(1.5)`,
                    transformOrigin: 'center center',
                }}
            >
                <Image
                    src={image}
                    alt="background"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="brightness-50 blur-sm"
                />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                <h1 className="text-5xl md:text-6xl font-black">
                    {heading_array.slice(0, heading_array.length - 1).join(' ')}
                    <span className="text-red-500">
                        {' '}
                        {heading_array[heading_array.length - 1]}
                    </span>
                </h1>
                <div className="w-28 h-1 bg-red-500 my-3" />
                <p className="text-lg md:w-3/4">{desc}</p>
            </div>
        </section>
    );
};

export default Parallex;
