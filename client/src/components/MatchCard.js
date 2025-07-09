import React from 'react';
import './MatchCard.css';

const MatchCard = ({ match }) => {
  return (
    <div className="match-card">
      <h3>{match.neighborhood} ({match.city})</h3>
      <p><strong>Rent:</strong> ₹{match.rent_avg}</p>
      <p><strong>Safety:</strong> {match.safety}</p>
      <p><strong>Schools:</strong> {match.schools}</p>
      <p><strong>Parks:</strong> {match.parks}</p>
    </div>
  );
};

export default MatchCard; 