import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  isCard?: boolean;
};

export function ThemedView({ style, lightColor, darkColor, isCard, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    isCard ? 'cardBackground' : 'background'
  );
  const shadowColor = useThemeColor({ light: lightColor, dark: darkColor }, 'shadowColor');
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'borderColor');
  
  return <View style={[{ backgroundColor, shadowColor, borderColor }, style]} {...otherProps} />;
}