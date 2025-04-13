import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { FaFacebookF } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';

const Footer = () => {
    const socialLogoSize = 18;

    const [index, setIndex] = useState(0);
    const words = [
        'passion',
        'success',
        'goals',
        'rhythm',
        'fun',
        'energy',
        'opportunity',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 250);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="w-screen h-[40vh] bg-red-500 px-10 py-6 text-white flex flex-col md:flex-row items-center justify-between">
            {/* Left: Logo + Club Links */}
            <div className="w-[35%] h-full flex flex-col gap-4 items-start justify-center bg-red-5">
                {/* Left: Logo + Club Links + Quick Links */}
                <div className="flex md:flex-row w-full gap-10">
                    {/* Club Links */}
                    <div className="flex flex-col text-sm gap-1">
                        <p className="font-semibold text-lg mb-1">Clubs</p>
                        <Link href="/clubs/gdsc" className="hover:underline">
                            GDSC
                        </Link>
                        <Link href="/clubs/nss" className="hover:underline">
                            NSS
                        </Link>
                        <Link
                            href="/clubs/cultural"
                            className="hover:underline"
                        >
                            Cultural Club
                        </Link>
                        <Link
                            href="/clubs/robotics"
                            className="hover:underline"
                        >
                            Robotics Club
                        </Link>
                        <Link href="/clubs/sports" className="hover:underline">
                            Sports Club
                        </Link>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col text-sm gap-1">
                        <p className="font-semibold text-lg mb-1">
                            Quick Links
                        </p>
                        <Link href="/admissions" className="hover:underline">
                            Admission Registration
                        </Link>
                        <Link href="/fee-payment" className="hover:underline">
                            Pay College Fee
                        </Link>
                        <Link
                            href="/academic-calendar"
                            className="hover:underline"
                        >
                            Academic Calendar
                        </Link>
                        <Link href="/blog" className="hover:underline">
                            Blog
                        </Link>
                        <Link
                            href="/schemes-syllabi"
                            className="hover:underline"
                        >
                            Schemes & Syllabi
                        </Link>
                        <Link href="/library" className="hover:underline">
                            Library
                        </Link>
                        <Link href="/career" className="hover:underline">
                            Career@Echelon
                        </Link>
                        <Link href="/faq" className="hover:underline">
                            FAQ
                        </Link>
                    </div>
                    {/* Quick Links 2*/}
                    <div className="flex flex-col text-sm gap-1">
                        <p className="font-semibold text-lg mb-1">
                            Quick Links
                        </p>
                        <Link href="/admissions" className="hover:underline">
                            Admission Registration
                        </Link>
                        <Link href="/fee-payment" className="hover:underline">
                            Pay College Fee
                        </Link>
                        <Link
                            href="/academic-calendar"
                            className="hover:underline"
                        >
                            Academic Calendar
                        </Link>
                        <Link href="/blog" className="hover:underline">
                            Blog
                        </Link>
                        <Link
                            href="/schemes-syllabi"
                            className="hover:underline"
                        >
                            Schemes & Syllabi
                        </Link>
                        <Link href="/library" className="hover:underline">
                            Library
                        </Link>
                        <Link href="/career" className="hover:underline">
                            Career@Echelon
                        </Link>
                        <Link href="/faq" className="hover:underline">
                            FAQ
                        </Link>
                    </div>
                </div>
            </div>

            {/* Center: Animated Word */}
            <div className="text-center mt-6 md:mt-0">
                <p className="text-4xl font-serif font-extrabold">
                    {words[index]}
                </p>
            </div>

            {/* Right: Map + Address */}
            <div className="flex items-center gap-5 mt-6 md:mt-0">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112298.5667030875!2d77.30080168433699!3d28.409291453962428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc396202390af%3A0xf7891d8025d636ed!2sEchelon%20Institute%20Of%20Technology%20-%20Top%20BBA%2C%20BCA%2C%20B.Tech%2C%20M.Tech%2C%20MCA%2C%20MBA%2C%20D.Voc%20and%20B.voc%20College%20in%20Faridabad!5e0!3m2!1sen!2sin!4v1744514359338!5m2!1sen!2sin"
                    width="350"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="flex flex-col items-center gap-5">
                    <Image
                        src={'/eit.png'}
                        alt="footer"
                        width={200}
                        height={200}
                    />

                    <p className="mt-2 text-xs text-center max-w-xs">
                        Echelon Institute of Technology, Kabulpur - Kheri Road,
                        Near Badkhal Lake, Faridabad, Haryana 121002
                    </p>
                    <div className="flex gap-4 mt-4">
                        <Link
                            href="https://www.facebook.com/EchelonInstituteOfTechnologyOfficial"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaFacebookF
                                size={socialLogoSize}
                                className="hover:text-blue-700 duration-100"
                            />
                        </Link>
                        <Link
                            href="https://x.com/echeloncollege"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaTwitter
                                size={socialLogoSize}
                                className="hover:text-blue-500 duration-100"
                            />
                        </Link>
                        <Link
                            href="https://www.youtube.com/@echeloninstituteoftechnology/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaYoutube
                                size={socialLogoSize}
                                className="hover:text-red-800 duration-100"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
