// src/utils/deviceUtils.js

/**
 * Utility functions for device-specific features
 */

/**
 * Check if camera is available on the device
 * @returns {Promise<boolean>} True if camera is available
 */
export const checkCameraAvailability = async () => {
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

/**
 * Check if the device is in landscape orientation
 * @returns {boolean} True if device is in landscape orientation
 */
export const isLandscapeOrientation = () => {
  return window.innerWidth > window.innerHeight;
};

/**
 * Check if the device has touch capabilities
 * @returns {boolean} True if device has touch capabilities
 */
export const hasTouchCapability = () => {
  return 'ontouchstart' in window || 
         navigator.maxTouchPoints > 0 || 
         navigator.msMaxTouchPoints > 0;
};

/**
 * Get the device type based on screen width
 * @returns {string} 'mobile', 'tablet', or 'desktop'
 */
export const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

/**
 * Check if the device is iOS
 * @returns {boolean} True if device is iOS
 */
export const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

/**
 * Check if the device is Android
 * @returns {boolean} True if device is Android
 */
export const isAndroid = () => {
  return /Android/i.test(navigator.userAgent);
};

/**
 * Get safe area insets for notched devices
 * @returns {Object} Object with top, right, bottom, left insets
 */
export const getSafeAreaInsets = () => {
  // Default values
  const insets = { top: 0, right: 0, bottom: 0, left: 0 };
  
  // Check if CSS environment variables are supported
  if (window.CSS && window.CSS.supports && 
      window.CSS.supports('padding-top: env(safe-area-inset-top)')) {
    
    // Create a temporary element to check computed values
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
