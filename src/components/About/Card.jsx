import { FaFacebook, FaTwitter } from 'react-icons/fa';

function Card({ image, role, name, description, facebook, twitter }) {
    return (
        <div>
            <div className="overflow-hidden ml-8 w-[290px]">
                <img src={image} alt={name} />
            </div>
            <p className="p-2 text-sm ml-6 text-[#FE9782] mt-7">
                {role || 'Founders & Lead Writer'}
            </p>
            <p className="anton-font text-4xl mt-4 ml-8  w-24">
                <span className="block">{name}</span>
            </p>
            <p className="ml-8 mt-7 font-light text-black w-[18rem]">
                {description ||
                    "I'm a paragraph. Click here to add your own text and edit me."}
            </p>

            <div className="flex align mt-8 ml-8 items-center space-x-3">
                {facebook && (
                    <a
                        href={facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaFacebook className="text-black text-[20px]" />
                    </a>
                )}
                {twitter && (
                    <a href={twitter} target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-black text-[20px]" />
                    </a>
                )}
            </div>
        </div>
    );
}

export default Card;
