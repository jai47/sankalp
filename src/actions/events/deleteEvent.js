'use server';
import { connectDB } from '@/lib/db';
import { eventModel } from '@/models/Event';

export async function deleteEvent(eventId) {
    try {
        await connectDB();
        const deletedEvent = await eventModel
            .findByIdAndDelete(eventId)
            .then(() => {
                return true;
            })
            .catch((error) => {
                console.error('Error deleting event:', error);
                return false;
            });
        return deletedEvent;
    } catch (error) {
        console.error('Error deleting event:', error);
        return false;
    }
}
