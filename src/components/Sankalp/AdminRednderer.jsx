'use client';
import React from 'react';
import Chat from '../Dashboard/chat';
import Members from './Members';
import Blogs from './Blogs/Blogs';
import Club from './Club/Club';
import Profile from './Profile';
import Dashboard from './Dashboard';
import useParams from '@/hooks/useParams';

const AdminRednderer = ({ user, club }) => {
    const section = useParams('section') || 'Dashboard';

    return (
        <>
            {section === 'Dashboard' && <Dashboard user={user} club={club} />}
            {section === 'Profile' && <Profile user={user} club={club} />}
            {section === 'Club' && <Club user={user} club={club} />}
            {section === 'Blogs' && <Blogs />}
            {section === 'Members' && <Members user={user} club={club} />}
            {section === 'Chat' && <Chat />}
        </>
    );
};

export default AdminRednderer;
