'use client';
import Image from 'next/image';
import { HiUserCircle } from 'react-icons/hi2';
import { FaFacebookF, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaLinkedinIn } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import React, { use } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer/footer';
import { useSession } from 'next-auth/react';
import { getUser } from '@/actions/users/getUser';
import { toast } from 'react-toastify';
import HeroTimeRemaining from '@/components/Events/timeRemaining';
import BookmarkButton from '@/components/Events/Bookmark';
import { FaCheck } from 'react-icons/fa';

// function ImageGrid() {
//     const images = [
//         {
//             src: 'https://images.unsplash.com/photo-1541845157-a6d2d100c931?auto=format&fit=crop&w=1350&q=80',
//             className: '',
//         },
//         {
//             src: 'https://images.unsplash.com/photo-1588282322673-c31965a75c3e?auto=format&fit=crop&w=1351&q=80',
//             className: '',
//         },
//         {
//             src: 'https://images.unsplash.com/photo-1588117472013-59bb13edafec?auto=format&fit=crop&w=500&q=60',
//             className: 'row-span-2',
//         },
//         {
//             src: 'https://images.unsplash.com/photo-1587588354456-ae376af71a25?auto=format&fit=crop&w=1350&q=80',
//             className: 'col-span-2',
//         },
//         {
//             src: 'https://images.unsplash.com/photo-1558980663-3685c1d673c4?auto=format&fit=crop&w=1000&q=60',
//             className: '',
//         },
//         {
//             src: 'https://images.unsplash.com/photo-1724963843259-3b0727c53b0c?auto=format&fit=crop&w=1000&q=60',
//             className: '',
//         },
//         {
//             src: 'https://images.unsplash.com/photo-1588499756884-d72584d84df5?auto=format&fit=crop&w=2134&q=80',
//             className: 'row-span-2',
//         },
//         {
//             src: 'https://images.unsplash.com/photo-1588492885706-b8917f06df77?auto=format&fit=crop&w=1951&q=80',
//             className: 'col-span-2 row-span-2',
//         },
//         {
//             src: 'https://images.unsplash.com/photo-1731328667980-9ea08c5edc07?auto=format&fit=crop&w=1951&q=80',
//             className: '',
//         },
//     ];

//     return (
//         <section className="w-1/2 mx-auto" id="gallery">
//             <h2 className="text-3xl font-bold mb-5">Gallery</h2>
//             <div className="grid grid-cols-3 gap-4 auto-rows-[200px]">
//                 {images.map((img, index) => (
//                     <div
//                         key={index}
//                         className={`overflow-hidden rounded-lg ${img.className}`}
//                     >
//                         <img
//                             src={img.src}
//                             alt="Gallery"
//                             className="w-full h-full object-cover"
//                         />
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// }

const Page = ({ params }) => {
    const { data: session } = useSession();
    const { slug } = use(params);
    const decodedSlug = decodeURIComponent(slug);
    const [event, setEvent] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [isAlreadyRegistered, setIsAlreadyRegistered] = React.useState(false);

    React.useEffect(() => {
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
                setLoading(false);
            }
        }
        async function User() {
            const user = await getUser(session?.user?.email);
            const isRegistered = user[0].events.some(
                (event) => event === decodedSlug
            );
            setIsAlreadyRegistered(isRegistered);
        }
        fetchEvent();
        if (!session?.user?.email) return;
        User();
    }, [session]);

    if (!event) {
        return <div>Event not found</div>;
    }

    return !loading ? (
        <div className="w-screen h-fit flex flex-col items-center gap-10">
            <div className="relative w-full h-[55vh]">
                <Image
                    src={event.cover}
                    alt={event.name}
                    layout="fill"
                    objectFit="cover"
                />
                <div className="absolute w-full h-full bg-black opacity-50">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-5">
                        <h1 className="text-white text-9xl capitalize font-thin select-none">
                            {event.name}
                        </h1>
                        <HeroTimeRemaining data={event.dateTime} />
                    </div>
                </div>
            </div>
            <div className="w-4/5 h-[30vh] grid grid-cols-3 rounded-sm gap-4 transform -translate-y-[50%] bg-white p-2">
                <div className="relative h-full col-span-1 rounded-sm overflow-hidden">
                    <Image
                        src={event.cover}
                        alt="Event Image 1"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="h-full col-span-1 pl-4 relative">
                    <p className="text-3xl font-light">{event.name}</p>

                    {/* Scrollable description container */}
                    <div className="h-1/2 overflow-y-scroll pr-2 mt-2">
                        <p className="font-thin">
                            {event.description?.slice(0, 200)}{' '}
                            <Link
                                href={'#details'}
                                className="text-blue-700 text-sm"
                            >
                                ...view more
                            </Link>
                        </p>
                    </div>

                    {/* Footer date */}
                    <p className="absolute bottom-5 text-sm text-gray-700">
                        {new Date(event.dateTime).toDateString()}
                    </p>
                </div>
                <div className="h-full col-span-1 flex justify-end gap-10">
                    <div className="relative flex flex-col-reverse gap-5">
                        <p className="text-sm text-gray-500">
                            Get enroll youself now by clicking the above button!
                        </p>
                        {!isAlreadyRegistered ? (
                            <button
                                className="bg-red-500 w-1/2 px-7 py-3 rounded-sm border border-gray-100 text-white hover:bg-red-700"
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
                                                eventId: decodedSlug,
                                                userId: session?.user?.id,
                                            }),
                                        }
                                    )
                                        .then((res) => res.json())
                                        .then((data) => {
                                            if (data.success) {
                                                toast.success(
                                                    'RSVP successful'
                                                );
                                                setTimeout(() => {
                                                    window.location.reload();
                                                }, 2000);
                                            } else {
                                                alert('RSVP failed');
                                            }
                                        });
                                }}
                            >
                                RSVP
                            </button>
                        ) : (
                            <p className="bg-red-500 w-1/2 px-5 py-3 border border-gray-100 text-white hover:bg-red-700 flex flex-row-reverse items-center justify-center gap-5 cursor-not-allowed">
                                <span>Registered</span> <FaCheck />
                            </p>
                        )}
                        <p>
                            Already {event.registrations?.length} enrolled for
                            this event
                        </p>
                        <div className="absolute top-5 flex flex-col gap-2">
                            <div>
                                <span className="text-sm text-gray-400">
                                    Organised by
                                </span>{' '}
                                <span className="text-lg text-black border-b">
                                    {event.clubName}
                                </span>{' '}
                            </div>
                            <div className="flex gap-3 items-center text-sm text-gray-500">
                                <FaMapMarkerAlt
                                    size={17}
                                    className="text-gray-400"
                                />{' '}
                                {event.venue}
                            </div>
                        </div>
                    </div>
                    <BookmarkButton cookie={'events'} value={event._id} />
                </div>
            </div>
            <div className="w-11/12 h-fit flex flex-col items-center transform -translate-y-14">
                <div className="w-11/12">
                    <p className="text-lg font-light text-gray-400 flex gap-10">
                        <span id="details">Details</span>
                        <span>Gallery</span>
                        <span>Gallery</span>
                        <span>Gallery</span>
                    </p>
                </div>
                <div className="h-[1px] w-11/12 bg-gray-400 mt-2" />
                <div className="w-11/12">{event.description}</div>
                <div className="w-11/12 flex flex-col gap-3 mt-10">
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
                        <div className="flex justify-center items-center gap-2 text-sm capitalize text-gray-500">
                            <span>{event.status}</span>
                        </div>
                    </div>
                    <span className="w-full h-[1px] border" />
                    <div className="flex justify-between text-sm text-gray-500">
                        <div className="flex gap-4">
                            <span>{event.attendees?.length} attendees</span>
                            <span>
                                {event.registrations?.length} registrations
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    ) : (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-2 rounded-full animate-spin border-gray-400 border-b-white"></div>
                <p className="text-gray-600 text-sm">
                    Getting event details for you...
                </p>
            </div>
        </div>
    );
};

export default Page;
