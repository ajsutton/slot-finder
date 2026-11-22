import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#161C2E',
          secondary: '#63688C',
          anchor: '#EDEFF0',
        },
      },
    },
  },
})
