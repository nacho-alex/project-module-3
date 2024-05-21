import { useContext, useEffect, useRef, useState } from "react";
import {  Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis,  } from "recharts";
import AuthContext from "../../../contexts/auth.context";
import { getCalendarDataChart } from "../../../services/api.service";


function ChartBar({ info }) {
   

    const context = useContext(AuthContext);
   
    const [dataBody, setDataBody] = useState([]);
    const [dataMuscle, setDataMuscle] = useState([]);
    const [dataMacro, setDataMacro] = useState({});

    const noDataBody = useRef(false);
    const noDataMuscle = useRef(false);
    const noDataMacro = useRef(false);
    
    let maxBodyWork;
    let maxMuscleWork;
    
    useEffect(() => {
      const fetchCalendarData = async () => {
          try {
              const entryData = await getCalendarDataChart(context.user.id, info);
              
              if (info === "body") {
                const back = entryData.data.filter(entry => entry === "back");
                const chest = entryData.data.filter(entry => entry === "chest");
                const arms = entryData.data.filter(entry => entry === "lower arms" || entry === "upper arms");
                const legs = entryData.data.filter(entry => entry === "lower legs" || entry === "upper legs");
                const shoulders = entryData.data.filter(entry => entry === "shoulders");
                const waist = entryData.data.filter(entry => entry === "waist");

                const bodyLengths = [back.length, chest.length, arms.length, legs.length, shoulders.length, waist.length];
                maxBodyWork = Math.max(...bodyLengths);
                const sumBodyLengths = bodyLengths.reduce((acc, currentValue) => acc + currentValue, 0);

                if (!sumBodyLengths) {
                    noDataBody.current = true;
                }
      
              const data = [
                  {
                  "bodyPart": "Back %",
                  "body work": Math.round((back.length / sumBodyLengths) * 100 * 100) / 100,
                  },
                  {
                  "bodyPart": "Chest %",
                  "body work": Math.round((chest.length / sumBodyLengths) * 100 * 100) / 100,
                  },
                  {
                  "bodyPart": "Arms %",
                  "body work": Math.round((arms.length / sumBodyLengths) * 100 * 100) / 100,
                  },
                  {
                  "bodyPart": "Legs %",
                  "body work": Math.round((legs.length / sumBodyLengths) * 100 * 100) / 100,
                  },
                  {
                  "bodyPart": "Shoulders %",
                  "body work": Math.round((shoulders.length / sumBodyLengths) * 100 * 100) / 100,
                  },
                  {
                  "bodyPart": "Waist %",
                  "body work": Math.round((waist.length / sumBodyLengths) * 100 * 100) / 100,
                  }
              ]

              setDataBody(data);  

            } else if (info === "muscle") {
                const abductors = entryData.data.filter(entry => entry === "abductors");
                const abs = entryData.data.filter(entry => entry === "abs");
                const adductors = entryData.data.filter(entry => entry === "adductors");
                const biceps = entryData.data.filter(entry => entry === "biceps");
                const calves = entryData.data.filter(entry => entry === "calves");
                //const cardiovascularSystem = entryData.data.filter(entry => entry === "cardiovascular system");
                const delts = entryData.data.filter(entry => entry === "delts");
                const forearms = entryData.data.filter(entry => entry === "forearms");
                const glutes = entryData.data.filter(entry => entry === "glutes");
                const hamstrings = entryData.data.filter(entry => entry === "hamstrings");
                const lats = entryData.data.filter(entry => entry === "lats");
                //const levatorScapulae = entryData.data.filter(entry => entry === "levator scapulae");
                const pectorals = entryData.data.filter(entry => entry === "pectorals");
                const serratusAnterior = entryData.data.filter(entry => entry === "serratus anterior");
                const spine = entryData.data.filter(entry => entry === "spine");
                const traps = entryData.data.filter(entry => entry === "traps");
                const triceps = entryData.data.filter(entry => entry === "triceps");
                const upperBack = entryData.data.filter(entry => entry === "upper back");

                const muscleLengths = [abductors.length, abs.length, adductors.length, biceps.length, calves.length, delts.length, forearms.length, glutes.length, hamstrings.length, lats.length, pectorals.length, serratusAnterior.length, spine.length, traps.length, triceps.length, upperBack.length,];
                maxMuscleWork = Math.max(...muscleLengths);
                const sumMuscleLengths = muscleLengths.reduce((acc, currentValue) => acc + currentValue, 0);

                if (!sumMuscleLengths) {
                    noDataMuscle.current = true;
                }

                const data = [
                    {
                    "targetMuscle": "abductors",
                    "muscle work %": Math.round((abductors.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "abs",
                    "muscle work %": Math.round((abs.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "adductors",
                    "muscle work %": Math.round((adductors.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "biceps",
                    "muscle work %": Math.round((biceps.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "calves",
                    "muscle work %": Math.round((calves.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    // {
                    // "targetMuscle": "cardio",
                    // "muscle work %": Math.round((cardiovascularSystem.length / sumMuscleLengths) * 100 * 100) / 100,
                    // },
                    {
                    "targetMuscle": "delts",
                    "muscle work %": Math.round((delts.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "forearms",
                    "muscle work %": Math.round((forearms.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "glutes",
                    "muscle work %": Math.round((glutes.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "hamstrings",
                    "muscle work %": Math.round((hamstrings.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "lats",
                    "muscle work %": Math.round((lats.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    // {
                    // "targetMuscle": "levator scapulae",
                    // "muscle work %": Math.round((levatorScapulae.length / sumMuscleLengths) * 100 * 100) / 100,
                    // },
                    {
                    "targetMuscle": "pectorals",
                    "muscle work %": Math.round((pectorals.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "serratus",
                    "muscle work %": Math.round((serratusAnterior.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "spine",
                    "muscle work %": Math.round((spine.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "traps",
                    "muscle work %": Math.round((traps.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "triceps",
                    "muscle work %": Math.round((triceps.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "upp back",
                    "muscle work %": Math.round((upperBack.length / sumMuscleLengths) * 100 * 100) / 100,
                    }
                ]

                setDataMuscle(data);

                 } else if (info === "macro") {
                    const macro = entryData.data;
                    const sumMacro = macro.carbohydrates_g + macro.protein_g + macro.totalFat_g + macro.saturatedFat_g + macro.totalSugar_g + macro.totalFiber_g;
                    
                    if (!macro.carbohydrates_g) {
                      noDataMacro.current = true
                    }

                    const data = [
                        // {
                        // "macro": "calories",
                        // "macro value": macro.calories_kcal,
                        // },
                        {
                        "name": "carbohydrates %",
                        "macro": Math.round((macro.carbohydrates_g / sumMacro) * 100 * 100) / 100,
                        },
                        {
                        "name": "protein %",
                        "macro": Math.round((macro.protein_g / sumMacro) * 100 * 100) / 100,
                        },
                        {
                        "name": "total fat %",
                        "macro": Math.round((macro.totalFat_g / sumMacro) * 100 * 100) / 100,
                        },
                        {
                        "name": "saturated fat %",
                        "macro": Math.round((macro.saturatedFat_g / sumMacro) * 100 * 100) / 100,
                        },
                        {
                        "name": "total sugar %",
                        "macro": Math.round((macro.totalSugar_g / sumMacro) * 100 * 100) / 100,
                        },
                        {
                        "name": "total fiber %",
                        "macro": Math.round((macro.totalFiber_g / sumMacro) * 100 * 100) / 100,
                        },
                    ]

                    setDataMacro(data);
                    
                }
            } catch (error) {
              console.error('Error fetching...:', error);
          }
      };
  
      fetchCalendarData();
  }, []);
  
     
    return (
        <> 
            {(info === "body" && !noDataBody.current) && (
            <ResponsiveContainer width="100%" height={300}>
                <BarChart width="100%" height="100%" data={dataBody} >
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="bodyPart" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar stroke="#8884d8" dataKey="body work" fill="#4aa2d9b3" barSize={40}/>
                </BarChart>
            </ResponsiveContainer>
            )}
            {noDataBody.current && <p>There is not enough data.</p>}

            {(info === "muscle" && !noDataMuscle.current) && (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart width="100%" height="100%" data={dataMuscle} >
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="targetMuscle"  tick={{ fontSize: 14, angle: -45, textAnchor: 'end' }} />
                        <YAxis />
                        <Tooltip />
                        <Legend  wrapperStyle={{ paddingTop: '40px' }}/>
                        <Bar  dataKey="muscle work %" fill="#4aa2d9b3" barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            )}
            {noDataMuscle.current && <p>There is not enough data.</p>}

            {(info === "macro" && !noDataMacro.current) && (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart width="100%" height="100%" data={dataMacro} >
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="name"  tick={{ fontSize: 14, fill: '#666'}} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="macro" fill="#4aa2d9b3" barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            )}
            {noDataMacro.current && <p>There is not enough data.</p>}
      </>
    );
}
  
  export default ChartBar;