'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import useParams from '@/hooks/useParams';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoBookmarks } from 'react-icons/io5';
import {
    FaUser,
    FaCalendarAlt,
    FaUsers,
    FaCertificate,
    FaEnvelope,
    FaSignOutAlt,
} from 'react-icons/fa';
import Overview from '@/components/Dashboard/overview';
import { getUser } from '@/actions/users/getUser';

const Page = () => {
    const { data: session } = useSession();
    const [user, setUser] = useState({});
    const section = useParams('section') || 'Profile';

    const [sidebarWidth, setSidebar] = useState(); // Default width
    const isResizing = useRef(false);
    const minWidth = 80; // Collapsed width
    const snapWidth = 200; // Snap threshold

    const startResizing = (e) => {
        e.preventDefault();
        isResizing.current = true;
        document.addEventListener('mousemove', handleResizing);
        document.addEventListener('mouseup', stopResizing);
    };

    const handleResizing = (e) => {
        if (isResizing.current) {
            let newWidth = e.clientX; // Capture cursor position
            if (newWidth < snapWidth) {
                newWidth = minWidth; // Snap to minWidth
            }
            setSidebarWidth(newWidth);
        }
    };

    const setSidebarWidth = (width) => {
        if (width < minWidth) {
            width = minWidth; // Ensure minimum width
        }
        setSidebar(width);
        localStorage.setItem('sidebarWidth', width); // Save to localStorage
    };

    const stopResizing = () => {
        isResizing.current = false;
        document.removeEventListener('mousemove', handleResizing);
        document.removeEventListener('mouseup', stopResizing);
    };
    // Load sidebar width from localStorage on mount
    useEffect(() => {
        const savedWidth =
            parseInt(localStorage.getItem('sidebarWidth')) || 250;
        setSidebarWidth(savedWidth < snapWidth ? minWidth : savedWidth);
    }, []);

    useEffect(() => {
        if (sidebarWidth < snapWidth) {
            setSidebarWidth(minWidth); // Auto-snap if below threshold
        }
    }, [sidebarWidth]);

    useEffect(() => {
        async function fetchUser() {
            const user = await getUser(session?.user?.email);
            if (user) {
                setUser(user);
            }
        }
        if (session) {
            fetchUser();
        }
    }, [session]);

    if (!session) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex h-screen w-screen">
            {/* Sidebar */}
            <aside
                className="bg-gray-50 py-4 px-3 border-r h-full relative transition-all duration-100"
                style={{ width: `${sidebarWidth}px` }}
            >
                <ul className="flex flex-col gap-3">
                    <button
                        className="p-5 rounded-lg hover:bg-red-200"
                        onClick={() => {
                            if (sidebarWidth > minWidth) {
                                setSidebarWidth(minWidth);
                            } else {
                                setSidebarWidth(250);
                            }
                        }}
                    >
                        <RxHamburgerMenu />
                    </button>
                    {[
                        {
                            name: 'Profile',
                            section: 'Profile',
                            icon: <FaUser />,
                        },
                        {
                            name: 'Events',
                            section: 'Events',
                            icon: <FaCalendarAlt />,
                        },
                        { name: 'My Club', section: 'Club', icon: <FaUsers /> },
                        {
                            name: 'Certificates',
                            section: 'Certificates',
                            icon: <FaCertificate />,
                        },
                        {
                            name: 'Bookmarks',
                            section: 'Bookmarks',
                            icon: <IoBookmarks />,
                        },
                    ].map((item) => (
                        <Link
                            key={item.section}
                            href={`?section=${item.section}`}
                            scroll={false}
                            className={`${
                                section == item.section &&
                                'bg-red-200 text-red-500'
                            } flex items-center p-5 gap-4 font-bold rounded-lg hover:bg-red-200`}
                        >
                            {item.icon}
                            {sidebarWidth > minWidth && (
                                <span
                                    className={`${
                                        !(sidebarWidth > minWidth)
                                            ? 'hidden'
                                            : 'inline'
                                    }`}
                                >
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    ))}
                    <div
                        key={'Chat Room'}
                        href={`?section=Chat`}
                        // scroll={false}
                        className={`${
                            section == 'chat' && 'bg-red-200 text-red-500'
                        } flex items-center p-5 gap-4 font-bold rounded-lg hover:bg-red-200 cursor-pointer`}
                    >
                        <FaEnvelope />
                        {sidebarWidth > minWidth && (
                            <span
                                className={`${
                                    !(sidebarWidth > minWidth)
                                        ? 'hidden'
                                        : 'inline'
                                }`}
                            >
                                Chat Room
                            </span>
                        )}
                    </div>
                    <li
                        className="flex items-center p-5 gap-4 font-bold rounded-lg text-red-500 hover:bg-red-200 cursor-pointer"
                        onClick={() => signOut({ redirectTo: '/' })}
                    >
                        <FaSignOutAlt />
                        {sidebarWidth > minWidth && <span>Log Out</span>}
                    </li>
                </ul>

                {/* Resize Handle */}
                <div
                    className="absolute top-0 right-0 w-[1px] h-full cursor-col-resize bg-gray-100 hover:bg-gray-400"
                    onMouseDown={startResizing}
                ></div>
            </aside>

            {/* Main Content */}
            <section className="relative bg-gray-100  flex flex-col items-center pt-10 justify-center flex-grow">
                <span
                    className="absolute top-4 left-4 cursor-pointer bg-gray-100 rounded-full p-1 hover:bg-red-100"
                    onClick={() => {
                        history.back();
                    }}
                >
                    <IoIosArrowRoundBack size={25} />
                </span>
                <Overview section={section} user={user} />
            </section>
        </div>
    );
};

export default Page;
