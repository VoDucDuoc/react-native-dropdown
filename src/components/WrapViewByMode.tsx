import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
} from 'react-native-reanimated';
import type { AnimatedStyleHandle } from 'react-native-reanimated/lib/typescript/hook/commonTypes';

interface WrapViewByModeProps {
  children: React.ReactNode;
  mode: 'default' | 'bottom';
  keyboardAdjustmentForBottomMode: AnimatedStyleHandle;
  keyboardAdjustmentForDefaultMode: AnimatedStyleHandle;
  style: StyleProp<ViewStyle>;
}

const WrapViewByMode = ({
  children,
  mode,
  keyboardAdjustmentForBottomMode,
  keyboardAdjustmentForDefaultMode,
  style,
}: WrapViewByModeProps) => {
  if (mode === 'bottom') {
    return (
      <Animated.View
        entering={FadeInDown}
        style={[
          {
            bottom: 0,
          },
          style,
          keyboardAdjustmentForBottomMode,
        ]}
      >
        {children}
      </Animated.View>
    );
  }
  return (
    <Animated.View
      entering={FadeIn.duration(160)}
      style={[
        style,
        keyboardAdjustmentForDefaultMode,
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default WrapViewByMode;
