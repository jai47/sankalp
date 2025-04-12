const { blogModel } = require('@/models/Blog');
import { connectDB } from '@/lib/db';
import { NextResponse } from 'next/server';

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
