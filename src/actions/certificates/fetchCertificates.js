'use server';
import { connectDB } from '@/lib/db';
import { certificateModel } from '@/models/Certificates';
import mongoose from 'mongoose';

export async function fetchCertificates(certificateId) {
    try {
        await connectDB();

        let query;

        if (Array.isArray(certificateId)) {
            // If array of IDs: convert each to ObjectId
            query = {
                _id: {
                    $in: certificateId.map(
                        (id) => new mongoose.Types.ObjectId(id)
                    ),
                },
            };
        } else {
            // Single ID
            query = {
                _id: new mongoose.Types.ObjectId(certificateId),
            };
        }

        const certificates = await certificateModel.find(query);

        if (!certificates || certificates.length === 0) {
            return { success: false, message: 'Certificates not found' };
        }

        return {
            success: true,
            message: 'Successfully fetched certificates',
            data: JSON.parse(JSON.stringify(certificates)),
        };
    } catch (e) {
        console.error('error', e);
        return { success: false, message: 'Failed to fetch the certificates' };
    }
}

export async function fetchCertificatesByEventId(eventId) {
    try {
        await connectDB();

        const certificates = await certificateModel.find({
            eventId: eventId,
        });

        return {
            success: true,
            message: 'Successfully fetched certificates',
            data: JSON.parse(JSON.stringify(certificates)),
        };
    } catch (e) {
        console.log(e);
        return { success: false, message: 'Failed to fetch the certificates' };
    }
}
