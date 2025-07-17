'use client';
import Image from 'next/image';
import Filter from '@/components/Blogs/filter';
import { IoMdShareAlt } from 'react-icons/io';
import { HiUserCircle } from 'react-icons/hi2';
import { VscKebabVertical } from 'react-icons/vsc';
import { FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaLinkedinIn } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import React, { useEffect } from 'react';
import Link from 'next/link';
import Card from '@/components/Home/card';
import Footer from '@/components/Footer/footer';

const Page = ({ params }) => {
    const { slug } = React.use(params);
    const decodedSlug = decodeURIComponent(slug);
    // Find the blog post where the title matches the slug
    const [blog, setData] = React.useState(null);
    const [comment, setComment] = React.useState('');
    useEffect(() => {
        fetch('/api/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: decodedSlug }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.body.success) {
                    setData(data.body.existingBlog);
                } else {
                    console.log(decodedSlug);
                    console.error('Failed to fetch blogs');
                }
            });
    }, []);

    if (!blog) {
        return <div>Blog not found</div>;
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comment.trim() === '') {
            alert('Please enter a comment');
            return;
        }
        // Handle comment submission logic here
        console.log('Comment submitted:', comment);
        setComment('');
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center gap-10 mt-10">
            <Filter />
            <div className="w-1/2 border p-10">
                <div className="flex items-center justify-start gap-2 mb-10">
                    <HiUserCircle size={40} className="text-gray-400" />
                    <div className="flex w-full justify-between text-[12px]">
                        <p className="flex items-center justify-center gap-2 text-gray-500">
                            <span>{blog.author}</span>
                            <span className="w-[4px] h-[4px] block rounded-full bg-black" />{' '}
                            {new Date(blog.date).toDateString()}
                            <span className="w-[4px] h-[4px] block rounded-full bg-black" />{' '}
                            <span>
                                {parseInt(
                                    blog?.description?.split(' ').length / 150
                                )}{' '}
                                min
                            </span>
                        </p>
                        <div className="relative group">
                            {/* Share Button (Initially Hidden) */}
                            <Link
                                href="/"
                                target="_blank"
                                className="absolute left-0 top-0 w-28 h-10 flex justify-center items-center gap-4 bg-white text-gray-500 border shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                <IoMdShareAlt size={25} />
                                Share
                            </Link>

                            {/* Kebab Menu (Triggers Hover Effect) */}
                            <div className="cursor-pointer">
                                <VscKebabVertical size={24} />
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className="text-3xl font-bold mb-5">{blog.title}</h1>
                <div className="w-full h-[30vh] relative my-10">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div dangerouslySetInnerHTML={{ __html: blog.description }} />

                <div className="w-full flex flex-col gap-3 mt-10">
                    <span className="w-full h-[1px] border" />
                    <div className="flex w-full justify-between">
                        <div className="flex gap-4">
                            <div className="hover:text-red-500 cursor-pointer">
                                <FaFacebookF />
                            </div>
                            <div className="hover:text-red-500 cursor-pointer">
                                <FaXTwitter />
                            </div>
                            <div className="hover:text-red-500 cursor-pointer">
                                <FaLinkedinIn />
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
                            <span>Editorials</span>
                            <span className="w-1 h-1 bg-gray-600 rounded-full" />
                            <span>Editorials</span>
                        </div>
                    </div>
                    <span className="w-full h-[1px] border" />
                    <div className="flex justify-between text-sm text-gray-500">
                        <div className="flex gap-4">
                            <span>{blog.views} views</span>
                            <span>{blog.comments.length} comments</span>
                        </div>
                        <span className="flex items-center gap-2">
                            {blog.likes} <FcLike />
                        </span>
                    </div>
                </div>
            </div>

            <div className="w-1/2 flex flex-col justify-between gap-5">
                <span className="text-lg text-gray-500">Recent Blogs</span>
                <div className="w-full flex justify-between">
                    <Card
                        image={'/echiesta1.jpeg'}
                        title={"Tight End Teller Won't Be the Same Next Year"}
                        comments={5}
                        views={15}
                        likes={10}
                    />
                    <Card
                        image={'/bg1.jpeg'}
                        title={"Tight End Teller Won't Be the Same Next Year"}
                        comments={5}
                        views={15}
                        likes={10}
                    />
                    <Card
                        image={'/echiesta.jpeg'}
                        title={"Tight End Teller Won't Be the Same Next Year"}
                        comments={5}
                        views={15}
                        likes={10}
                    />
                </div>
            </div>
            <div className="w-1/2 border flex flex-col justify-between items-center h-fit p-10">
                <div className="w-11/12 flex flex-col">
                    <span className="text-lg font-bold text-gray-500 mb-5">
                        Comments
                    </span>
                    <span className="w-full h-[1px] border mb-10" />
                    <form onSubmit={handleCommentSubmit}>
                        <div className="w-full border p-4">
                            <input
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                type="text"
                                placeholder="Write a comment..."
                                className="w-full h-full border-none outline-none"
                            />
                        </div>
                        <div className="w-full flex justify-end">
                            <button
                                type="submit"
                                className="bg-red-500 text-white px-5 py-2 mt-5"
                            >
                                Post
                            </button>
                        </div>
                    </form>
                    <div>
                        {blog.comments.map((comment) => {
                            return (
                                <div
                                    key={comment._id}
                                    className="w-full flex flex-col my-6"
                                >
                                    <div className="flex items-center justify-start gap-2">
                                        <HiUserCircle
                                            size={40}
                                            className="text-gray-400"
                                        />
                                        <div className="flex w-full justify-between text-[12px]">
                                            <p className="flex items-center justify-center gap-2 text-gray-500">
                                                <span>{comment.user}</span>
                                                <span className="w-[4px] h-[4px] block rounded-full bg-black" />{' '}
                                                {new Date(
                                                    comment.date
                                                ).toDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <p>{comment.reply}</p>
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <div className="flex gap-4">
                                            <span>
                                                {comment.replies.length} replies
                                            </span>
                                        </div>
                                        <span className="flex items-center gap-2">
                                            {comment.likes} <FcLike />
                                        </span>
                                    </div>
                                    {comment?.replies.length > 0 && (
                                        <div className="flex flex-col gap-5 mt-5 ml-10">
                                            {comment.replies.map((reply) => {
                                                return (
                                                    <div
                                                        key={reply._id}
                                                        className="w-full flex flex-col"
                                                    >
                                                        <div className="flex items-center justify-start gap-2">
                                                            <HiUserCircle
                                                                size={40}
                                                                className="text-gray-400"
                                                            />
                                                            <div className="flex w-full justify-between text-[12px]">
                                                                <p className="flex items-center justify-center gap-2 text-gray-500">
                                                                    <span>
                                                                        {
                                                                            reply.user
                                                                        }
                                                                    </span>
                                                                    <span className="w-[4px] h-[4px] block rounded-full bg-black" />{' '}
                                                                    {new Date(
                                                                        reply.date
                                                                    ).toDateString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <p>{reply.reply}</p>
                                                        <div className="flex justify-between text-sm text-gray-500">
                                                            <div className="flex gap-4">
                                                                <span>
                                                                    {reply
                                                                        ?.replies
                                                                        ?.length ||
                                                                        0}{' '}
                                                                    replies
                                                                </span>
                                                            </div>
                                                            <span className="flex items-center gap-2">
                                                                {reply.likes}{' '}
                                                                <FcLike />
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Page;
