import { useContext, useEffect, useState } from "react";
import { Legend, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts";
import AuthContext from "../../../contexts/auth.context";
import { getCalendarDataChart } from "../../../services/api.service";


function ChartLine({exerciseId}) {
    
    const context = useContext(AuthContext);
    const [exData, setExData] = useState([]);
    
    useEffect(() => {
        const fetchCalendarData = async (exerciseId) => {
            try {
                const entryData = await getCalendarDataChart(context.user.id, exerciseId);
                const dataMap = entryData.data.map(element => {
                    return {
                        date: element.date,
                        kg: element.finishedEx[0].work[0].kg,
                        reps: element.finishedEx[0].work[0].reps                   
                }});
                setExData(dataMap);
            } catch (error) {
                console.error('Error fetching...:', error);
            }
        };

        fetchCalendarData(exerciseId)  
    }, []);
     
    return (
    
        <div>
            {exData.length > 1 && (
                <>
                    <LineChart width={800} height={250} data={exData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="kg" stroke="#8884d8" />
                        <Line type="monotone" dataKey="reps" stroke="#82ca9d" />
                    </LineChart> 
                </>
            )} 

            {exData.length < 2 && <p>No hay datos suficientes. Completa este ejercicio 2 o más veces y se mostrará tu evolución</p>}

        </div>
    );
}
  
export default ChartLine;