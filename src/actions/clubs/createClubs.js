// import { auth } from '../../../auth';
// const session = await auth();
// console.log('Session:', session);

'use server';
import { connectDB } from '@/lib/db';
import { clubModel } from '@/models/Club';

export async function createClub(data) {
    try {
        await connectDB();
        const newClub = new clubModel(data);
        await newClub.save();
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}
