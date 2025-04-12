import React from 'react';
import Parallex from '../Parallex';

const Profile = ({ user }) => {
    return (
        <div className="w-full h-full bg-white p-6 rounded-lg shadow-md">
            <div className="relative mb-20">
                <Parallex
                    image="/bg1.jpeg"
                    desc="Stay updated with the latest technical, cultural, and workshop blogs from various clubs."
                    heading="My profile"
                    className="h-[25vh] w-full rounded-[5px]"
                />
                <img
                    src={user[0]?.image || 'user'}
                    className="rounded-full absolute bottom-[-70px] left-24 transform -translate-x-1/2 w-36 h-36 border-4 border-white shadow-lg"
                />
            </div>
            <div className="w-full h-[55vh] bg-gray-100 rounded-[5px] flex p-2">
                <div className="bg-red-100 w-">
                    <h3 className="text-lg font-bold">
                        {user[0]?.name.split(' ')[1] || 'user'}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {user[0]?.email || 'user'}
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-bold">Club</span>:{' '}
                        {user[0]?.clubId?.name || 'user'}
                    </p>

                    <p className="text-sm text-gray-600">
                        <span className="font-bold">Role</span>:{' '}
                        {user[0]?.role || 'user'}
                    </p>
                    <p className="text-sm text-gray-600">
                        total registered in event:{' '}
                        {user[0]?.events?.length || 'user'}
                    </p>
                    <p className="text-sm text-gray-600">
                        total certificates earned:{' '}
                        {user[0]?.certificate?.length || 'user'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
