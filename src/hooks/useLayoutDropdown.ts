import { useState, useMemo, useEffect, useCallback } from 'react';
import { I18nManager, Dimensions, Platform, StatusBar } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { getDropdownHeight } from '../helpers/getDropdownHeight';
import { getCachedKeyboardHeight, useKeyboardHeight } from './useKeyboardHeight';
import { getWidth } from '../helpers/getWidth';
import { getRight } from '../helpers/getRight';
import { getLeft } from '../helpers/getLeft';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const { height: screenHeight } = Dimensions.get('window');
const DROPDOWN_MAX_HEIGHT = screenHeight * 0.4;

interface ButtonLayout {
  w: number;
  h: number;
  px: number;
  py: number;
}

export const useLayoutDropdown = (
  dropdownStyle: StyleProp<ViewStyle> | undefined,
  dropdownPositionMode: 'default' | 'bottom' = 'default',
  keyboardHeightDefault?: number,
) => {
  const { keyboardHeight: keyboardHeightHook, isKeyboardVisible } = useKeyboardHeight();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [buttonLayout, setButtonLayout] = useState<ButtonLayout | null>(null);
  const [isFocusedSearchInput, setIsFocusedSearchInput] = useState(false);
  const [defaultModeStyle, setDefaultModeStyle] = useState<Partial<ViewStyle> | null>(null);

  const translateYKeyboardBottom = useSharedValue(0);
  const translateYKeyboardDefault = useSharedValue(0);
  const defaultTopSV = useSharedValue<number>(0);
  const defaultBottomSV = useSharedValue<number>(0);

  const isKeyboardOpened = useMemo(() => {
    const isIos = Platform.OS === 'ios';
    const isAndroid = Platform.OS === 'android';
    return (isIos && isFocusedSearchInput) || (isAndroid && isKeyboardVisible);
  }, [isFocusedSearchInput, isKeyboardVisible]);

  const keyboardHeight = useMemo(() => {
    if (!isKeyboardOpened) {
      return 0;
    }
    return (
      (keyboardHeightDefault || getCachedKeyboardHeight() || keyboardHeightHook) 
      +
      (Platform.select({
        ios: 0,
        android: StatusBar.currentHeight ?? 0,
        default: 0,
      }) as number)
    );
  }, [keyboardHeightHook, keyboardHeightDefault, isKeyboardOpened]);

  const dropdownHeight = useMemo<number>(
    () => getDropdownHeight(dropdownStyle, DROPDOWN_MAX_HEIGHT),
    [dropdownStyle]
  );

  useEffect(() => {
    if (dropdownPositionMode !== 'bottom') return;
    const toValue = isKeyboardOpened ? -keyboardHeight : 0;
    translateYKeyboardBottom.value = withTiming(toValue, {
      duration: 220,
      easing: Easing.out(Easing.cubic),
    });
  }, [
    dropdownPositionMode,
    isKeyboardOpened,
    keyboardHeight,
    translateYKeyboardBottom,
  ]);

  useEffect(() => {
    if (dropdownPositionMode !== 'default') return;
    if (!isKeyboardOpened || keyboardHeight <= 0) {
      translateYKeyboardDefault.value = withTiming(0, {
        duration: 180,
        easing: Easing.out(Easing.cubic),
      });
      return;
    }

    // Goal: keep dropdown fully above keyboard with minimal movement.
    // We only translate the dropdown (do not mutate top/bottom) for smoothness.
    const baseTop = defaultTopSV.value;
    const baseBottom = defaultBottomSV.value;

    let currentTop = baseTop;
    if (!Number.isFinite(currentTop) || currentTop === 0) {
      // If positioned by bottom, convert to top-space.
      currentTop = Number.isFinite(baseBottom)
        ? screenHeight - (baseBottom + dropdownHeight)
        : 0;
    }

    const availableBottom = screenHeight - keyboardHeight;
    const overlap = Math.max(0, currentTop + dropdownHeight - availableBottom);

    translateYKeyboardDefault.value = withTiming(-overlap, {
      duration: 220,
      easing: Easing.out(Easing.cubic),
    });
  }, [
    dropdownPositionMode,
    isKeyboardOpened,
    keyboardHeight,
    dropdownHeight,
    defaultTopSV,
    defaultBottomSV,
    translateYKeyboardDefault,
  ]);

  const calculateDefaultModeStyle = (
    w: number,
    h: number,
    px: number,
    py: number,
    calculatedDropdownHeight: number,
    currentDropdownStyle: StyleProp<ViewStyle> | undefined,
  ): { style: Partial<ViewStyle>; position: 'above' | 'below' } => {
    const width =
      getWidth(currentDropdownStyle) || w;

    const right =
      getRight(currentDropdownStyle) || px;
    const left =
      getLeft(currentDropdownStyle) || px;

    const horizontalPosition = I18nManager.isRTL ? { right } : { left };

    const fitsBelow = py + h + calculatedDropdownHeight <= screenHeight;

    if (fitsBelow) {
      return {
        position: 'below',
        style: {
          top: py + h,
          width,
          ...horizontalPosition,
        },
      };
    }

    return {
      position: 'above',
      style: {
          top: py - calculatedDropdownHeight,
        width,
        ...horizontalPosition,
      },
    };
  }

  const getBottomModeStyle = useCallback(
    (currentDropdownStyle: StyleProp<ViewStyle> | undefined): Partial<ViewStyle> => {
      const width = getWidth(currentDropdownStyle) || '100%';
      return {
        bottom: 0,
        left: 0,
        right: 0,
        width,
      };
    },
    []
  );

  const onDropdownButtonLayout = useCallback((w: number, h: number, px: number, py: number) => {
    setButtonLayout({ w, h, px, py });

    if (dropdownPositionMode === 'default') {
      const { style } = calculateDefaultModeStyle(
        w,
        h,
        px,
        py,
        dropdownHeight,
        dropdownStyle,
      );
      setDefaultModeStyle(style);
      defaultTopSV.value = typeof style.top === 'number' ? style.top : 0;
      defaultBottomSV.value = typeof style.bottom === 'number' ? style.bottom : 0;
      return
    }
  }, [defaultBottomSV, defaultTopSV, dropdownHeight, dropdownPositionMode, dropdownStyle]);

  const keyboardAdjustmentForBottomMode = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateYKeyboardBottom.value }],
    };
  });

  const keyboardAdjustmentForDefaultMode = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateYKeyboardDefault.value }],
    };
  });


  const dropDownStyleByMode = useMemo<StyleProp<ViewStyle>>(() => {
    const baseStyle = {
      ...(dropdownStyle && typeof dropdownStyle === 'object' ? dropdownStyle : {}),
      overflow: 'hidden',
      height: dropdownHeight,
      position: 'absolute',
      zIndex: 9999,
    };

    if (dropdownPositionMode === 'bottom') {
      return {
        ...baseStyle,
        ...getBottomModeStyle(dropdownStyle),
      } as ViewStyle;
    }

    return {
      ...baseStyle,
      ...(defaultModeStyle ?? {}),
    } as ViewStyle;
  }, [
    dropdownStyle,
    dropdownHeight,
    defaultModeStyle,
    dropdownPositionMode,
    getBottomModeStyle,
  ]);

  const onRequestClose = () => {
    setIsVisible(false);
    setIsFocusedSearchInput(false);
  };

  return {
    isVisible,
    setIsVisible,
    buttonLayout,
    onDropdownButtonLayout,
    dropDownStyleByMode,
    onRequestClose,

    isKeyboardOpened,
    setIsFocusedSearchInput,

    keyboardAdjustmentForBottomMode,
    keyboardAdjustmentForDefaultMode
  };
};
