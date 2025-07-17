import React, { useState } from 'react';
import Image from 'next/image';
import AssignCertificate from './assignCertificate';
import UploadEventImages from './uploadEventImages';
import MarkAttendence from './markAttendence';

const EventDetails = ({ event, onClose }) => {
    const [showModal, setShowModal] = useState(false);
    const [showCertificateModal, setShowCertificateModal] = useState(false);
    const [showUploadEventImages, setShowUploadEventImages] = useState(false);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-11/12 max-w-4xl h-[80vh] overflow-y-auto bg-white rounded-lg shadow-xl p-6">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 bg-purple-400 rounded-bl-lg w-10 h-10 text-white hover:text-gray-500 hover:bg-purple-300 text-xl font-bold z-10"
                >
                    &times;
                </button>

                {/* Cover Image */}
                <div className="relative w-full h-60 rounded-lg overflow-hidden mb-6">
                    <Image
                        src={event.cover}
                        alt="Event Cover"
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                </div>

                {/* Event Info */}
                <h2 className="text-3xl font-bold text-purple-700 mb-2">
                    {event.name}
                </h2>
                <p className="text-gray-700 mb-4">{event.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
                    <div>
                        <span className="font-semibold text-purple-600">
                            Date & Time:
                        </span>
                        <br />
                        {new Date(event.dateTime).toLocaleString()}
                    </div>
                    <div>
                        <span className="font-semibold text-purple-600">
                            Venue:
                        </span>
                        <br />
                        {event.venue}
                    </div>
                    <div>
                        <span className="font-semibold text-purple-600">
                            Club:
                        </span>
                        <br />
                        {event.clubName}
                    </div>
                    <div>
                        <span className="font-semibold text-purple-600">
                            Status:
                        </span>
                        <br />
                        <span className="capitalize">{event.status}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-4">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-purple-400 hover:bg-purple-500 text-white px-5 py-2 rounded-lg transition"
                    >
                        Mark Attendance
                    </button>
                    <button
                        onClick={() =>
                            setShowCertificateModal(!showCertificateModal)
                        }
                        className="bg-purple-400 hover:bg-purple-500 text-white px-5 py-2 rounded-lg transition"
                    >
                        Assign Certificates
                    </button>
                    <button
                        onClick={() =>
                            setShowUploadEventImages(!showUploadEventImages)
                        }
                        className="bg-purple-400 hover:bg-purple-500 text-white px-5 py-2 rounded-lg transition"
                    >
                        Upload Images
                    </button>
                </div>

                {/* Modals */}
                {showModal && (
                    <MarkAttendence event={event} setShowModal={setShowModal} />
                )}
                {showCertificateModal && (
                    <AssignCertificate
                        event={event}
                        setShowCertificateModal={setShowCertificateModal}
                    />
                )}
                {showUploadEventImages && (
                    <UploadEventImages showModal={setShowUploadEventImages} />
                )}
            </div>
        </div>
    );
};

export default EventDetails;
