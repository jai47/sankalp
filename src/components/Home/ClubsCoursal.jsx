'use client';

import { getClubs } from '@/actions/clubs/getClubs';
import useParallax from '@/hooks/useParallex';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ClubScroller = () => {
    const [index, setIndex] = useState(0);
    const [clubs, setClubs] = useState([]);

    async function fetchClub() {
        const clubs = await getClubs();
        setClubs(clubs);
    }

    useEffect(() => {
        fetchClub();
    }, []);

    useEffect(() => {
        if (clubs.length === 0) return;

        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % clubs.length);
        }, 8000); // 8 seconds

        return () => clearInterval(interval);
    }, [clubs]);

    const y = useParallax();
    const scale = 1 + y / 1000;

    if (clubs.length === 0) return null;

    const currentClub = clubs[index];

    return (
        <div className="relative h-screen w-screen bg-white flex flex-col items-center justify-center gap-10 selection:bg-red-200 overflow-hidden">
            <div className="h-full w-full flex justify-center items-center">
                <div className="h-full w-full flex flex-col justify-center items-center bg-gray-50 py-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentClub._id || index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex h-2/3 w-4/5 max-w-6xl rounded-md overflow-hidden shadow-lg"
                        >
                            {/* Image Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.8 }}
                                className="w-1/2 relative"
                            >
                                <Image
                                    src={currentClub?.logo || '/default.jpg'}
                                    alt="Card Visual"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </motion.div>

                            {/* Text Section */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="w-1/2 bg-[#e6d4d4] p-10 flex flex-col justify-between"
                            >
                                <div className="flex flex-col justify-center gap-10">
                                    <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                                        {currentClub?.name}
                                    </h2>
                                    <p className="text-lg font-serif text-gray-700 mb-8">
                                        {currentClub?.description}
                                    </p>
                                </div>
                                <button className="self-start px-6 py-3 bg-white rounded-full shadow text-gray-900 font-medium hover:bg-gray-100 transition font-serif">
                                    Join →
                                </button>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Pagination Dots */}
                    <div className="flex gap-2 mt-10 justify-center items-center">
                        {clubs.map((_, i) => (
                            <span
                                key={i}
                                className={`h-2 w-2 rounded-full transition-all ${
                                    i === index
                                        ? 'bg-black scale-125'
                                        : 'bg-gray-400 scale-75'
                                }`}
                            />
                        ))}
                    </div>
                </div>
                <Image
                    src={'asthetics1.svg'}
                    alt="background"
                    height={300}
                    width={300}
                    className="absolute top-0 -left-10 opacity-45"
                    style={{
                        filter: 'grayscale(80%)',
                    }}
                />
                <Image
                    src={'asthetics.svg'}
                    alt="background"
                    height={350}
                    width={350}
                    className="absolute bottom-0 -right-10 opacity-45"
                    style={{
                        filter: 'grayscale(80%)',
                    }}
                />
            </div>

            {/* Parallax Text in Background */}
            <div
                className="absolute left-1/2 top-1/2 w-full h-full flex justify-center items-center font-bold text-center opacity-10 transition-all duration-500 ease-out bg-red-400 pointer-events-none"
                style={{
                    transform: `translate(-50%, -50%) scale(${
                        scale < 3.2 ? scale : scale * 4
                    })`,
                    opacity: scale < 3.2 ? 1 : 0,
                    transformOrigin: 'center center',
                    fontSize: '100px',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                }}
            >
                <p className="text-white">SOCIETIES</p>
            </div>
        </div>
    );
};

export default ClubScroller;
