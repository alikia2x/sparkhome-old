import { useCallback, useEffect, useRef, useState, useContext, useMemo, useImperativeHandle, forwardRef } from "react";

import { getDeviceId } from "../../utils/getDeviceId";
import Completion from "./completion";
import { SettingsContext } from "../../contexts/settingsContext";

const API_URL = process.env.REACT_APP_API_URL;

const updateCompletionData = (latestQueryId, setLatestQueryId, setCompletionData) => (data, queryId) => {
    if (queryId >= latestQueryId) {
        setLatestQueryId(queryId);
        setCompletionData(data);
    }
};

const useCompletionData = () => {
    const [completionData, setCompletionData] = useState([]);
    // Use queryId to track the latest triggered event
    const [latestQueryId, setLatestQueryId] = useState(0);
    const memoizedUpdateCompletionData = useCallback(
        updateCompletionData(latestQueryId, setLatestQueryId, setCompletionData),
        []
    );
    return { completionData, updateCompletionData: memoizedUpdateCompletionData };
};

type QueryRef = { current: string };
type UpdateResult = (result: any[], queryId: number) => void;
type SetOneSearchVisibility = (visibility: boolean) => void;

const useWebSocket = (
    queryRef: QueryRef,
    query: string,
    engine: string,
    updateResult: UpdateResult,
    setOneSearchVisibility: SetOneSearchVisibility,
): void => {
    const socketRef = useRef(null);

    useEffect(() => {
        const handleWebSocket = () => {
            const socket = new WebSocket(API_URL + getDeviceId());

            socket.addEventListener("open", (event) => {
                console.log("OneSearch: WebSocket connected");
            });

            socket.addEventListener("message", (event) => {
                const receivedData = JSON.parse(event.data);
                setOneSearchVisibility(true);
                if (queryRef.current !== "") {
                    updateResult(receivedData.result, receivedData.queryId);
                }
                else{
                    updateResult([], Date.now());
                }
            });

            socket.addEventListener("close", (event) => {
                console.log("OneSearch: WebSocket disconnected");
                console.log("OneSearch: Reconnecting in 1 second...");
                // Retry connect
                setTimeout(() => {
                    socketRef.current = handleWebSocket();
                }, 1000);
            });

            return socket; // Return the socket for cleanup
        };

        socketRef.current = handleWebSocket();

        return () => {
            // Close WebSocket connection on component unmount
            socketRef.current.close();
        };
    }, [queryRef, setOneSearchVisibility, updateResult]);

    useEffect(() => {
        if (query === "") {
            setOneSearchVisibility(false);
        }
        if (socketRef.current.readyState === 1 && query !== "") {
            // Send a request to the server when the query changes
            socketRef.current.send(
                JSON.stringify({
                    tasks: [
                        {
                            task: "completion",
                            query: query,
                            engine: engine,
                        },
                    ],
                    queryId: Date.now(),
                })
            );
        }
    }, [engine, query, setOneSearchVisibility]);
};

// Custom hook for handling local search history
// const useLocalSearchHistory = (searchTerm) => {
//     useEffect(() => {
//         // Replace this with your actual local history retrieval logic
//         // For example, you might fetch it from localStorage
//         const localHistoryResults =
//             searchTerm.length > 0 ? [{ id: "local-1", label: `Local Result 1 for ${searchTerm}` }] : [];
//         // Handle local history results accordingly
//     }, [searchTerm]);
// };

const OneSearch = ({ query, engine, searchHandler, searchFocus}, ref) => {
    const { completionData, updateCompletionData } = useCompletionData();
    const [showOneSearch, setOneSearchVisibility] = useState(false);
    const [onHover, setOnHover] = useState(-1);
    const settings = useContext(SettingsContext);
    const queryRef = useRef(query);
    useEffect(() => {
        queryRef.current = query;
    }, [query]);

    useWebSocket(queryRef, query, engine, updateCompletionData, setOneSearchVisibility);
    //useLocalSearchHistory(query);

    const handleKeyPress = useMemo(
        () => (event) => {
            if (event.key==="ArrowUp"){
                event.preventDefault();
                setOnHover((onHover - 1 + completionData.length + 1) % (completionData.length + 1));
            }
            else if (event.key==="ArrowDown"){
                event.preventDefault();
                setOnHover((onHover + 1) % (completionData.length + 1));
            }
        },
        [completionData.length, onHover]
    );

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            if (completionData[onHover] !== undefined){
                searchHandler(completionData[onHover].content);
            }
            else{
                searchHandler(query);
            }
        }
    }

    useImperativeHandle(ref, () => ({
        handleKeyDown,
    }));

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);
    return (
        <div
            className={
                "absolute w-[600px] left-1/2 translate-x-[-50%] bg-[rgba(255,255,255,0.7)] " +
                "dark:bg-[rgba(24,24,24,0.7)] rounded-lg top-28 pl-2 z-3 duration-150 " +
                (showOneSearch && searchFocus ? "opacity-100" : "opacity-0 pointer-events-none") +
                " " +
                (settings.get("elementBackdrop") ? "backdrop-blur-lg" : "") +
                " " +
                (completionData.length === 0 ? "" : "py-1")
            }
        >
            {completionData.map((item, index) => (
                <Completion
                    key={index}
                    text={item.content}
                    query={query}
                    searchHandler={searchHandler}
                    onHover={onHover === index}
                    index={index}
                    setHovered={setOnHover}
                ></Completion>
            ))}
        </div>
    );
}

export default forwardRef(OneSearch);