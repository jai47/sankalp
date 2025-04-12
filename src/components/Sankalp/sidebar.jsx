'use client';
import React, { useState, useRef, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaBlogger } from 'react-icons/fa6';
import {
    FaUser,
    FaUsers,
    FaCertificate,
    FaEnvelope,
    FaSignOutAlt,
} from 'react-icons/fa';
import Link from 'next/link';
import useParams from '@/hooks/useParams';

const Sidebar = () => {
    const section = useParams('section') || 'Dashboard';
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

    return (
        <aside
            className="bg-gray-50 py-4 px-3 border-r h-full relative transition-all duration-100"
            style={{ width: `${sidebarWidth}px` }}
        >
            <ul className="flex flex-col gap-3">
                <button
                    className="p-5 rounded-lg hover:bg-purple-200"
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
                        name: 'Dashboard',
                        section: 'Dashboard',
                        icon: <MdSpaceDashboard />,
                    },
                    {
                        name: 'Profile',
                        section: 'Profile',
                        icon: <FaUser />,
                    },
                    {
                        name: 'My Club',
                        section: 'Club',
                        icon: <FaCertificate />,
                    },
                    {
                        name: 'Blogs',
                        section: 'Blogs',
                        icon: <FaBlogger />,
                    },
                    {
                        name: 'Members',
                        section: 'Members',
                        icon: <FaUsers />,
                    },
                    {
                        name: 'Chat Room',
                        section: 'Chat',
                        icon: <FaEnvelope />,
                    },
                ].map((item) => (
                    <Link
                        key={item.section}
                        href={`?section=${item.section}`}
                        scroll={false}
                        className={`flex items-center p-5 gap-4 font-bold rounded-lg hover:bg-purple-200 ${
                            section === item.section
                                ? 'bg-purple-200 text-purple-500'
                                : ''
                        }`}
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
                <li
                    className="flex items-center p-5 gap-4 font-bold rounded-lg text-purple-500 hover:bg-purple-200 cursor-pointer"
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
    );
};

export default Sidebar;
