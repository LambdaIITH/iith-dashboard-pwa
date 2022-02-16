import { createTheme } from '@material-ui/core/styles';

export const lightTheme = createTheme({
  palette: {
    primary: {
      light: '#c158dc',
      main: '#008080',
      dark: '#00CCCC',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#c158dc',
      main: '#008080',
      dark: '#00CCCC',
      contrastText: '#FFFFFF',
    },
    background: {},
    type: 'light',
  },
  typography: {
    fontFamily: [
      'Source Sans Pro',
      'Lato',
      'Raleway',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: {
      light: '#c158dc',
      main: '#008080',
      dark: '#006666',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#c158dc',
      main: '#008080',
      dark: '#006666',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#191919',
      paper: '#272727',
    },
    type: 'dark',
  },
  typography: {
    fontFamily: [
      'Source Sans Pro',
      'Lato',
      'Raleway',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
