'use client';
import { useState, useEffect } from 'react';

const HeroTimeRemaining = ({ data }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(data));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(data));
        }, 1000);

        return () => clearInterval(timer); // Cleanup interval on component unmount
    }, [data]);

    function calculateTimeLeft(targetDate) {
        const remainingTime = new Date(targetDate) - new Date();

        if (remainingTime <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
            hours: Math.floor(
                (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            ),
            minutes: Math.floor(
                (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
            ),
            seconds: Math.floor((remainingTime % (1000 * 60)) / 1000),
        };
    }

    const { days, hours, minutes, seconds } = timeLeft;

    return (
        <div className="mt-6 flex flex-wrap justify-center items-center gap-4 sm:gap-6 select-none">
            <div className="text-center">
                <span className="text-3xl sm:text-4xl font-bold text-white">
                    {days}
                </span>
                <span className="text-sm sm:text-lg text-gray-300 ml-2">
                    DAYS
                </span>
            </div>
            <div className="text-center">
                <span className="text-3xl sm:text-4xl font-bold text-white">
                    {hours}
                </span>
                <span className="text-sm sm:text-lg text-gray-300 ml-2">
                    HOURS
                </span>
            </div>
            <div className="text-center">
                <span className="text-3xl sm:text-4xl font-bold text-white">
                    {minutes}
                </span>
                <span className="text-sm sm:text-lg text-gray-300 ml-2">
                    MINUTES
                </span>
            </div>
            <div className="text-center">
                <span className="text-3xl sm:text-4xl font-bold text-white">
                    {seconds}
                </span>
                <span className="text-sm sm:text-lg text-gray-300 ml-2">
                    SECONDS
                </span>
            </div>
        </div>
    );
};

export default HeroTimeRemaining;
