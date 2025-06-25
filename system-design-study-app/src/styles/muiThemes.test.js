import { lightTheme, darkTheme } from './muiThemes';
import tailwindConfig from '../../tailwind.config.js';

describe('MUI Themes', () => {
  const twTheme = tailwindConfig.theme.extend;

  describe('lightTheme', () => {
    it('should use the correct primary color', () => {
      expect(lightTheme.palette.primary.main).toBe(twTheme.colors.primary.DEFAULT);
    });

    it('should use the correct secondary color', () => {
      expect(lightTheme.palette.secondary.main).toBe(twTheme.colors.secondary.DEFAULT);
    });

    it('should use the correct heading font', () => {
      expect(lightTheme.typography.h1.fontFamily).toBe(twTheme.fontFamily.serif.join(','));
    });

    it('should use the correct body font', () => {
      expect(lightTheme.typography.body1.fontFamily).toBe(twTheme.fontFamily.sans.join(','));
    });
  });

  describe('darkTheme', () => {
    it('should use the correct primary color for dark mode', () => {
      // Example: Using light variant for dark mode primary, as per current muiThemes.js
      expect(darkTheme.palette.primary.main).toBe(twTheme.colors.primary.light);
    });

    it('should use the correct secondary color for dark mode', () => {
      // Example: Using light variant for dark mode secondary
      expect(darkTheme.palette.secondary.main).toBe(twTheme.colors.secondary.light);
    });

    it('should use the correct heading font for dark mode', () => {
      expect(darkTheme.typography.h1.fontFamily).toBe(twTheme.fontFamily.serif.join(','));
    });

    it('should use the correct body font for dark mode', () => {
      expect(darkTheme.typography.body1.fontFamily).toBe(twTheme.fontFamily.sans.join(','));
    });

    it('should have dark mode enabled', () => {
      expect(darkTheme.palette.mode).toBe('dark');
    });
  });
});
