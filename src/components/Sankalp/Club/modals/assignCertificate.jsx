import { fetchCertificatesByEventId } from '@/actions/certificates/fetchCertificates';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AssignCertificate = ({ event, setShowCertificateModal }) => {
    const [user, setUser] = useState([]);
    const [certificateRecivedUser, setCertificateRecivedUser] = useState([]);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        async function get() {
            const res = await fetchCertificatesByEventId(event._id);
            if (res.success) {
                const received = res.data.map((item) => item.user);
                setCertificateRecivedUser(received);
            } else {
                console.error('Failed to fetch certificates');
            }
        }
        get();
    }, [event._id]);

    const toggleUser = (selectedUser) => {
        if (certificateRecivedUser.includes(selectedUser)) return; // prevent change

        if (user.includes(selectedUser)) {
            setUser(user.filter((item) => item !== selectedUser));
        } else {
            setUser([...user, selectedUser]);
        }
    };

    // console.log('Selected users:', user);
    // console.log('Certificate type:', type);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.length === 0) {
            toast.error('Please select at least one user.');
            return;
        }
        const res = await fetch('/api/certificate/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventId: event._id,
                usersEmail: user,
                type,
                name: event.name,
                description: description,
                issuedBy: 'Echelon Institute of Technology',
            }),
        });
        const data = await res.json();
        if (data.success) {
            toast.success('Certificates issued successfully.');
            setUser([]);
            setType('');
            // Optionally close the modal or perform other actions
        } else {
            toast.error('Failed to issue certificates.');
        }
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg p-6 w-full max-w-xl max-h-[80vh] overflow-y-auto">
                <h1 className="text-2xl font-bold mb-4">Assign Certificate</h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center justify-between py-2 px-1"
                >
                    <select
                        className="border p-2 mb-2 w-full"
                        onChange={(e) => setType(e.target.value)}
                        required
                        value={type}
                        name="type"
                    >
                        <option value="">Select Certificate Type</option>
                        <option value="participation">Participated</option>
                        <option value="winner">Winner</option>
                        <option value="runner-up">Runner Up</option>
                        <option value="volunteer">Volunteer</option>
                    </select>
                    <input
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        required
                    />
                    {event.attendees.map((email) => {
                        const isReceived =
                            certificateRecivedUser.includes(email);

                        return (
                            <div
                                key={email}
                                className="w-full px-5 flex justify-between items-center py-2"
                            >
                                <span className="text-sm">
                                    {email.split('@')[0]}
                                </span>
                                <input
                                    type="checkbox"
                                    checked={user.includes(email) || isReceived}
                                    onChange={() => toggleUser(email)}
                                    disabled={isReceived} // optionally disable UI
                                />
                            </div>
                        );
                    })}
                    <div className="flex justify-end items-center w-full mt-4 gap-4">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                setUser([]);
                                // Handle the cancel action here
                                setShowCertificateModal(false);
                            }}
                            className="bg-gray-400 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssignCertificate;
