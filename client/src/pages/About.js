import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About NeighborFit 🏘️</h1>
      <p>
        NeighborFit is a smart tool designed to help individuals and families find neighborhoods across India that match their lifestyle preferences. Whether you're looking for safety, good schools, nearby parks, or affordable rent – NeighborFit simplifies your search with real data and intelligent matching.
      </p>

      <h2>🔍 How It Works</h2>
      <ul>
        <li>Enter your preferred city, rent limit, safety, schools, and park access ratings.</li>
        <li>NeighborFit instantly compares your inputs with our database of real neighborhoods.</li>
        <li>You get a list of neighborhoods that best match your lifestyle and preferences.</li>
      </ul>

      <h2>🏢 Our Mission</h2>
      <p>
        We aim to empower people with accurate, localized insights so they can make informed decisions when moving to or within Indian cities.
      </p>

      <h2>🌐 Technologies Used</h2>
      <ul>
        <li>Frontend: React.js</li>
        <li>Backend: Node.js + Express</li>
        <li>Database: MongoDB Atlas</li>
        <li>Hosting: Netlify (frontend), Render (backend)</li>
      </ul>

      <p className="thanks">Thank you for using NeighborFit! 🧡</p>
    </div>
  );
};

export default About; 