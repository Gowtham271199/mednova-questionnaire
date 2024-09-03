import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import expertProfile from '../images/dentist.jpg'; // Ensure this path is correct

function Feedback() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 0; // Fallback to 0 if score is not available
  const [optIn, setOptIn] = useState(null); // Track if 'Yes' or 'No' was selected

  const handleReset = () => {
    navigate('/'); // Navigate to the questionnaire page
  };

  const handleOptIn = (value) => {
    setOptIn(value);
  };

  // Define score thresholds
  const getFeedbackClass = (feedbackType) => {
    const thresholds = {
      good: score >= 80,
      better: score >= 60 && score < 80,
      bad: score >= 40 && score < 60,
      worst: score < 40,
    };
    return thresholds[feedbackType] ? feedbackType : '';
  };

  return (
    <div className="feedback-container">
      <div className="feedback-content">
        <h2>Hello John, your dental score is {score}</h2>
        <div className="score-display">
          <img
            src={`https://via.placeholder.com/150?text=${score}%25`} // Placeholder for score percentage image
            alt="Score"
            className="score-image"
          />
        </div>
        <div className="feedback-options">
          <button className={getFeedbackClass('good')}>Good</button>
          <button className={getFeedbackClass('better')}>Better</button>
          <button className={getFeedbackClass('bad')}>Bad</button>
          <button className={getFeedbackClass('worst')}>Worst</button>
        </div>
        <div className="expert-details">
          <h3>Talk to Our Experts</h3>
          <div className="expert-profile">
            <img
              src={expertProfile}
              alt="Expert"
              className="expert-image"
            />
            <div className="expert-info">
              <p><b>Dr. Jane Doe</b></p>
              <p>Specialist in Dentistry</p>
              <p>Email: drjanedoe@example.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>
        </div>
        <div className="opt-in-paragraph">
          <p>Opt in to receive monthly tips and insights tailored to your oral health.</p>
        </div>
        <div className="opt-in-buttons">
          <button
            className={`opt-in-button yes ${optIn === 'yes' ? 'active' : ''}`}
            onClick={() => handleOptIn('yes')}
          >
            Yes
          </button>
          <button
            className={`opt-in-button no ${optIn === 'no' ? 'active' : ''}`}
            onClick={() => handleOptIn('no')}
          >
            No
          </button>
        </div>
        {/* <button className="reset-button" onClick={handleReset}>Start Over</button> */}
      </div>
    </div>
  );
}

export default Feedback;
