const { connectDB } = require('@/lib/db');
const { blogModel } = require('@/models/Blog');

const getBlogs = async () => {
    try {
        await connectDB();
        const blogs = await blogModel.find({});
        return blogs;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
};

export async function fetchClubBlogs(clubId, blogId = null) {
    try {
        await connectDB();

        // Find the club by ID
        const club = await clubModel.findById(clubId);
        if (!club) {
            throw new Error('Club not found');
        }

        // If blogId is provided, find only that blog, otherwise fetch all club blogs
        const query = blogId
            ? { _id: blogId }
            : { _id: { $in: club.blogs } };
        const blogs = await blogModel.find(query);

        return JSON.parse(JSON.stringify(blogs));
    } catch (error) {
        console.error('Error fetching club blogs:', error);
        throw new Error('Failed to fetch club blogs');
    }
}

export default getBlogs;



