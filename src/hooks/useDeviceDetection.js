// src/hooks/useDeviceDetection.js

import { useState, useEffect } from 'react';

/**
 * Custom hook for device capability detection
 * @returns {Object} Object containing device capability information
 */
const useDeviceDetection = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    hasCamera: false,
    hasTouch: false,
    isLandscape: false,
    isIOS: false,
    isAndroid: false,
    safeAreaInsets: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  useEffect(() => {
    // Check device type based on screen width
    const detectDeviceType = () => {
      const width = window.innerWidth;
      const isLandscape = window.innerWidth > window.innerHeight;
      const isAndroid = /Android/i.test(navigator.userAgent);
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      
      return {
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024,
        isLandscape,
        isIOS,
        isAndroid,
      };
    };

    // Check for touch capability
    const detectTouchCapability = () => {
      return 'ontouchstart' in window || 
             navigator.maxTouchPoints > 0 || 
             navigator.msMaxTouchPoints > 0;
    };

    // Check for camera capability
    const detectCameraCapability = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return false;
      }
      
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // Stop the stream immediately
        stream.getTracks().forEach(track => track.stop());
        return true;
      } catch (err) {
        return false;
      }
    };

    // Get safe area insets for notched devices
    const getSafeAreaInsets = () => {
      const insets = { top: 0, right: 0, bottom: 0, left: 0 };
      
      if (window.CSS && window.CSS.supports && 
          window.CSS.supports('padding-top: env(safe-area-inset-top)')) {
        
        const temp = document.createElement('div');
        temp.style.paddingTop = 'env(safe-area-inset-top)';
        temp.style.paddingRight = 'env(safe-area-inset-right)';
        temp.style.paddingBottom = 'env(safe-area-inset-bottom)';
        temp.style.paddingLeft = 'env(safe-area-inset-left)';
        temp.style.visibility = 'hidden';
        document.body.appendChild(temp);
        
        const style = window.getComputedStyle(temp);
        insets.top = parseInt(style.paddingTop, 10) || 0;
        insets.right = parseInt(style.paddingRight, 10) || 0;
        insets.bottom = parseInt(style.paddingBottom, 10) || 0;
        insets.left = parseInt(style.paddingLeft, 10) || 0;
        
        document.body.removeChild(temp);
      }
      
      return insets;
    };

    // Initial device detection
    const updateDeviceInfo = async () => {
      const deviceType = detectDeviceType();
      const hasTouch = detectTouchCapability();
      const hasCamera = await detectCameraCapability();
      const safeAreaInsets = getSafeAreaInsets();
      
      setDeviceInfo({
        ...deviceType,
        hasCamera,
        hasTouch,
        safeAreaInsets,
      });
    };

    // Run detection
    updateDeviceInfo();

    // Update on resize/orientation change
    const handleResize = () => {
      const deviceType = detectDeviceType();
      const safeAreaInsets = getSafeAreaInsets();
      
      setDeviceInfo(prevState => ({
        ...prevState,
        ...deviceType,
        safeAreaInsets,
      }));
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return deviceInfo;
};

export default useDeviceDetection;
