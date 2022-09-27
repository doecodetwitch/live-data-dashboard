import { useState, useEffect } from 'react';
import { db } from "./../firebase";
import { onSnapshot, query, collection, where } from 'firebase/firestore';

//subscribe to live data (firestore websocket)
const useFetchStatsDay = (date, market, stopLoading) => {
    const [fetchedData, setFetchedData] = useState({});

    useEffect(()=>{
        const q = query(collection(db, "stats_day"), where("date", "==", date), where("market", "==", market));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.empty && setFetchedData({})

            snapshot.forEach((doc)=>{
                setFetchedData(doc.data());
            })
            stopLoading();
          }, 
          (error) => {
            console.log(error)
          });
        
        return (()=>{
            unsubscribe();
        })
    }, [date, market])

    return(fetchedData);
}

export default useFetchStatsDay;