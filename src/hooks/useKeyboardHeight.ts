import { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

// Global cache to persist the last known (non‑zero) keyboard height
let cachedKeyboardHeight = 0;

export const getCachedKeyboardHeight = () => cachedKeyboardHeight;

export const useKeyboardHeight = () => {
  // Initialize with the cached height so new dropdowns can react immediately
  const [keyboardHeight, setKeyboardHeight] = useState<number>(cachedKeyboardHeight);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  
  const keyBoardDidShow = useCallback((e: any) => {
    const height = e?.endCoordinates?.height ?? 0;
    setKeyboardHeight(height);
    setIsKeyboardVisible(true);

    // Keep the last non‑zero height globally to reuse for next dropdowns
    if (height > 0) {
      cachedKeyboardHeight = height;
    }
  }, []);

  const keyBoardDidHide = useCallback(() => {
    setKeyboardHeight(0);
    setIsKeyboardVisible(false);
    // Do NOT reset cachedKeyboardHeight here so other dropdowns can still reuse it
  }, []);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', keyBoardDidShow);
    const hideSubscription = Keyboard.addListener('keyboardDidHide', keyBoardDidHide);
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [keyBoardDidShow, keyBoardDidHide]);

  return { keyboardHeight, isKeyboardVisible };
};

