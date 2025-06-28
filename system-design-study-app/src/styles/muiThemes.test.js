import { lightTheme, darkTheme } from './muiThemes';

// Define fallback values used in muiThemes.js for testing purposes
const FALLBACK_ACCENT_PRIMARY = '#4FD1C5';
const FALLBACK_SECONDARY_LIGHT = '#8b5cf6';
const FALLBACK_SECONDARY_DARK = '#8b5cf6';
const FALLBACK_TEXT_SECONDARY_LIGHT = '#4a5568'; // Used as FALLBACK_SECONDARY_ACCENT_LIGHT
const FALLBACK_TEXT_SECONDARY_DARK = '#a0aec0';   // Used as FALLBACK_SECONDARY_ACCENT_DARK

describe('MUI Themes', () => {
  describe('lightTheme', () => {
    it('should use the correct primary color fallback', () => {
      expect(lightTheme.palette.primary.main).toBe(FALLBACK_ACCENT_PRIMARY);
    });

    it('should use the correct secondary color fallback', () => {
      expect(lightTheme.palette.secondary.main).toBe(FALLBACK_SECONDARY_LIGHT);
    });

    it('should use the correct heading font variable', () => {
      expect(lightTheme.typography.fontFamily).toBe('Roboto, sans-serif');
    });

    it('should use the correct body font variable', () => {
      // Check a general typography setting if body1 is not explicitly set or inherits
      expect(lightTheme.typography.fontFamily).toBe('Roboto, sans-serif');
    });

    // Test for text and background fallbacks
    it('should use correct text primary fallback for light theme', () => {
      expect(lightTheme.palette.text.primary).toBe('#1a202c');
    });
    it('should use correct background default fallback for light theme', () => {
      expect(lightTheme.palette.background.default).toBe('#ffffff');
    });
  });

  describe('darkTheme', () => {
    it('should use the correct primary color fallback for dark mode', () => {
      expect(darkTheme.palette.primary.main).toBe(FALLBACK_ACCENT_PRIMARY);
    });

    it('should use the correct secondary color fallback for dark mode', () => {
      expect(darkTheme.palette.secondary.main).toBe(FALLBACK_SECONDARY_DARK);
    });

    it('should use the correct heading font variable for dark mode', () => {
      expect(darkTheme.typography.fontFamily).toBe('Roboto, sans-serif');
    });

    it('should use the correct body font variable for dark mode', () => {
      expect(darkTheme.typography.fontFamily).toBe('Roboto, sans-serif');
    });

    it('should have dark mode enabled', () => {
      expect(darkTheme.palette.mode).toBe('dark');
    });

    // Test for text and background fallbacks
    it('should use correct text primary fallback for dark theme', () => {
      expect(darkTheme.palette.text.primary).toBe('#edf2f7');
    });
    it('should use correct background default fallback for dark theme', () => {
      expect(darkTheme.palette.background.default).toBe('#1a202c');
    });
  });
});
