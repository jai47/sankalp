// import { auth } from '../../../auth';
// const session = await auth();
// console.log('Session:', session);

'use server';

import { connectDB } from '@/lib/db';
import { certificateModel } from '@/models/Certificates';
import { userModel } from '@/models/User';
import mongoose from 'mongoose';

export async function bulkIssueCertificates({
    eventId,
    usersEmail,
    type = 'participation',
    name,
    description,
    issuedBy = 'Echelon Institute of Technology',
}) {
    try {
        await connectDB();

        const eventObjectId = new mongoose.Types.ObjectId(eventId);

        // 1. Create certificate docs
        const certificatesToInsert = usersEmail.map((userEmail) => ({
            user: userEmail,
            eventId: eventObjectId,
            type,
            name,
            description,
            issuedBy,
        }));

        // 2. Insert all certificates
        const insertedCertificates = await certificateModel.insertMany(
            certificatesToInsert
        );

        // 3. Update users with certificate IDs
        const updatePromises = insertedCertificates.map((cert) =>
            userModel.updateOne(
                { email: cert.user },
                { $addToSet: { certificate: cert._id } }
            )
        );

        await Promise.all(updatePromises);
        return {
            success: true,
            message: 'Certificates issued and appended to users',
            count: insertedCertificates.length,
        };
    } catch (e) {
        console.error('Error issuing certificates:', e);
        return {
            success: false,
            message: 'Error issuing certificates',
            error: e.message,
        };
    }
}
