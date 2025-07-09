// src/components/MatchFinder.js
import React, { useState } from "react";
import axios from "axios";
import "./MatchFinder.css";
import ReactLoading from "react-loading";

function MatchFinder() {
  const [formData, setFormData] = useState({
    city: "",
    rent_max: "",
    safety: "",
    schools: "",
    parks: "",
  });

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    // Input validation
    if (!formData.city || !formData.rent_max || !formData.safety || !formData.schools || !formData.parks) {
      setError('Please fill in all the fields before searching.');
      return;
    }

    setLoading(true);
    setError(null);
    setMatches([]);

    try {
      const res = await axios.post(
        "https://neighborfit-backend-v6qy.onrender.com/api/match",
        formData
      );

      if (res.data && res.data.matches.length > 0) {
        setMatches(res.data.matches);
      } else {
        setMatches([]);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Remove duplicates by name+city
  const uniqueMatches = Array.from(
    new Map(
      matches.map((neighborhood) => [
        `${neighborhood.name || neighborhood.neighborhood}-${neighborhood.city}`,
        neighborhood,
      ])
    ).values()
  );

  return (
    <div className="match-finder">
      <h1>Find Your Ideal Neighborhood 🏡</h1>

      <div className="form">
        <input name="city" placeholder="Enter city" onChange={handleChange} />
        <input name="rent_max" type="number" placeholder="Max Rent ₹" onChange={handleChange} />
        <input name="safety" type="number" placeholder="Min Safety (0-5)" onChange={handleChange} />
        <input name="schools" type="number" placeholder="Min School Rating (0-5)" onChange={handleChange} />
        <input name="parks" type="number" placeholder="Min Park Access (0-5)" onChange={handleChange} />
        <button onClick={handleSearch}>Find Matches</button>
        {error && <div className="error-message">{error}</div>}
      </div>

      {loading && (
        <div className="loading">
          <ReactLoading type="bubbles" color="#0077cc" height={60} width={60} />
          <p>Fetching neighborhood matches...</p>
        </div>
      )}

      {!loading && uniqueMatches.length === 0 && !error && (
        <p>No matches found for your preferences.</p>
      )}

      {uniqueMatches.length > 0 && (
        <div className="results">
          <h2>Matching Neighborhoods:</h2>
          <ul>
            {uniqueMatches.map((match, index) => (
              <li key={index} className="neighborhood-card">
                <strong>{match.name || match.neighborhood}</strong> in {match.city} <br />
                Rent Avg: ₹{match.rent_avg || match.rent} | Safety: {match.safety} | Schools: {match.schools} | Parks: {match.parks}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MatchFinder; 