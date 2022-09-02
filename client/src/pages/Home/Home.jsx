import { useState, useEffect } from 'react';
import { db } from "./../../firebase";
import { collection, getDocs } from 'firebase/firestore/lite';

function Home () {
    const [statsDay, setStatsDay] = useState([]);

    async function getStatsDay(db) {
        const dayStatsCol = collection(db, 'stats_day');
        const dayStatsSnapshot = await getDocs(dayStatsCol);
        const dayStatsList = dayStatsSnapshot.docs.map(doc => doc.data());
        return dayStatsList;
    }

    //fetch data
    useEffect(()=>{
        const fetchStatsDay = async () => {
        const getStatsDayCall = getStatsDay(db)
        getStatsDayCall.then((data, error)=>{
            setStatsDay(data)
        })
        }
    
        fetchStatsDay()
    }, [])

    return (
        <div>
            <h1>Test</h1>
        {statsDay.map((stat)=>(
            <p>{stat.date}</p>
        ))}
        </div>
    );
}

export default Home;