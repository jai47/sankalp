const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    dateTime: { type: Date, required: true },
    venue: { type: String, required: true, trim: true },
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed', 'canceled'],
        default: 'upcoming',
    },
    cover: {
        type: String,
        required: true,
    },
    clubName: {
        type: String,
        required: true,
    },
    clubId: {
        type: String,
        required: true,
    },
    attendees: { type: Array, default: [] },
    images: { type: Array, default: [] },
    registrations: { type: Array, default: [] },
});
export const eventModel =
    mongoose.models.Event || mongoose.model('Event', eventSchema);
