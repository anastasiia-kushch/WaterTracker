import { lightColors, darkColors } from './colorsTheme';
import { ThemeType } from '../store/themeSlice';

export const getColors = (theme: ThemeType) => {
  return theme === 'light' ? lightColors : darkColors;
};

// Default export для обратной совместимости
const Colors = lightColors;

export default Colors;
