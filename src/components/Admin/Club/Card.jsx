import Link from 'next/link';
import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Card = ({ club }) => {
    return (
        <div className="flex flex-col justify-center items-center w-[300px] h-[400px] shadow-md shadow-black/30 rounded-[5px] overflow-hidden">
            <div className="h-1/5 w-full bg-green-200 relative">
                {/* User Icon */}
                <img
                    src={club.logo}
                    className=" w-[50px] h-[50px] rounded-[10px] absolute top-[10px] left-[10px]"
                />

                {/* Username */}
                <p className="bg-white rounded-[5px] border px-2 border-[#262626]  text-[15px] font-bold absolute top-[10px] left-[70px]">
                    {club?.name}
                </p>

                {/* ID */}
                <p className="bg-[#414141] w-[100px] h-[15px] rounded-[5px] border-2 border-[#262626] text-[#262626] text-[15px] font-bold absolute top-[45px] left-[70px]" />
            </div>

            {/* Description Box */}
            <div className=" w-[96%] h-3/5 rounded-[5px] mt-[6px] border">
                <p>Members: {club?.members?.length}</p>
                <p>Events: {club?.events?.length}</p>
                <p>Blogs: {club?.blogs?.length}</p>
            </div>

            {/* Social Media */}
            <div className="h-[15%] w-full mt-3 px-2">
                {/* Divider Line */}
                <div className="h-[2px] bg-gray-200 mb-[10px]" />

                <div className="flex items-center justify-between space-x-4 px-[25px]">
                    <Link
                        href={club?.socialMediaLinks?.twitter || '#'}
                        target="_blank"
                    >
                        <FaTwitter className="text-blue-300 w-5 h-5" />
                    </Link>
                    <Link
                        href={club?.socialMediaLinks?.instagram || '#'}
                        target="_blank"
                    >
                        <FaInstagram className="text-purple-400 w-5 h-5" />
                    </Link>

                    <Link
                        href={club?.socialMediaLinks?.facebook || '#'}
                        target="_blank"
                    >
                        <FaFacebook className="text-blue-800 w-5 h-5" />
                    </Link>

                    <Link
                        href={club?.socialMediaLinks?.linkedin || '#'}
                        target="_blank"
                    >
                        <FaLinkedin className="text-blue-500 w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;
