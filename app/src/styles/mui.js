import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// https://material-ui.com/customization/default-theme/
export const theme = createMuiTheme({
  palette: {
    type: 'light',
    background: {
      landing: '#0667d0',
      default: '#F9F9F9',
      // paper: '#050C11',
    },
    text: {
      primary: '#040404',
      // secondary: '#F5F5F5',
    },
    primary: {
      main: '#2699FB',
      // main: '#6C63FF',kj
      contrastText: '#fff',
    },
    // secondary: {
    //   main: '#F5F5F5',
    // },
  },
  typography: {
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    useNextVariants: true,
    fontSize: 14, // default is 14
    // Sizing with https://www.modularscale.com/?1&em&1.25
    h1: {
      fontSize: '3.815rem',
      fontWeight: 400,
    },
    h2: {
      fontSize: '3.052rem',
      fontWeight: 400,
    },
    h3: {
      fontSize: '2.441rem',
      fontWeight: 400,
    },
    h4: {
      fontSize: '1.953rem',
      lineHeight: 1.4,
      fontWeight: 400,
    },
    h5: {
      fontSize: '1.563rem',
      fontWeight: 400,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 400,
    },
    fontFamily: [
      'apple-system',
      'Exo',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  shape: {
    borderRadius: 1,
  },
  overrides: {
    MuiTypography: {
      gutterBottom: {
        marginBottom: '1rem', // default 0.35
      },
    },
    MuiButton: {
      contained: {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        borderRadius: '30px 30px 30px 30px',
      },
    },
  },
});

export default responsiveFontSizes(theme);
