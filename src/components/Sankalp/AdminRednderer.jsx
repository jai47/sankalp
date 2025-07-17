'use client';
import React, { useEffect, useState } from 'react';
import Chat from '../Dashboard/chat';
import Members from './Members';
import Blogs from './Blogs/Blogs';
import Club from './Club/Club';
import Dashboard from './Dashboard';
import useParams from '@/hooks/useParams';
import { fetchClubEvents } from '@/actions/events/fetchEvents';
import { getSpecificUsers } from '@/actions/users/getUser';

const AdminRednderer = ({ user, club }) => {
    const section = useParams('section') || 'Dashboard';
    const [clubEvents, setClubEvents] = useState([]);
    const [members, setMembers] = useState([]);
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const getClubEvents = async () => {
            const [events, adminsData, membersData] = await Promise.all([
                fetchClubEvents(club[0]?._id),
                getSpecificUsers(club[0]?.admins),
                getSpecificUsers(club[0]?.members),
            ]);
            if (events) {
                setClubEvents(events);
            }
            if (adminsData.success) {
                setAdmins(adminsData.users);
            }
            if (membersData.success) {
                setMembers(membersData.users);
            }
        };
        getClubEvents();
    }, [club]);

    switch (section) {
        case 'Dashboard':
            return <Dashboard user={user} club={club} />;
        case 'Club':
            return <Club user={user} club={club} clubEvents={clubEvents} />;
        case 'Blogs':
            return <Blogs />;
        case 'Members':
            return (
                <Members
                    user={user}
                    club={club}
                    members={members}
                    admins={admins}
                />
            );
        case 'Chat':
            return <Chat />;
        default:
            return <Dashboard user={user} club={club} />;
    }
};

export default AdminRednderer;
