import React from 'react'

function SpeechError(props) {
    const { errors, direction, y , x } = props
  return (
    <>
      <div className={`speech speech-${direction}`} role="alert" style={{top: `${y}%`,left: `${x}%` }} >
      {Object.values(errors).map((err, index) => (
          <p key={index} ><i className="fa-solid fa-circle-exclamation"></i>&nbsp;&nbsp;{err}</p>
          
      ))}
     </div>
    </>
    
  )
}

export default SpeechError