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
