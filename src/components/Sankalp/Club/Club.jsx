import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import EventDetails from './EventDetails';

const EventCard = ({ event, onClose, setEvent }) => {
    return (
        <div className="bg-white rounded-md overflow-hidden shadow-md transition hover:shadow-lg border border-gray-200 flex flex-col">
            {/* Cover Image with Image component */}
            <div className="relative w-full h-44">
                <Image
                    src={event.cover}
                    alt={`${event.name} cover`}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col justify-between h-full">
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-gray-800">
                        {event.name}
                    </h2>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {event.description}
                    </p>

                    <div className="text-sm text-gray-500">
                        <p>
                            <strong>Venue:</strong> {event.venue}
                        </p>
                        <p>
                            <strong>Status:</strong> {event.status}
                        </p>
                        <p>
                            <strong>Date:</strong>{' '}
                            {new Date(event.dateTime).toLocaleDateString()}
                        </p>
                        {event.status !== 'upcoming' ? (
                            <p>
                                <strong>Attendees:</strong>{' '}
                                {event.attendees?.length}
                            </p>
                        ) : (
                            <p>
                                <strong>Registrations:</strong>{' '}
                                {event.registrations?.length}
                            </p>
                        )}
                    </div>
                </div>

                {/* Button */}
                <button
                    onClick={() => {
                        setEvent(event);
                        onClose();
                    }}
                    className="mt-4 w-full py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

const Club = ({ user, club, clubEvents }) => {
    const [showModal, setShowModal] = useState(false);
    const [allEvents, setAllEvents] = useState([]);
    const [eventDetails, setEventDetails] = useState({});
    const [disabled, setDisabled] = useState(false);
    const [showEventModal, setEventModal] = useState(false);
    const [event, setEvent] = useState({});
    useEffect(() => {
        //updating states with the props passed from the parent component
        setAllEvents(clubEvents);
        setEventDetails({
            name: '',
            description: '',
            dateTime: '',
            venue: '',
            status: '',
            cover: '',
            clubName: user[0].clubId.name,
            clubId: user[0].clubId.id,
        });
    }, [clubEvents]);

    const handleCreateEvent = async (e) => {
        e.preventDefault();

        try {
            setDisabled(true);

            const response = await fetch('/api/sankalp/events/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventDetails),
            });

            const data = await response.json();

            if (data.success) {
                toast.success(data.message);
                setShowModal(false);
                setAllEvents((prevEvents) => [...prevEvents, eventDetails]);

                // Reset event details
                setEventDetails({
                    name: '',
                    description: '',
                    dateTime: '',
                    venue: '',
                    status: '',
                    cover: '',
                    clubName: '',
                    clubId: '',
                });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while creating the event.');
        } finally {
            setDisabled(false);
        }
    };

    return (
        <div className="h-screen flex flex-col">
            {showEventModal && (
                <EventDetails
                    event={event}
                    onClose={() => setEventModal(false)}
                />
            )}
            <h1 className="text-2xl font-bold text-center my-4">
                Upcomming Events
            </h1>
            {allEvents.length > 0 ? (
                <div className="w-full grid grid-cols-5 p-4 gap-4">
                    {allEvents
                        .filter((event) => event.status === 'upcoming')
                        .map((event, index) => (
                            <EventCard
                                key={index}
                                event={event}
                                onClose={() => setEventModal(true)}
                                setEvent={(e) => setEvent(e)}
                            />
                        ))}
                </div>
            ) : (
                <div className="text-center">No events available</div>
            )}
            <h1 className="text-2xl font-bold text-center my-4">Past Events</h1>
            <div className="w-full grid grid-cols-5 p-4 gap-4">
                {allEvents
                    .filter((event) => event.status !== 'upcoming')
                    .map((event, index) => (
                        <EventCard
                            key={index}
                            event={event}
                            onClose={() => setEventModal(true)}
                            setEvent={(e) => setEvent(e)}
                        />
                    ))}
            </div>

            {/* modal for creating event */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded">
                        <h2 className="text-lg font-bold">Create Event</h2>
                        <form onSubmit={handleCreateEvent}>
                            <input
                                type="text"
                                placeholder="Event Name"
                                className="border p-2 mb-2 w-full"
                                value={eventDetails.name}
                                onChange={(e) =>
                                    setEventDetails({
                                        ...eventDetails,
                                        name: e.target.value,
                                    })
                                }
                                disabled={disabled}
                            />
                            <input
                                type="datetime-local"
                                className="border p-2 mb-2 w-full"
                                value={eventDetails.dateTime}
                                onChange={(e) =>
                                    setEventDetails({
                                        ...eventDetails,
                                        dateTime: e.target.value,
                                    })
                                }
                                disabled={disabled}
                            />
                            <textarea
                                placeholder="Event Description"
                                className="border p-2 mb-2 w-full"
                                value={eventDetails.description}
                                onChange={(e) => {
                                    setEventDetails({
                                        ...eventDetails,
                                        description: e.target.value,
                                    });
                                }}
                                disabled={disabled}
                            ></textarea>
                            <input
                                type="text"
                                placeholder="Event Venue"
                                className="border p-2 mb-2 w-full"
                                value={eventDetails.venue}
                                onChange={(e) => {
                                    setEventDetails({
                                        ...eventDetails,
                                        venue: e.target.value,
                                    });
                                }}
                                disabled={disabled}
                            />
                            <select
                                className="border p-2 mb-2 w-full"
                                value={eventDetails.status}
                                onChange={(e) =>
                                    setEventDetails({
                                        ...eventDetails,
                                        status: e.target.value,
                                    })
                                }
                                disabled={disabled}
                            >
                                <option value="">Select Status</option>
                                {eventDetails.dateTime &&
                                new Date(eventDetails.dateTime) > new Date() ? (
                                    <option value="upcoming">Upcoming</option>
                                ) : (
                                    <option value="upcoming" disabled>
                                        Upcoming
                                    </option>
                                )}
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                                <option value="canceled">Canceled</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Event Cover URL"
                                className="border p-2 mb-2 w-full"
                                value={eventDetails.cover}
                                onChange={(e) =>
                                    setEventDetails({
                                        ...eventDetails,
                                        cover: e.target.value,
                                    })
                                }
                                disabled={disabled}
                            />
                            {eventDetails.cover && (
                                <img
                                    src={eventDetails.cover}
                                    alt="Event Cover"
                                    className="w-full h-40 object-cover mb-2 rounded"
                                />
                            )}
                            <p>
                                {eventDetails.clubId}, {eventDetails.clubName}
                            </p>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded"
                            >
                                Create
                            </button>
                        </form>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-2 text-red-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <button
                className="fixed right-10 bottom-10 w-fit h-16 py-2 px-5 bg-purple-200 rounded hover:bg-purple-100"
                onClick={() => setShowModal(true)}
            >
                Create Event
            </button>
        </div>
    );
};

export default Club;
