import React from 'react';
import { auth } from '../../../../auth';
import Sidebar from '@/components/Admin/sidebar';
import AdminMainSection from '@/components/Admin/adminMainSection';
import { getUser } from '@/actions/users/getUser';

const page = async () => {
    const session = await auth();

    const user = await getUser(session?.user?.email);

    if (!session) {
        return (
            <div className="flex h-screen justify-center items-center">
                <h1 className="text-2xl font-bold">Please login to continue</h1>
            </div>
        );
    }
    if (user[0].role !== 'superAdmin') {
        return (
            <div className="flex h-screen justify-center items-center">
                <h1 className="text-2xl font-bold">You are not authorized</h1>
            </div>
        );
    }

    return (
        <div className="flex h-screen">
            <Sidebar />
            <AdminMainSection />
        </div>
    );
};

export default page;
