const mongoose = require('mongoose');

const socialSchema = new mongoose.Schema(
    {
        pid: { type: Array, required: true },
        dateTime: { type: Date, required: true },
    },
    { timestamps: true }
);
export const eventModel =
    mongoose.models.Social || mongoose.model('Social', socialSchema);
