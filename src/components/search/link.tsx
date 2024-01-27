import { useState } from "react";

const Link = ({text}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="first:pt-2 last:pb-2">
            <p 
                className={"leading-10 ml-3 duration-150 cursor-pointer" + (hovered ? " text-lg leading-10" : "")}
                onClick={() => window.open(text)}
                onMouseOver={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                
                <span className="text-black dark:text-white">{text}</span>
            </p>
        </div>
    );
};

export default Link;
