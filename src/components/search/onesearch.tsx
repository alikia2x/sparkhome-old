import { useCallback, useEffect, useRef, useState } from "react";
import { getDeviceId } from "../../utils/getDeviceId";


const API_URL = process.env.REACT_APP_API_URL;

const useCompletionData = () => {
    const [completionData, setCompletionData] = useState([]);
    // Use queryId to track the latest triggered event
    const [latestQueryId, setLatestQueryId] = useState(0);
    // Function to update completionData
    const updateCompletionData = useCallback((data, queryId) => {
      // Check if the queryId is the latest one
      if (queryId >= latestQueryId) {
        // Set the latestQueryId
        setLatestQueryId(queryId);
        // Update and sort completionData based on rank
        setCompletionData(data);
        setCompletionData((prevData) => [...prevData].sort((a, b) => b.rank - a.rank));
      }
    }, [latestQueryId]);
  
    return { completionData, updateCompletionData };
};
  
const useWebSocket = (query, setCompletionData) => {
    const socketRef = useRef(null);

    useEffect(() => {
        const handleWebSocket = () => {
            const socket = new WebSocket(API_URL + getDeviceId());

            socket.addEventListener("open", (event) => {
                console.log("WebSocket connected");
                // When WebSocket connection is open, send the initial request
                //socket.send(JSON.stringify({ searchTerm }));
            });

            socket.addEventListener("message", (event) => {
                const receivedData = JSON.parse(event.data);
                setCompletionData(receivedData);
            });

            return socket; // Return the socket for cleanup
        };

        socketRef.current = handleWebSocket();

        return () => {
            // Close WebSocket connection on component unmount
            socketRef.current.close();
        };
    }, [setCompletionData]);

    useEffect(() => {
        console.log(socketRef.current);
        if (socketRef.current&&socketRef.current.redayState==1) {
            // Send a request to the server when the query changes
            socketRef.current.send(JSON.stringify({ searchTerm: query }));
        }
    }, [query]);    

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


const OneSearch = (query) => {
    const { completionData, updateCompletionData } = useCompletionData();

    // Apply custom hooks
    useWebSocket(query, updateCompletionData);
    useLocalSearchHistory(query);

    return <div>{completionData}</div>;
};

export default OneSearch;
