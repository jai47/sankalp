'use server';

import { connectDB } from '@/lib/db';
import { userModel } from '@/models/User';

export async function fetchMembers(clubId) {
    try {
        await connectDB();
        const members = await userModel.find({ 'clubId.id': clubId });
        return members;
    } catch (error) {
        console.error('Error fetching members:', error);
        return [];
    }
}
