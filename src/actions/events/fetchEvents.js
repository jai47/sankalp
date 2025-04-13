'use server';

import { connectDB } from '@/lib/db';
import { clubModel } from '@/models/Club';
import { eventModel } from '@/models/Event';

export async function fetchEvents() {
    await connectDB();
    const events = await eventModel.find({});
    return events;
}

export async function fetchClubEvents(clubId, eventId = null) {
    try {
        await connectDB();

        // Find the club by ID
        const club = await clubModel.findById(clubId);
        if (!club) {
            console.log('Club not found');
        }

        // If eventId is provided, find only that event, otherwise fetch all club events
        const query = eventId
            ? { _id: eventId }
            : { _id: { $in: club.events } };
        const events = await eventModel.find(query);

        return JSON.parse(JSON.stringify(events));
    } catch (error) {
        console.error('Error fetching club events:', error);
        throw new Error('Failed to fetch club events');
    }
}
