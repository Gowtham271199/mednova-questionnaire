import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Feedback.css';
import expertProfile from '../images/dentist.jpg'; // Ensure this path is correct

function Feedback() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 0; // Fallback to 0 if score is not available
  const [optIn, setOptIn] = useState(null); // Track if 'Yes' or 'No' was selected
  const [emailStatus, setEmailStatus] = useState(null); // Track the status of email submission
  const [emailDetails, setEmailDetails] = useState(null); // Track email details to show in UI

  // Get the email from local storage
  const userEmail = localStorage.getItem('userEmail');

  const handleReset = () => {
    navigate('/'); // Navigate to the questionnaire page
  };

  const handleDataSubmission = (emailOptIn) => {
    axios.post('https://mednova-be-1.onrender.com/api/questionnaire/opt-in', { emailOptIn, score })
      .then(response => {
        console.log('Opt-in data submitted successfully:', response.data);
        if (emailOptIn) {
          sendEmail(userEmail); // Use the real email from local storage
        }
      })
      .catch(error => {
        console.error('Error submitting opt-in data', error);
      });
  };

  const sendEmail = (recipientEmail) => {
    const emailContent = `
      <p class="greeting">Dear User,</p>
      <p>Your dental score is <span class="highlight">${score}</span>.</p>
      <p class="highlight bold">Here are some <span class="bold">personalized tips</span> to improve your dental health:</p>
      <ul>
        <li>Brush your teeth twice a day.</li>
        <li>Floss regularly.</li>
        <li>Visit your dentist every 6 months.</li>
      </ul>
      <p class="closing">Best regards,</p>
      <p class="highlight">The Dental Care Team</p>
    `;
  
    axios.post('http://localhost:5000/api/send-email', { email: recipientEmail, score })
      .then(response => {
        console.log('Email sent successfully:', response.data);
        setEmailStatus('success');
        setEmailDetails({
          recipient: recipientEmail,
          subject: 'Your Personalized Dental Care Tips',
          content: emailContent,
        });
      })
      .catch(error => {
        console.error('Error sending email', error);
        setEmailStatus('error');
      });
  };
  
  const handleOptIn = (value) => {
    setOptIn(value);
    setEmailStatus(null); // Reset email status when user changes opt-in option
    setEmailDetails(null); // Reset email details when user changes opt-in option
    if (value === 'yes') {
      handleDataSubmission(true); // User opted in
    } else {
      handleDataSubmission(false); // User opted out
    }
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

        {/* Email Status Messages */}
        {emailStatus === 'success' && (
          <div className="email-details">
            <h4>Email Details:</h4>
            <p><strong>Recipient:</strong> {emailDetails?.recipient}</p>
            <p><strong>Subject:</strong> {emailDetails?.subject}</p>
            <p><strong>Content:</strong></p>
            <div className="email-content" dangerouslySetInnerHTML={{ __html: emailDetails?.content }}></div>
          </div>
        )}
        {emailStatus === 'error' && (
          <p className="error-message">Failed to send email. Please try again later.</p>
        )}

        {/* <button className="reset-button" onClick={handleReset}>Start Over</button> */}
      </div>
    </div>
  );
}

export default Feedback;
