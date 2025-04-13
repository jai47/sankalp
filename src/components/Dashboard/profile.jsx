import React from 'react';
import Parallex from '../Parallex';

const Profile = ({ user }) => {
    const userData = user[0];

    return (
        <div className="w-full h-full bg-white p-6 rounded-xl shadow-xl">
            {/* Header with Cover and Profile Image */}
            <div className="relative mb-24">
                <Parallex
                    image="/bg1.jpeg"
                    desc="View all your profile details"
                    heading="My Profile"
                    className="h-[25vh] w-full rounded-xl"
                />
                <img
                    src={userData?.image || 'user'}
                    alt="Profile"
                    className="rounded-full absolute bottom-[-70px] left-24 transform -translate-x-1/2 w-36 h-36 border-4 border-white shadow-lg object-cover"
                />
            </div>

            {/* User Info Card */}
            <div className="w-full bg-gray-50 rounded-xl p-6 shadow flex flex-col md:flex-row gap-8">
                <div className="flex flex-col gap-3 text-gray-800 w-full md:w-1/2">
                    <h2 className="text-2xl font-semibold">
                        {userData?.name?.split(' ')[1] || 'User'}
                    </h2>
                    <p className="text-sm text-gray-600">{userData?.email}</p>
                    <p className="text-sm">
                        <span className="font-semibold">Role:</span>{' '}
                        {userData?.role}
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold">Club:</span>{' '}
                        {userData?.clubId?.name || 'None'}
                    </p>
                </div>

                <div className="flex flex-col gap-4 text-gray-800 w-full md:w-1/2">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
                        <StatCard
                            label="Events Registered"
                            value={user[0]?.events?.length || 0}
                        />
                        <StatCard
                            label="Certificates Earned"
                            value={user[0]?.certificate?.length || 0}
                        />
                        <StatCard
                            label="Comments"
                            value={user[0]?.activity?.comments?.length || 0}
                        />
                        <StatCard
                            label="Bookmarks"
                            value={user[0]?.activity?.bookmarks?.length || 0}
                        />
                        <StatCard
                            label="Likes"
                            value={user[0]?.activity?.likes?.length || 0}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ label, value }) => (
    <div className="bg-white rounded-xl shadow-md h-28 w-28 p-2 flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300">
        <p className="text-2xl font-bold text-red-500 h-1/2">{value}</p>
        <p className="text-sm text-gray-500 h-1/2">{label}</p>
    </div>
);

export default Profile;
