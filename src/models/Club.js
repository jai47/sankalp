const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    adminId: [{ type: mongoose.Schema.Types.Object }],
    members: [{ type: mongoose.Schema.Types.Object }],
    vision: { type: String, trim: true },
    mission: { type: String, trim: true },
    values: { type: String, trim: true },
    goals: { type: String, trim: true },
    achievements: { type: String, trim: true },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    socialMediaLinks: {
        facebook: { type: String, trim: true },
        twitter: { type: String, trim: true },
        instagram: { type: String, trim: true },
        linkedin: { type: String, trim: true },
    },
    website: { type: String, trim: true },
    contactEmail: { type: String, trim: true },
    contactPhone: { type: String, trim: true },
    logo: { type: String, default: null },
    category: {
        type: String,
        enum: ['Khetij', 'Technical', 'Samatva', 'Sports'],
        default: null,
    },
});

export const clubModel =
    mongoose.models.Club || mongoose.model('Club', clubSchema);
