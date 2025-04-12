import React, { useEffect, useState } from 'react';
import AddBlogs from './AddBlogs';
import { ImBin } from 'react-icons/im';
import { MdEdit } from 'react-icons/md';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import deleteBlogs from '@/actions/blogs/deleteBlogs';
import { getUser } from '@/actions/users/getUser';

const Blogs = () => {
    const { data: session } = useSession();
    const [showModal, setShowModal] = useState(false);
    const [innerHTML, setInnerHTML] = useState('');
    const [blogData, setBlogData] = useState({
        title: '',
        description: '',
        image: '',
        links: {
            facebook: '',
            instagram: '',
            linkedin: '',
            others: '',
        },
    });
    const [data, setData] = useState([]);

    const getDescription = (description) => {
        setBlogData((prev) => ({
            ...prev,
            description: description,
        }));
    };

    useEffect(() => {
        fetch('/api/blogs')
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setData(data.blogs);
                } else {
                    console.error('Failed to fetch blogs');
                }
            });
    }, []);
    const templates = [
        {
            name: 'New Technology',
            color: 'bg-teal-300',
            cover: '/image.png',
            innerHTML: `    <h1 style="color: #0056b3; text-align: center;">Project proposal</h1>
    <p><strong>Welcome to the most awaited event of the year!</strong></p>

    <div style="background-color: #f4f4f4; padding: 10px; border-left: 5px solid #007acc;">
        <p>Join us for an inspiring day of discussions on <strong>emerging technologies</strong> and <em>innovation</em> in the tech industry.</p>
    </div>

    <h2 style="color: #007acc;">What to Expect?</h2>
    <ul style="margin: 10px 0; padding-left: 20px;">
        <li>Keynote speeches by industry leaders</li>
        <li>Panel discussions on AI, Blockchain, and IoT</li>
        <li>Networking opportunities with professionals and enthusiasts</li>
        <li>Hands-on workshops and live demos</li>
        <li>Startup showcase and investment opportunities</li>
    </ul>
    <img src="data:image/jpeg;base64,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" alt="Tech Conference" style="width: 100%; height: auto; border-radius: 5px;" />

    <h2 style="color: #007acc;">Event Details</h2>
    <p><strong>Date:</strong> June 15, 2025</p>
    <p><strong>Time:</strong> 10:00 AM - 5:00 PM</p>
    <p><strong>Venue:</strong> EIT Faridabad Auditorium</p>

    <h2 style="color: #007acc;">Guest Speakers</h2>
    <p>We are thrilled to welcome renowned speakers, including:</p>
    <ul style="margin: 10px 0; padding-left: 20px;">
        <li>Dr. John Smith – AI Researcher at Google</li>
        <li>Jane Doe – Blockchain Expert & Entrepreneur</li>
        <li>Mark Williams – IoT Solutions Architect</li>
    </ul>

    <h2 style="color: #007acc;">Why You Should Attend?</h2>
    <p>This conference is a unique opportunity to gain insights from experts, connect with peers, and explore the latest trends shaping the future of technology.</p>

    <h2 style="color: #007acc;">Registration</h2>
    <p>Seats are limited! <a href="https://example.com/register">Register now</a> to secure your spot.</p>

    <div style="margin-top: 30px; font-size: 0.9em; color: #666; text-align: center;">
        <p>&copy; 2025 Tech Conference. All Rights Reserved.</p>
    </div>
`,
        },
        {
            name: 'Review',
            cover: '/image1.png',
            color: 'bg-blue-300',
        },
        { name: 'Sports', cover: '/image2.png', color: 'bg-green-300' },
        {
            name: 'Personality Devlopement',
            cover: '/image3.png',
            color: 'bg-pink-300',
        },
        {
            name: 'Health & Fitness',
            cover: '/image4.png',
            color: 'bg-gray-400',
        },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await getUser(session.user.email);
            let res = await fetch('/api/sankalp/blogs/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...blogData,
                    author: session?.user?.name,
                    clubId: user[0].clubId.id,
                }),
            });

            let data = await res.json(); // Await the JSON response
            alert(data.body.message);
            setData((prevData) => [
                ...prevData,
                {
                    ...blogData,
                    author: session?.user?.name,
                },
            ]);
            setShowModal(false);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="p-8 h-screen overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-6">New Blog</h2>
            <div className="grid grid-cols-6 gap-4 mb-10">
                <div
                    className={`relative h-32 shadow-md flex flex-col items-center justify-center cursor-pointer hover:opacity-90 rounded hover:rounded-3xl transition-all duration-100 border-[1px] border-black overflow-hidden`}
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    <span className="text-4xl font-bold">+</span>

                    <span className="mt-2 font-medium">Blank</span>
                </div>
                {templates.map((template, index) => (
                    <div
                        key={index}
                        className={`relative h-32 shadow-md flex flex-col items-center justify-center cursor-pointer hover:opacity-90 rounded hover:rounded-3xl transition-all duration-100 border-[1px] border-black ${template.color} overflow-hidden`}
                        onClick={() => {
                            setShowModal(true);
                            setInnerHTML(template.innerHTML || '');
                            setBlogData({
                                description: template.description || '',
                                links: {
                                    facebook: '',
                                    instagram: '',
                                    linkedin: '',
                                },
                            });
                        }}
                    >
                        {template.sign && (
                            <span className="text-4xl font-bold text-white z-10">
                                {template.sign}
                            </span>
                        )}
                        <span className="mt-2 font-medium z-10 text-white">
                            {template.name}
                        </span>
                        <Image
                            src={template?.cover}
                            alt="background"
                            layout="fill"
                            objectFit="cover"
                            style={{ filter: 'brightness(50%) blur(1px)' }}
                        />
                    </div>
                ))}
            </div>

            <h3 className="text-xl font-semibold mb-4 mt-10">
                Recent documents
            </h3>
            <div className="grid grid-cols-5 gap-4 w-full">
                {data.map((doc, index) => (
                    <div
                        key={index}
                        className="h-64 bg-white rounded border flex flex-col items-center overflow-hidden"
                    >
                        <div className="relative h-1/2 w-full">
                            <Image
                                src={doc.image}
                                alt={doc.title}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <p className="w-full h-[1px] bg-gray-200" />
                        <h4 className="text-lg font-semibold p-4">
                            {doc.title}
                        </h4>
                        <div className="flex items-center w-full px-4 py-2 gap-3">
                            <MdEdit
                                className="text-gray-600 cursor-pointer"
                                onClick={async () => {
                                    setShowModal(true);
                                    setBlogData({
                                        title: doc.title,
                                        image: doc.image,
                                        description: doc.description,
                                        links: doc.links,
                                    });
                                    setInnerHTML(doc.description);
                                }}
                            />
                            <ImBin
                                className="text-red-600 cursor-pointer"
                                onClick={async () => {
                                    const confirm = window.confirm(
                                        'Are you sure you want to delete this blog?'
                                    );
                                    if (confirm) {
                                        await deleteBlogs(doc._id);
                                        setData((prevData) =>
                                            prevData.filter(
                                                (item) => item._id !== doc._id
                                            )
                                        );
                                    }
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
                    <form
                        onSubmit={handleSubmit}
                        className=" bg-white p-6 rounded-lg shadow-lg h-4/5 w-4/5"
                    >
                        <h3 className="text-xl font-semibold mb-4">
                            Create Blog
                        </h3>
                        <label>Title</label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded p-2 w-full mb-4"
                            placeholder="Title"
                            name="title"
                            value={blogData.title || ''}
                            onChange={(e) =>
                                setBlogData({
                                    ...blogData,
                                    title: e.target.value,
                                })
                            }
                            required
                        />
                        <label></label>
                        <input
                            type="url"
                            className="border border-gray-300 rounded p-2 w-full mb-4"
                            placeholder="Image"
                            name="image"
                            value={blogData.image || ''}
                            onChange={(e) =>
                                setBlogData({
                                    ...blogData,
                                    image: e.target.value,
                                })
                            }
                            required
                        />
                        <AddBlogs
                            innerHTML={innerHTML}
                            getDescription={getDescription}
                        />
                        <p className="text-xl font-semibold mb-4 pt-8">Links</p>
                        <div className="flex gap-4 mt-10">
                            <div className="w-full relative flex flex-col justify-center items-center pl-2 rounded border border-gray-300">
                                <label
                                    htmlFor="facebook"
                                    className="absolute top-0 left-5 bg-white px-2 text-gray-500 transform -translate-y-1/2"
                                >
                                    Facebook
                                </label>
                                <input
                                    id="facebook"
                                    type="url"
                                    className="border-none outline-none p-2 w-full text-sm text-gray-500"
                                    placeholder="facebook"
                                    name="facebook"
                                    value={blogData.links.facebook || ''}
                                    onChange={(e) =>
                                        setBlogData({
                                            ...blogData,
                                            links: {
                                                ...blogData.links,
                                                facebook: e.target.value,
                                            },
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className="w-full relative flex flex-col justify-center items-center pl-2 rounded border border-gray-300">
                                <label
                                    htmlFor="instagram"
                                    className="absolute top-0 left-5 bg-white px-2 text-gray-500 transform -translate-y-1/2"
                                >
                                    Instagram
                                </label>
                                <input
                                    id="instagram"
                                    type="url"
                                    className="border-none outline-none p-2 w-full text-sm text-gray-500"
                                    placeholder="instagram"
                                    name="instagram"
                                    value={blogData.links.instagram || ''}
                                    onChange={(e) =>
                                        setBlogData({
                                            ...blogData,
                                            links: {
                                                ...blogData.links,
                                                instagram: e.target.value,
                                            },
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className="w-full relative flex flex-col justify-center items-center pl-2 rounded border border-gray-300">
                                <label
                                    htmlFor="linkedin"
                                    className="absolute top-0 left-5 bg-white px-2 text-gray-500 transform -translate-y-1/2"
                                >
                                    Linkedin
                                </label>
                                <input
                                    id="linkedin"
                                    type="url"
                                    className="border-none outline-none p-2 w-full text-sm text-gray-500"
                                    placeholder="linkedin"
                                    name="linkedin"
                                    value={blogData.links.linkedin || ''}
                                    onChange={(e) =>
                                        setBlogData({
                                            ...blogData,
                                            links: {
                                                ...blogData.links,
                                                linkedin: e.target.value,
                                            },
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className="w-full relative flex flex-col justify-center items-center pl-2 rounded border border-gray-300">
                                <label
                                    htmlFor="others"
                                    className="absolute top-0 left-5 bg-white px-2 text-gray-500 transform -translate-y-1/2"
                                >
                                    others
                                </label>
                                <input
                                    id="others"
                                    type="url"
                                    className="border-none outline-none p-2 w-full text-sm text-gray-500"
                                    placeholder="others"
                                    name="others"
                                    value={blogData.links.others || ''}
                                    onChange={(e) =>
                                        setBlogData({
                                            ...blogData,
                                            links: {
                                                ...blogData.links,
                                                others: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="w-full flex justify-end gap-4 absolute bottom-4 right-4">
                            <button
                                className="mt-10 bg-red-500 text-white p-2 rounded"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className="mt-10 bg-green-500 text-white p-2 rounded"
                                type="submit"
                            >
                                Publish
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Blogs;
