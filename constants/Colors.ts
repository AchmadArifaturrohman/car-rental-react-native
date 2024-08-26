/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#A43333';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    placeholder: '#687076',
    color: '#000000',
    shadowColor: "rgba(0, 0, 0, 0.5)",
    borderColor: "#000000",
    tmminLogoLight: require('@/assets/images/tmmin-logo-light.png'),
    cardBackground: '#EEEEEE',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    placeholder: '#687076',
    color: '#ffffff',
    shadowColor: "rgba(255, 255, 255, 0.5)",
    borderColor: "#ffffff",
    tmminLogoDark: require('@/assets/images/tmmin-logo-dark.png'),
    cardBackground: '#151414',
  },
};