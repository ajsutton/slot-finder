import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#161C2E',
            secondary: '#63688C',
            anchor: '#EDEFF0',
          },
        },
      },
});
