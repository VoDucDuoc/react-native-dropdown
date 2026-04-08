import type { StyleProp, ViewStyle } from 'react-native';

export const getLeft = (dropdownStyle: StyleProp<ViewStyle> | undefined): number | undefined => {
  if (dropdownStyle && typeof dropdownStyle === 'object' && 'left' in dropdownStyle) {
    return dropdownStyle.left as number;
  }
  return undefined;
};