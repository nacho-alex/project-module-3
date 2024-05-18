import { useContext, useEffect, useState } from "react";
import { Legend, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, ResponsiveContainer } from "recharts";
import AuthContext from "../../../contexts/auth.context";
import { getCalendarDataChart } from "../../../services/api.service";
import './line-charts.css';

function ChartLine({ exerciseId }) {
    const context = useContext(AuthContext);
    const [exData, setExData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCalendarData = async (exerciseId) => {
            setLoading(true); // Start loading
            try {
                const entryData = await getCalendarDataChart(context.user.id, exerciseId);
                const dataMap = entryData.data.map(element => {
                    return {
                        date: element.date,
                        kg: element.finishedEx[0].work[0].kg,
                        reps: element.finishedEx[0].work[0].reps
                    };
                });
                setExData(dataMap);
            } catch (error) {
                console.error('Error fetching...:', error);
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchCalendarData(exerciseId);
    }, [exerciseId, context.user.id]);

    return (
        <div className="chart-container">
            {loading ? (
            <div className="loader-container">
                <div style={{ width: '100%' }}>
                    <div class="loader"></div>
                </div>
            </div>
            ) : exData.length > 1 ? (
                <div style={{ width: '100%' }}>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={exData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="kg" stroke="#8884d8" />
                            <Line type="monotone" dataKey="reps" stroke="#82ca9d" />
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

export default ChartLine;
