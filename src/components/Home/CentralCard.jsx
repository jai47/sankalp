'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { HiUserCircle } from 'react-icons/hi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CentralCard({ items }) {
    const [index, setIndex] = useState(0);
    items = items.filter((event) => {
        if (
            new Date(event.dateTime) > new Date() &&
            event.status === 'upcoming'
        ) {
            return event;
        }
    });

    useEffect(() => {
        if (items.length === 0) return;
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, 10000); // Change every 10 seconds
        return () => clearInterval(interval);
    }, [items]);

    if (items.length === 0) return null; // Prevent rendering if no items

    const event = items[index];

    return (
        <Link
            href={'events/' + encodeURI(event._id)}
            className="flex border bg-white w-7/12 h-96 transform -translate-y-1/2"
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={event._id}
                    initial={{ opacity: 0, x: 5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    transition={{ duration: 0.8 }}
                    className="w-1/2 h-full relative"
                >
                    {event.cover && (
                        <Image
                            src={event.cover}
                            alt="Event Cover"
                            layout="fill"
                            objectFit="cover"
                        />
                    )}
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="w-1/2 flex flex-col justify-between p-6 px-8"
                >
                    <div className="flex flex-col space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -5 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="flex items-center justify-start gap-2"
                        >
                            <HiUserCircle size={40} className="text-gray-400" />
                            <div className="flex flex-col text-[12px]">
                                <p>{event.clubName}</p>
                                <p className="flex items-center justify-center gap-2">
                                    {new Date(
                                        event.dateTime
                                    ).toLocaleDateString()}{' '}
                                    <span className="w-[4px] h-[4px] block rounded-full bg-black" />{' '}
                                    <span>
                                        {Math.ceil(
                                            event.description.length / 200
                                        )}{' '}
                                        min
                                    </span>
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -5 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="flex flex-col space-y-4"
                        >
                            <h2 className="text-2xl font-medium">
                                {event.name}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {event.description}
                            </p>
                        </motion.div>
                    </div>
                    <div className="space-y-2">
                        <span className="block h-[1px] w-full bg-gray-400" />
                        <div className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-2">
                                <p className="text-[12px]">
                                    {event.registrations.length} Registrations
                                </p>
                                <p className="text-[12px]">{event.status}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt
                                    size={17}
                                    className="text-gray-400"
                                />
                                <p className="text-[12px]">{event.venue}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </Link>
    );
}
