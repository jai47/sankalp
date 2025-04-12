'use client';
import useParams from '@/hooks/useParams';
import React from 'react';
import Club from './Club/Club';
import Users from './Users/Users';
import SocialMedia from './SocialMedia/SocialMedia';

const AdminMainSection = () => {
    const section = useParams('section') || 'Dashboard';

    switch (section) {
        case 'Dashboard':
            return <div>Dashboard</div>;
        case 'Profile':
            return <div>Profile</div>;
        case 'Club':
            return <Club />;
        case 'Blogs':
            return <div>Blogs</div>;
        case 'Users':
            return <Users />;
        case 'SocialMedia':
            return <SocialMedia />;
        default:
            return <div>under devlopement</div>;
    }
};

export default AdminMainSection;
