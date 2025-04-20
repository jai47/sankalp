'use client';
import Link from 'next/link';
import useParams from '@/hooks/useParams';
import Image from 'next/image';

const MultiSection = ({ details }) => {
    const gallery = details.image;
    const querySection = useParams('section') || 'Details';

    // Define the content for each section
    const renderSectionContent = () => {
        switch (querySection) {
            case 'Details':
                return (
                    <div className="w-11/12 mt-10">{details.description}</div>
                );
            case 'Gallery':
                return (
                    <div className="mt-8">
                        {gallery && gallery.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {gallery.map((sponsor, index) => (
                                    <Link
                                        href={sponsor.link || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        key={index}
                                        className="flex flex-col items-center p-6 transition-transform transform hover:scale-105 hover:shadow-xl rounded-xl border border-gray-200"
                                    >
                                        <Image
                                            src={sponsor.image?.thumbnailUrl}
                                            alt={`${sponsor.name} logo`}
                                            width={100}
                                            height={100}
                                            className="w-28 h-28 object-contain mb-6 rounded-lg shadow-md"
                                        />
                                        <p className="text-gray-800 dark:text-primary text-base font-semibold text-center">
                                            {sponsor.name}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400 text-base text-center font-medium">
                                No sponsors available at the moment.
                            </p>
                        )}
                    </div>
                );
            default:
                return (
                    <p className="text-sm sm:text-base">Section not found.</p>
                );
        }
    };

    return (
        <div className="w-11/12">
            <div className="w-11/12">
                <div className="text-lg font-light text-gray-400 flex gap-10">
                    <Link
                        href="?section=Details"
                        scroll={false}
                        className={`${
                            querySection === 'Details'
                                ? 'text-gray-600 hover:text-gray-500'
                                : 'text-background border-background dark:text-primary'
                        }`}
                    >
                        <span id="details">Details</span>
                    </Link>
                    <Link
                        href="?section=Gallery"
                        scroll={false}
                        className={`${
                            querySection === 'Gallery'
                                ? 'text-gray-600 hover:text-gray-500'
                                : 'text-background border-background dark:text-primary'
                        }`}
                    >
                        Gallery
                    </Link>
                </div>
            </div>
            <div className="h-[1px] w-full bg-gray-400 mt-2" />
            {renderSectionContent()}
        </div>
    );
};

export default MultiSection;
