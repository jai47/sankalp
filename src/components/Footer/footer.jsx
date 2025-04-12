const Footer = () => {
    return (
        <footer className="w-screen flex flex-wrap md:flex-nowrap">
            {/* Left Section - Newsletter Signup */}
            <div
                className="w-full md:w-1/2 relative flex items-center justify-center bg-cover bg-center h-80 md:h-96"
                style={{
                    backgroundImage:
                        "url('https://static.wixstatic.com/media/74f558_48fb7215b9924187a948e0f2994a77c3~mv2_d_4500_3000_s_4_2.jpg/v1/fill/w_1680,h_1246,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/74f558_48fb7215b9924187a948e0f2994a77c3~mv2_d_4500_3000_s_4_2.jpg')",
                }}
            >
                <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-10/12 md:w-3/5">
                    <h3 className="text-gray-500 text-sm text-center">
                        Stay in Touch
                    </h3>
                    <h2 className="text-xl font-semibold text-center mt-1">
                        Sign up to hear the latest Crows news
                    </h2>

                    <form className="mt-4 space-y-4">
                        <input
                            type="email"
                            placeholder="Email *"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="subscribe"
                                className="cursor-pointer"
                            />
                            <label
                                htmlFor="subscribe"
                                className="text-sm text-gray-600"
                            >
                                Yes, subscribe me to your newsletter.
                            </label>
                        </div>
                        <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
                            Subscribe Now
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Section - About */}
            <div className="w-full md:w-1/2 bg-red-600 text-white flex flex-col items-center justify-center p-8 md:p-16 text-center">
                <h2 className="text-3xl font-bold">ABOUT THE NEST</h2>
                <p className="mt-4 text-sm md:text-base max-w-lg">
                    I'm a paragraph. Click here to add your own text and edit
                    me. It’s easy. Just click “Edit Text” or double click me to
                    add your own content and make changes to the font. I’m a
                    great place for you to tell a story and let your users know
                    a little more about you.
                </p>
                <p className="mt-4 font-semibold text-sm md:text-base">
                    Kenny Stutes: Founder, Writer, Super Fan
                </p>
                <button className="mt-6 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                    Read More
                </button>
            </div>
        </footer>
    );
};

export default Footer;
