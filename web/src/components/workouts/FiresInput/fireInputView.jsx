import './FiresInput.css'



function FiresInputView(props) {
    const {selectedDiff} = props
    

  return (
    <div className='fires-div'>
        {[...Array(5)].map((_, index) => (
            <div
            key={index}
            className={`fire-btns ${(selectedDiff !== null && selectedDiff >= index) ? 'fire-btns-red' : ''}`}
            >
            <i className="fa-solid fa-fire"></i>
            </div>
        ))}
    </div>
  )
}

export default FiresInputView