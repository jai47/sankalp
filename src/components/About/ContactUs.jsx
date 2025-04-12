'use client';
import { useState } from 'react';

function ContactUs({ className = '' }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
    });

    // Input change handler
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: '',
        });
    };

    return (
        <div className="bg-[#FE2A00] w-full min-h-screen flex flex-col items-center rounded-lg justify-center py-10 px-4">
            {/* Heading */}
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl text-white font-extrabold">
                    TALK TO US
                </h1>
                <p className="mt-4 text-white text-sm md:text-base">
                    500 Terry Francine Street, San Francisco, CA 94158 <br />
                    info@mysite.com
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className={`bg-white rounded-lg shadow-lg text-black p-6 md:p-8 w-full max-w-lg ${className}`}
            >
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label
                            htmlFor="firstName"
                            className="mb-1 font-semibold"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-md  outline-none"
                            id="firstName"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="lastName"
                            className="mb-1 font-semibold"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-md  outline-none"
                            id="lastName"
                            required
                        />
                    </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-md outline-none"
                            id="email"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="phone" className="mb-1 font-semibold">
                            Phone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-md  outline-none"
                            id="phone"
                            required
                        />
                    </div>
                </div>

                {/* Message */}
                <div className="mt-4">
                    <label
                        htmlFor="message"
                        className="mb-1 block font-semibold"
                    >
                        Message
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 w-full rounded-md  outline-none h-24"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="mt-6 bg-[#FE2A00] text-white px-6 py-2 w-full rounded-md font-bold text-lg"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ContactUs;
