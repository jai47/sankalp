import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ClubScroller = () => {
    const scrollRef = useRef(null);
    const animationControls = useAnimation();
    const [contentWidth, setContentWidth] = useState(0);

    const clubs = [
        'https://images.unsplash.com/photo-1563694983011-6f4d90358083?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1675083923190-387d05e8fe12?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1601158935942-52255782d322?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1661914978519-52a11fe159a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D',
        'https://images.unsplash.com/photo-1584441405886-bc91be61e56a?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const singleContentWidth = scrollContainer.scrollWidth / 4;
        setContentWidth(singleContentWidth);

        animationControls.start({
            x: -singleContentWidth,
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: singleContentWidth / 40,
                    ease: 'linear',
                },
            },
        });

        return () => animationControls.stop();
    }, [animationControls, contentWidth]);

    useEffect(() => {
        clubs.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    return (
        <div
            className={`w-screen h-screen flex flex-col  items-center gap-10 pb-28`}
        >
            {/* Title */}
            <div className="flex justify-center items-center gap-4 my-10">
                <span className="block w-16 h-[2px] bg-red-500 mx-auto" />
                <h2 className="text-5xl font-black text-center">Our Clubs</h2>
                <span className="block w-16 h-[2px] bg-red-500 mx-auto" />
            </div>

            {/* Scrolling Container */}
            <div
                className="overflow-hidden"
                style={{
                    maskImage:
                        'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                    position: 'relative',
                    width: '100%',
                    transform: 'translateZ(0)',
                }}
            >
                <motion.div
                    ref={scrollRef}
                    className="flex gap-8 whitespace-nowrap"
                    initial={{ x: 0 }}
                    animate={animationControls}
                    style={{
                        willChange: 'transform',
                        display: 'inline-flex',
                        width: 'max-content',
                        transform: 'translateZ(0)',
                    }}
                >
                    {[...clubs, ...clubs, ...clubs, ...clubs].map(
                        (logo, index) => (
                            <div
                                key={index}
                                className="relative flex-shrink-0 w-52 h-52 flex items-center justify-center overflow-hidden"
                            >
                                <motion.img
                                    src={logo}
                                    alt={`Club ${index}`}
                                    className="w-full h-full object-cover shadow-md"
                                    style={{ transform: 'translateZ(0)' }}
                                />
                            </div>
                        )
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default ClubScroller;
