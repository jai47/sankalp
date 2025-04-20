import { markAttendence } from '@/actions/events/markAttendence';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import Certificate from './certificate';

const EventDetails = ({ event, onClose }) => {
    const [selectedAttendees, setSelectedAttendees] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [markAll, setMarkAll] = React.useState(false);

    useEffect(() => {
        // Initialize selected attendees with those already marked
        setSelectedAttendees(event.attendees || []);
    }, [event.attendees]);

    const toggleAttendee = (id) => {
        if (selectedAttendees.includes(id)) {
            // If already selected, remove it
            setSelectedAttendees(
                selectedAttendees.filter((item) => item !== id)
            );
        } else {
            // If not selected, add it
            setSelectedAttendees([...selectedAttendees, id]);
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-11/12 max-w-2xl max-h-[80vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl font-bold"
                >
                    &times;
                </button>

                <h2 className="text-xl font-semibold mb-4">Event Details</h2>
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                    {JSON.stringify(event, null, 2)}
                </pre>

                <button
                    onClick={() => setShowModal(true)}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Mark Attendance
                </button>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                    Assign certificates
                </button>

                <Certificate
                    title={'Jai'}
                    description={
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae quibusdam est accusantium corrupti sapiente tempore sed? Facere cupiditate nobis neque porro'
                    }
                    faculty={'Rakesh Sinha'}
                    head={'Stuti'}
                />

                {/* Attendance Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                        <div className="bg-white rounded-lg p-6 w-full max-w-xl max-h-[80vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold">
                                    Attendance List
                                </h3>
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
                                {event.registrations.map((id) => (
                                    <div
                                        key={id}
                                        className="flex justify-between items-center py-2 px-1"
                                    >
                                        <span className="text-sm">{id}</span>
                                        {
                                            <input
                                                type="checkbox"
                                                checked={selectedAttendees.includes(
                                                    id
                                                )}
                                                onChange={() =>
                                                    toggleAttendee(id)
                                                }
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
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventDetails;
