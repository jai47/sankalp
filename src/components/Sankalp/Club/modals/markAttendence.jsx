import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { markAttendence } from '@/actions/events/markAttendence';

const MarkAttendence = ({ event, setShowModal }) => {
    const [selectedAttendees, setSelectedAttendees] = useState([]);
    const [markAll, setMarkAll] = useState(false);

    useEffect(() => {
        // Initialize selected attendees with those already marked
        setSelectedAttendees(event.attendees || []);
    }, [event.attendees]);

    const toggleAttendee = (email) => {
        if (selectedAttendees.includes(email)) {
            // If already selected, remove it
            setSelectedAttendees(
                selectedAttendees.filter((item) => item !== email)
            );
        } else {
            // If not selected, add it
            setSelectedAttendees([...selectedAttendees, email]);
        }
    };

    const toggleMarkAll = () => {
        if (markAll) {
            setSelectedAttendees([]);
        } else {
            setSelectedAttendees([...event.registrations]);
        }
        setMarkAll(!markAll);
    };

    const handleSubmit = async () => {
        if (event.registrations.length === 0) {
            toast.error('No one registered for this event.');
            return;
        }
        await markAttendence(event._id, selectedAttendees);
        toast.success('Attendance marked successfully.');

        setTimeout(() => {
            window.location.reload();
        }, 1000);
        setShowModal(false);
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg p-6 w-full max-w-xl max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Attendance List</h3>
                    <label className="flex items-center gap-2">
                        <span className="text-sm">Mark All</span>
                        <input
                            type="checkbox"
                            checked={markAll}
                            onChange={toggleMarkAll}
                        />
                    </label>
                </div>

                <div className="border-t border-b divide-y">
                    {event.registrations.map((email) => (
                        <div
                            key={email}
                            className="flex justify-between items-center py-2 px-1"
                        >
                            <span className="text-sm">
                                {email.split('@')[0]}
                            </span>
                            {
                                <input
                                    type="checkbox"
                                    checked={selectedAttendees.includes(email)}
                                    onChange={() => toggleAttendee(email)}
                                />
                            }
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Submit
                    </button>
                    <button
                        onClick={() => {
                            setShowModal(false);
                        }}
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MarkAttendence;
