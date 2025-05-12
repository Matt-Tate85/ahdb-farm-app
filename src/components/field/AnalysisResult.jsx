// src/components/field/AnalysisResult.jsx

import React from 'react';
import { AlertCircle, Check, AlertTriangle } from 'lucide-react';
import { useDevice } from '../../contexts/DeviceContext';

const AnalysisResult = ({ results, image, onReset, sectorColor }) => {
  const { isMobile, isTablet } = useDevice();
  
  if (!results) return null;
  
  const { crop, growth_stage, issues, health_score, recommendations } = results;
  
  // Determine screen size to adjust layout
  const isSmallScreen = isMobile || isTablet;
  
  return (
    <div className="space-y-4">
      {/* Result summary for small screens */}
      {isSmallScreen && (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-medium">Analysis Results</h3>
            <button
              onClick={onReset}
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              New scan
            </button>
          </div>
          
          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2 mb-3">
              <div className="bg-gray-50 p-3 rounded-md h-full">
                <p className="text-xs text-gray-500">Crop identified</p>
                <p className="text-sm font-medium">{crop}</p>
              </div>
            </div>
            <div className="w-1/2 px-2 mb-3">
              <div className="bg-gray-50 p-3 rounded-md h-full">
                <p className="text-xs text-gray-500">Growth stage</p>
                <p className="text-sm font-medium">{growth_stage}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500">Overall health score</p>
            <div className="mt-1 relative h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full rounded-full" 
                style={{
                  width: `${health_score}%`,
                  backgroundColor: getHealthColor(health_score)
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>Poor</span>
              <span className="font-medium">{health_score}%</span>
              <span>Excellent</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Analyzed image with issue markers */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="relative">
          <img 
            src={image} 
            alt="Analyzed field" 
            className="w-full h-auto"
          />
          
          {issues.map((issue, index) => (
            <div 
              key={index}
              className="absolute border-2 rounded-md flex items-center justify-center"
              style={{
                left: `${issue.location.x}%`,
                top: `${issue.location.y}%`,
                width: `${issue.location.width}%`,
                height: `${issue.location.height}%`,
                borderColor: issue.type === 'disease' ? '#e53e3e' : '#d69e2e',
              }}
            >
              <span className="text-xs text-white bg-black bg-opacity-70 px-1 rounded-sm">
                {issue.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* For larger screens, show the summary here */}
        {!isSmallScreen && (
          <div className="p-4 border-t border-gray-100">
            <div className="flex flex-wrap -mx-2">
              <div className="w-1/3 px-2">
                <div className="bg-gray-50 p-3 rounded-md h-full">
                  <p className="text-xs text-gray-500">Crop identified</p>
                  <p className="text-sm font-medium">{crop}</p>
                </div>
              </div>
              <div className="w-1/3 px-2">
                <div className="bg-gray-50 p-3 rounded-md h-full">
                  <p className="text-xs text-gray-500">Growth stage</p>
                  <p className="text-sm font-medium">{growth_stage}</p>
                </div>
              </div>
              <div className="w-1/3 px-2">
                <div className="bg-gray-50 p-3 rounded-md h-full">
                  <p className="text-xs text-gray-500">Health score</p>
                  <p className="text-sm font-medium">{health_score}%</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Issues and recommendations */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-base font-medium mb-3">Issues & Recommendations</h3>
        
        <div className="space-y-3">
          {issues.map((issue, index) => (
            <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
              <div 
                className="px-3 py-2 flex items-center border-l-4"
                style={{
                  borderLeftColor: issue.type === 'disease' ? '#e53e3e' : '#d69e2e',
                  backgroundColor: issue.type === 'disease' ? '#FEF2F2' : '#FFFBEB'
                }}
              >
                <AlertCircle 
                  size={16} 
                  className={issue.type === 'disease' ? 'text-red-500' : 'text-yellow-500'} 
                />
                <div className="ml-2">
                  <p className="text-sm font-medium">{issue.name}</p>
                  <div className="flex items-center text-xs mt-0.5">
                    <span className="capitalize">{issue.severity} severity</span>
                    <span className="mx-1 text-gray-300">|</span>
                    <span>{issue.confidence}% confidence</span>
                  </div>
                </div>
              </div>
              <div className="p-3 text-sm bg-gray-50">
                {issue.recommendation}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 bg-blue-50 p-3 rounded-md border border-blue-100">
          <h4 className="text-sm font-medium text-blue-800 mb-2">
            Recommended actions
          </h4>
          <ul className="space-y-1.5">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex text-sm text-blue-700">
                <Check size={16} className="flex-shrink-0 mr-1.5 text-blue-500" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col sm:flex-row justify-end">
          <button
            className="px-4 py-2 rounded-lg border border-gray-300 mb-2 sm:mb-0 sm:mr-2 text-sm min-h-[44px]"
            onClick={onReset}
          >
            New Scan
          </button>
          <button
            className="px-4 py-2 rounded-lg text-white text-sm min-h-[44px]"
            style={{ backgroundColor: sectorColor }}
          >
            Save to Farm Record
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to determine health score color
const getHealthColor = (score) => {
  if (score >= 80) return '#10B981'; // Green
  if (score >= 60) return '#FBBF24'; // Yellow
  return '#EF4444'; // Red
};

export default AnalysisResult;
