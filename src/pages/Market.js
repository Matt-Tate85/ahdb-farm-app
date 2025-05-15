// Market.js
import React from 'react';
import SectorSelector from '../components/common/SectorSelector';
import { useSector } from '../contexts/SectorContext';
import { getMarketData, getMarketInsights, getStatusColorClasses } from '../utils/helpers';

/**
 * Market Page
 * Displays market data and insights for the selected sector
 */
const Market = () => {
  const { selectedSector } = useSector();
  const marketData = getMarketData(selectedSector);
  const marketInsights = getMarketInsights(selectedSector);

  // --- Simulated Farm Data for Impact Calculation ---
  // In a real app, this would come from the user's Farm Record
  const simulatedFarmData = {
    cereals: { 'Feed Wheat': { area: 50, yield: 9.0 } }, // 50 hectares, 9.0 t/ha
    dairy: { 'Farmgate Milk': { cows: 200, yield: 8500 } }, // 200 cows, 8500 litres/cow/year
    beef: { 'R4L Steers': { head: 80, weight: 350 } }, // 80 head, 350 kg deadweight
    pork: { 'SPP': { head: 500, weight: 80 } } // 500 head, 80 kg deadweight
  };

  // Function to calculate simulated impact
  const calculateSimulatedImpact = (item, trend) => {
    const farmData = simulatedFarmData[selectedSector]?.[item.item];
    if (!farmData) return null; // No simulated data for this item/sector

    let impact = 0;
    let unit = '';

    // Simplified calculation based on trend percentage or value
    if (trend.includes('↑') || trend.includes('↓')) {
        const change = parseFloat(trend.replace(/[^\d.-]/g, '')); // Extract number
        if (isNaN(change)) return null;

        if (selectedSector === 'cereals' && item.item.includes('Wheat')) {
            // Assuming price is per tonne, calculate impact per hectare
            const pricePerTonne = parseFloat(item.price.replace(/[£/tonne]/g, ''));
             if (isNaN(pricePerTonne)) return null;
            // Calculate change in price per tonne
            const priceChangePerTonne = (pricePerTonne / (1 + (change / 100))) * (change / 100);
            impact = priceChangePerTonne * farmData.yield * farmData.area;
            unit = 'annual revenue';
        } else if (selectedSector === 'dairy' && item.item.includes('Milk')) {
             // Assuming price is per litre, calculate impact per year
            const pricePerLitre = parseFloat(item.price.replace(/[p/litre]/g, '')) / 100; // Convert p to £
             if (isNaN(pricePerLitre)) return null;
             const priceChangePerLitre = (pricePerLitre / (1 + (change / 100))) * (change / 100);
             impact = priceChangePerLitre * farmData.yield * farmData.cows;
             unit = 'annual revenue';
        } else if (selectedSector === 'beef' && item.item.includes('p/kg')) {
             // Assuming price is per kg, calculate impact per head
             const pricePerKg = parseFloat(item.price.replace(/[p/kg]/g, '')) / 100; // Convert p to £
             if (isNaN(pricePerKg)) return null;
             const priceChangePerKg = (pricePerKg / (1 + (change / 100))) * (change / 100);
             impact = priceChangePerKg * farmData.weight * farmData.head;
             unit = 'total value';
        } else if (selectedSector === 'pork' && item.item.includes('p/kg')) {
             // Assuming price is per kg, calculate impact per head
             const pricePerKg = parseFloat(item.price.replace(/[p/kg]/g, '')) / 100; // Convert p to £
             if (isNaN(pricePerKg)) return null;
             const priceChangePerKg = (pricePerKg / (1 + (change / 100))) * (change / 100);
             impact = priceChangePerKg * farmData.weight * farmData.head;
             unit = 'total value';
        } else if (selectedSector === 'beef' && item.item.includes('/head')) {
             // Assuming price is per head
             const pricePerHead = parseFloat(item.price.replace(/[£/head]/g, ''));
             if (isNaN(pricePerHead)) return null;
             const priceChangePerHead = (pricePerHead / (1 + (change / 100))) * (change / 100);
             impact = priceChangePerHead * farmData.head;
             unit = 'total value';
        } else if (selectedSector === 'pork' && item.item.includes('/head')) {
             // Assuming price is per head
             const pricePerHead = parseFloat(item.price.replace(/[£/head]/g, ''));
             if (isNaN(pricePerHead)) return null;
             const priceChangePerHead = (pricePerHead / (1 + (change / 100))) * (change / 100);
             impact = priceChangePerHead * farmData.head;
             unit = 'total value';
        }
    } else if (trend.includes('p')) { // Handle direct price changes in pence
         const change = parseFloat(trend.replace(/[^\d.-]/g, '')) / 100; // Convert p to £
         if (isNaN(change)) return null;

         if (selectedSector === 'dairy' && item.item.includes('Milk')) {
             impact = change * farmData.yield * farmData.cows;
             unit = 'annual revenue';
         } else if (selectedSector === 'beef' && item.item.includes('p/kg')) {
             impact = change * farmData.weight * farmData.head;
             unit = 'total value';
         } else if (selectedSector === 'pork' && item.item.includes('p/kg')) {
             impact = change * farmData.weight * farmData.head;
             unit = 'total value';
         }
    }


    if (impact === 0) return null; // Don't show if no change or calculation failed

    const formattedImpact = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(Math.abs(impact));
    const direction = impact >= 0 ? 'increase' : 'decrease';

    return `Simulated impact on your ${unit}: ${formattedImpact} (${direction})`;
  };
  // --- End Simulated Farm Data ---


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
                  {/* Display simulated impact if available */}
                  {calculateSimulatedImpact(item, item.trend) && (
                      <div className="text-xs text-gray-500 mt-1">
                          {calculateSimulatedImpact(item, item.trend)} {/* Display calculated impact */}
                      </div>
                  )}
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
