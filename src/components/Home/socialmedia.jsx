import React from 'react';

const SocialMedia = ({ className }) => {
    const postId = [
        'CwDLQNXvPbk',
        'CttHpBJNflI',
        'CqvBhSbP39w',
        'CqvBTbBvars',
        'Cp45L9Bv1OA',
        'Cmdfa05pJLl',
    ];
    return (
        <section
            className={`${className} w-screen flex flex-col justify-center items-center gap-10 pb-28`}
        >
            <div className="flex justify-center items-center gap-4">
                <span className="block w-16 h-[2px] bg-red-500 mx-auto" />
                <h2 className="text-5xl font-black text-center">
                    Social Media
                </h2>
                <span className="block w-16 h-[2px] bg-red-500 mx-auto" />
            </div>
            <div className="w-full flex flex-wrap justify-center gap-x-20 gap-8">
                {postId.map((pid, index) => (
                    <iframe
                        key={index}
                        src={`https://www.instagram.com/p/${pid}/embed/`}
                        width="400"
                        height="480"
                        allowtransparency="true"
                    ></iframe>
                ))}
            </div>
        </section>
    );
};

export default SocialMedia;
