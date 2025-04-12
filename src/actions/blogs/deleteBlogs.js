'use server';
const { connectDB } = require('@/lib/db');
const { blogModel } = require('@/models/Blog');

const deleteBlogs = async (id) => {
    try {
        await connectDB();
        const blogs = await blogModel.findByIdAndDelete(id);
        if (!blogs) {
            throw new Error('Blog not found');
        }
        return true;
    } catch (error) {
        return false;
    }
};
export default deleteBlogs;
