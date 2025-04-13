'use client';
import Image from 'next/image';
import { HiUserCircle } from 'react-icons/hi2';
import { FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaLinkedinIn } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import React, { use } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer/footer';
import { useSession } from 'next-auth/react';
import { getUser } from '@/actions/users/getUser';

function ImageGrid() {
    const images = [
        {
            src: 'https://images.unsplash.com/photo-1541845157-a6d2d100c931?auto=format&fit=crop&w=1350&q=80',
            className: '',
        },
        {
            src: 'https://images.unsplash.com/photo-1588282322673-c31965a75c3e?auto=format&fit=crop&w=1351&q=80',
            className: '',
        },
        {
            src: 'https://images.unsplash.com/photo-1588117472013-59bb13edafec?auto=format&fit=crop&w=500&q=60',
            className: 'row-span-2',
        },
        {
            src: 'https://images.unsplash.com/photo-1587588354456-ae376af71a25?auto=format&fit=crop&w=1350&q=80',
            className: 'col-span-2',
        },
        {
            src: 'https://images.unsplash.com/photo-1558980663-3685c1d673c4?auto=format&fit=crop&w=1000&q=60',
            className: '',
        },
        {
            src: 'https://images.unsplash.com/photo-1724963843259-3b0727c53b0c?auto=format&fit=crop&w=1000&q=60',
            className: '',
        },
        {
            src: 'https://images.unsplash.com/photo-1588499756884-d72584d84df5?auto=format&fit=crop&w=2134&q=80',
            className: 'row-span-2',
        },
        {
            src: 'https://images.unsplash.com/photo-1588492885706-b8917f06df77?auto=format&fit=crop&w=1951&q=80',
            className: 'col-span-2 row-span-2',
        },
        {
            src: 'https://images.unsplash.com/photo-1731328667980-9ea08c5edc07?auto=format&fit=crop&w=1951&q=80',
            className: '',
        },
    ];

    return (
        <section className="w-1/2 mx-auto" id="gallery">
            <h2 className="text-3xl font-bold mb-5">Gallery</h2>
            <div className="grid grid-cols-3 gap-4 auto-rows-[200px]">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`overflow-hidden rounded-lg ${img.className}`}
                    >
                        <img
                            src={img.src}
                            alt="Gallery"
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

const Page = ({ params }) => {
    const { data: session } = useSession();
    const { slug } = use(params);
    const decodedSlug = decodeURIComponent(slug);
    const [event, setEvent] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [isAlreadyRegistered, setIsAlreadyRegistered] = React.useState(false);

    React.useEffect(() => {
        if (!session?.user?.email) return;
        async function User() {
            const user = await getUser(session?.user?.email);
            console.log(user[0].events);
            console.log(decodedSlug);
            const isRegistered = user[0].events.some(
                (event) => event === decodedSlug
            );
            setIsAlreadyRegistered(isRegistered);
        }
        User();

        async function fetchEvent() {
            setLoading(true);
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: decodedSlug }),
            });
            const data = await response.json();
            if (data.body) {
                setEvent(data.body.event);
                setLoading(false);
            } else {
                console.error('Event not found');
                setLoading(false);
            }
        }
        fetchEvent();
    }, [session]);
    // Find the event where the name matches the slug
    // const event = eventsData.find((event) => event.name === decodedSlug);

    if (!event) {
        return <div>Event not found</div>;
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center gap-10 mt-10">
            {!loading ? (
                <>
                    <div className="w-1/2 flex justify-between items-center select-none">
                        <div>
                            <ul className="flex text-lg space-x-8 font-thin">
                                <Link
                                    href={`#gallery`}
                                    className={`cursor-pointer hover:text-red-600 `}
                                >
                                    Gallery
                                </Link>
                                <Link
                                    href="/blogs?filter=feature"
                                    scroll={false}
                                    className={`cursor-pointer hover:text-red-600 `}
                                >
                                    Featured
                                </Link>
                                <Link
                                    href="/blogs?filter=latest"
                                    scroll={false}
                                    className={`cursor-pointer hover:text-red-600 `}
                                >
                                    Latest
                                </Link>
                                <Link
                                    href="/blogs?filter=populor"
                                    scroll={false}
                                    className={`cursor-pointer hover:text-red-600 `}
                                >
                                    Most Popular
                                </Link>
                            </ul>
                        </div>
                    </div>
                    <div className="w-1/2 border p-10">
                        <div className="flex items-center justify-start gap-2 mb-10">
                            <HiUserCircle size={40} className="text-gray-400" />
                            <div className="flex w-full justify-between text-[12px]">
                                <p className="flex items-center gap-2 text-gray-500">
                                    <span>{event.clubName}</span>
                                    <span className="w-[4px] h-[4px] block rounded-full bg-black" />
                                    {new Date(event.dateTime).toDateString()}
                                    <span className="w-[4px] h-[4px] block rounded-full bg-black" />
                                    <span>Venue: {event.venue}</span>
                                </p>
                                <div className="relative">
                                    {!isAlreadyRegistered ? (
                                        <button
                                            className="bg-red-500 px-7 py-3 border border-gray-100 text-white hover:bg-red-700"
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                const response = await fetch(
                                                    '/api/events/rsvp',
                                                    {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type':
                                                                'application/json',
                                                        },
                                                        body: JSON.stringify({
                                                            eventId:
                                                                decodedSlug,
                                                            userId: session
                                                                ?.user?.id,
                                                        }),
                                                    }
                                                )
                                                    .then((res) => res.json())
                                                    .then((data) => {
                                                        if (data.success) {
                                                            alert(
                                                                'RSVP successful'
                                                            );
                                                            window.location.reload();
                                                        } else {
                                                            alert(
                                                                'RSVP failed'
                                                            );
                                                        }
                                                    });
                                            }}
                                        >
                                            RSVP
                                        </button>
                                    ) : (
                                        <p className="bg-red-500 px-7 py-3 border border-gray-100 text-white hover:bg-red-700">
                                            Registered
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold mb-5">
                            {event.name}
                        </h1>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: event.description,
                            }}
                        />
                        <div className="relative w-full h-[300px] mt-10">
                            <Image
                                src={event.cover}
                                alt={event.name}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>

                        <div className="w-full flex flex-col gap-3 mt-10">
                            <span className="w-full h-[1px] border" />
                            <div className="flex w-full justify-between">
                                <div className="flex gap-4">
                                    <div className="hover:text-red-500 cursor-pointer">
                                        <FaFacebookF />
                                    </div>
                                    <div className="hover:text-red-500 cursor-pointer">
                                        <FaXTwitter />
                                    </div>
                                    <div className="hover:text-red-500 cursor-pointer">
                                        <FaLinkedinIn />
                                    </div>
                                </div>
                                <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
                                    <span>{event.status}</span>
                                </div>
                            </div>
                            <span className="w-full h-[1px] border" />
                            <div className="flex justify-between text-sm text-gray-500">
                                <div className="flex gap-4">
                                    <span>
                                        {event.attendees?.length} attendees
                                    </span>
                                    <span>
                                        {event.registrations?.length}{' '}
                                        registrations
                                    </span>
                                </div>
                                <span className="flex items-center gap-2">
                                    {event.attendees?.length} <FcLike />
                                </span>
                            </div>
                        </div>
                    </div>
                    <ImageGrid />
                    <Footer />
                </>
            ) : (
                <div className="w-screen h-screen flex justify-center items-center flex-col gap-5">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500"></div>
                    loading
                </div>
            )}
        </div>
    );
};

export default Page;
