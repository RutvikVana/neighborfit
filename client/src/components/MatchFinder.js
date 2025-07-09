// src/components/MatchFinder.js
import React, { useState } from 'react';
import axios from 'axios';
import MatchCard from './MatchCard';

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
    setMatches([]); // Clear previous matches
    setLoading(true);

    try {
      const response = await axios.post('https://neighborfit-backend-v6qy.onrender.com/api/match', {
        city,
        rent_max: Number(rentMax),
        safety: Number(safety),
        schools: Number(schools),
        parks: Number(parks)
      });

      console.log('✅ API Response:', response.data); // Log to debug

      if (response.data && Array.isArray(response.data.matches)) {
        if (response.data.matches.length > 0) {
          setMatches(response.data.matches);
        } else {
          setError('No matches found.');
        }
      } else {
        setError('Unexpected response format from server.');
      }

    } catch (err) {
      console.error('❌ Error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Find Your Ideal Neighborhood</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          name="city"
          placeholder="City (e.g. Visakhapatnam)"
          value={city}
          onChange={e => setCity(e.target.value)}
          required
        /><br /><br />
        <input
          type="number"
          name="rent_max"
          placeholder="Max Rent (₹)"
          value={rentMax}
          onChange={e => setRentMax(e.target.value)}
          required
        /><br /><br />
        <input
          type="number"
          name="safety"
          placeholder="Min Safety Rating (0–5)"
          value={safety}
          onChange={e => setSafety(e.target.value)}
          required
        /><br /><br />
        <input
          type="number"
          name="schools"
          placeholder="Min School Rating (0–5)"
          value={schools}
          onChange={e => setSchools(e.target.value)}
          required
        /><br /><br />
        <input
          type="number"
          name="parks"
          placeholder="Min Park Access (0–5)"
          value={parks}
          onChange={e => setParks(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Find Matches</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Matching Neighborhoods:</h3>
      {matches.length > 0 ? (
        matches.map((match) => <MatchCard key={match._id} match={match} />)
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
};

export default MatchFinder; 