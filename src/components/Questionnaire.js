import React, { useState } from 'react';
import Question from './Question';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const questions = [
  "How many times per day do you brush your teeth?",
  "How often do you floss or use other interdental cleaning tools?",
  "How often do you visit a dentist for a routine check-up and cleaning?",
  "Do you currently have any ongoing dental conditions or treatments?",
  "In the past three months, have you experienced any oral health issues?",
  "Do you use tobacco products?"
];

const options = [
  ["Once", "Twice", "Three or more times", "I don't brush daily"],
  ["Daily", "3-5 times a week", "1-2 times a week", "Rarely or never"],
  ["Every 6 months", "Once a Year", "Every 2 years", "I can't remember my last visit"],
  ["Yes, I have cavities", "Yes, I wear braces or have other orthodontic devices", "Yes, I have crowns or fillings", "No, I don't have any ongoing dental conditions"],
  ["Tooth pain", "Bleeding gums", "Sensitivity to hot or cold", "Other"],
  ["Yes", "No"]
];

function Questionnaire() {
  const [responses, setResponses] = useState(Array(questions.length).fill(null));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();

  const handleResponseChange = (response) => {
    const newResponses = [...responses];
    newResponses[currentQuestionIndex] = response;
    setResponses(newResponses);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://mednova-be.onrender.com/api/questionnaire', { responses });
      const score = response.data.score; // Assuming the API returns a score
      navigate('/feedback', { state: { score } });
    } catch (error) {
      console.error("There was an error submitting the questionnaire!", error);
    }
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <div className="questionnaire-container">
      <div className="intro-text">
        <p><b>Questionnaire</b></p>
        <p>
          This questionnaire evaluates your oral health habits and recent dental experiences. Your responses will generate a personalized oral health score and tailored recommendations.
        </p>
      </div>
      <div className="questionnaire">
        <div className="sidebar">
          <ul>
            {questions.map((_, index) => (
              <li key={index}>
                <button
                  className={currentQuestionIndex === index ? 'active' : ''}
                  onClick={() => handleQuestionClick(index)}
                >
                  Question {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="content">
          <Question
            question={questions[currentQuestionIndex]}
            options={options[currentQuestionIndex]}
            response={responses[currentQuestionIndex]}
            onResponseChange={handleResponseChange}
          />
          {currentQuestionIndex === questions.length - 1 && (
            <button className="submit" onClick={handleSubmit}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Questionnaire;
