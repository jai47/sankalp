const { createEvent } = require('@/actions/events/createEvent');
const { NextResponse } = require('next/server');

export async function POST(req) {
    const formData = await req.json();
    await createEvent(formData);
    return NextResponse.json({
        success: true,
        message: 'Event created successfully',
    });
}
