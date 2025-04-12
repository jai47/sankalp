'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { HiUserCircle } from 'react-icons/hi2';

const Navbar = () => {
    const { data: session } = useSession();
    const pathname = usePathname();
    const socialLogoSize = 18;
    return (
        <nav className="w-full sticky top-0 bg-white shadow-sm flex justify-between items-center px-6 py-3 z-50">
            {/* Left Section - Logo and Brand Name */}
            <div className="ml-8 flex items-center space-x-5">
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={80}
                        height={20}
                        className="filter invert"
                    />
                </Link>
            </div>

            {/* Right Section - Social Icons and Login */}
            <div className="mr-8 flex items-center space-x-8">
                <div className="mr-5 flex text-sm space-x-14">
                    <Link
                        href="/"
                        className={`${
                            pathname == '/'
                                ? 'text-red-500'
                                : 'text-gray-500 hover:text-red-500'
                        } font-semibold`}
                    >
                        HOME
                    </Link>
                    <Link
                        href="/blogs"
                        className={`${
                            pathname == '/blogs'
                                ? 'text-red-500'
                                : 'text-gray-500'
                        } font-semibold hover:text-red-500`}
                    >
                        BLOG
                    </Link>
                    <Link
                        href="/events"
                        className={`${
                            pathname == '/events'
                                ? 'text-red-500'
                                : 'text-gray-500'
                        } font-semibold hover:text-red-500`}
                    >
                        EVENT
                    </Link>
                    <Link
                        href="/clubs"
                        className={`${
                            pathname == '/clubs'
                                ? 'text-red-500'
                                : 'text-gray-500'
                        } font-semibold hover:text-red-500`}
                    >
                        CLUBS
                    </Link>
                    <Link
                        href="/about"
                        className={`${
                            pathname == '/about'
                                ? 'text-red-500'
                                : 'text-gray-500'
                        } font-semibold hover:text-red-500`}
                    >
                        ABOUT
                    </Link>
                </div>
                <a
                    href="https://www.facebook.com/EchelonInstituteOfTechnologyOfficial"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaFacebookF
                        size={socialLogoSize}
                        className="hover:text-blue-700 duration-100"
                    />
                </a>
                <a
                    href="https://x.com/echeloncollege"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaTwitter
                        size={socialLogoSize}
                        className="hover:text-blue-500 duration-100"
                    />
                </a>
                <a
                    href="https://www.youtube.com/@echeloninstituteoftechnology/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaYoutube
                        size={socialLogoSize}
                        className="hover:text-red-500 duration-100"
                    />
                </a>
                <div>
                    {!session ? (
                        <button
                            onClick={() => signIn('google')}
                            className="flex items-center space-x-5"
                        >
                            <HiUserCircle
                                size={28}
                                className="hover:text-red-500 duration-100"
                            />
                            <span className="text-gray-500 hover:text-red-500">
                                Log In
                            </span>
                        </button>
                    ) : (
                        <Link
                            href="/dashboard"
                            className="flex items-center space-x-5"
                        >
                            <img
                                src={session?.user.image}
                                alt="user"
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="text-gray-500 hover:text-red-500">
                                {session?.user.name}
                            </span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
