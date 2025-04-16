import React from 'react';
import { redirect } from 'next/navigation';
import AdminRednderer from '@/components/Sankalp/AdminRednderer';
import Sidebar from '@/components/Sankalp/sidebar';
import { auth } from '../../../../auth';
import { getUser } from '@/actions/users/getUser';
import { getClubs } from '@/actions/clubs/getClubs';

const Page = async () => {
    const session = await auth();

    if (!session) {
        return (
            <p className="w-screen h-screen flex justify-center items-center">
                Loading...
            </p>
        ); // Prevents redirect before session is available
    }

    const user = await getUser(session?.user?.email);

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-2 rounded-full animate-spin border-gray-400 border-b-white"></div>
                    <p className="text-gray-600 text-sm">
                        Loading, please wait...
                    </p>
                </div>
            </div>
        ); // Prevents redirect before user or club is available
    }

    const club = await getClubs(user[0]?.clubId?.id);
    // Check if the user is a superAdmin
    if (user[0].role !== 'superAdmin' && user[0].role !== 'admin') {
        redirect('/auth/error?error=You are not authorized to view this page');
    }

    return (
        <div className="flex h-screen w-screen">
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <section className="w-full h-fit">
                <AdminRednderer user={user} club={club} />
            </section>
        </div>
    );
};

export default Page;
