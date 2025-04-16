import React from 'react';

const loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-gray-400 border-t-gray-800"></div>
                <p className="text-gray-600 text-sm">Loading, please wait...</p>
            </div>
        </div>
    );
};

export default loading;
