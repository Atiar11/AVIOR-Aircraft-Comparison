import React, { useState } from 'react';
import { aircrafts } from '../data/aircrafts';
import './ComparisonTool.css';

const ComparisonTool = () => {
  const [plane1Id, setPlane1Id] = useState(aircrafts[0].id);
  const [plane2Id, setPlane2Id] = useState(aircrafts[1].id);

  const plane1 = aircrafts.find(a => a.id === plane1Id);
  const plane2 = aircrafts.find(a => a.id === plane2Id);

  const handleSelect1 = (e) => setPlane1Id(e.target.value);
  const handleSelect2 = (e) => setPlane2Id(e.target.value);

  const getCompareClass = (val1, val2) => {
    // If exact same, neither is better
    if (val1 === val2) return '';
    if (val1 > val2) return 'better';
    if (val1 < val2) return 'worse';
    return '';
  };

  const specs = [
    { label: 'length', key: 'length', unit: ' m' },
    { label: 'wingspan', key: 'wingspan', unit: ' m' },
    { label: 'wingarea', key: 'wingArea', unit: ' sq m' },
    { label: 'height', key: 'height', unit: ' m' },
    { label: 'engines', key: 'engines', unit: '' },
    { label: 'thrust per engine', key: 'thrustPerEngine', unit: ' kN' },
    { label: 'total thrust', key: 'totalThrust', unit: ' kN' },
    { label: 'MTOW', key: 'mtow', unit: ' kg' },
    { label: 'range', key: 'range', unit: ' nmi' },
    { label: 'cruise speed', key: 'cruiseSpeed', unit: ' Mach' },
    { label: 'capacity', key: 'capacity', unit: '' },
    { label: 'max. capacity', key: 'maxCapacity', unit: '' },
  ];

  return (
    <div className="comparison-container animation-fade">
      <h2 className="heading text-center title">AVIOR Comparison</h2>
      <p className="subtitle text-center">Select two models below to compare their 12 exact specifications.</p>

      <div className="compare-header glass-panel">
        
        {/* Plane 1 Selection */}
        <div className="plane-selector">
          <select value={plane1Id} onChange={handleSelect1} className="custom-select">
            {aircrafts.map(a => (
              <option key={a.id} value={a.id}>{a.manufacturer} {a.name}</option>
            ))}
          </select>
          <div className="plane-image-box">
            <img src={plane1.image} alt={plane1.name} />
            <div className="plane-tag">{plane1.type}</div>
          </div>
          <h3 className="plane-name">{plane1.name}</h3>
        </div>

        <div className="vs-badge">VS</div>

        {/* Plane 2 Selection */}
        <div className="plane-selector">
          <select value={plane2Id} onChange={handleSelect2} className="custom-select">
            {aircrafts.map(a => (
              <option key={a.id} value={a.id}>{a.manufacturer} {a.name}</option>
            ))}
          </select>
          <div className="plane-image-box">
            <img src={plane2.image} alt={plane2.name} />
            <div className="plane-tag">{plane2.type}</div>
          </div>
          <h3 className="plane-name">{plane2.name}</h3>
        </div>
      </div>

      <div className="compare-table-container glass-panel">
        <table className="compare-table">
          <thead>
            <tr>
              <th className="th-left">{plane1.name}</th>
              <th className="th-center">Specification</th>
              <th className="th-right">{plane2.name}</th>
            </tr>
          </thead>
          <tbody>
            {specs.map(spec => {
              const p1Val = plane1[spec.key];
              const p2Val = plane2[spec.key];
              return (
                <tr key={spec.key}>
                  <td className={`td-value td-left ${getCompareClass(p1Val, p2Val)}`}>
                    {p1Val}{spec.unit}
                  </td>
                  <td className="td-label">{spec.label}</td>
                  <td className={`td-value td-right ${getCompareClass(p2Val, p1Val)}`}>
                    {p2Val}{spec.unit}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTool;
