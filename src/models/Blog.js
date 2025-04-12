const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    image: { type: String, required: true },
    date: { type: Date, default: Date.now },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    views: { type: Number, default: 0 },
    likes: { type: Object, default: '' },
    comments: [
        {
            user: { type: String, required: true },
            comment: { type: String, required: true },
            date: { type: Date, default: Date.now },
            likes: { type: Array, default: [] },
            replies: [
                {
                    user: { type: String, required: true },
                    reply: { type: String, required: true },
                    date: { type: Date, default: Date.now },
                    likes: { type: Array, default: [] },
                },
            ],
        },
    ],
    links: {
        type: Object,
        default: { facebook: '', instagram: '', linkedin: '', others: '' },
    },
});

export const blogModel =
    mongoose.models.Blog || mongoose.model('Blog', blogSchema);
