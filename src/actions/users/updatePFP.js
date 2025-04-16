'use server';
import { connectDB } from '@/lib/db';
import { userModel } from '@/models/User';

export async function updatePFP(email, image) {
    try {
        await connectDB();
        const user = await userModel.findOneAndUpdate(
            { email }, // Find the user by email
            { image }, // Update the image field
            { new: true } // Return the updated document
        );
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error('Error updating profile picture:', error);
        throw new Error('Failed to update profile picture');
    }
}
