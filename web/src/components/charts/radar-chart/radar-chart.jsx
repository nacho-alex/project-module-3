import { useContext, useEffect, useState } from "react";
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart} from "recharts";
import AuthContext from "../../../contexts/auth.context";
import { getCalendarRadarChart } from "../../../services/api.service";


function ChartRadar() {

    const context = useContext(AuthContext);
   
    const [exData, setExData] = useState([]);
    
    let maxLength;
    
    useEffect(() => {
      const fetchCalendarData = async () => {
          try {
              const entryData = await getCalendarRadarChart(context.user.id);
              
              const back = entryData.data.filter(entry => entry === "back");
              const chest = entryData.data.filter(entry => entry === "chest");
              const arms = entryData.data.filter(entry => entry === "lower arms" || entry === "upper arms");
              const legs = entryData.data.filter(entry => entry === "lower legs" || entry === "upper legs");
              const shoulders = entryData.data.filter(entry => entry === "shoulders");
              const waist = entryData.data.filter(entry => entry === "waist");

              const workLengths = [back.length, chest.length, arms.length, legs.length, shoulders.length, waist.length];
              maxLength = Math.max(...workLengths);
       
              const data = [
                {
                  "bodyPart": "Back",
                  "body work": back.length,
                },
                {
                  "bodyPart": "Chest",
                  "body work": chest.length,
                },
                {
                  "bodyPart": "Arms",
                  "body work": arms.length,
                },
                {
                  "bodyPart": "Legs",
                  "body work": legs.length,
                },
                {
                  "bodyPart": "Shoulders",
                  "body work": shoulders.length,
                },
                {
                  "bodyPart": "Waist",
                  "body work": waist.length,
                }
              ]

              setExData(data); 
          } catch (error) {
              console.error('Error fetching...:', error);
          }
      };
  
      fetchCalendarData();
  }, []);
  
     
    return (
      <>
        <RadarChart outerRadius={90} width={730} height={250} data={exData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="bodyPart" />
          <PolarRadiusAxis angle={30} domain={[0, maxLength]} />
          <Radar  dataKey="body work" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Legend />
        </RadarChart> 
      </>
    );
}

export default ChartRadar;