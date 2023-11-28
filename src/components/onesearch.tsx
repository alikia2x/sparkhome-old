import React, {useCallback, useEffect, useRef, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidIsValid } from 'uuid';


const stateArr = [
    'Connecting',
    'Connected and communicable',
    'Connection closing',
    "Connection closed or unsuccessful",
];

const API_URL = process.env.REACT_APP_API_URL;

const OneSearch = ({ elementBackdrop, query }: { elementBackdrop: boolean, query: string }) => {
    let boxCSS = "absolute top-24 h-auto w-11/12 sm:w-[600px] left-1/2 translate-x-[-50%] bg-white px-2 rounded-xl hidden";
    let boxVarCSS = elementBackdrop
        ? "bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(24,24,24,0.75)] backdrop-blur-xl text-slate-900 dark:text-white"
        : "bg-[rgba(235,235,235,0.9)] dark:bg-[rgba(20,20,20,0.9)] text-slate-800 dark:text-slate-300";

    const [result, setSuggestions] = React.useState([]);
    const [readyState, setReadyState] = useState("Connecting");
    const ws = useRef<WebSocket | null>(null);

    const initWebSocket = useCallback(() => {
        if (!ws.current || ws.current.readyState === 3) {
            ws.current = new WebSocket(API_URL+"/"+getDeviceId());
            ws.current.onopen = _e =>
                setReadyState(stateArr[ws.current?.readyState ?? 0]);
            ws.current.onclose = _e =>
                setReadyState(stateArr[ws.current?.readyState ?? 0]);
            ws.current.onerror = e =>
                setReadyState(stateArr[ws.current?.readyState ?? 0]);
            ws.current.onmessage = e => {
                setSuggestions(e.data);
            };
        }
    }, [ws]);

    useEffect(()=> {
        initWebSocket();
        return () => {
            ws.current?.close();
        };
    },[ws, initWebSocket]);

    useEffect(() => {
        if (ws.current?.readyState !== 1) {
            setReadyState("Connecting")
            return;
        }
        ws.current?.send("query://"+query);
    }, [query]);

    function getDeviceId(){
        if (uuidIsValid(localStorage.getItem("deviceID"))){
            const id=localStorage.getItem("deviceID");
            return id;
        }
        else {
            const id=uuidv4();
            localStorage.setItem("deviceID", id);
            return id;
        }
    }
    return (
        <div className={`${boxCSS} ${boxVarCSS}`}>
            <div className="h-10">
                <span className="absolute mt-2">Suggestion #1</span>
            </div>
        </div>
    );
};

export default OneSearch;
