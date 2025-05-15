import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { useSector } from '../contexts/SectorContext';

const PerformanceTrendChart = () => {
  const { selectedSector } = useSector();
  const [data, setData] = useState([]);
  
  // Generate realistic trend data based on selected sector
  useEffect(() => {
    // Demo data for each sector - showing 3-year trends
    const trendData = {
      cereals: [
        { year: '2023', yield: 8.7, variableCosts: 545, fixedCosts: 695, grossMargin: 950, avgYield: 8.3, avgGrossMargin: 920 },
        { year: '2024', yield: 8.9, variableCosts: 540, fixedCosts: 670, grossMargin: 1020, avgYield: 8.4, avgGrossMargin: 950 },
        { year: '2025', yield: 9.2, variableCosts: 528, fixedCosts: 642, grossMargin: 1105, avgYield: 8.5, avgGrossMargin: 980 }
      ],
      dairy: [
        { year: '2023', yield: 8200, feedCost: 10.1, totalCost: 31.5, margin: 6.8, avgYield: 7900, avgMargin: 5.9 },
        { year: '2024', yield: 8500, feedCost: 9.7, totalCost: 29.8, margin: 7.5, avgYield: 8000, avgMargin: 6.1 },
        { year: '2025', yield: 8750, feedCost: 9.2, totalCost: 28.5, margin: 8.0, avgYield: 8100, avgMargin: 6.3 }
      ],
      beef: [
        { year: '2023', dailyGain: 1.20, feedCost: 1.35, totalCost: 3.85, margin: 220, avgDailyGain: 1.10, avgMargin: 195 },
        { year: '2024', dailyGain: 1.28, feedCost: 1.30, totalCost: 3.70, margin: 255, avgDailyGain: 1.12, avgMargin: 205 },
        { year: '2025', dailyGain: 1.35, feedCost: 1.25, totalCost: 3.60, margin: 285, avgDailyGain: 1.15, avgMargin: 215 }
      ],
      pork: [
        { year: '2023', pigsWeaned: 26.5, fcr: 2.78, totalCost: 158, margin: 14, avgPigsWeaned: 25.7, avgMargin: 10 },
        { year: '2024', pigsWeaned: 27.0, fcr: 2.72, totalCost: 152, margin: 16, avgPigsWeaned: 26.0, avgMargin: 11 },
        { year: '2025', pigsWeaned: 27.5, fcr: 2.65, totalCost: 145, margin: 18, avgPigsWeaned: 26.2, avgMargin: 12 }
      ]
    };
    
    setData(trendData[selectedSector] || []);
  }, [selectedSector]);
  
  // Define chart configuration based on sector
  const getChartConfig = () => {
    switch(selectedSector) {
      case 'cereals':
        return {
          lines: [
            { dataKey: 'yield', name: 'Yield (t/ha)', color: '#16a34a' },
            { dataKey: 'avgYield', name: 'Avg Yield (t/ha)', color: '#86efac', dash: '5 5' },
            { dataKey: 'grossMargin', name: 'Gross Margin (£/ha)', color: '#2563eb' },
            { dataKey: 'avgGrossMargin', name: 'Avg Gross Margin (£/ha)', color: '#93c5fd', dash: '5 5' }
          ],
          yAxis: [
            { name: 'Yield (t/ha)', type: 'number', domain: [7, 10], orientation: 'left' },
            { name: 'Gross Margin (£/ha)', type: 'number', domain: [700, 1200], orientation: 'right' }
          ]
        };
      case 'dairy':
        return {
          lines: [
            { dataKey: 'yield', name: 'Milk Yield (litres/cow)', color: '#16a34a' },
            { dataKey: 'avgYield', name: 'Avg Milk Yield (litres/cow)', color: '#86efac', dash: '5 5' },
            { dataKey: 'margin', name: 'Margin (ppl)', color: '#2563eb' },
            { dataKey: 'avgMargin', name: 'Avg Margin (ppl)', color: '#93c5fd', dash: '5 5' }
          ],
          yAxis: [
            { name: 'Milk Yield (l/cow)', type: 'number', domain: [7500, 9000], orientation: 'left' },
            { name: 'Margin (ppl)', type: 'number', domain: [5, 9], orientation: 'right' }
          ]
        };
      case 'beef':
        return {
          lines: [
            { dataKey: 'dailyGain', name: 'Daily Gain (kg/day)', color: '#16a34a' },
            { dataKey: 'avgDailyGain', name: 'Avg Daily Gain (kg/day)', color: '#86efac', dash: '5 5' },
            { dataKey: 'margin', name: 'Margin (£/head)', color: '#2563eb' },
            { dataKey: 'avgMargin', name: 'Avg Margin (£/head)', color: '#93c5fd', dash: '5 5' }
          ],
          yAxis: [
            { name: 'Daily Gain (kg/day)', type: 'number', domain: [1, 1.5], orientation: 'left' },
            { name: 'Margin (£/head)', type: 'number', domain: [150, 300], orientation: 'right' }
          ]
        };
      case 'pork':
        return {
          lines: [
            { dataKey: 'pigsWeaned', name: 'Pigs Weaned/Sow/Year', color: '#16a34a' },
            { dataKey: 'avgPigsWeaned', name: 'Avg Pigs Weaned/Sow/Year', color: '#86efac', dash: '5 5' },
            { dataKey: 'margin', name: 'Margin (p/kg DW)', color: '#2563eb' },
            { dataKey: 'avgMargin', name: 'Avg Margin (p/kg DW)', color: '#93c5fd', dash: '5 5' }
          ],
          yAxis: [
            { name: 'Pigs Weaned', type: 'number', domain: [24, 28], orientation: 'left' },
            { name: 'Margin (p/kg DW)', type: 'number', domain: [8, 20], orientation: 'right' }
          ]
        };
      default:
        return { lines: [], yAxis: [] };
    }
  };
  
  const config = getChartConfig();
  
  const getMainMetricData = () => {
    switch(selectedSector) {
      case 'cereals': return 'Yield and Gross Margin';
      case 'dairy': return 'Milk Yield and Margin';
      case 'beef': return 'Daily Gain and Margin';
      case 'pork': return 'Pigs Weaned and Margin';
      default: return '';
    }
  };
  
  return (
    <div className="w-full h-full">
      <div className="text-sm font-medium mb-2 text-gray-700">
        {getMainMetricData()} - Your Farm vs Industry Average
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          
          {config.yAxis.map((axis, index) => (
            <YAxis 
              key={index}
              yAxisId={index} 
              orientation={axis.orientation} 
              domain={axis.domain}
              allowDecimals={true}
              tickFormatter={tick => {
                // Handle large numbers (like dairy yields) with K suffix
                return axis.name.includes('Yield') && tick >= 1000 ? 
                  `${(tick/1000).toFixed(1)}K` : tick;
              }}
            />
          ))}
          
          <Tooltip 
            formatter={(value, name) => {
              // Format values appropriately
              if (name.includes('Yield') && value >= 1000) {
                return [`${value.toLocaleString()} litres/cow`, name];
              }
              if (name.includes('Margin')) {
                return [`${value}${selectedSector === 'pork' ? 'p/kg' : selectedSector === 'beef' ? '£/head' : selectedSector === 'dairy' ? 'ppl' : '£/ha'}`, name];
              }
              return [value, name];
            }}
          />
          <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '10px' }} />
          
          {config.lines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              name={line.name}
              stroke={line.color}
              yAxisId={index < 2 ? 0 : 1}
              strokeDasharray={line.dash || '0'}
              activeDot={{ r: 6 }}
              strokeWidth={line.dash ? 1.5 : 2}
            />
          ))}
          
          {/* Reference line to show improvement over time */}
          <ReferenceLine 
            y={data.length > 0 ? data[0][config.lines[0]?.dataKey] : 0} 
            yAxisId={0} 
            stroke="#d1d5db" 
            strokeDasharray="3 3" 
            label={{ 
              value: "2023 Baseline", 
              position: "insideBottomLeft",
              fill: "#6b7280",
              fontSize: 10
            }} 
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="text-xs text-gray-600 text-center mt-2">
        Showing continuous improvement vs industry average from 2023-2025
      </div>
    </div>
  );
};

export default PerformanceTrendChart;
