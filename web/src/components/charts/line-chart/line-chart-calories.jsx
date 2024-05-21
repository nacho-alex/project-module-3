import AuthContext from "../../../contexts/auth.context";
import { getCalendarDataChart, getCalendarLineChart } from "../../../services/api.service";
import { useContext, useEffect, useState } from "react";
import { Legend, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, ResponsiveContainer } from "recharts";

function ChartLineCalories() {

    const context = useContext(AuthContext);
    const [caloriesData, setCaloriesData] = useState([]);
    const [loading, setLoading] = useState(true);

    const calculateCaloriesGoal = () => {
        const userAgeMilliseconds = Date.now() - new Date(context.user.birthDate).getTime();
        const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
        const userAge = Math.floor(userAgeMilliseconds / millisecondsInYear);
        let tmb;
        if (context.user.genre === 'male') {
            tmb = ((10 * context.user.weight) + (6.25 * context.user.height) - (5 * userAge) + 5) * context.user.activityLevel;
        } else {
            tmb = ((10 * context.user.weight) + (6.25 * context.user.height) - (5 * userAge) - 161) * context.user.activityLevel;
        }
        const goalCalories = Math.floor(context.user.goal === 'gain' ? tmb + 400 : tmb - 400);
        return goalCalories;
    };

    useEffect(() => {
        const fetchCalendarData = async () => {
            setLoading(true);
            try {
                const caloriesResponse = await getCalendarDataChart(context.user.id, "calories");
                const caloriesData = caloriesResponse.data;
    
                const data = [];

                const datesResponse = await getCalendarLineChart(context.user.id);
                const datesData = datesResponse.data;
                   
                    caloriesData.forEach((entry, index) => {
                        data.push({
                            date: datesData[index],
                            calories: entry, 
                            goal: calculateCaloriesGoal()
                        });
                    });
                
                setCaloriesData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchCalendarData();
    }, [context.user.id]);
    
    return (
        <div className="chart-container">
            {loading ? (
            <div className="loader-container">
                <div style={{ width: '100%' }}>
                    <div className="loader"></div>
                </div>
            </div>
            ) : caloriesData.length > 1 ? (
                <div style={{ width: '100%' }}>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart  data={caloriesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="calories" stroke="#8884d8" strokeWidth={3} />
                            <Line type="monotone" dataKey="goal" stroke="#82ca9d" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div >
                    <p >There is not enough data. Complete this exercise 2 or more times and your evolution will be shown.</p>
                </div>
            )}
        </div>
    );
}

export default ChartLineCalories;