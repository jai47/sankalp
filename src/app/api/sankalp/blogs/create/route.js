const { blogModel } = require('@/models/Blog');
import postBlogs from '@/actions/blogs/postBlogs';
import { connectDB } from '@/lib/db';
import { clubModel } from '@/models/Club';
import { NextResponse } from 'next/server';

export const POST = async (req, res) => {
    req = await req.json();
    console.log('Request body:', req);
    await connectDB();
    const existingBlog = await blogModel
        .findOne({ title: req.title })
        .select('title')
        .exec();
    if (existingBlog) {
        return NextResponse.json({
            body: {
                success: false,
                message: 'Blog with same already exists',
            },
        });
    }
    try {
        const newBlog = await postBlogs(req);
        if (req.clubId) {
            await clubModel.findByIdAndUpdate(
                req.clubId,
                { $push: { blogs: newBlog._id } }, // Append new blog ID
                { new: true, useFindAndModify: false }
            );
        }
        return NextResponse.json({
            body: {
                success: true,
                message: 'Blog posted successfully',
            },
        });
    } catch (error) {
        console.error('Error posting blog:', error);
        return NextResponse.json({
            body: {
                success: false,
                message: 'Failed to post blog',
            },
        });
    }
};
