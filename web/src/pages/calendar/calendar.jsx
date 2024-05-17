import { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import { getCalendarEntry } from '../../services/api.service';
import AuthContext from '../../contexts/auth.context';
import dayjs from 'dayjs';
import HomeExCapsule from '../../components/home/HomeExCapsule';

function CalendarPage() {
    const context = useContext(AuthContext);
    const [value, setValue] = useState(new Date());
    const [entry, setEntry] = useState([]);
    const [entryDates, setEntryDates] = useState([]);

    const fetchCalendarEntry = async (date) => {
        try {
            if (date) {
                const formattedDate = dayjs(date).format('dddd, D, MMMM, YYYY');
                const entryData = await getCalendarEntry(context.user.id, formattedDate);
                setEntry(entryData.data);
            } else {
                const dates = await getCalendarEntry(context.user.id);
                const formattedDates = dates.data.map(dateStr => dayjs(dateStr, 'dddd, D, MMMM, YYYY').format('YYYY-MM-DD'));
                setEntryDates(formattedDates);
            }
        } catch (error) {
            console.error('Error fetching...:', error);
        }
    };

    const handleDateChange = (date) => {
        setValue(date);
        fetchCalendarEntry(date);
    };

    useEffect(() => {
        fetchCalendarEntry(value);
        fetchCalendarEntry();
    }, [value]);

    const tileInfo = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = dayjs(date).format('YYYY-MM-DD');
            if (entryDates.includes(formattedDate)) {
                return <i className="fas fa-star"></i>;
            }
        }
        return null;
    };

    return (
        <>
        <div className='home-capsule-container'>
            <div className="plane-box homer">
                <Calendar onChange={handleDateChange} value={value} minDetail="year" locale="en-en" tileContent={tileInfo} />
            </div>
            <div className='plane-box training-container'>
                <h1>{dayjs(value).format('dddd, D MMMM, YYYY')}</h1>
                {entry.length > 0 ? (
                    entry.map((ex, exIndex) => (
                        <div key={exIndex}>
                            {ex.finishedEx.map((finishedEx, finExIndex) => (
                                <div key={finExIndex}>
                                    <h4>{finishedEx.exercise.name}</h4>
                                    {finishedEx.work.map((wor, worIndex) => (
                                        <div key={worIndex}>
                                        
                                            <p>Reps: {wor.reps}</p>
                                            <p>Kg: {wor.kg}</p>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p>No entries found for this date.</p>
                )}
            </div>
            </div>
        </>
    );
}

export default CalendarPage;