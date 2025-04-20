import { connectDB } from '@/lib/db';
import { eventModel } from '@/models/Event';
import { userModel } from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    try {
        await connectDB();
        const body = await req.json();
        const { eventId, userId } = body;

        const event = await eventModel.findByIdAndUpdate(
            eventId,
            {
                $addToSet: {
                    registrations: userId,
                },
            },
            { new: true }
        );
        const user = await userModel.findByIdAndUpdate(
            userId,
            {
                $addToSet: { events: eventId },
            },
            { new: true }
        );
        if (!user || !event) {
            return NextResponse.json(
                { message: 'User or Event not found', success: false },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { message: 'User updated successfully', success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(
            { message: 'Internal server error', success: false },
            { status: 500 }
        );
    }
}
