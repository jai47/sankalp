'use server';

import { connectDB } from '@/lib/db';
import { clubModel } from '@/models/Club';

//if id is passed, it will search for the club with that id
// if id is not passed, it will return all clubs
export async function getClubs(id = null) {
    try {
        await connectDB();

        let query = id ? { _id: id } : {};
        let clubs = await clubModel.find(query);

        if (clubs.length === 0) return false;
        return JSON.parse(JSON.stringify(clubs));
    } catch (e) {
        console.error(e);
        return false;
    }
}
