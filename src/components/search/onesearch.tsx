import { useCallback, useEffect, useRef, useState, useContext } from "react";
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
  
const useWebSocket = (data, updateResult, setOneSearchVisibility) => {
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
                updateResult(receivedData.result, receivedData.queryId);
            });

            socket.addEventListener("close", (event) => {
                console.log("OneSearch: WebSocket disconnected");
                console.log("OneSearch: Reconnecting in 1 second...");
                // Retry connect
                setTimeout(() => {
                    socketRef.current = handleWebSocket();
                }, 1000);
            })

            return socket; // Return the socket for cleanup
        };

        socketRef.current = handleWebSocket();

        return () => {
            // Close WebSocket connection on component unmount
            socketRef.current.close();
        };
    }, [setOneSearchVisibility, updateResult]);

    useEffect(() => {
        if(data["query"]===""){
            setOneSearchVisibility(false);
        }
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


const OneSearch = ({query,engine,searchHandler,searchFocus}) => {
    const { completionData, updateCompletionData } = useCompletionData();
    const [showOneSearch, setOneSearchVisibility] = useState(false);
    const settings = useContext(SettingsContext);
    useWebSocket({ "query": query, "engine": engine }, updateCompletionData, setOneSearchVisibility);
    useLocalSearchHistory(query);

    return (
        <div className={
            "absolute w-[600px] left-1/2 translate-x-[-50%] bg-[rgba(255,255,255,0.7)] " +
            "dark:bg-[rgba(24,24,24,0.7)] rounded-lg top-28 pl-2 py-1 z-3 duration-150 " +
            (showOneSearch && searchFocus ? "opacity-100" : "opacity-0 pointer-events-none") + " " +
            (settings.get("elementBackdrop") ? "backdrop-blur-lg" : "")
        }>
            {completionData.map((item,index) => (
                <Completion key={index} text={item.content} query={query} searchHandler={searchHandler}></Completion>
            ))}
        </div>
    );
};

export default OneSearch;
