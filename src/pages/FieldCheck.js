// FieldCheck.js
import React, { useState } from 'react';
import { Camera, CheckCircle, XCircle } from 'lucide-react'; // Added icons for status
import SectorSelector from '../components/common/SectorSelector';
import { useSector } from '../contexts/SectorContext';
import { simulateImageAnalysis } from '../utils/helpers';

/**
 * FieldCheck Page
 * Tool for analysing crop/field images and providing recommendations
 */
const FieldCheck = () => {
  const { selectedSector } = useSector();
  const [cropImage, setCropImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisStep, setAnalysisStep] = useState(''); // State to track analysis steps

  const handleImageUpload = () => {
    // Simulate image upload
    setCropImage('/api/placeholder/400/300'); // Use a placeholder image
    setAnalysisResult(null);
    setAnalysisStep(''); // Clear steps on new upload
  };

  const handleAnalyzeImage = async () => {
    setAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisStep('Uploading Image...'); // Step 1

    // Simulate upload time
    await new Promise(resolve => setTimeout(resolve, 500));

    setAnalysisStep('Processing Image Data...'); // Step 2
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    setAnalysisStep(`Running AI Assessment against AHDB ${selectedSector === 'cereals' ? 'Crop Disease Directory' : selectedSector === 'dairy' ? 'Forage for Knowledge' : selectedSector === 'beef' ? 'Better Returns Programme' : selectedSector === 'pork' ? 'Practical Pig App' : 'Reference Database'}...`); // Step 3 (Contextual)
    // Simulate AI analysis time
    await new Promise(resolve => setTimeout(resolve, 1000));

    setAnalysisStep('Identifying Potential Issues...'); // Step 4
    // Simulate issue identification time
    await new Promise(resolve => setTimeout(resolve, 500));

    setAnalysisStep('Generating AHDB Recommendations...'); // Step 5
    // Simulate recommendation generation time
    await new Promise(resolve => setTimeout(resolve, 500));


    try {
      const result = await simulateImageAnalysis(selectedSector); // Actual helper call
      setAnalysisResult(result);
      setAnalysisStep('Analysis Complete!'); // Final step on success
    } catch (error) {
      console.error('Error analysing image:', error);
      setAnalysisResult(null); // Clear result on error
      setAnalysisStep('Analysis Failed.'); // Final step on failure
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">AHDB Field Assessment Tool</h2>
      <p className="text-sm text-gray-700">
        Take or upload a photo of your {selectedSector === 'cereals' ? 'crop' : 'field/livestock'}
        to check for issues and get AHDB recommendations.
      </p>

      <SectorSelector />

      <div className="p-3 rounded-lg text-sm bg-green-50">
        <div className="text-xs text-green-600">
          {selectedSector === 'cereals' && 'AI assessment powered by AHDB Crop Disease Directory'}
          {selectedSector === 'dairy' && 'AI assessment powered by AHDB Forage for Knowledge'}
          {selectedSector === 'beef' && 'AI assessment powered by AHDB Better Returns Programme'}
          {selectedSector === 'pork' && 'AI assessment powered by AHDB Practical Pig App'}
        </div>
      </div>

      <div className="border-2 border-dashed rounded-lg p-4 text-center border-neutral-300">
        {!cropImage ? (
          <div>
            <Camera size={40} className="mx-auto mb-2 text-gray-700" />
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
              onClick={handleImageUpload}
            >
              Take Photo or Upload
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <img src={cropImage} alt="Field assessment" className="mx-auto rounded-lg" />
            {!analyzing && !analysisResult && analysisStep !== 'Analysis Failed.' && ( // Show analyze button if not analyzing and no result/error
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
                onClick={handleAnalyzeImage}
              >
                Analyse Image
              </button>
            )}
            {analyzing && (
              <div className="text-center">
                <p className="text-sm text-gray-700">{analysisStep}</p> {/* Display current step */}
                <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="animate-pulse h-full rounded-full bg-green-600"></div> {/* Simple loading animation */}
                </div>
              </div>
            )}
             {/* Display status icon and message after analysis */}
            {analysisStep === 'Analysis Complete!' && (
                <div className="flex items-center justify-center text-green-600 text-sm font-medium">
                    <CheckCircle size={20} className="mr-2"/> Analysis Complete!
                </div>
            )}
            {analysisStep === 'Analysis Failed.' && (
                <div className="flex items-center justify-center text-red-600 text-sm font-medium">
                    <XCircle size={20} className="mr-2"/> Analysis Failed. Please try again.
                </div>
            )}
          </div>
        )}
      </div>

      {analysisResult && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-medium mb-2">AHDB Analysis Results</h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium block">Status Assessment:</span>
              <span className={`text-sm ${analysisResult.cropHealth === 'Healthy' ? 'text-green-600' : 'text-orange-500'}`}>
                {analysisResult.cropHealth}
              </span>
            </div>

            <div>
              <span className="text-sm font-medium block">Issues Identified:</span>
              <ul className="text-sm list-disc pl-5">
                {analysisResult.possibleIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-sm font-medium block">AHDB Recommendations:</span>
              <ul className="text-sm list-disc pl-5">
                {analysisResult.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <button className="text-sm text-green-600">
                View AHDB factsheet →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FieldCheck;
