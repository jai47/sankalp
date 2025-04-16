import React from 'react';
import Image from 'next/image';
import { FaCrown } from 'react-icons/fa';

const Members = ({ user, club, members = [], admins = [] }) => {
    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Club Members —{' '}
                <span className="text-red-500">{club?.name}</span>
            </h1>

            {/* Admins */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">
                    Admins ({admins.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {admins.map((admin) => (
                        <UserCard
                            key={admin.email}
                            user={admin}
                            role="Admin"
                            isAdmin
                        />
                    ))}
                </div>
            </section>

            {/* Members */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">
                    Members ({members.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {members.map((member) => (
                        <UserCard
                            key={member.email}
                            user={member}
                            role="Member"
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

const UserCard = ({ user, role, isAdmin = false }) => {
    return (
        <div className="bg-white rounded-lg shadow hover:shadow-md transition-all p-4 flex items-center gap-4 border border-gray-100">
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                    src={user.image || '/default-user.jpg'}
                    alt={user.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    {user.name}
                    {isAdmin && (
                        <FaCrown className="text-yellow-400" title="Admin" />
                    )}
                </h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <span className="text-xs text-white bg-blue-500 px-2 py-0.5 rounded mt-1 inline-block">
                    {role}
                </span>
            </div>
        </div>
    );
};

export default Members;
