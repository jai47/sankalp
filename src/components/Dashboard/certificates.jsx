import { fetchCertificates } from '@/actions/certificates/fetchCertificates';
import React from 'react';
import { toast } from 'react-toastify';

const Certificates = ({ user }) => {
    const [certificates, setCertificates] = React.useState([]);

    const Certificates = async () => {
        const response = await fetchCertificates(user.certificate);
        if (!response.success) {
            toast.error(response.message);
            return;
        }
        if (response.data.length === 0) {
            toast.error('No certificates found');
            return;
        }
        setCertificates(response.data);
    };
    React.useEffect(() => {
        if (!user?.certificate) return;
        Certificates();
    }, [user]);

    console.log('Certificates:', certificates);
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Certificates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                    <div
                        key={cert._id}
                        className="bg-white rounded-lg shadow-md p-4 border hover:shadow-lg transition"
                    >
                        <h3 className="text-lg font-semibold text-blue-700 mb-1">
                            {cert.name}
                        </h3>
                        <p className="text-sm text-gray-700 mb-2">
                            {cert.description}
                        </p>
                        <p className="text-xs text-gray-500">
                            <span className="font-medium">Issued to:</span>{' '}
                            {cert.user}
                        </p>
                        <p className="text-xs text-gray-500">
                            <span className="font-medium">Issued by:</span>{' '}
                            {cert.issuedBy}
                        </p>
                        <p className="text-xs text-gray-500">
                            <span className="font-medium">Issued on:</span>{' '}
                            {new Date(cert.issueDate).toLocaleDateString()}
                        </p>
                        <a
                            href={`/certificate/${cert._id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block mt-3 text-blue-600 hover:underline text-sm"
                        >
                            View Certificate →
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Certificates;
