'use server';
import { connectDB } from '@/lib/db';
import { eventModel } from '@/models/Event';
import { userModel } from '@/models/User';

export async function markAttendence(eventId, attendees) {
    try {
        await connectDB();
        const event = await eventModel.findByIdAndUpdate(
            eventId,
            {
                attendees: attendees, // This overwrites the entire attendees array
            },
            { new: true }
        );
        if (!event) {
            return { success: false, message: 'Event not found' };
        }

        return {
            success: true,
            message: 'Successfully marked attendance',
        };
    } catch (e) {
        console.log('error', e);
        return { success: false, message: 'Failed to mark the attendance' };
    }
}
