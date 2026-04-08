import React, { forwardRef } from 'react';
import { View, TextInput, StyleSheet, I18nManager } from 'react-native';
import type { StyleProp, ViewStyle, TextStyle } from 'react-native';

const voidFunction = () => {};

interface InputProps {
  searchViewWidth: number;
  inputStyle?: StyleProp<ViewStyle>;
  inputTextStyle?: StyleProp<TextStyle>;
  value?: string;
  valueColor?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  textAlign?: 'left' | 'right' | 'center';
  onChangeText?: (text: string) => void;
  onEndEditing?: () => void;
  onSubmitEditing?: () => void;
  renderLeft?: () => React.ReactNode;
  renderRight?: () => React.ReactNode;
  testID?: string;
  autoFocus?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Input = (
  {
    searchViewWidth,
    inputStyle,
    inputTextStyle,
    value,
    valueColor,
    placeholder,
    placeholderTextColor,
    textAlign,
    onChangeText,
    onEndEditing,
    onSubmitEditing,
    renderLeft,
    renderRight,
    testID,
    autoFocus,
    onFocus,
    onBlur,
  }: InputProps,
  ref: React.Ref<React.ElementRef<typeof TextInput>>,
) => {
  const defaults = {
    inputStyle: inputStyle,
    inputTextStyle: inputTextStyle,
    value: value ?? '',
    valueColor: valueColor ?? '#000000',
    placeholder: placeholder ?? '',
    placeholderTextColor: placeholderTextColor ?? '#CACACA',
    textAlign: textAlign || (I18nManager.isRTL ? 'right' : 'left'),
    onChangeText: onChangeText ?? voidFunction,
    onEndEditing: onEndEditing ?? voidFunction,
    onSubmitEditing: onSubmitEditing ?? voidFunction,
    renderLeft: renderLeft,
    renderRight: renderRight,
    testID: testID,
    autoFocus: autoFocus ?? false,
    onFocus: onFocus ?? voidFunction,
    onBlur: onBlur ?? voidFunction,
  };

  const onChangeTextValidator = (txt: string) => {
    if (txt.length == 1 && txt == ' ') {
      return;
    }
    if (txt.length > 1 && txt.slice(-2) == '  ') {
      return;
    }
    defaults.onChangeText(txt);
  };

  return (
    <View style={{...styles.searchViewStyle, ...{width: searchViewWidth}}}>
      <View
        style={{
          ...styles.defaultInputStyle,
          ...(defaults.inputStyle as object),
        }}>
        {defaults.renderLeft && <View style={styles.pressableLeft}>{defaults.renderLeft()}</View>}
        <TextInput
          testID={defaults.testID}
          ref={ref}
          value={defaults.value}
          placeholder={defaults.placeholder}
          placeholderTextColor={defaults.placeholderTextColor}
          textAlign={defaults.textAlign}
          onChangeText={onChangeTextValidator}
          onEndEditing={defaults.onEndEditing}
          onSubmitEditing={defaults.onSubmitEditing}
          //
          style={{...styles.inputField, color: defaults.valueColor, ...(defaults.inputTextStyle as object)}}
          returnKeyType={'done'}
          textContentType={'oneTimeCode'}
          allowFontScaling={false}
          autoComplete={'off'}
          autoCorrect={false}
          autoCapitalize={'none'}
          autoFocus={defaults.autoFocus}
          onFocus={defaults.onFocus}
          onBlur={defaults.onBlur}
        />
        {defaults.renderRight && <View style={styles.pressableRight}>{defaults.renderRight()}</View>}
      </View>
    </View>
  );
};

export default forwardRef<React.ElementRef<typeof TextInput>, InputProps>((props, ref) =>
  Input(props, ref),
);

const styles = StyleSheet.create({
  searchViewStyle: {
    height: 50,
    paddingHorizontal: 0,
  },
  defaultInputStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: '4%',
  },
  inputField: {
    flex: 1,
    height: '100%',
    backgroundColor: '#0000',
    textAlignVertical: 'center',
    paddingVertical: 0,
  },
  pressableLeft: {
    height: '100%',
    marginRight: '4%',
    justifyContent: 'center',
  },
  pressableRight: {
    height: '100%',
    marginLeft: '4%',
    justifyContent: 'center',
  },
});

