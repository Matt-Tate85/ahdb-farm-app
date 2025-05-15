// Farmbench.js
import React from 'react';
import SectorSelector from '../components/common/SectorSelector';
import { useSector } from '../contexts/SectorContext';
import { BarChart2, TrendingUp, Award, ArrowUp, ArrowDown } from 'lucide-react';

/**
 * Farmbench Page
 * AHDB's farm benchmarking tool
 */
const Farmbench = () => {
  const { selectedSector } = useSector();

  // Sample benchmark data
  const benchmarkData = {
    cereals: {
      metrics: [
        { name: 'Yield', value: '9.2 t/ha', avg: '8.5 t/ha', status: 'above' },
        { name: 'Variable Costs', value: '£528/ha', avg: '£550/ha', status: 'below' },
        { name: 'Fixed Costs', value: '£642/ha', avg: '£685/ha', status: 'below' },
        { name: 'Gross Margin', value: '£1,105/ha', avg: '£980/ha', status: 'above' }
      ],
      position: 'Top 25%',
      summary: 'Your cereal enterprise is performing well, with yields above and costs below the national average.',
      recommendations: [ // Added tailored recommendations
        'Explore advanced variety selection tools in the Knowledge Library to potentially further increase yields.',
        'Review your fertiliser application timing and rates using the RB209 calculator to optimise nutrient use efficiency.',
        'Benchmark your machinery costs in more detail using the Machinery Cost Calculator to identify potential savings.'
      ]
    },
    dairy: {
      metrics: [
        { name: 'Milk Yield', value: '8,750 litres/cow', avg: '8,100 litres/cow', status: 'above' },
        { name: 'Feed Cost', value: '9.2 ppl', avg: '10.5 ppl', status: 'below' },
        { name: 'Total Cost of Production', value: '28.5 ppl', avg: '30.2 ppl', status: 'below' },
        { name: 'Margin', value: '8.0 ppl', avg: '6.3 ppl', status: 'above' }
      ],
      position: 'Top 25%',
      summary: 'Your dairy enterprise is showing strong performance with good cost control and above average yields.',
      recommendations: [ // Added tailored recommendations
        'Utilise the Feed Planning Tool to fine-tune rations and potentially improve feed efficiency further.',
        'Benchmark your heifer rearing costs using the Heifer Rearing Calculator.',
        'Review the latest AHDB research on mastitis control programmes in the Knowledge Library.'
      ]
    },
    beef: {
      metrics: [
        { name: 'Daily Liveweight Gain', value: '1.35 kg/day', avg: '1.15 kg/day', status: 'above' },
        { name: 'Feed Cost', value: '£1.25/kg LWG', avg: '£1.38/kg LWG', status: 'below' },
        { name: 'Total Cost', value: '£3.60/kg LWG', avg: '£3.85/kg LWG', status: 'below' },
        { name: 'Margin', value: '£285/head', avg: '£215/head', status: 'above' }
      ],
      position: 'Top 25%',
      summary: 'Your beef enterprise is performing well with good growth rates and cost efficiency compared to similar farms.',
      recommendations: [ // Added tailored recommendations
        'Explore the Grazing Planning Tool to optimise grass utilisation and grazing rotation.',
        'Benchmark your suckler herd performance against other farms using Farmbench.',
        'Review the AHDB Beef & Lamb selection resources to ensure optimal animal performance.'
      ]
    },
    pork: {
      metrics: [
        { name: 'Pigs Weaned/Sow/Year', value: '27.5', avg: '26.2', status: 'above' },
        { name: 'Feed Conversion Ratio', value: '2.65', avg: '2.80', status: 'below' },
        { name: 'Total Cost', value: '145p/kg DW', avg: '155p/kg DW', status: 'below' },
        { name: 'Margin', value: '18p/kg DW', avg: '12p/kg DW', status: 'above' }
      ],
      position: 'Top 25%',
      summary: 'Your pig enterprise shows strong technical performance with good breeding productivity and feed efficiency.',
      recommendations: [ // Added tailored recommendations
        'Utilise the Pig Production Calculator to track and analyse key performance indicators in more detail.',
        'Review AHDB guidance on optimising indoor environments for pig welfare.',
        'Explore the latest research on reducing antibiotic usage in the Research Projects section.'
      ]
    }
  };

  const currentData = benchmarkData[selectedSector];

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">AHDB Farmbench</h2>

      <SectorSelector />

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium flex items-center">
            <Award size={18} className="mr-2 text-green-600" />
            Your Performance
          </h3>
          <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
            {currentData.position}
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-4">
          {currentData.summary}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {currentData.metrics.map((metric, i) => (
            <div key={i} className="p-3 border rounded-lg">
              <div className="text-sm font-medium">{metric.name}</div>
              <div className="flex justify-between items-center mt-1">
                <div className="text-xl font-semibold">{metric.value}</div>
                <div className={`flex items-center text-xs ${
                  metric.status === 'above' ? 'text-green-600' : 'text-blue-500'
                }`}>
                  {metric.status === 'above' ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
                  {metric.avg} avg
                </div>
              </div>
            </div>
          ))}
        </div>

         {/* Tailored Recommendations Section */}
        {currentData.recommendations && currentData.recommendations.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="font-medium mb-2">Tailored AHDB Recommendations:</h4>
                <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                    {currentData.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                    ))}
                </ul>
            </div>
        )}

        <button className="w-full py-2 rounded-lg bg-blue-500 text-white mt-4"> {/* Adjusted margin-top */}
          View Full Benchmarking Report
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium flex items-center">
            <TrendingUp size={18} className="mr-2 text-blue-500" />
            3-Year Performance Trend
          </h3>
        </div>

        <div className="h-64 bg-gray-50 rounded-lg flex justify-center items-center p-4 mb-4">
          <div className="text-center text-gray-500">
            <BarChart2 size={40} className="mx-auto mb-2 text-gray-400" />
            <span>Performance trends chart would display here</span>
          </div>
        </div>

        <div className="text-sm text-gray-700">
          <p>Your {selectedSector} enterprise has shown consistent improvement over the last 3 years, with particularly strong gains in cost efficiency. The most recent reporting period shows you performing in the top quartile compared to similar AHDB Farmbench users.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-medium mb-3">Data Upload</h3>
        <p className="text-sm mb-3">
          Keep your benchmarking data up to date by uploading your latest figures.
        </p>

        <button className="w-full py-2 rounded-lg bg-green-600 text-white mb-2">
          Upload Farm Data
        </button>

        <p className="text-xs text-gray-500 text-center">
          Last updated: 5 May 2025
        </p>
      </div>
    </div>
  );
};

export default Farmbench;
