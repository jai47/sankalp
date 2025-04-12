const { connectDB } = require('@/lib/db');
const { blogModel } = require('@/models/Blog');

export default async function postBlogs(formData) {
    try {
        await connectDB();
        const newBlog = new blogModel(formData);
        await newBlog.save();
        return newBlog;
    } catch (error) {
        console.error('Error posting blog:', error);
        throw error;
    }
}
