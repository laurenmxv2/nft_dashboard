import { createTheme, responsiveFontSizes } from '@mui/material/styles'

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1500,
      xxl: 1800,
    },
  },
  typography: {
    fontFamily: 'CircularStd',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: '100vh',
        },
      },
    },
  },
})

theme = responsiveFontSizes(theme)

export default theme
