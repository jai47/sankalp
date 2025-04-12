'use server';
import { connectDB } from '@/lib/db';
import { clubModel } from '@/models/Club';
import { eventModel } from '@/models/Event';

export async function createEvent(formData) {
    try {
        await connectDB();
        const newEvent = new eventModel(formData);
        await newEvent.save();
        if (formData.clubId) {
            await clubModel.findByIdAndUpdate(
                formData.clubId,
                { $push: { events: newEvent._id } }, // Append new event ID
                { new: true, useFindAndModify: false }
            );
        } else {
            console.warn(
                'No clubId provided, event created without linking to a club.'
            );
        }
    } catch (error) {
        console.error('Error creating event:', error);
    }
}
