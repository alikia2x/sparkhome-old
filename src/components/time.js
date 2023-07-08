import React, { useState, useEffect } from "react";

const Time = ({ showSecond }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const formatTime = () => {
        const hours = currentTime.getHours().toString().padStart(2, "0");
        const minutes = currentTime.getMinutes().toString().padStart(2, "0");
        const seconds = currentTime.getSeconds().toString().padStart(2, "0");

        if (showSecond) {
            return `${hours}:${minutes}:${seconds}`;
        } else {
            return `${hours}:${minutes}`;
        }
    };

    return (
        <div
            className="relative top-24 short:top-0 text-2xl font-din translate-x-[-50%] left-1/2 duration-200 text-white text-4xl text-center font-DIN text-shadow-lg"
            style={{ textShadow: "0px 0px 5px #222" }}
        >
            {formatTime()}
        </div>
    );
};

export default Time;
