import { getClubs } from '@/actions/clubs/getClubs';
import Parallex from '@/components/Parallex';
import React, { useEffect } from 'react';
import Card from './Card';
import { getUser } from '@/actions/users/getUser';
import { toast } from 'react-toastify';
import Image from 'next/image';

const Club = () => {
    const [club, setClub] = React.useState([]); //existing clubs
    const [showModal, setShowModal] = React.useState(false);
    const [users, setUsers] = React.useState([]); //users
    const [newClubDetails, setNewClubDetails] = React.useState({
        name: '',
        description: '',
        vision: '',
        mission: '',
        values: '',
        goals: '',
        achievements: '',
        website: '',
        contactEmail: '',
        contactPhone: '',
        socialMediaLinks: {
            facebook: '',
            twitter: '',
            instagram: '',
            linkedin: '',
        },
        category: '',
        logo: '',
        banner: '',
        adminId: [],
    });

    useEffect(() => {
        async function fetchClubs() {
            const club = await getClubs();
            setClub(club);
        }
        fetchClubs();
    }, []);

    useEffect(() => {
        async function users() {
            const fetchedUsers = await getUser();
            if (fetchedUsers) {
                setUsers(fetchedUsers);
            }
        }
        users();
    }, []);

    const handleChange = (e) => {
        setNewClubDetails({
            ...newClubDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newClubDetails.name) {
            toast.error('Club name is required!');
            return;
        }

        try {
            const response = await fetch('/api/admin/club/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newClubDetails),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const res = await response.json();

            if (res.success) {
                setNewClubDetails({
                    name: '',
                    description: '',
                    vision: '',
                    mission: '',
                    values: '',
                    goals: '',
                    achievements: '',
                    website: '',
                    contactEmail: '',
                    contactPhone: '',
                    socialMediaLinks: {
                        facebook: '',
                        twitter: '',
                        instagram: '',
                        linkedin: '',
                    },
                    category: '',
                    banner: '',
                });

                setShowModal(false);
            } else {
                alert(res.message || 'Error creating club');
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="w-full h-full">
            <Parallex
                image="/bg1.jpeg"
                desc="Stay updated with the latest technical, cultural, and workshop blogs from various clubs."
                heading="Manage Clubs"
            />
            <div className="flex flex-col items-center justify-center mt-10">
                <div className="flex flex-wrap justify-center gap-5">
                    {Array.isArray(club) && club.length > 0 ? (
                        club.map((item) => <Card club={item} key={item._id} />)
                    ) : (
                        <p>No clubs found</p>
                    )}
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 py-8">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl overflow-y-auto max-h-[90vh] p-6">
                        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
                            Create New Club
                        </h2>
                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            <input
                                type="text"
                                name="name"
                                placeholder="Club Name"
                                value={newClubDetails.name}
                                onChange={handleChange}
                                className="input-field"
                                required
                            />
                            <input
                                type="url"
                                name="website"
                                placeholder="Website URL"
                                value={newClubDetails.website}
                                onChange={handleChange}
                                className="input-field"
                            />
                            <input
                                type="email"
                                name="contactEmail"
                                placeholder="Contact Email"
                                value={newClubDetails.contactEmail}
                                onChange={handleChange}
                                className="input-field"
                            />
                            <input
                                type="tel"
                                name="contactPhone"
                                placeholder="Contact Phone"
                                value={newClubDetails.contactPhone}
                                onChange={handleChange}
                                className="input-field"
                            />
                            <textarea
                                name="description"
                                placeholder="Club Description"
                                value={newClubDetails.description}
                                onChange={handleChange}
                                className="input-field md:col-span-2"
                            />
                            <input
                                type="text"
                                name="vision"
                                placeholder="Vision"
                                value={newClubDetails.vision}
                                onChange={handleChange}
                                className="input-field"
                            />
                            <input
                                type="text"
                                name="mission"
                                placeholder="Mission"
                                value={newClubDetails.mission}
                                onChange={handleChange}
                                className="input-field"
                            />
                            <input
                                type="text"
                                name="values"
                                placeholder="Values"
                                value={newClubDetails.values}
                                onChange={handleChange}
                                className="input-field"
                            />
                            <input
                                type="text"
                                name="goals"
                                placeholder="Goals"
                                value={newClubDetails.goals}
                                onChange={handleChange}
                                className="input-field"
                            />
                            <input
                                type="text"
                                name="achievements"
                                placeholder="Achievements"
                                value={newClubDetails.achievements}
                                onChange={handleChange}
                                className="input-field"
                            />
                            <input
                                type="url"
                                name="facebook"
                                placeholder="Facebook Link"
                                value={newClubDetails.socialMediaLinks.facebook}
                                onChange={(e) => {
                                    setNewClubDetails({
                                        ...newClubDetails,
                                        socialMediaLinks: {
                                            ...newClubDetails.socialMediaLinks,
                                            facebook: e.target.value,
                                        },
                                    });
                                }}
                                className="input-field"
                            />
                            <input
                                type="url"
                                name="twitter"
                                placeholder="Twitter Link"
                                value={newClubDetails.socialMediaLinks.twitter}
                                onChange={(e) => {
                                    setNewClubDetails({
                                        ...newClubDetails,
                                        socialMediaLinks: {
                                            ...newClubDetails.socialMediaLinks,
                                            twitter: e.target.value,
                                        },
                                    });
                                }}
                                className="input-field"
                            />
                            <input
                                type="url"
                                name="instagram"
                                placeholder="Instagram Link"
                                value={
                                    newClubDetails.socialMediaLinks.instagram
                                }
                                onChange={(e) => {
                                    setNewClubDetails({
                                        ...newClubDetails,
                                        socialMediaLinks: {
                                            ...newClubDetails.socialMediaLinks,
                                            instagram: e.target.value,
                                        },
                                    });
                                }}
                                className="input-field"
                            />
                            <input
                                type="url"
                                name="linkedin"
                                placeholder="LinkedIn Link"
                                value={newClubDetails.socialMediaLinks.linkedin}
                                onChange={(e) => {
                                    setNewClubDetails({
                                        ...newClubDetails,
                                        socialMediaLinks: {
                                            ...newClubDetails.socialMediaLinks,
                                            linkedin: e.target.value,
                                        },
                                    });
                                }}
                                className="input-field"
                            />
                            <select
                                name="adminId"
                                value={newClubDetails.adminId}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="" disabled>
                                    Select Admin
                                </option>
                                {users.map((user) => (
                                    <option key={user._id} value={user.email}>
                                        {user.name} ({user.email})
                                    </option>
                                ))}
                            </select>
                            <select
                                name="category"
                                value={newClubDetails.category}
                                onChange={handleChange}
                                className="input-field"
                                required
                            >
                                <option value="">Select Category</option>
                                {[
                                    'Khetij',
                                    'Technical',
                                    'Samatva',
                                    'Sports',
                                ].map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="file"
                                accept="image/*"
                                className="input-field"
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;

                                    const formData = new FormData();
                                    formData.append('image', file);

                                    try {
                                        const response = await fetch(
                                            'http://localhost:3001/upload',
                                            {
                                                method: 'POST',
                                                body: formData,
                                            }
                                        );

                                        const data = await response.json();

                                        setNewClubDetails((prev) => ({
                                            ...prev,
                                            logo: data.url,
                                        }));
                                        toast.success(
                                            'Image uploaded successfully!'
                                        );
                                    } catch (err) {
                                        console.error(
                                            'Image upload failed:',
                                            err
                                        );
                                    }
                                }}
                                disabled={newClubDetails.logo}
                            />
                            {newClubDetails.logo && (
                                <Image
                                    src={newClubDetails.logo}
                                    alt="Event Cover"
                                    width={200}
                                    height={200}
                                    className="w-full h-40 object-cover mb-2 rounded"
                                />
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                className="input-field"
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;

                                    const formData = new FormData();
                                    formData.append('image', file);

                                    try {
                                        const response = await fetch(
                                            'http://localhost:3001/upload',
                                            {
                                                method: 'POST',
                                                body: formData,
                                            }
                                        );

                                        const data = await response.json();

                                        setNewClubDetails((prev) => ({
                                            ...prev,
                                            banner: data.url,
                                        }));
                                        toast.success(
                                            'Image uploaded successfully!'
                                        );
                                    } catch (err) {
                                        console.error(
                                            'Image upload failed:',
                                            err
                                        );
                                    }
                                }}
                                disabled={newClubDetails.banner}
                            />
                            {newClubDetails.banner && (
                                <Image
                                    src={newClubDetails.banner}
                                    alt="Event Cover"
                                    width={200}
                                    height={200}
                                    className="w-full h-40 object-cover mb-2 rounded"
                                />
                            )}
                            <button
                                type="submit"
                                className="md:col-span-2 bg-gradient-to-r from-rose-500 to-green-500 text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 transition-all duration-300"
                            >
                                Add Club
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="md:col-span-2 text-red-500 text-center mt-2"
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <div className="fixed bottom-0 right-0 p-4">
                <button
                    onClick={() => setShowModal(true)}
                    className="cursor-pointer text-[1rem] leading-6 px-10 py-3 text-neutral-100 rounded-lg border-none flex justify-center items-center gap-2 transition-all duration-300 bg-[linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] hover:shadow-[inset_0_5px_25px_#af40ff,inset_0_10px_15px_#5b42f3,inset_0_5px_25px_#00ddeb]"
                >
                    Create
                </button>
            </div>
        </div>
    );
};

export default Club;
