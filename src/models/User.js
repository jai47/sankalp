import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String }, // Store profile picture if needed
    role: {
        type: String,
        enum: ['admin', 'student', 'superAdmin', 'member'], // Added 'student' here
        default: 'student',
        required: true,
    },
    clubId: {
        type: Object,
        default: {
            id: '',
            name: '',
        },
    },
    activity: {
        type: Object,
        default: {
            likes: [],
            comments: [],
        },
    },
    events: {
        type: Array,
    },
    certificate: {
        type: Array,
    },
    attendance: [
        {
            type: Object,
            default: {
                date: new Date.now(),
                eventId: '',
            },
        },
    ],
});

export const userModel =
    mongoose.models.User || mongoose.model('User', UserSchema);
