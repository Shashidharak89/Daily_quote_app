import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/ViewAPI.css';

// Update your React component to handle animation states
const ViewAPI = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [transition, setTransition] = useState(false);

  const fetchQuote = async () => {
    // Trigger transition out animation
    setTransition(true);
    
    // Wait for animation
    setTimeout(async () => {
      setLoading(true);
      
      try {
        const response = await axios.get('/api');
        setQuote(response.data[0].q);
        setAuthor(response.data[0].a);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
      
      setLoading(false);
      setTransition(false);
    }, 300); // Match to fadeOut animation duration
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="viewapi-container">
      <div className={`quote-box ${loading ? 'loading' : ''} ${transition ? 'transition' : ''}`}>
        <p className="quote">{quote}</p>
        <p className="author">- {author}</p>
        <button className="new-quote-btn" onClick={fetchQuote}>
          New Quote
        </button>
      </div>
    </div>
  );
};
export default ViewAPI;
