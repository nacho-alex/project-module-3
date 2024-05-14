import React from 'react'
import './WeekDay.css'

function WeekDay(props) {

    const {actualDay, onSelectDay} = props
  return (
    <div>
                            <div className="week-buttons">
                                <button type='button'
                                    className={`activity-button ${actualDay === 'mon' ? 'selected-btn-ac' : ''}`}
                                    onClick={() => onSelectDay('mon')}>
                                    Mon
                                </button>
                                <button type='button'
                                    className={`activity-button ${actualDay === 'tue' ? 'selected-btn-ac' : ''}`}
                                    onClick={() => onSelectDay('tue')}>
                                    Tue
                                </button>
                                <button type='button'
                                    className={`activity-button ${actualDay === 'wed' ? 'selected-btn-ac' : ''}`}
                                    onClick={() => onSelectDay('wed')}>
                                    Wed
                                </button>
                                <button type='button'
                                    className={`activity-button ${actualDay === 'thu'  ? 'selected-btn-ac' : ''}`}
                                    onClick={() => onSelectDay('thu')}>
                                    Thu
                                </button>
                                <button type='button'
                                    className={`activity-button ${actualDay === 'fri'  ? 'selected-btn-ac' : ''}`}
                                    onClick={() => onSelectDay('fri')}>
                                    Fri
                                </button>
                                <button type='button'
                                    className={`activity-button ${actualDay === 'sat'  ? 'selected-btn-ac' : ''}`}
                                    onClick={() => onSelectDay('sat')}>
                                    Sat
                                </button>
                                <button type='button'
                                    className={`activity-button ${actualDay === 'sun'  ? 'selected-btn-ac' : ''}`}
                                    onClick={() => onSelectDay('sun')}>
                                    Sun
                                </button>
                            </div>
    </div>
  )
}

export default WeekDay