'use client';
import React, { useEffect, useRef } from 'react';
import template1 from '../../../assets/certificates/template1.png';

const Certificate = ({ title, description, faculty, head }) => {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    // Draw on canvas when the image or props are ready
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.src = template1.src;
        img.onload = () => {
            // Draw template image
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Add certificate text
            ctx.font = '28px serif';
            ctx.fillStyle = '#000';
            ctx.textAlign = 'center';
            ctx.fillText(title, canvas.width / 2, 160);

            ctx.font = '16px serif';
            ctx.fillText(description, canvas.width / 2, 215);

            ctx.textAlign = 'left';
            ctx.fillText(head, 150, 310);

            ctx.textAlign = 'right';
            ctx.fillText(faculty, 430, 310);
        };
    }, [title, description, faculty, head]);

    // Download function
    const downloadCertificate = () => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'certificate.png';
        link.href = dataURL;
        link.click();
    };

    return (
        <div className="flex flex-col items-center gap-6">
            <canvas
                ref={canvasRef}
                width={580}
                height={400}
                className="border shadow rounded"
            />
            <button
                onClick={downloadCertificate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Download Certificate
            </button>
        </div>
    );
};

export default Certificate;
