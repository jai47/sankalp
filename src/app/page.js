'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import useParallex from '@/hooks/useParallex';
import Card from '@/components/Home/card';
import Footer from '@/components/Footer/footer';
import ClubsCarousel from '@/components/Home/ClubsCoursal';
import SocialMedia from '@/components/Home/socialmedia';
import CentralCard from '@/components/Home/CentralCard';

const Home = () => {
    const scrollY = useParallex();
    const [events, setevents] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/events');
                const data = await response.json();
                if (data.body?.events) {
                    setevents(data.body?.events);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            {/* Parallax Background */}
            <main
                className="relative overflow-hidden select-none"
                style={{
                    height: 'calc(100vh - 12rem)',
                }}
            >
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        transform: `translateY(${scrollY * 0.3}px)`,
                    }}
                >
                    <Image
                        src="/bg.jpeg"
                        alt="background"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="0rem -4rem"
                        style={{ filter: 'grayscale(60%)' }}
                    />
                </div>
                <div className="flex flex-col items-center justify-center gap-4 absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="text-sm flex items-center justify-center gap-4">
                        <span className="block w-8 h-[2px] bg-red-500" />
                        <span className="font-semibold">WELCOME TO THE</span>
                        <span className="block w-8 h-[2px] bg-red-500" />
                    </div>
                    <h1 className="text-5xl font-black">
                        Echelon Institute of{' '}
                        <span className="text-red-500">Technology</span>
                    </h1>
                    <h1 className="text-8xl font-black">
                        SANK<span className="text-red-500">ALP</span>
                    </h1>
                    <p className="text-sm font-semibold">
                        A subdivision of Echelon Institute of Technology
                    </p>
                </div>
            </main>
            <section className="h-fit w-screen bg-white flex flex-col items-center gap-10 selection:bg-red-200">
                <CentralCard items={events} />
                <div className="flex justify-between items-center w-7/12 h-fit transform -translate-y-1/2">
                    {events.length > 0 ? (
                        events.slice(0, 3).map((event, index) => (
                            <Card
                                key={index}
                                id={event._id}
                                image={event.cover || '/default.jpg'} // Use a default image if not provided
                                title={event.name}
                                registration={event?.registrations?.length || 0}
                                status={event.status || 0}
                                venue={event.venue}
                            />
                        ))
                    ) : (
                        <p>No upcoming events</p>
                    )}
                </div>
            </section>

            {/* Clubs Section */}

            <section
                className="bg-gray-50 w-full relative overflow-hidden"
                style={{
                    height: 'calc(100vh - 15rem)',
                }}
            >
                <div
                    className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out"
                    style={{
                        transform: `translateY(${
                            scrollY * 0.2 - 250
                        }px) scale(${scrollY * 0.0001 + 1})`,
                        transformOrigin: 'center center',
                    }}
                >
                    <Image
                        src="/bg1.jpeg"
                        alt="background"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center -250px" // Move image higher
                        style={{ filter: 'brightness(50%) blur(1px)' }}
                    />
                </div>
                <div className="flex flex-col items-center justify-center gap-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                    {/* Welcome Text with Lines */}
                    <div className="text-sm flex items-center justify-center gap-4">
                        <span className="block w-8 h-[2px] bg-red-500" />
                        <span className="font-semibold">CLUBS AT ECHELON</span>
                        <span className="block w-8 h-[2px] bg-red-500" />
                    </div>
                    <h1 className="text-6xl md:text-9xl font-black text-gray-100">
                        SANK<span className="text-red-500">ALP</span>
                    </h1>
                    <p className="text-sm font-semibold text-center">
                        A subdivision of Echelon Institute of Technology
                    </p>
                </div>
            </section>

            <ClubsCarousel />

            {/* Social Media section */}
            <section
                className="bg-gray-50 w-full relative overflow-hidden"
                style={{
                    height: 'calc(100vh - 15rem)',
                }}
            >
                <div
                    className="absolute inset-0 w-full h-full transition-transform duration-200 ease-out"
                    style={{
                        transform: `translateY(${
                            scrollY * 0.2 - 500
                        }px) scale(${scrollY * 0.0001 + 1})`,
                        transformOrigin: 'center center',
                    }}
                >
                    <Image
                        src="/bg2.jpeg"
                        alt="background"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center -250px" // Move image higher
                        style={{ filter: 'brightness(50%) blur(1px)' }}
                    />
                </div>
                <div className="flex flex-col items-center justify-center gap-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                    {/* Welcome Text with Lines */}
                    <div className="text-sm flex items-center justify-center gap-4">
                        <span className="block w-8 h-[2px] bg-red-500" />
                        <span className="font-semibold">SOCIAL MEDIA</span>
                        <span className="block w-8 h-[2px] bg-red-500" />
                    </div>
                    <h1 className="text-6xl md:text-9xl font-black text-gray-100">
                        SANK<span className="text-red-500">ALP</span>
                    </h1>
                    <p className="text-sm font-semibold text-center">
                        Have a look at our social media handles
                    </p>
                </div>
            </section>

            <SocialMedia className="mt-10" />

            <Footer />
        </>
    );
};

export default Home;
