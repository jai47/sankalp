'use client';

import Image from 'next/image';
import React, { useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';
import template1 from '@/assets/certificates/template1.png';

const CertificateRenderer = ({ user, certificate }) => {
    const ref = useRef(null);

    const handleDownload = useCallback(() => {
        if (ref.current === null) {
            return;
        }

        toPng(ref.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = user.name + '.png';
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    }, [ref]);

    return (
        <div className="flex flex-col items-center justify-center p-10">
            <div ref={ref} className="relative w-[800px] h-[566px]">
                <Image
                    src={template1}
                    alt="Certificate Template"
                    fill
                    className="absolute object-cover"
                />
                <div className="absolute w-full text-center top-[14.5rem]">
                    <p className="font-serif text-4xl">{user.name}</p>
                </div>
                <div className="absolute w-full text-center top-[19rem]">
                    <div className="flex justify-center items-center w-full">
                        <div className="w-4/5">
                            <p className="font-serif text-sm">
                                {certificate.description}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="absolute w-full text-center top-[25rem]">
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-between w-[60%]">
                            <p className="font-serif text-sm">
                                {certificate.issuedBy}
                            </p>
                            <p className="font-serif text-sm">
                                {new Date(
                                    certificate.issueDate
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={handleDownload}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Download Certificate
            </button>
        </div>
    );
};

export default CertificateRenderer;
