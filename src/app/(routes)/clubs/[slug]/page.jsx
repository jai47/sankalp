'use client';
import { getClubs } from '@/actions/clubs/getClubs';
import Footer from '@/components/Footer/footer';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import { fetchClubEvents } from '@/actions/events/fetchEvents';
import { useSession } from 'next-auth/react';
import { getUser } from '@/actions/users/getUser';
import { joinClub } from '@/actions/clubs/joinClub';

const Page = ({ params }) => {
    const { data: session } = useSession();
    const { slug } = React.use(params);
    const decodedSlug = decodeURIComponent(slug);
    const [club, setClub] = useState(null);
    const [events, setEvents] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        async function getClub() {
            const [club, events] = await Promise.all([
                getClubs(decodedSlug),
                fetchClubEvents(decodedSlug),
            ]);
            if (club) {
                setClub(club[0]);
            } else {
                toast.error("Club can't be load this time, try again later :(");
            }
            if (events) {
                console.log('events:', events);
                setEvents(events);
            }
        }

        getClub();
    }, [decodedSlug]);

    useEffect(() => {
        if (!session?.user?.email) return;
        async function getUserData() {
            const usr = await getUser(session?.user?.email);
            const userData = usr[0];
            if (userData) {
                setUser(userData);
            }
        }
        getUserData();
    }, [session]);

    if (!club) return <div>Loading...</div>;

    return (
        <div className="w-screen min-h-screen bg-white text-gray-800 font-serif">
            {/* Hero Section */}
            <div className="relative w-full h-[60vh]">
                <Image
                    src={club.banner}
                    alt={club.name}
                    fill
                    objectFit="cover"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-end justify-between p-10">
                    <div className="flex flex-col gap-10">
                        <h1 className="text-white text-5xl font-bold mb-4">
                            {club.name}
                        </h1>
                        <p className="text-white text-lg w-[70%]">
                            {club.description}
                        </p>
                    </div>
                    {!(user?.clubId?.id === decodedSlug) ? (
                        user?.role === 'student' ? (
                            <button
                                onClick={async () => {
                                    if (!session?.user?.email) {
                                        toast.error(
                                            'You need to be logged in to join a club'
                                        );
                                        return;
                                    }
                                    const response = await joinClub(
                                        decodedSlug,
                                        user._id
                                    );

                                    if (response.success) {
                                        toast.success(
                                            'Successfully joined the club'
                                        );
                                        setInterval(() => {
                                            window.location.reload();
                                        }, 2000);
                                    }
                                }}
                                className="px-6 py-3 flex gap-3 bg-white rounded-full shadow text-gray-900 font-medium hover:bg-gray-100 transition"
                            >
                                <span>Join</span>
                                <span>→</span>
                            </button>
                        ) : !session?.user ? (
                            <button
                                onClick={() => {
                                    toast.error(
                                        'You need to be logged in to join a club'
                                    );
                                }}
                                className="px-6 py-3 flex gap-3 bg-white rounded-full shadow text-gray-900 font-medium hover:bg-gray-100 transition"
                            >
                                <span>Join</span>
                                <span>→</span>
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    toast.error(
                                        'You need to be exit the previous club to join this club'
                                    );
                                }}
                                className="px-6 py-3 flex gap-3 bg-white rounded-full shadow text-gray-900 font-medium hover:bg-gray-100 transition"
                            >
                                <span>Join</span>
                                <span>→</span>
                            </button>
                        )
                    ) : (
                        <p className="px-6 py-3 flex gap-3 bg-amber-200 rounded-full shadow text-gray-900 font-medium hover:bg-gray-100 transition">
                            Member
                        </p>
                    )}
                </div>
            </div>

            {/* About Us */}
            <div className="bg-[#f9f6f1] px-6 md:px-20 py-20">
                <h2 className="text-4xl font-semibold mb-10">About Us</h2>
                <div className="flex flex-col md:flex-row gap-10 items-start">
                    {/* Logo and quote */}
                    <div className="flex flex-col items-center gap-6 text-center md:w-1/4">
                        <Image
                            src={club.logo}
                            alt="Logo"
                            width={160}
                            height={160}
                            className="w-44 h-44 rounded-full"
                        />
                        <p className="text-xl italic text-gray-700">
                            “{club.values}”
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="w-[1px] bg-gray-800 self-stretch" />

                    {/* Mission & Vision */}
                    <div className="md:w-3/4">
                        <h3 className="text-2xl font-semibold mb-2">
                            Who we are
                        </h3>
                        <p className="mb-4">{club.vision}</p>
                        <p className="mb-4">{club.mission}</p>
                        <p className="mb-2 text-sm text-gray-600">
                            Values: {club.values}
                        </p>
                        <p className="mb-2 text-sm text-gray-600">
                            Goals: {club.goals}
                        </p>
                        <p className="mb-2 text-sm text-gray-600">
                            Achievements: {club.achievements}
                        </p>
                        <div className="flex flex-col gap-6 mt-10">
                            <h3 className="text-2xl font-semibold">
                                Club Admins
                            </h3>

                            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {club.adminId.map((admin) => (
                                    <div
                                        key={admin.email}
                                        className="relative group overflow-hidden rounded-sm shadow-md w-56 h-56"
                                    >
                                        <Image
                                            src={admin.image}
                                            alt={admin.name}
                                            fill
                                            className="object-cover group-hover:brightness-50 transition duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center text-white p-4 cursor-move gap-3 select-none">
                                            <p className="text-lg font-semibold">
                                                {admin.name}
                                            </p>
                                            <p className="text-sm text-gray-200">
                                                {admin.email}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Events */}
            {events.length > 0 && (
                <div className="bg-[#fffdf9] px-6 md:px-20 py-20">
                    <h2 className="text-4xl font-semibold mb-12">
                        Upcoming Events
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {events
                            .filter((event) => event.status === 'upcoming')
                            .map((event) => {
                                const eventDate = new Date(event.dateTime);
                                const day = eventDate.getDate();
                                const month = eventDate.toLocaleString(
                                    'default',
                                    { month: 'short' }
                                );
                                const time = eventDate.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                });

                                return (
                                    <div
                                        key={event._id}
                                        className="bg-white rounded-sm overflow-hidden flex flex-col"
                                    >
                                        <div className="relative h-48 w-full">
                                            <Image
                                                src={event.cover}
                                                alt={event.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-3 p-6 flex-grow">
                                            <h3 className="text-lg font-semibold">
                                                {event.name}
                                            </h3>
                                            <p className="text-sm text-gray-700 line-clamp-3">
                                                {event.description}
                                            </p>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-2xl font-bold leading-none">
                                                        {day}
                                                    </span>
                                                    <span className="uppercase text-xs">
                                                        {month}
                                                    </span>
                                                </div>
                                                <div className="h-full border-l border-gray-300" />
                                                <div className="flex flex-col gap-1">
                                                    <p className="flex items-center gap-1">
                                                        📍 {event.venue}
                                                    </p>
                                                    <p>⏰ {time}</p>
                                                </div>
                                            </div>
                                            <Link
                                                href={`/events/${event._id}`}
                                                className="mt-6 px-4 py-3 border rounded-md hover:bg-red-500 hover:text-white transition text-sm font-medium text-center"
                                            >
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>

                    <div className="mt-10 flex justify-center">
                        <Link
                            href="/events"
                            className="px-6 py-2 border border-red-500 bg-red-500 text-white rounded-full text-sm hover:bg-transparent hover:text-red-500 transition duration-200"
                        >
                            SEE ALL EVENTS →
                        </Link>
                    </div>
                </div>
            )}

            {/* Contact */}
            <div className="bg-white px-6 md:px-20 py-10 border-t">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <div className="text-sm text-gray-700">
                    <p>
                        Email:{' '}
                        <a
                            href={`mailto:${club.contactEmail}`}
                            className="text-blue-600 hover:underline"
                        >
                            {club.contactEmail}
                        </a>
                    </p>
                    <p>
                        Phone:{' '}
                        <a
                            href={`tel:${club.contactPhone}`}
                            className="text-blue-600 hover:underline"
                        >
                            {club.contactPhone}
                        </a>
                    </p>
                    {club.website && (
                        <p>
                            Website:{' '}
                            <a
                                href={club.website}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {club.website}
                            </a>
                        </p>
                    )}
                    {club.socialMediaLinks && (
                        <div className="flex gap-4 mt-4">
                            <Link
                                href={club.socialMediaLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaFacebookF
                                    size={20}
                                    className="hover:text-blue-700 duration-100"
                                />
                            </Link>
                            <Link
                                href={club.socialMediaLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaInstagram
                                    size={20}
                                    className="hover:text-purple-500 duration-100"
                                />
                            </Link>
                            <Link
                                href={club.socialMediaLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaLinkedin
                                    size={20}
                                    className="hover:text-blue-800 duration-100"
                                />
                            </Link>

                            <Link
                                href={club.socialMediaLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaTwitter
                                    size={20}
                                    className="hover:text-blue-500 duration-100"
                                />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Page;
