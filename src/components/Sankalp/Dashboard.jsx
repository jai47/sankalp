import Image from 'next/image';
import React from 'react';

const Dashboard = ({ club }) => {
    return (
        <div>
            <div className="relative h-[40vh] w-full">
                <Image
                    src={club[0]?.banner}
                    alt="background"
                    layout="fill"
                    objectFit="cover"
                    style={{ filter: 'grayscale(60%)' }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-white text-4xl font-bold">
                        {club[0]?.name}
                    </h1>

                    <p className="text-white text-lg mt-2">
                        {club[0]?.description}
                    </p>

                    <div className="absolute bottom-4 left-4">
                        <h2 className="text-white text-lg font-semibold">
                            {club[0]?.members.length} Members
                        </h2>
                        <h2 className="text-white text-lg font-semibold">
                            {club[0]?.events.length} Events
                        </h2>
                        <h2 className="text-white text-lg font-semibold">
                            {club[0]?.blogs.length} Blogs
                        </h2>
                    </div>
                </div>
            </div>
            {/* <button
                onClick={() => {
                    toast.success('Wow so easy !', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                }}
            >
                Click me
            </button> */}
        </div>
    );
};

export default Dashboard;
