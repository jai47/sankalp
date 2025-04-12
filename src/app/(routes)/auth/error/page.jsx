'use client';

import { signIn, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthError() {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const [error, setError] = useState(
        'You are not authorized to access this page.'
    );

    useEffect(() => {
        const errorParam = searchParams.get('error');
        if (errorParam) {
            setError(errorParam);
        }
    }, [searchParams]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900">
            <h1 className="text-4xl font-bold">Access Denied</h1>
            <p className="text-lg text-gray-600 mt-2">{error}</p>

            <div className="relative mt-8">
                <span className="text-9xl font-extrabold text-gray-300 -top-6 left-1/2 transform -translate-x-1/2">
                    4
                </span>
                <span className="text-9xl font-extrabold text-red-500 left-1/2 transform -translate-x-1/2">
                    0
                </span>
                <span className="text-9xl font-extrabold text-gray-300 -top-6 left-1/2 transform translate-x-6">
                    3
                </span>
            </div>

            <button
                onClick={() => signIn('google')}
                className="mt-6 px-6 py-2 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
            >
                Try with college email
            </button>
        </div>
    );
}
