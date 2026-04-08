import type { StyleProp, ViewStyle } from 'react-native';

export const getWidth = (dropdownStyle: StyleProp<ViewStyle> | undefined): number | undefined => {
  if (dropdownStyle && typeof dropdownStyle === 'object' && 'width' in dropdownStyle) {
    return dropdownStyle.width as number;
  }
  return 0;
};