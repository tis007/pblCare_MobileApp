import { Platform } from 'react-native';

const COLORS = {
  primary: "#4C9691",
  secondary: "#A6864A",
  tertiary: "#A6864A",

  gray: "#696969",
  gray1: "#696969",
  gray2: "#A2A1A1",
  gray3: "#F1F1F1",

  red: "#CF2121",

  orange: "#F7AC16",
  orange1: "#F7AC16",
  orange2: "#FFD5A2",

  white: "#F3F4F8",
  lightWhite: "#FAFAFC",
  black: "#000000",
};

const FONT = {
  regular: Platform.OS === 'android' ? 'sans-serif' : 'System',
  medium: Platform.OS === 'android' ? 'sans-serif-medium' : 'System',
  bold: Platform.OS === 'android' ? 'sans-serif-medium' : 'System',
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
