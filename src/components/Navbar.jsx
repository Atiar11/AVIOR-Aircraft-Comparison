import React from 'react';
import './Navbar.css';

const Navbar = ({ activeTab, setActiveTab }) => {
    return (
        <nav className="nav-bar">
            <div className="nav-brand">
                ✈️ <span>AVIOR</span>
            </div>
            <div className="nav-links">
                <button
                    className={`nav-btn ${activeTab === 'list' ? 'active' : ''}`}
                    onClick={() => setActiveTab('list')}
                >
                    Aircraft List
                </button>
                <button
                    className={`nav-btn ${activeTab === 'compare' ? 'active' : ''}`}
                    onClick={() => setActiveTab('compare')}
                >
                    Comparison Tool
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
