import Image from 'next/image';
import React from 'react';
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
} from 'react-icons/fa';

const Dashboard = ({ club }) => {
    const data = club[0];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
            {/* Banner Section */}
            <div className="relative h-[40vh] w-full">
                <Image
                    src={data.banner}
                    alt="Club Banner"
                    layout="fill"
                    objectFit="cover"
                    className="grayscale"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center p-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3">
                        <Image
                            src={data.logo}
                            alt="Club Logo"
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                    <h1 className="text-white text-4xl font-bold">
                        {data.name}
                    </h1>
                    <p className="text-white mt-2 max-w-2xl">
                        {data.description}
                    </p>
                </div>
            </div>

            {/* Club Summary */}
            <div className="px-6 py-8 grid md:grid-cols-3 gap-6">
                {/* Quick Stats */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-purple-600 mb-4">
                        Stats
                    </h2>
                    <p>
                        <strong>Members:</strong> {data.members.length}
                    </p>
                    <p>
                        <strong>Events:</strong> {data.events.length}
                    </p>
                    <p>
                        <strong>Blogs:</strong> {data.blogs.length}
                    </p>
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-purple-600 mb-4">
                        Contact
                    </h2>
                    <p>
                        <strong>Email:</strong> {data.contactEmail}
                    </p>
                    <p>
                        <strong>Phone:</strong> {data.contactPhone}
                    </p>
                    <p>
                        <strong>Website:</strong>{' '}
                        <a
                            href={data.website}
                            className="text-purple-600 underline"
                        >
                            {data.website}
                        </a>
                    </p>
                </div>

                {/* Social Media */}
                <div className="flex gap-4 text-purple-600 text-xl">
                    <a
                        href={data.socialMediaLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaFacebookF className="hover:text-purple-800 transition" />
                    </a>
                    <a
                        href={data.socialMediaLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaTwitter className="hover:text-purple-800 transition" />
                    </a>
                    <a
                        href={data.socialMediaLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaInstagram className="hover:text-purple-800 transition" />
                    </a>
                    <a
                        href={data.socialMediaLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaLinkedinIn className="hover:text-purple-800 transition" />
                    </a>
                </div>
            </div>

            {/* Vision & Mission Section */}
            <div className="px-6 py-6 grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-purple-600 mb-2">
                        Vision
                    </h2>
                    <p>{data.vision}</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-purple-600 mb-2">
                        Mission
                    </h2>
                    <p>{data.mission}</p>
                </div>
            </div>

            {/* Goals & Values */}
            <div className="px-6 py-6 grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-purple-600 mb-2">
                        Goals
                    </h2>
                    <p>{data.goals}</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-purple-600 mb-2">
                        Values
                    </h2>
                    <p>{data.values}</p>
                </div>
            </div>

            {/* Achievements */}
            <div className="px-6 py-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-purple-600 mb-2">
                        Achievements
                    </h2>
                    <p>{data.achievements}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
