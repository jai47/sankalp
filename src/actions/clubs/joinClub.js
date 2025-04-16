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
        if (user.clubId.id && user.clubId.id.toString() === clubId) {
            return { error: 'User is already a member of this club' };
        }

        // Add the user to the club
        club.members.push(user.email);
        // club.members.push({ name: user.name, id: user._id, email: user.email });
        club.markModified('members');
        await club.save();

        // Update the user's club ID
        user.clubId.id = club._id;
        user.clubId.name = club.name;
        user.markModified('clubId');
        user.role = 'member';
        console.log('User role:', user);
        await user.save();

        return { success: true, message: 'Successfully joined the club' };
    } catch (error) {
        console.error('Error joining club:', error);
        return { error: 'An error occurred while joining the club' };
    }
}

export async function leaveClub(userId) {
    try {
        await connectDB();

        const user = await userModel.findById(userId);
        if (!user) {
            return { error: 'User not found' };
        }
        const clubId = user.clubId.id;
        if (!clubId) {
            return { error: 'User is not a member of any club' };
        }

        // Remove the user from the club
        const club = await clubModel.findById(clubId);
        if (!club) {
            return { error: 'Club not found' };
        }
        club.members = club.members.filter(
            (member) => member.toString() !== user.email.toString()
        );
        await club.save();
        // Reset the user's club ID
        user.clubId.id = null;
        user.clubId.name = null;
        user.role = 'student';
        user.markModified('clubId');
        await user.save();
        return { success: true, message: 'Successfully left the club' };
    } catch (e) {
        console.error('Error leaving club:', error);
        return {
            error: 'An error occurred while leaving the club',
            sucess: false,
        };
    }
}
