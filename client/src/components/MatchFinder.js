// src/components/MatchFinder.js
import React, { useState } from 'react';
import axios from 'axios';
import './MatchFinder.css'; // optional styling

const MatchFinder = () => {
  const [city, setCity] = useState('');
  const [rentMax, setRentMax] = useState('');
  const [safety, setSafety] = useState('');
  const [schools, setSchools] = useState('');
  const [parks, setParks] = useState('');
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMatches([]);
    setLoading(true);

    try {
      const res = await axios.post('https://neighborfit-backend-v6qy.onrender.com/api/match', {
        city: city.trim(),
        rent_max: parseInt(rentMax),
        safety: parseFloat(safety),
        schools: parseFloat(schools),
        parks: parseFloat(parks),
      });

      console.log('✅ Backend Response:', res.data);

      if (res.data && Array.isArray(res.data.matches)) {
        if (res.data.matches.length > 0) {
          setMatches(res.data.matches);
        } else {
          setError('No matches found.');
        }
      } else {
        setError('Invalid response from backend.');
      }

    } catch (err) {
      console.error('❌ API Error:', err.message || err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="match-finder-container">
      <h2>🏡 Find Your Ideal Neighborhood</h2>
      <form onSubmit={handleSubmit} className="match-form">
        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
        <input type="number" placeholder="Max Rent (₹)" value={rentMax} onChange={(e) => setRentMax(e.target.value)} required />
        <input type="number" step="0.1" placeholder="Min Safety Rating (0–5)" value={safety} onChange={(e) => setSafety(e.target.value)} required />
        <input type="number" step="0.1" placeholder="Min School Rating (0–5)" value={schools} onChange={(e) => setSchools(e.target.value)} required />
        <input type="number" step="0.1" placeholder="Min Park Access (0–5)" value={parks} onChange={(e) => setParks(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? 'Searching...' : 'Find Matches'}</button>
      </form>

      <h3>Matching Neighborhoods:</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {matches.map((match, idx) => (
          <li key={idx}>
            <strong>{match.neighborhood}</strong> in <em>{match.city}</em><br />
            ₹{match.rent_avg} rent | Safety: {match.safety} | Schools: {match.schools} | Parks: {match.parks}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchFinder; 