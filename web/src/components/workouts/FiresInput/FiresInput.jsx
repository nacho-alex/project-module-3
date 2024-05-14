import React, { useState } from 'react'
import './FiresInput.css'



function FiresInput(props) {
    const {handleDifficult, prevState} = props
    const [selected, setSelected] = useState(prevState - 1);
    const [hovered, setHovered] = useState(null);
    

    const handleHover = (index) => {
        setHovered(index);
    };

    const handleClick = (index) => {
        setSelected(index);
        handleDifficult(index)
    };

    const handleLeave = () => {
        setHovered(null);
    };
  return (
    <div className='fires-div'>
        {[...Array(5)].map((_, index) => (
            <button
            type="button"
            key={index}
            className={`fire-btns ${(selected !== null && selected >= index) || (hovered !== null && hovered >= index) ? 'fire-btns-red' : ''}`}
            onMouseOver={() => handleHover(index)}
            onMouseLeave={handleLeave}
            onClick={() => handleClick(index)}
            >
            <i className="fa-solid fa-fire"></i>
            </button>
        ))}
    </div>
  )
}

export default FiresInput