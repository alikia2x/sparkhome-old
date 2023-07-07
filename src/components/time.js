import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const Time = ({ format }) => {
    const [date, setDate] = useState(new Date());
    const [timeDiff, setTimeDiff] = useState(0);

    // 请求网络时间
    useEffect(() => {
        const fetchTime = async () => {
            const apiUrl = process.env.REACT_APP_API_URL + '/time';
            try {
                const serverTimeStart = new Date().getTime();
                const { data } = await axios.get(apiUrl).data.timestamp;
                const serverTimeEnd = new Date().getTime();
                const serverTimeReceived = (serverTimeStart + serverTimeEnd) / 2;
                const serverTime = new Date(data).getTime();
                // 计算网络请求延迟
                setTimeDiff(serverTime - serverTimeReceived);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTime();
    }, []);

    // 更新时间
    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date(new Date().getTime() + timeDiff));
        }, 150);

        return () => {
            clearInterval(interval);
        };
    }, [timeDiff]);

    const timeFormat = format === 'hh:mm' ? 'HH:mm' : 'HH:mm:ss';
    const timeString = moment(date).format(timeFormat);

    return (
        <div className="relative top-24 text-2xl font-din translate-x-[-50%] left-1/2 duration-200 text-white text-4xl text-center font-DIN text-shadow-lg" style={{textShadow:"0px 0px 5px #222"}}>
            {timeString}
        </div>
    );
}

export default Time;