import React, { useEffect } from 'react';
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
} from 'react-icons/fa';
import Image from 'next/image';
import { leaveClub } from '@/actions/clubs/joinClub';
import { getSpecificUsers } from '@/actions/users/getUser';

const Club = ({ user, club }) => {
    if (!club)
        return (
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-2 rounded-full animate-spin border-gray-400 border-b-gray-100"></div>
                    <p className="text-gray-600 text-sm">
                        Loading, please wait...
                    </p>
                </div>
            </div>
        );
    const [adminId, setAdminId] = React.useState([]);
    const [members, setMembers] = React.useState([]);

    const {
        name,
        description,
        vision,
        mission,
        values,
        goals,
        achievements,
        logo,
        socialMediaLinks,
        contactEmail,
        contactPhone,
        category,
    } = club;

    useEffect(() => {
        const fetchData = async () => {
            const [admins, members] = await Promise.all([
                getSpecificUsers(club.adminId),
                getSpecificUsers(club.members),
            ]);
            if (admins.success) {
                setAdminId(admins.users);
            } else {
                console.error('Error fetching admins:', admins.message);
            }
            if (members.success) {
                setMembers(members.users);
            } else {
                console.error('Error fetching members:', members.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="p-6 md:p-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
            {/* Left Column */}
            <div className="col-span-2 space-y-6">
                {/* Admin & Members */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="font-semibold text-lg mb-2">Admin</h2>
                    {adminId?.map((admin, idx) => (
                        <p key={idx}>
                            {admin.name} -{' '}
                            <span className="text-blue-600">{admin.email}</span>
                        </p>
                    ))}
                </div>

                <div className="bg-white p-4 rounded-lg shadow mt-4">
                    <h2 className="font-semibold text-lg mb-2">
                        Members ({members.length})
                    </h2>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                        {members.map((member, idx) => (
                            <li key={idx}>
                                {member.name} -{' '}
                                <span className="text-blue-600">
                                    {member.email}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Right Column */}
            <div className="col-span-1 space-y-4">
                <Image
                    src={logo}
                    alt={name}
                    width={150}
                    height={150}
                    className="rounded-xl object-cover"
                />
                <h1 className="text-3xl font-bold">{name}</h1>
                <p className="text-gray-600 mt-2 text-sm">{description}</p>
                <p className="text-sm mt-1 text-gray-500">
                    Category: {category}
                </p>

                {/* Vision, Mission, Contact + Social */}
                <div className="space-y-4">
                    <div>
                        <h2 className="font-semibold text-lg mb-1">Mission</h2>
                        <p>{mission}</p>
                    </div>
                    <div>
                        <h2 className="font-semibold text-lg mb-1">Vision</h2>
                        <p>{vision}</p>
                    </div>
                    <div>
                        <h2 className="font-semibold text-lg mb-1">Contact</h2>
                        <p>
                            Email:{' '}
                            <a
                                href={`mailto:${contactEmail}`}
                                className="text-blue-600 hover:underline"
                            >
                                {contactEmail}
                            </a>
                        </p>
                        <p>
                            Phone:{' '}
                            <a
                                href={`tel:${contactPhone}`}
                                className="text-blue-600 hover:underline"
                            >
                                {contactPhone}
                            </a>
                        </p>
                    </div>
                    <div>
                        <h2 className="font-semibold text-lg mb-2">
                            Social Media
                        </h2>
                        <div className="flex gap-4">
                            {socialMediaLinks?.facebook && (
                                <a
                                    href={socialMediaLinks.facebook}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FaFacebookF className="hover:text-blue-600" />
                                </a>
                            )}
                            {socialMediaLinks?.twitter && (
                                <a
                                    href={socialMediaLinks.twitter}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FaTwitter className="hover:text-blue-500" />
                                </a>
                            )}
                            {socialMediaLinks?.instagram && (
                                <a
                                    href={socialMediaLinks.instagram}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FaInstagram className="hover:text-pink-500" />
                                </a>
                            )}
                            {socialMediaLinks?.linkedin && (
                                <a
                                    href={socialMediaLinks.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FaLinkedinIn className="hover:text-blue-700" />
                                </a>
                            )}
                        </div>
                        <div className="w-full flex justify-end mt-4">
                            <button
                                onClick={async () => {
                                    const res = await leaveClub(user[0]?._id);
                                    if (res.success) {
                                        alert('Successfully left the club');
                                    }
                                }}
                                className="text-sm px-4 py-2 rounded-full bg-red-500 text-white"
                            >
                                Leave
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Club;
