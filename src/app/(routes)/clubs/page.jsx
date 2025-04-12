'use client';
import React from 'react';

const page = () => {
    return (
        <>
            <section className="relative overflow-hidden h-[40vw] w-screen my-16">
                <div className="absolute top-[-20vw] left-[-8vw] rotate-45 h-[100vw] w-[107vw] flex items-end">
                    {/* Left Column */}
                    <div className="relative w-1/4 h-[66vw] border-r-8 border-white overflow-hidden hover:opacity-75 cursor-pointer">
                        <div
                            className="absolute top-[8.4vw] left-[8.1vw] w-[37vw] h-[38vw] bg-cover bg-no-repeat rotate-[-45deg]"
                            style={{
                                backgroundImage: 'url(/echiesta.jpeg)',
                            }}
                        ></div>
                    </div>

                    {/* Right Column */}
                    <div className="w-3/4 flex flex-col-reverse h-[109.1vw]">
                        <div className="relative h-[50vw] border-t-8 border-white overflow-hidden hover:opacity-75 cursor-pointer">
                            <div
                                className="absolute top-[-10.1vw] left-[-14.3vw] w-[65vw] h-[39vw] bg-cover bg-no-repeat rotate-[-45deg]"
                                style={{
                                    backgroundImage: 'url(/bg2.jpeg)',
                                }}
                            ></div>
                        </div>

                        <div className="flex h-[40.5vw] border-t-8 border-white">
                            <div className="w-[30%] bg-red-500 overflow-hidden relative">
                                <div className="relative w-full h-full rotate-[-45deg]">
                                    <h6 className="absolute text-white uppercase font-black text-5xl w-[20vw] top-[19vw] -left-[1vw] leading-[2.55vw]">
                                        Clubs @ Echelon
                                    </h6>
                                    <p className="absolute text-white font-extrabold text-right text-[0.9vw] w-[18vw] top-[26.5vw] left-[-3.5vw]">
                                        Explore the various clubs and societies
                                        at Echelon.
                                    </p>
                                </div>
                            </div>
                            <div className="relative w-[70%] border-l-8 border-white overflow-hidden hover:opacity-75 cursor-pointer">
                                <div
                                    className="absolute top-0 left-[-40vw] w-[110.1vw] h-[110vw] bg-cover bg-no-repeat rotate-[-45deg]"
                                    style={{
                                        backgroundImage: 'url(/bg.jpeg)',
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div className="relative h-[18.6vw] border-t-8 border-white overflow-hidden hover:opacity-75 cursor-pointer">
                            <div
                                className="absolute top-[6.5vw] left-[25vw] w-[34vw] h-[27vw] bg-cover bg-no-repeat rotate-[-45deg]"
                                style={{
                                    backgroundImage: 'url(/bg1.jpeg)',
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default page;
