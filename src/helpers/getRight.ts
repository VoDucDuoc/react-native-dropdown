import type { StyleProp, ViewStyle } from 'react-native';

export const getRight = (dropdownStyle: StyleProp<ViewStyle> | undefined): number | undefined => {
  if (dropdownStyle && typeof dropdownStyle === 'object' && 'right' in dropdownStyle) {
    return dropdownStyle.right as number;
  }
  return undefined;
};