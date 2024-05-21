import { useContext, useEffect, useRef, useState } from "react";
import { Legend, Pie, PieChart, Tooltip } from "recharts";
import AuthContext from "../../../contexts/auth.context";
import { getCalendarDataChart } from "../../../services/api.service";


function ChartPie({info}) {
   

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
                console.log(entryData.data)
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
                    "targetMuscle": "abductors %",
                    "muscle work %": Math.round((abductors.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "abs %",
                    "muscle work %": Math.round((abs.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "adductors %",
                    "muscle work %": Math.round((adductors.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "biceps %",
                    "muscle work %": Math.round((biceps.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "calves %",
                    "muscle work %": Math.round((calves.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    // {
                    // "targetMuscle": "cardio %",
                    // "muscle work %": Math.round((cardiovascularSystem.length / sumMuscleLengths) * 100 * 100) / 100,
                    // },
                    {
                    "targetMuscle": "delts %",
                    "muscle work %": Math.round((delts.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "forearms %",
                    "muscle work %": Math.round((forearms.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "glutes %",
                    "muscle work %": Math.round((glutes.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "hamstrings %",
                    "muscle work %": Math.round((hamstrings.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "lats %",
                    "muscle work %": Math.round((lats.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    // {
                    // "targetMuscle": "levator scapulae",
                    // "muscle work %": Math.round((levatorScapulae.length / sumMuscleLengths) * 100 * 100) / 100,
                    // },
                    {
                    "targetMuscle": "pectorals %",
                    "muscle work %": Math.round((pectorals.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "serratus anterior%",
                    "muscle work %": Math.round((serratusAnterior.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "spine %",
                    "muscle work %": Math.round((spine.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "traps %",
                    "muscle work %": Math.round((traps.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "triceps %",
                    "muscle work %": Math.round((triceps.length / sumMuscleLengths) * 100 * 100) / 100,
                    },
                    {
                    "targetMuscle": "upper back %",
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
            <PieChart width={730} height={250}>
                <Pie data={dataBody} stroke="#8884d8" dataKey="body work" nameKey="bodyPart" cx="50%" cy="50%" outerRadius={90} fill="#F2A950" label />
                <Tooltip />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
            </PieChart>
        )}
        {noDataBody.current && <p>There is not enough data.</p>}

        {(info === "muscle" && !noDataMuscle.current) && (
            <PieChart width={730} height={350}>
                <Pie data={dataMuscle} stroke="#8884d8" dataKey="muscle work %" nameKey="targetMuscle" cx="50%" cy="50%" outerRadius={90} fill="#F2A950" label />
                <Tooltip />
                <Legend wrapperStyle={{ paddingTop: '10px' }}/>
            </PieChart>
        )}
        {noDataMuscle.current && <p>There is not enough data.</p>}

        {(info === "macro" && !noDataMacro.current) && (
            <PieChart width={730} height={350}>
                <Pie data={dataMacro} stroke="#8884d8"  dataKey="macro" nameKey="name" cx="50%" cy="50%" outerRadius={90} fill="#F2A950" label />
                <Tooltip />
                <Legend wrapperStyle={{ paddingTop: '10px' }}/>
            </PieChart>
        )}
        {noDataMacro.current && <p>There is not enough data.</p>}
      </>
    );
}
  
export default ChartPie;