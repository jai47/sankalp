'use client';
import Parallex from '@/components/Parallex';
import Filter from '@/components/Blogs/filter';
import Cards from '@/components/Blogs/cards';
import Footer from '@/components/Footer/footer';
import useParams from '@/hooks/useParams';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const page = () => {
    const selected = useParams('filter');
    const [data, setData] = useState([]);
    const page = parseInt(useParams('page')) || 1;
    const itemsPerPage = 6; // Number of blogs per page

    // Pagination Logic
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);
    const hasNextPage = endIndex < data.length;
    const hasPrevPage = startIndex > 0;

    useEffect(() => {
        fetch('/api/blogs')
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setData(data.blogs);
                } else {
                    console.error('Failed to fetch blogs');
                }
            });
    }, []);

    return (
        <>
            {/* Hero Section */}
            <Parallex
                image="/bg1.jpeg"
                desc="Stay updated with the latest technical, cultural, and workshop blogs from various clubs."
                heading="Explore the Blogs"
            />

            {/* Blog List Section */}
            <section className="flex flex-col justify-center items-center w-screen h-fit mt-10 mb-10 gap-10">
                <Filter />
                <div className="w-1/2 flex flex-wrap justify-between gap-10 items-center">
                    {paginatedData.map((event, index) => (
                        <Cards key={index} event={event} link={'blogs/'} />
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
