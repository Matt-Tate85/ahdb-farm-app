// src/components/field/CameraCapture.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, AlertCircle } from 'lucide-react';
import { useSector } from '../../contexts/SectorContext';
import { useDevice } from '../../contexts/DeviceContext';
import { SECTOR_COLORS } from '../../config/colors';

const CameraCapture = ({ onImageCaptured }) => {
  const { selectedSector } = useSector();
  const sectorColor = SECTOR_COLORS[selectedSector]?.main || SECTOR_COLORS.default.main;
  
  const { hasCamera, isLandscape, isMobile, isIOS, isAndroid } = useDevice();
  
  const [cameraActive, setCameraActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  const startCamera = async () => {
    try {
      // Configure video constraints based on device
      const constraints = { 
        video: { 
          facingMode: 'environment', // Use back camera if available
          width: { ideal: isLandscape ? 1280 : 720 },
          height: { ideal: isLandscape ? 720 : 1280 }
        } 
      };
      
      // iOS-specific adjustments
      if (isIOS) {
        constraints.video.width = { max: 1280 };
        constraints.video.height = { max: 1280 };
      }
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setCameraActive(true);
      setErrorMessage('');
    } catch (err) {
      console.error('Error accessing camera:', err);
      setErrorMessage('Unable to access camera. Please check permissions or try uploading an image instead.');
      setCameraActive(false);
    }
  };
  
  const captureImage = () => {
    if (!videoRef.current || !cameraActive) return;
    
    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    
    // Set canvas size to match video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the video frame to the canvas
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert to image data
    const imageData = canvas.toDataURL('image/jpeg');
    onImageCaptured(imageData);
    
    // Stop camera after capture
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setCameraActive(false);
  };
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageCaptured(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <div className="flex flex-col items-center w-full">
      {cameraActive ? (
        <div className={`relative w-full max-w-md rounded-lg overflow-hidden ${isLandscape ? 'h-64 md:h-96' : ''}`}>
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline
            className={`w-full h-auto ${isLandscape ? 'h-full w-auto object-cover' : ''}`}
            style={{ maxHeight: isMobile ? '60vh' : '70vh' }}
          />
          
          {/* Capture button */}
          <button
            onClick={captureImage}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg border-2"
            style={{ borderColor: sectorColor }}
            aria-label="Capture image"
          >
            <Camera size={24} style={{ color: sectorColor }} />
          </button>
          
          {/* Stop camera button */}
          <button
            onClick={() => {
              if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
              }
              setCameraActive(false);
            }}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white bg-opacity-75 rounded-full shadow"
            aria-label="Cancel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md bg-gray-100 rounded-lg p-6 flex flex-col items-center space-y-4">
          {errorMessage && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm w-full">
              <div className="flex items-start">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5 mr-2" />
                <span>{errorMessage}</span>
              </div>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 w-full">
            {hasCamera && (
              <button
                onClick={startCamera}
                className="flex items-center justify-center py-3 px-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/2 min-h-[44px]"
              >
                <Camera size={20} className="mr-2" />
                <span>{isMobile ? 'Camera' : 'Use Camera'}</span>
              </button>
            )}
            
            <label className="flex items-center justify-center py-3 px-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer w-full md:w-1/2 min-h-[44px]">
              <Upload size={20} className="mr-2" />
              <span>{isMobile ? 'Upload' : 'Upload Image'}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
                aria-label="Upload image"
              />
            </label>
          </div>
          
          <p className="text-sm text-gray-500 text-center">
            {hasCamera 
              ? 'Take a photo or upload an image of your field/crop for analysis'
              : 'Upload an image of your field/crop for analysis'}
          </p>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
