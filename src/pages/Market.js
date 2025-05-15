// Market.js
import React from 'react';
import SectorSelector from '../components/common/SectorSelector';
import { useSector } from '../contexts/SectorContext';
import { getMarketData, getMarketInsights, getStatusColorClasses } from '../utils/helpers'; // Keep 'color' in function name for consistency

/**
 * Market Page
 * Displays market data and insights for the selected sector
 */
const Market = () => {
  const { selectedSector } = useSector();
  const marketData = getMarketData(selectedSector);
  const marketInsights = getMarketInsights(selectedSector);

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">AHDB Market Data</h2>
        <span className="text-xs text-gray-700">Updated: Today 9:30 AM</span>
      </div>

      <SectorSelector />

      <p className="text-sm text-gray-700">
        AHDB reported prices for {selectedSector === 'cereals' ? 'cereals & oilseeds' : selectedSector} sector.
      </p>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                {selectedSector === 'cereals' ? 'Crop' :
                 selectedSector === 'dairy' ? 'Product' :
                 selectedSector === 'beef' ? 'Category' : 'Category'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">AHDB Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Weekly Change</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {marketData.map((item, i) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{item.item}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={
                    item.trend.includes('↑') ? 'text-green-600' :
                    item.trend.includes('↓') ? 'text-amber-900' :
                    'text-gray-700'
                  }>
                    {item.trend}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-medium mb-2">AHDB Market Intelligence</h3>
        <ul className="space-y-2">
          {marketInsights.map((insight, i) => (
            <li key={i} className="flex justify-between items-center text-sm p-2 border-b last:border-0">
              <div>
                <span className="font-medium block">{insight.location}</span>
                <span className="text-xs text-gray-700">{insight.note}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColorClasses(insight.status)}`}>
                {insight.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center">
        <button className="text-sm font-medium text-green-600">
          View full AHDB market dashboard →
        </button>
      </div>
    </div>
  );
};

export default Market;