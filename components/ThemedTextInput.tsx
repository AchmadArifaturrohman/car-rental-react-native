import { TextInput, type TextInputProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextInputProps) {
const placeholderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'placeholder');
const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  return (
    <TextInput
      style={[
        styles.input,
        style,
        { color: textColor }
      ]}
      placeholderTextColor={placeholderColor}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    lineHeight: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontFamily: 'PoppinsRegular'
  },
});
