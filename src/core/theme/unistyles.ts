import { StyleSheet } from 'react-native-unistyles';

// Définissez vos thèmes (clair / sombre) et vos couleurs personnalisées
const appThemes = {
  light: {
    colors: {
      primary: '#10B981',      // Vert principal
      background: '#F9FAFB',   // Fond clair
      card: '#FFFFFF',         // Fond des cartes
      text: '#1F2937',         // Texte principal
      textMuted: '#6B7280',    // Texte secondaire
      border: '#E5E7EB',       // Bordures
    },
  },
  dark: {
    colors: {
      primary: '#34D399',
      background: '#111827',
      card: '#1F2937',
      text: '#F9FAFB',
      textMuted: '#9CA3AF',
      border: '#374151',
    },
  },
};

// Configuration globale d'Unistyles
StyleSheet.configure({
  themes: appThemes,
  settings: {
    initialTheme: 'light', // Vous pourrez basculer en 'dark' dynamiquement
  },
});