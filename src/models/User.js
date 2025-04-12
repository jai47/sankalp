import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String }, // Store profile picture if needed
    role: {
        type: String,
        enum: ['super_admin', 'admin', 'student'], // Added 'student' here
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
            blogs: [],
            likes: [],
            bookmarks: [],
            comments: [],
        },
    },
    events: {
        type: Array,
    },
    certificate: {
        type: Array,
    },
    attendance: {
        type: Array,
    },
});

export const userModel =
    mongoose.models.User || mongoose.model('User', UserSchema);
