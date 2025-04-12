const { blogModel } = require('@/models/Blog');
import getBlogs from '@/actions/blogs/getBlogs';
import postBlogs from '@/actions/blogs/postBlogs';
import { connectDB } from '@/lib/db';
import { NextResponse } from 'next/server';

// used to fetch all the blogs
export const GET = async (req, res) => {
    try {
        const blogs = await getBlogs();
        return NextResponse.json({
            success: true,
            blogs,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch blogs',
        });
    }
};

// used by /blogs/[slug]/page.js for fetching particular blog and updating views
export const POST = async (req, res) => {
    req = await req.json();
    await connectDB();
    const existingBlog = await blogModel.findOneAndUpdate(
        { title: req.title },
        { $inc: { views: 1 } },
        { new: true }
    );
    if (!existingBlog) {
        return NextResponse.json({
            body: {
                success: false,
            },
        });
    }
    if (existingBlog) {
        return NextResponse.json({
            body: {
                existingBlog,
                success: true,
            },
        });
    }
    return NextResponse.json({
        body: {
            success: false,
        },
    });
};
