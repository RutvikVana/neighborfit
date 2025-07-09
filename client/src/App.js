import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MatchFinder from './components/MatchFinder';

function App() {
  return (
    <div id="root">
      <Navbar />
      <div className="main-content">
        <MatchFinder />
      </div>
      <Footer />
    </div>
  );
}

export default App;
