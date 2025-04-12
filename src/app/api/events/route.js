import { fetchEvents } from '@/actions/events/fetchEvents';
import { connectDB } from '@/lib/db';
import { eventModel } from '@/models/Event';
import { NextResponse } from 'next/server';

export const GET = async (req, res) => {
    const events = await fetchEvents();
    return NextResponse.json({
        body: {
            events,
        },
    });
};

export const POST = async (req, res) => {
    try {
        await connectDB();
        const body = await req.json();
        const event = await eventModel.findById(body.id);
        if (!event) {
            return NextResponse.json({
                error: 'Event not found',
                success: false,
            });
        }

        return NextResponse.json({
            body: {
                event,
                success: true,
            },
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Failed to fetch event',
            success: false,
        });
    }
};
