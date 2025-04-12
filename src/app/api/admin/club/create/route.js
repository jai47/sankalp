import { createClub } from '@/actions/clubs/createClubs';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    req = await req.json();
    let resonse = await createClub(req);
    if (!resonse) {
        return NextResponse.json({
            message: 'Error creating club',
            success: false,
        });
    }
    return NextResponse.json({
        message: 'Club Created',
        success: true,
    });
}
