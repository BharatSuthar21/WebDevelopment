import React from 'react'

function User({setInput}) {

    const handleSubmit = (e) => {
        const inputValue = e.target.elements.inputField.value;
        setInput(inputValue);
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="inputField"
                placeholder="Type your message"
            />
                <button type="submit">Submit</button>
            </form>
    </div>
  )
}

export default User