'use client';
import Parallex from '@/components/Parallex';
import Filter from '@/components/Blogs/filter';
import Cards from '@/components/Events/cards';
import Footer from '@/components/Footer/footer';
import useParams from '@/hooks/useParams';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const page = () => {
    const selected = useParams('filter');
    const page = parseInt(useParams('page')) || 1;
    const itemsPerPage = 6; // Number of blogs per page
    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const response = await fetch('/api/events');
            const data = await response.json();
            setEventData(data.body.events);
            setLoading(false);
            console.log(data.body.events);
        }
        fetchData();
    }, []);

    // Pagination Logic
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = eventData.slice(startIndex, endIndex);
    const hasNextPage = endIndex < eventData.length;
    const hasPrevPage = startIndex > 0;

    return (
        <>
            <Parallex
                image="/bg.jpeg"
                desc="Stay updated with the latest technical, cultural, and workshop blogs from various clubs."
                heading="Get track of the latest events"
            />
            {/* Blog List Section */}
            <section className="flex flex-col justify-center items-center w-screen h-fit mt-10 mb-10 gap-10">
                <Filter />
                <div className="w-1/2 flex flex-wrap justify-between gap-10 items-center">
                    {paginatedData.map((event, index) => (
                        <Cards
                            key={index}
                            link={'events/'}
                            event={{
                                id: event._id,
                                title: event.name,
                                image: event.cover,
                                date: event.dateTime,
                                author: event.clubName,
                                description: event.description,
                            }}
                        />
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center w-1/2 gap-10">
                    <Link
                        href={`?${selected ? `filter=${selected}&` : ''}page=${
                            page - 1
                        }`}
                        scroll={false}
                        className={`text-gray-500 px-8 py-2 border hover:bg-gray-200 ${
                            !hasPrevPage ? 'opacity-50 pointer-events-none' : ''
                        }`}
                    >
                        Back
                    </Link>
                    <Link
                        href={`?${selected ? `filter=${selected}&` : ''}page=${
                            page + 1
                        }`}
                        scroll={false}
                        className={`text-gray-500 px-8 py-2 border hover:bg-gray-200 ${
                            !hasNextPage ? 'opacity-50 pointer-events-none' : ''
                        }`}
                    >
                        Next
                    </Link>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default page;
