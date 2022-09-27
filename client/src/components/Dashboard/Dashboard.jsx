import { useState } from 'react';
import './Dashboard.css';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { useEffect } from 'react';

const Dashbaord = function ({statsDay, handleChangeDateAndMarket, theDate, theMarket}) {
    const [showPicker, setShowPicker] = useState(false);
    
    const today = new Date();
    const [selectedDay, setSelectedDay] = useState(today);

    useEffect(()=>{
        setShowPicker(false)
        handleChangeDateAndMarket(format(selectedDay, 'dd-MM-yyyy'), theMarket)
    }, [selectedDay])

    return (
        <div className="dashboardContainer">
            <div className="dashboardHeader">
                <h1 className='col-span-2'>Dashboard</h1>
                <select 
                    className='marketSelect'
                    value={theMarket}
                    onChange={e => {
                        handleChangeDateAndMarket(theDate, e.target.value)
                    }}
                >
                    <option name="japan">Japan</option>
                    <option name="germany">Germany</option>
                </select>

                <input 
                    className='dateInput'
                    value={theDate} 
                    onClick={() => setShowPicker(!showPicker)}
                    onChange={e => {
                        handleChangeDateAndMarket(e.target.value, theMarket)
                    }}
                />

                {showPicker ? 
                    <div className='dayPickerContainer'>
                        <DayPicker 
                            mode="single"
                            required
                            selected={selectedDay}
                            onSelect={setSelectedDay}
                        />
                    </div> 
                : null}                
            </div>
            
            {/* check if there is data, if not - display error message */}
            {(!statsDay || !statsDay.sales) ? 
            
            <div>
                <h2 className='col-span-2 my-10'>No data to display.</h2>
            </div> 
            
            :
            
            <div className="dashboardData">
                <div className="salesContainer">
                    <h2 className='h2'>Sales</h2>
                    <p>All: {statsDay.sales?.all}</p>
                    <p>New: {statsDay.sales?.new}</p>
                    <p>On mobile: {statsDay.sales?.mobile}</p>
                </div>

                <div className="usersContainer">
                    <h2 className='h2'>Users</h2>
                    <p>All: {statsDay.user?.all}</p>
                    <p>New: {statsDay.user?.new}</p>
                    <p>Registered: {statsDay.user?.registered}</p>
                </div>

                <div className="metricsContainer">
                    <h2 className='h2'>Metrics</h2>
                    <p>Average order: {statsDay.metrics?.avg_order}</p>
                    <p>Bounce rate: {statsDay.metrics?.bouce_rate}</p>
                    <p>Conversion: {statsDay.metrics?.conversion}</p>
                </div>
            </div>
            }
        </div>
    );
}

export default Dashbaord;