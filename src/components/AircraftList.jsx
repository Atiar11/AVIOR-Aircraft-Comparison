import React from 'react';
import { aircrafts } from '../data/aircrafts';
import './AircraftList.css';

const AircraftList = () => {
  return (
    <div className="aircraft-list-container">
      <h2 className="heading list-title">AVIOR Fleet</h2>
      <p className="list-subtitle">Explore the precise specifications of over 150 iconic aircraft models.</p>
      
      <div className="aircraft-grid">
        {aircrafts.map(aircraft => (
          <div key={aircraft.id} className="aircraft-card glass-panel">
            <div className="card-image-wrapper">
              <img src={aircraft.image} alt={aircraft.name} className="card-image" />
              <div className="card-badge">{aircraft.manufacturer}</div>
            </div>
            <div className="card-content">
              <h3>{aircraft.name}</h3>
              <p className="aircraft-type">{aircraft.type}</p>
              
              <div className="stats-grid">
                <div className="stat">
                  <span className="stat-label">Range</span>
                  <span className="stat-value">{aircraft.range} nmi</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Engines</span>
                  <span className="stat-value">{aircraft.engines}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Cruise</span>
                  <span className="stat-value">M {aircraft.cruiseSpeed}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">MTOW</span>
                  <span className="stat-value">{aircraft.mtow} kg</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AircraftList;
