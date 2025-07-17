import { bulkIssueCertificates } from '@/actions/certificates/createCertificates';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const { eventId, usersEmail, type, name, description, issuedBy } = body;

        if (!eventId || !Array.isArray(usersEmail)) {
            return NextResponse.json(
                { success: false, message: 'Missing or invalid data' },
                { status: 400 }
            );
        }

        const result = await bulkIssueCertificates({
            eventId,
            usersEmail,
            type,
            name,
            description,
            issuedBy,
        });

        return NextResponse.json({ success: true, ...result });
    } catch (error) {
        console.error('Bulk certificate issue error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
