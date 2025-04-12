'use client';
import { useSearchParams } from 'next/navigation';

const useParams = (key) => {
    const searchParams = useSearchParams();

    return searchParams.get(key);
};

export default useParams;
