import { createMuiTheme } from '@material-ui/core';

const themeLight = createMuiTheme({
  palette: {
    background: {
      default: '#f6f6f6',
    },
    primary: {
      main: '#2271b3',
    },
    error: {
      main: '#f83245',
    },
    backgroundColor: {
      main: '#BDBDBD',
    },
    backgroundButonsColor: {
      main: '#ffffff',
    },
  },
});

export default themeLight;
