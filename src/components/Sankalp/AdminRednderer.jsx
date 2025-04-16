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
                console.log(membersData);
                setMembers(membersData.users);
            }
        };
        getClubEvents();
    }, [club]);

    return (
        <>
            {section === 'Dashboard' && <Dashboard user={user} club={club} />}
            {section === 'Club' && (
                <Club user={user} club={club} clubEvents={clubEvents} />
            )}
            {section === 'Blogs' && <Blogs />}
            {section === 'Members' && (
                <Members
                    user={user}
                    club={club}
                    members={members}
                    admins={admins}
                />
            )}
            {section === 'Chat' && <Chat />}
        </>
    );
};

export default AdminRednderer;
