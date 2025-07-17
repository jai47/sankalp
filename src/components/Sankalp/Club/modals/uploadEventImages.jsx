import { motion, AnimatePresence } from 'framer-motion';

import React from 'react';

const UploadEventImages = ({ showModal }) => {
    return (
        <AnimatePresence mode="wait">
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <motion.div
                    key={Date.now()}
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    exit={{ y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-9/12 w-2xl h-[60vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6"
                >
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            showModal(false);
                        }}
                        className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl font-bold"
                    >
                        &times;
                    </button>
                    UploadEventImages
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default UploadEventImages;
