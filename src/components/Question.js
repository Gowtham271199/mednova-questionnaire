import React, { useState, useEffect } from 'react';

function Question({ question, options, response, onResponseChange }) {
  const [selectedResponse, setSelectedResponse] = useState(response || '');

  // Update local state when the response prop changes
  useEffect(() => {
    if (response !== undefined) {
      setSelectedResponse(response);
    }
  }, [response]);

  const handleChange = (value) => {
    setSelectedResponse(value);
    onResponseChange(value);
  };

  return (
    <div className="question">
      <h2>{question}</h2>
      {options.map((option, index) => (
        <div
          className={`option-box ${selectedResponse === option ? 'selected' : ''}`}
          key={index}
          onClick={() => handleChange(option)}
        >
          <label className="option-label">
            <span className="option-label-box">{String.fromCharCode(65 + index)}</span> {/* A, B, C, D */}
            <span className="option-text">{option}</span>
            <input
              type="radio"
              id={`${question}-${index}`}
              name={question}
              value={option}
              checked={selectedResponse === option}
              onChange={() => handleChange(option)}
              className="radio-input"
            />
          </label>
        </div>
      ))}
      <textarea
        placeholder="Describe in a few words..."
        rows="4"
        value={selectedResponse && !options.includes(selectedResponse) ? selectedResponse : ''}
        onChange={(e) => handleChange(e.target.value)}
        disabled={options.includes(selectedResponse)}
      />
    </div>
  );
}

export default Question;
