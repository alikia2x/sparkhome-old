import { useCallback, useEffect, useRef, useState, useContext, useMemo, useImperativeHandle, forwardRef } from "react";

import { getDeviceId } from "../../utils/getDeviceId";
import Completion from "./completion";
import { SettingsContext } from "../../contexts/settingsContext";
import { normalizeURL } from "../../utils/normalizeURL";
import Link from "./link";

const API_URL = process.env.REACT_APP_API_URL;

const updateCompletionData = (latestQueryId: number, setLatestQueryId, completionDataRef) => {
    const update: UpdateResult = function (data, queryId, completionData) {
        if (queryId >= latestQueryId) {
            setLatestQueryId(queryId);
            let sourceToDelete = "";
            let result: OneSearchResults = completionDataRef.current;

            if (data.length !== 0) {
                sourceToDelete = data[0].from;
            }

            for (let i = 0; i < result.length; i++) {
                if (result[i].from === sourceToDelete) {
                    result.splice(i);
                    break;
                }
            }
            console.log(result,data);
            result = result.concat(data);
            completionDataRef.current = result; // 更新到 completionDataRef.current
        }
    };
    return update;
};

const useCompletionData = () => {
    const completionDataRef = useRef([]);
    const [latestQueryId, setLatestQueryId] = useState(0);

    const memoizedUpdateCompletionData = useCallback(
        updateCompletionData(latestQueryId, setLatestQueryId, completionDataRef),
        []
    );

    return { completionData: completionDataRef.current, updateCompletionData: memoizedUpdateCompletionData };
};

type QueryRef = { current: string };
type UpdateResult = (result: OneSearchResults, queryId: number, completionData: OneSearchResults) => void;
type SetOneSearchVisibility = (visibility: boolean) => void;
type OneSearchResult = {
    content: string;
    type: string;
    from: string;
};
type OneSearchResults = OneSearchResult[];

const useWebSocket = (
    queryRef: QueryRef,
    query: string,
    engine: string,
    updateResult: UpdateResult,
    setOneSearchVisibility: SetOneSearchVisibility,
    resultRef
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
                    updateResult(receivedData.result, receivedData.queryId, resultRef.current);
                } else {
                    updateResult([], Date.now(), resultRef.current);
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
    }, [queryRef, resultRef, setOneSearchVisibility, updateResult]);

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

const useLocalSearchHistory = (searchTerm, updateResult: UpdateResult, setOneSearchVisibility, resultRef) => {
    useEffect(() => {
        let url_re =
            /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?:?[0-9]{0,5}\/?[-a-zA-Z0-9_.~!*'();:@&=+$,/?#\[\]%]*$/;
        let domain_re =
            /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z][-a-zA-Z]{0,62})+\.?:?[0-9]{0,5}\/?[-a-zA-Z0-9_.~!*'();:@&=+$,/?#\[\]%]*$/;
        let ip_re =
            /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}:?[0-9]{0,5}\/?[-a-zA-Z0-9_.~!*'();:@&=+$,/?#\[\]%]*$/;
        if (url_re.test(searchTerm) || domain_re.test(searchTerm) || ip_re.test(searchTerm)) {
            let result = {
                content: normalizeURL(searchTerm),
                type: "link",
                from: "local",
            };
            console.log("Matched");
            // update result with existing stuffs behind the var `result`
            //updateResult([result], Date.now(), resultRef.current);
            //setOneSearchVisibility(true);
        }
        else{
            //updateResult([], Date.now(), resultRef.current);
        }
    }, [searchTerm, resultRef, updateResult, setOneSearchVisibility]);
};

const OneSearch = ({ query, engine, searchHandler, searchFocus }, ref) => {
    const { completionData, updateCompletionData } = useCompletionData();
    const [showOneSearch, setOneSearchVisibility] = useState(false);
    const [onHover, setOnHover] = useState(-1);
    const settings = useContext(SettingsContext);
    const queryRef = useRef(query);
    const resultRef = useRef(completionData);
    useEffect(() => {
        queryRef.current = query;
    }, [query]);

    useWebSocket(queryRef, query, engine, updateCompletionData, setOneSearchVisibility, resultRef);
    useLocalSearchHistory(query, updateCompletionData, setOneSearchVisibility, resultRef);

    const handleKeyPress = useMemo(
        () => (event) => {
            if (event.key === "ArrowUp") {
                event.preventDefault();
                setOnHover((onHover - 1 + completionData.length + 1) % (completionData.length + 1));
            } else if (event.key === "ArrowDown") {
                event.preventDefault();
                setOnHover((onHover + 1) % (completionData.length + 1));
            }
        },
        [completionData.length, onHover]
    );

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            let url_re =
            /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?:?[0-9]{0,5}\/?[-a-zA-Z0-9_.~!*'();:@&=+$,/?#\[\]%]*$/;
            let domain_re =
                /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z][-a-zA-Z]{0,62})+\.?:?[0-9]{0,5}\/?[-a-zA-Z0-9_.~!*'();:@&=+$,/?#\[\]%]*$/;
            let ip_re =
                /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}:?[0-9]{0,5}\/?[-a-zA-Z0-9_.~!*'();:@&=+$,/?#\[\]%]*$/;
            if (url_re.test(query) || domain_re.test(query) || ip_re.test(query)) {
                window.open(normalizeURL(query));
            }
            else if (completionData[onHover] !== undefined) {
                searchHandler(completionData[onHover].content);
            } else {
                searchHandler(query);
            }
        }
    };

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
            {completionData.map((item, index) => {
                if (item.type === "search") {
                    return (
                        <Completion
                            key={index}
                            text={item.content}
                            query={query}
                            searchHandler={searchHandler}
                            onHover={onHover === index}
                            index={index}
                            setHovered={setOnHover}
                        ></Completion>
                    );
                } else if (item.type === "link") {
                    setTimeout(() => {
                        setOnHover(index);
                    }, 50);
                    return <Link key={index} text={item.content}></Link>;
                }
                return null; // or any other default behavior
            })}
        </div>
    );
};

export default forwardRef(OneSearch);
