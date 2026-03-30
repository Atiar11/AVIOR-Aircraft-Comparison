import { useState } from 'react';
import Navbar from './components/Navbar';
import AircraftList from './components/AircraftList';
import ComparisonTool from './components/ComparisonTool';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('compare');

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="page-container">
        {activeTab === 'list' && <AircraftList />}
        {activeTab === 'compare' && <ComparisonTool />}
      </main>
    </>
  );
}

export default App;
