import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Card = ({ id, image, title, registration, status, venue }) => {
    return (
        <Link
            href={'events/' + encodeURI(id)}
            scroll={false}
            className="border h-80 w-[30%] hover:scale-105 transition duration-200 cursor-pointer"
        >
            <div className="relative h-1/2 w-full">
                <Image
                    src={image}
                    alt="background"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="h-1/2 w-full flex flex-col justify-center gap-4 p-4">
                <h2 className="font-semibold">{title}</h2>
                <div className="flex flex-col gap-2 text-[12px]">
                    <span className="block h-[1px] w-full bg-gray-400" />
                    <div className="flex justify-between">
                        <div className="flex justify-center items-center gap-2">
                            <p>{registration} Registration</p>
                            <p>{status}</p>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <p>{venue}</p>
                            <FaMapMarkerAlt />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card;
