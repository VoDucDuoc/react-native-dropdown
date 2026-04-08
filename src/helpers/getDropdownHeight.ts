import type { StyleProp, ViewStyle } from 'react-native';

export const getDropdownHeight = (dropdownStyle: StyleProp<ViewStyle> | undefined, maxHeight: number): number => {
  if (dropdownStyle && typeof dropdownStyle === 'object' && 'height' in dropdownStyle && typeof dropdownStyle.height === 'number') {
    return dropdownStyle.height;
  }
  return maxHeight;
};

