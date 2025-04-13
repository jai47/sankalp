'use client';
import { getClubs } from '@/actions/clubs/getClubs';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Page = ({ params }) => {
    const { slug } = React.use(params);
    const decodedSlug = decodeURIComponent(slug);
    const [club, setClub] = useState(null);

    useEffect(() => {
        async function getClub() {
            const [club] = await Promise.all([getClubs(decodedSlug)]);
            console.log(club);
            if (club) {
                setClub(club[0]);
            } else {
                toast.error("Club can't be load this time, try again later :(");
            }
        }

        getClub();
    }, [decodedSlug]);
    if (!club) {
        return <div>Loading...</div>;
    }
    return <div>{club?.name}</div>;
};

export default Page;
