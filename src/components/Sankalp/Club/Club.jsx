import { fetchClubEvents } from '@/actions/events/fetchEvents';
import { getUser } from '@/actions/users/getUser';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const Club = ({ user, club }) => {
    const { data: session } = useSession();
    const [allEvents, setAllEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState({
        status: false,
        message: 'Loading...',
    });
    const [eventDetails, setEventDetails] = useState({
        name: '',
        description: '',
        dateTime: '',
        venue: '',
        status: '',
        cover: '',
        clubName: '',
        clubId: '',
    });

    useEffect(() => {
        async function geeee() {
            const clubEvent = await fetchClubEvents(user[0].clubId.id);
            setAllEvents(clubEvent);
        }
        geeee();
    }, []);

    const handleCreateEvent = async (e) => {
        e.preventDefault();

        try {
            setShowModal(false);
            setLoading({
                status: true,
                message: 'Fetching your data...',
            });

            const user = await getUser(session.user.email);
            console.log('User data:', user);

            if (user) {
                console.log('Fetched user data, creating event...');
                const updatedEventDetails = {
                    ...eventDetails,
                    clubName: user[0].clubId.name,
                    clubId: user[0].clubId.id,
                };
                setLoading({
                    status: true,
                    message: 'Creating event...',
                });
                const response = await fetch('/api/sankalp/events/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedEventDetails),
                });

                const data = await response.json();

                if (data.success) {
                    alert('Event created successfully!');
                    setShowModal(false);
                    setAllEvents((prevEvents) => [
                        ...prevEvents,
                        updatedEventDetails,
                    ]);

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
                    alert('Error creating event');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the event.');
        } finally {
            setLoading({
                status: false,
                message: 'loading...',
            });
        }
    };

    return (
        <div className="h-screen flex flex-col">
            {allEvents.length > 0 ? (
                <div className="w-full h-2/5 flex overflow-auto gap-4 bg-red-100">
                    {allEvents.map((event, index) => (
                        <div
                            key={index}
                            className="p-4 bg-white border rounded-lg shadow-lg"
                        >
                            <h2 className="text-xl font-semibold mb-2">
                                {event.name}
                            </h2>
                            <p className="text-gray-600 mb-2">
                                {event.description}
                            </p>
                            <p className="text-gray-500 mb-2">
                                Venue: {event.venue}
                            </p>
                            <p className="text-gray-500 mb-2">
                                Status: {event.status}
                            </p>
                            <p className="text-gray-500 mb-2">
                                Date:{' '}
                                {new Date(event.dateTime).toLocaleDateString()}
                            </p>
                            <p className="text-gray-500 mb-2">
                                Club: {event.clubName}
                            </p>
                            <img
                                src={event.cover}
                                alt={`${event.name} cover`}
                                className="w-full h-40 object-cover mb-2 rounded"
                            />
                            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center">No events available</div>
            )}
            <div
                className="p-10 bg-green-200 rounded hover:bg-green-100 cursor-pointer"
                onClick={() => setShowModal(true)}
            >
                Create Event
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    {!loading.status ? (
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
                                />
                                <input
                                    type="date"
                                    className="border p-2 mb-2 w-full"
                                    value={eventDetails.dateTime}
                                    onChange={(e) =>
                                        setEventDetails({
                                            ...eventDetails,
                                            dateTime: e.target.value,
                                        })
                                    }
                                />
                                <textarea
                                    placeholder="Event Description"
                                    className="border p-2 mb-2 w-full"
                                    value={eventDetails.description}
                                    onChange={(e) =>
                                        setEventDetails({
                                            ...eventDetails,
                                            description: e.target.value,
                                        })
                                    }
                                ></textarea>
                                <input
                                    type="text"
                                    placeholder="Event Venue"
                                    className="border p-2 mb-2 w-full"
                                    value={eventDetails.venue}
                                    onChange={(e) =>
                                        setEventDetails({
                                            ...eventDetails,
                                            venue: e.target.value,
                                        })
                                    }
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
                                >
                                    <option value="">Select Status</option>
                                    <option value="upcoming">Upcoming</option>
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
                                />
                                <p>
                                    {eventDetails.clubId},{' '}
                                    {eventDetails.clubName}
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
                    ) : (
                        <div className="bg-white p-5 rounded">
                            <h2 className="text-lg font-bold">
                                {loading.message}
                            </h2>
                            <div className="loader"></div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Club;
