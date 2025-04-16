'use client';
import React from 'react';
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { IoLogoCodepen } from 'react-icons/io';

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
            <div className="w-[230px] rounded-md bg-[#ffe0e0] p-[5px] overflow-hidden shadow-[rgba(100,100,111,0.2)_0px_7px_20px_0px] transition-transform duration-500 hover:scale-[1.05]">
                {/* Top Section */}
                <div
                    className="relative h-[150px] rounded-md flex flex-col"
                    style={{
                        backgroundImage: "url('/echiesta.jpeg')",
                    }}
                >
                    {/* Skewed Border */}
                    <div className="relative h-[30px] w-[130px] bg-[#ffe0e0] rounded-br-md skew-x-[-12deg] shadow-[-10px_-10px_0_0_#ffe0e0]">
                        <div className="absolute top-0 -right-[15px] w-[15px] h-[15px] bg-transparent rounded-tl-md shadow-[-5px_-5px_0_2px_#ffe0e0]" />
                    </div>
                    {/* Top-left Corner Bubble */}
                    <div className="absolute top-[30px] left-0 w-[15px] h-[15px] bg-transparent rounded-tl-md shadow-[-5px_-5px_0_2px_#ffe0e0]" />

                    {/* Icons */}
                    <div className="absolute top-0 w-full h-[30px] flex justify-between items-center px-[15px]">
                        {/* Logo */}
                        <div className="h-full flex items-center">
                            <IoLogoCodepen
                                size={22}
                                className="fill-black transition"
                            />
                        </div>

                        {/* Social Icons */}
                        <div className="h-full flex items-center gap-2">
                            <FaLinkedin
                                size={18}
                                className=" fill-[#1b233d] hover:fill-white transition"
                            />
                            <FaInstagram
                                size={18}
                                className=" fill-[#1b233d] hover:fill-white transition"
                            />
                            <FaTwitter
                                size={18}
                                className="fill-[#1b233d] hover:fill-white transition"
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-[15px] px-[5px] py-[10px]">
                    <span className="block text-[17px] font-bold text-black text-center tracking-widest">
                        Google Developer Student Club
                    </span>

                    <div className="flex justify-between mt-[20px] text-black text-center text-xs">
                        <div className="flex-1 px-1">
                            <span className="block text-[12px]">2626</span>
                            <span className="text-[9px]">UI elements</span>
                        </div>
                        <div className="flex-1 border-x border-white/10 px-1">
                            <span className="block text-[12px]">100%</span>
                            <span className="text-[9px]">Free for use</span>
                        </div>
                        <div className="flex-1 px-1">
                            <span className="block text-[12px]">38,631</span>
                            <span className="text-[9px]">Contributers</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;
