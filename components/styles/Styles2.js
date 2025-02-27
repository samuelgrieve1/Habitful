// Styles.js
import { useTheme } from './ThemeContext';

export const useThemeStyles = () => {
  const { isDarkMode } = useTheme();

  // Colors that change with theme
  const colors = {
    background: isDarkMode ? '#121212' : '#FFFFFF',
    surface: isDarkMode ? '#1E1E1E' : '#F5F5F5',
    primary: '#3498db', // Same in both themes
    secondary: isDarkMode ? '#BB86FC' : '#03DAC6',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    subtext: isDarkMode ? '#BBBBBB' : '#555555',
    border: isDarkMode ? '#2C2C2C' : '#E0E0E0',
    card: isDarkMode ? '#252525' : '#FFFFFF',
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
  };

  // Typography
  const typography = {
    fontFamily: 'System',
    h1: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    h2: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    body: {
      fontSize: 16,
      color: colors.text,
    },
    caption: {
      fontSize: 14,
      color: colors.subtext,
    },
  };

  // Spacing
  const spacing = {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  };

  // Common styles
  const common = {
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: spacing.m,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: spacing.m,
      shadowColor: colors.text,
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    input: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 4,
      padding: spacing.m,
      color: colors.text,
    },
    shadow: {
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
  };

  return {
    colors,
    typography,
    spacing,
    common,
  };
};