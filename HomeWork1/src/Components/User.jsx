import React, { useState, useRef, useEffect } from 'react';

function User({ setMessage }) {
    const [input, setInput] = useState('');
    const textareaRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(input); // Pass the message up to the parent component
        setInput(''); // Clear the input after submitting
    };

    const handleChange = (e) => {
        setInput(e.target.value);
        adjustTextareaHeight();
    };

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto'; // Reset height to auto
        textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`; // Set height dynamically up to a max height
    };

    useEffect(() => {
        adjustTextareaHeight(); // Adjust height on component mount
    }, [input]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    ref={textareaRef}
                    name="inputField"
                    placeholder="Type your message"
                    value={input}
                    onChange={handleChange}
                    rows={1}
                    style={{
                        resize: 'none',
                        overflowY: input.length > 0 && textareaRef.current.scrollHeight > 150 ? 'auto' : 'hidden', // Add vertical scrollbar if height exceeds maxHeight
                        maxHeight: '150px', // Max height for the textarea
                        width: '100%', // Full width for the textarea
                    }}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default User;
