const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    user: {
        type: String,
        required: true,
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    type: {
        type: String,
        enum: ['participation', 'winner', 'runner-up', 'volunteer'],
        default: 'participation',
    },
    issueDate: { type: Date, default: Date.now },
    issuedBy: {
        type: String,
        default: 'Echelon Institute of Technology',
    },
});

export const certificateModel =
    mongoose.models.Certificate ||
    mongoose.model('Certificate', certificateSchema);
