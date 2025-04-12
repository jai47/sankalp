'use client';
import useParams from '@/hooks/useParams';
import Link from 'next/link';
import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { RxCross1 } from 'react-icons/rx';
const Filter = () => {
    const selected = useParams('filter');
    const [search, setSearch] = useState('');
    const [toggle, setToggle] = useState(false);
    return (
        <div className="w-1/2 flex justify-between items-center select-none">
            <div>
                <ul className="flex text-lg space-x-8 font-thin">
                    <Link
                        href="/blogs?filter=all"
                        scroll={false}
                        className={`cursor-pointer ${
                            selected === 'all' && 'text-red-500'
                        } hover:text-red-600 `}
                    >
                        All Posts
                    </Link>
                    <Link
                        href="/blogs?filter=feature"
                        scroll={false}
                        className={`cursor-pointer ${
                            selected === 'feature' && 'text-red-500'
                        } hover:text-red-600 `}
                    >
                        Featured
                    </Link>
                    <Link
                        href="/blogs?filter=latest"
                        scroll={false}
                        className={`cursor-pointer ${
                            selected === 'latest' && 'text-red-500'
                        } hover:text-red-600 `}
                    >
                        Latest
                    </Link>
                    <Link
                        href="/blogs?filter=populor"
                        scroll={false}
                        className={`cursor-pointer ${
                            selected === 'populor' && 'text-red-500'
                        } hover:text-red-600 `}
                    >
                        Most Popular
                    </Link>
                </ul>
            </div>
            <div className="w-2/5 flex justify-end items-center">
                {toggle && (
                    <div className="w-3/4 flex items-center border p-1 justify-between">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-11/12 text-sm font-light selection:bg-red-200 outline-none border-none p-1"
                        />
                        <div
                            onClick={() => {
                                setToggle(!toggle);
                                setSearch('');
                            }}
                            className="cursor-pointer text-gray-400"
                        >
                            <RxCross1 size={15} />
                        </div>
                    </div>
                )}
                {!toggle && (
                    <div
                        onClick={() => setToggle(!toggle)}
                        className="cursor-pointer"
                    >
                        <CiSearch size={30} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Filter;
