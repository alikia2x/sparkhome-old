import { useCallback, useEffect, useRef, useState } from "react";
import { getDeviceId } from "../../utils/getDeviceId";
import Completion from "./completion";


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
        [] // 依赖项为空数组，确保不会在组件重新渲染时重新创建
    );
  
    return { completionData, updateCompletionData: memoizedUpdateCompletionData };
};
  
const useWebSocket = (data, updateResult, setOneSearchVisibility) => {
    const socketRef = useRef(null);

    useEffect(() => {
        const handleWebSocket = () => {
            const socket = new WebSocket(API_URL + getDeviceId());

            socket.addEventListener("open", (event) => {
                console.log("WebSocket connected");
                // When WebSocket connection is open, send the initial request
            });

            socket.addEventListener("message", (event) => {
                const receivedData = JSON.parse(event.data);
                updateResult(receivedData.result, receivedData.queryId);
            });

            return socket; // Return the socket for cleanup
        };

        socketRef.current = handleWebSocket();

        return () => {
            // Close WebSocket connection on component unmount
            socketRef.current.close();
        };
    }, [updateResult]);

    useEffect(() => {
        if (socketRef.current.readyState===1 && data["query"]!=="") {
            // Send a request to the server when the query changes
            console.log(data.query)
            socketRef.current.send(JSON.stringify(
                {
                    "tasks": [
                        {
                            "task": "completion",
                            "query": data["query"],
                            "engine": data["engine"]
                        }
                    ],
                    "queryId": Date.now()
                }                
            ));
        }
    }, [data.query]);    

};

// Custom hook for handling local search history
const useLocalSearchHistory = (searchTerm) => {
    useEffect(() => {
        // Replace this with your actual local history retrieval logic
        // For example, you might fetch it from localStorage
        const localHistoryResults =
            searchTerm.length > 0 ? [{ id: "local-1", label: `Local Result 1 for ${searchTerm}` }] : [];
        // Handle local history results accordingly
    }, [searchTerm]);
};


const OneSearch = ({query,engine,searchHandler}) => {
    const { completionData, updateCompletionData } = useCompletionData();
    const [showOneSearch, setOneSearchVisibility] = useState(false);
    useWebSocket({ "query": query, "engine": engine }, updateCompletionData, setOneSearchVisibility);
    useLocalSearchHistory(query);

    return (
        <div className={
            "absolute w-[600px] left-1/2 translate-x-[-50%] bg-[rgba(255,255,255,0.9)] "+
            "dark:bg-[rgba(24,24,24,0.9)] rounded-lg top-28 pl-2 py-1 z-3 "+
            showOneSearch ? "opacity-0" : "opacity-100"
        }>
            {completionData.map((item,index) => (
                <Completion key={index} text={item.content} query={query} searchHandler={searchHandler}></Completion>
            ))}
        </div>
    );
};

export default OneSearch;
