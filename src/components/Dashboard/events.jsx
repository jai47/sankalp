import { fetchClubEvents } from '@/actions/events/fetchEvents';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Events = ({ user, clubEvents, registeredEvents }) => {
    return (
        <div className="w-full px-10 py-6 overflow-auto">
            <h2 className="text-2xl font-bold mb-4">My Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {registeredEvents.length > 0 ? (
                    registeredEvents.map((event) => (
                        <div
                            key={event._id}
                            className="bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                        >
                            <div className="relative h-40 w-full">
                                <Image
                                    src={event.cover || '/default.jpg'}
                                    alt={event.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-1">
                                    {event.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {event.venue}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {new Date(
                                        event.dateTime
                                    ).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {event.clubName}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No registered events yet.</p>
                )}
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Club Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {clubEvents.length > 0 ? (
                    clubEvents.map((event) => (
                        <div
                            key={event._id}
                            className="bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                        >
                            <div className="relative h-40 w-full">
                                <Image
                                    src={event.cover || '/default.jpg'}
                                    alt={event.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-1">
                                    {event.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {event.venue}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {new Date(
                                        event.dateTime
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No events from club yet.</p>
                )}
            </div>
        </div>
    );
};

export default Events;
