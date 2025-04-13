'use server';
import { connectDB } from '@/lib/db';
import { clubModel } from '@/models/Club';
import { userModel } from '@/models/User';

export async function joinClub(clubId, userId) {
    try {
        await connectDB();

        const club = await clubModel.findById(clubId);
        if (!club) {
            return { error: 'Club not found' };
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return { error: 'User not found' };
        }

        // Check if the user is already a member of the club
        if (user.clubId && user.clubId.id.toString() === clubId) {
            return { error: 'User is already a member of this club' };
        }

        // Add the user to the club
        club.members.push(user._id);
        await club.save();

        // Update the user's club ID
        user.clubId = club._id;
        await user.save();

        return { success: true, message: 'Successfully joined the club' };
    } catch (error) {
        console.error('Error joining club:', error);
        return { error: 'An error occurred while joining the club' };
    }
}
