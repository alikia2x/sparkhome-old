import { getLongestCommonPrefix } from "../../utils/lcp";

const Completion = ({text, searchHandler, query, onHover, setHovered, index}) => {
    const hovered = onHover;
    const commonPrefix = getLongestCommonPrefix(query, text);

    return (
        <div className="first:pt-2 last:pb-2">
            <p 
                className={"leading-10 ml-3 duration-150 cursor-pointer" + (hovered ? " text-lg leading-10" : "")}
                onClick={() => searchHandler(text)}
                onMouseOver={() => setHovered(index)}
                onMouseLeave={() => setHovered(-1)}
            >
                <span className="text-black dark:text-white">{commonPrefix}</span>
                <span className="text-neutral-600 dark:text-neutral-300">{text.substring(commonPrefix.length)}</span>
            </p>
        </div>
    );
};

export default Completion;
