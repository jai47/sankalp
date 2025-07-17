'use server';
import { fetchCertificates } from '@/actions/certificates/fetchCertificates';
import { getUser } from '@/actions/users/getUser';
import CertificateRenderer from '@/components/Certificates/CertificateRenderer';

const page = async ({ params }) => {
    const { id } = await params;

    const certificate = await fetchCertificates(id);
    if (!certificate.success || certificate.data.length === 0) {
        return (
            <div className="p-10">
                <h1 className="text-2xl font-bold mb-4">Error</h1>
                <p>{certificate.message || 'No certificates found'}</p>
            </div>
        );
    }

    const user = await getUser(certificate.data[0].user);
    if (!user || !user[0]) {
        return (
            <div className="p-10">
                <h1 className="text-2xl font-bold mb-4">Error</h1>
                <p>User not found</p>
            </div>
        );
    }

    return (
        <CertificateRenderer user={user[0]} certificate={certificate.data[0]} />
    );
};

export default page;
