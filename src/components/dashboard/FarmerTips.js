import React from 'react';
import { SAMPLE_FARMER_TIPS } from '../../utils/constants';

/**
 * FarmerTips Component
 * Displays farming tips and updates on the dashboard
 */
const FarmerTips = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-medium mb-2">AHDB Updates & Resources</h3>
      <ul className="space-y-2">
        {SAMPLE_FARMER_TIPS.map((tip, i) => (
          <li key={i} className="text-sm border-b border-gray-100 pb-2 last:border-0 last:pb-0">
            {tip}
          </li>
        ))}
        <li className="text-sm font-medium mt-2 text-green-600">
          View more in AHDB Knowledge Library →
        </li>
      </ul>
    </div>
  );
};

export default FarmerTips;
