import { useState } from 'react';
import useFetchStatsDay from '../../hooks/useFetchStatsDay';

import Spinner from "../../components/Spinner/Spinner";
import Dashbaord from '../../components/Dashboard/Dashboard';
import { useEffect } from 'react';
import { DateTime } from "luxon";

function Home () {
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(null);
    const [market, setMarket] = useState(null);

    useEffect(()=>{
        if(!date){
            const now = DateTime.now().setZone("Europe/Warsaw");
            setDate(now.toFormat('dd-MM-yyyy'))
            console.log(date)
        }

        if(!market){
            setMarket('Germany');
        }
    }, [])

    const stopLoading = () => {
        setLoading(false);
    }

    const changeDateAndMarket = (newDate, newMarket) => {
        setDate(newDate);
        setMarket(newMarket);
    }

    const statsDay = useFetchStatsDay(date, market, stopLoading);

    if(loading) {
        return (
            <Spinner />
        );
    }

    return (
        <div>
            <Dashbaord 
                statsDay={statsDay} 
                handleChangeDateAndMarket={changeDateAndMarket} 
                theDate={date}
                theMarket={market}
            />
        </div>
    );
}

export default Home;