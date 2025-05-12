// src/pages/FieldCheck.jsx

import React, { useState } from 'react';
import { ChevronLeft, Camera, Upload, AlertCircle, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectorSelector from '../components/common/SectorSelector';
import CameraCapture from '../components/field/CameraCapture';
import AnalysisResult from '../components/field/AnalysisResult';
import { useSector } from '../contexts/SectorContext';
import { useDevice } from '../contexts/DeviceContext';
import { SECTOR_COLORS } from '../config/colors';

const FieldCheck = () => {
  const { selectedSector } = useSector();
  const { isMobile, isTablet, isLandscape } = useDevice();
  const sectorColor = SECTOR_COLORS[selectedSector]?.main || SECTOR_COLORS.default.main;
  
  const [currentStep, setCurrentStep] = useState('capture'); // capture, analyzing, results
  const [capturedImage, setCapturedImage] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  
  // Simulated results for demo purposes
  const mockResults = {
    crop: 'Winter Wheat',
    growth_stage: 'GS32 - Second node detectable',
    issues: [
      { 
        type: 'disease', 
        name: 'Septoria', 
        severity: 'moderate', 
        confidence: 82,
        location: { x: 45, y: 32, width: 20, height: 15 },
        recommendation: 'Consider applying fungicide within the next 7 days'
      },
      { 
        type: 'pest', 
        name: 'Aphids', 
        severity: 'low', 
        confidence: 68,
        location: { x: 72, y: 58, width: 12, height: 10 },
        recommendation: 'Monitor population over the next week, action not required yet'
      }
    ],
    health_score: 78,
    recommendations: [
      'Apply fungicide targeting Septoria within 7 days',
      'Monitor aphid population closely',
      'No immediate nitrogen deficiency detected'
    ]
  };
  
  const handleImageCaptured = (imageData) => {
    setCapturedImage(imageData);
    setCurrentStep('analyzing');
    
    // Simulate analysis delay
    setTimeout(() => {
      setAnalysisResults(mockResults);
      setCurrentStep('results');
    }, 3000);
  };
  
  const resetCapture = () => {
    setCapturedImage(null);
    setAnalysisResults(null);
    setCurrentStep('capture');
  };
  
  return (
    <div className="pb-16 md:pb-4">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4">
        <div className="flex items-center mb-3 md:mb-0">
          <Link to="/" className="mr-2">
            <ChevronLeft size={20} />
          </Link>
          <h2 className="text-lg font-semibold text-gray-700">Field Check</h2>
        </div>
        <SectorSelector />
      </div>
      
      {/* Main content area */}
      <div className={`mt-4 ${currentStep === 'results' ? 'md:grid md:grid-cols-2 md:gap-4' : ''}`}>
        {currentStep === 'capture' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-base font-medium">Capture Image</h3>
              <p className="text-sm text-gray-500 mt-1">
                Take a clear photo of your crop or field issue for analysis
              </p>
            </div>
            
            <div className="p-4">
              <CameraCapture onImageCaptured={handleImageCaptured} />
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <Check size={16} className="text-green-500" />
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium">For best results:</p>
                    <ul className="text-sm text-gray-500 list-inside space-y-1 mt-1">
                      <li>- Take photo in good lighting</li>
                      <li>- Hold camera 30-40cm from the crop</li>
                      <li>- Include healthy and affected areas for comparison</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 'analyzing' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-base font-medium">Analyzing Image</h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="relative w-full rounded-lg overflow-hidden">
                <img 
                  src={capturedImage} 
                  alt="Captured field" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-white font-medium mt-4">Analyzing your crop...</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center text-sm text-gray-500">
                Our AI is checking for diseases, pests, nutrient issues and growth stage...
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 'results' && (
          <>
            <div className="bg-white rounded-lg shadow mb-4 md:mb-0">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-base font-medium">Analysis Results</h3>
                <button
                  onClick={resetCapture}
                  className="text-sm text-blue-500 hover:text-blue-600"
                >
                  New scan
                </button>
              </div>
              
              <div className="p-4">
                <div className="relative w-full rounded-lg overflow-hidden mb-4">
                  <img 
                    src={capturedImage} 
                    alt="Analyzed field" 
                    className="w-full h-auto"
                  />
                  
                  {/* Overlay detected issues */}
                  {analysisResults?.issues.map((issue, index) => (
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
                
                <div className="space-y-4">
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-1/2 px-2 mb-4">
                      <div className="bg-gray-50 p-3 rounded-md h-full">
                        <p className="text-xs text-gray-500">Crop identified</p>
                        <p className="text-sm font-medium">{analysisResults?.crop}</p>
                      </div>
                    </div>
                    <div className="w-1/2 px-2 mb-4">
                      <div className="bg-gray-50 p-3 rounded-md h-full">
                        <p className="text-xs text-gray-500">Growth stage</p>
                        <p className="text-sm font-medium">{analysisResults?.growth_stage}</p>
                      </div>
                    </div>
                    <div className="w-full px-2">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-xs text-gray-500">Overall health score</p>
                        <div className="mt-1 relative h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 left-0 h-full rounded-full" 
                            style={{
                              width: `${analysisResults?.health_score}%`,
                              backgroundColor: getHealthColor(analysisResults?.health_score)
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>Poor</span>
                          <span className="font-medium">{analysisResults?.health_score}%</span>
                          <span>Excellent</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-base font-medium">Issues & Recommendations</h3>
              </div>
              
              <div className="p-4 space-y-4">
                {analysisResults?.issues.map((issue, index) => (
                  <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
                    <div 
                      className="px-4 py-3 flex items-center border-l-4"
                      style={{
                        borderLeftColor: issue.type === 'disease' ? '#e53e3e' : '#d69e2e',
                        backgroundColor: issue.type === 'disease' ? '#FEF2F2' : '#FFFBEB'
                      }}
                    >
                      <AlertCircle 
                        size={18} 
                        className={issue.type === 'disease' ? 'text-red-500' : 'text-yellow-500'} 
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium">{issue.name}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs capitalize">{issue.severity} severity</span>
                          <span className="mx-2 text-gray-300">|</span>
                          <span className="text-xs">{issue.confidence}% confidence</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 text-sm bg-gray-50">
                      {issue.recommendation}
                    </div>
                  </div>
                ))}
                
                <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">
                    Recommended actions
                  </h4>
                  <ul className="space-y-2">
                    {analysisResults?.recommendations.map((rec, index) => (
                      <li key={index} className="flex text-sm text-blue-700">
                        <span className="mr-2">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-3 flex justify-center md:justify-end">
                  <button
                    className="px-4 py-2 rounded-lg border border-gray-300 mr-2 text-sm min-h-[44px]"
                    onClick={resetCapture}
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
          </>
        )}
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

export default FieldCheck;
