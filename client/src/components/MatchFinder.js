// src/components/MatchFinder.js
import React, { useState } from 'react';
import axios from 'axios';
import MatchCard from './MatchCard';

const MatchFinder = () => {
  const [formData, setFormData] = useState({
    city: '',
    rent_max: '',
    safety: '',
    schools: '',
    parks: ''
  });

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/match', {
        city: formData.city,
        rent_max: Number(formData.rent_max),
        safety: Number(formData.safety),
        schools: Number(formData.schools),
        parks: Number(formData.parks)
      });

      setMatches(res.data.matches || []);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Find Your Ideal Neighborhood</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          name="city"
          placeholder="City (e.g. Visakhapatnam)"
          value={formData.city}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="number"
          name="rent_max"
          placeholder="Max Rent (₹)"
          value={formData.rent_max}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="number"
          name="safety"
          placeholder="Min Safety Rating (0–5)"
          value={formData.safety}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="number"
          name="schools"
          placeholder="Min School Rating (0–5)"
          value={formData.schools}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="number"
          name="parks"
          placeholder="Min Park Access (0–5)"
          value={formData.parks}
          onChange={handleChange}
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