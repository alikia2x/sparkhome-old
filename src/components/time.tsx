import React, {useState, useEffect} from "react";

const Time = ({showSecond}) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 150);

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
            className="absolute top-20 lg:top-42 short:top-0 translate-x-[-50%] left-1/2 duration-200 text-white text-4xl text-center font-DIN text-shadow-lg"
            style={{textShadow: "0px 0px 5px rgba(30,30,30,0.5)"}}
        >
            {formatTime()}
        </div>
    );
};

export default Time;
