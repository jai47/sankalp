'use server';
import { connectDB } from '@/lib/db';
import { userModel } from '@/models/User';

// used by create event in sankalp dashboard for adding clubId and clubName
export async function getUser(email = null) {
    try {
        await connectDB(); // Ensure database connection

        let query = email ? { email: email } : {};
        let existingUser = await userModel.find(query);
        return JSON.parse(JSON.stringify(existingUser));
    } catch (error) {
        console.error('Error fetching user:', error);
        return false;
    }
}

export async function getSpecificUsers(emails) {
    try {
        await connectDB(); // Ensure database connection

        const users = await userModel.find(
            { email: { $in: emails } },
            { name: 1, email: 1, image: 1, _id: 0 } // projection: only required fields
        );

        if (!users || users.length === 0) {
            return { success: false, message: 'No users found' };
        }

        return {
            success: true,
            users: JSON.parse(JSON.stringify(users)),
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        return { success: false, message: 'Error fetching users' };
    }
}

//used by next-auth to add user to the database
export async function getUserAuth(user) {
    try {
        await connectDB(); // Ensure database connection

        let existingUser = await userModel.findOne({ email: user.email });

        if (!existingUser) {
            // Save new user in MongoDB
            existingUser = await userModel.create({
                name: user.name,
                email: user.email,
                image: user.image,
            });
            console.log('✅ New user added:', existingUser);
        }
        return existingUser.toObject();
    } catch (error) {
        console.error('Error fetching user:', error);
        return false;
    }
}
