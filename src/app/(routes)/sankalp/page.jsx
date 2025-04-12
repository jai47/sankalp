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
    const club = await getClubs(user[0]?.clubId?.id);

    if (session?.user.role !== 'superAdmin') {
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
