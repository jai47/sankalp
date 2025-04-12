import Image from 'next/image';
import React from 'react';
import { CiHeart } from 'react-icons/ci';
import { HiUserCircle } from 'react-icons/hi2';
import { VscKebabVertical } from 'react-icons/vsc';
import { IoMdShareAlt } from 'react-icons/io';
import Link from 'next/link';

const Card = ({ event, link }) => {
    return (
        <div className="relative border h-96 w-96 cursor-pointer overflow-hidden">
            <Link
                href={link + encodeURI(event.id)}
                className="absolute w-full h-full bg-gray-800 opacity-0 scale-110 hover:opacity-50 hover:scale-100 duration-300 flex justify-center items-center z-10"
            >
                <span className="px-4 py-2 bg-white border border-white">
                    Read More
                </span>
            </Link>
            <div className="relative h-1/2 w-full">
                <Image
                    src={event.image}
                    alt="background"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="h-1/2 w-full flex flex-col justify-center gap-4 p-4">
                <div className="flex justify-between w-full">
                    <div className="flex items-center justify-start gap-2">
                        <HiUserCircle size={40} className="text-gray-400" />
                        <div className="flex flex-col text-[12px]">
                            <p>{event.author}</p>
                            <p className="flex items-center justify-center gap-2">
                                {new Date(event.date).toDateString()}
                                <span className="w-[4px] h-[4px] block rounded-full bg-black" />{' '}
                                <span>
                                    {parseInt(
                                        event?.description?.split(' ').length /
                                            150
                                    ) || 1}{' '}
                                    min
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="relative group">
                        {/* Share Button (Initially Hidden) */}
                        <Link
                            href="/"
                            target="_blank"
                            className="absolute left-0 top-0 w-28 h-10 flex justify-center items-center gap-4 bg-white text-gray-500 border shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            <IoMdShareAlt size={25} />
                            Share
                        </Link>

                        {/* Kebab Menu (Triggers Hover Effect) */}
                        <div className="cursor-pointer">
                            <VscKebabVertical size={24} />
                        </div>
                    </div>
                </div>
                <h2 className="font-semibold">{event.title}</h2>
                {event?.comments && (
                    <div className="flex flex-col gap-2 text-[12px]">
                        <span className="block h-[1px] w-full bg-gray-400" />
                        <div className="flex justify-between">
                            <div className="flex justify-center items-center gap-2">
                                <p>{event.comments.length} comments</p>
                                <p>{event.views} views</p>
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <p>{event.likes}</p>
                                <CiHeart />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
