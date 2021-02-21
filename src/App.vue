<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Ethereum Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/logo.png')"
          transition="scale-transition"
          width="150"
        />
      </div>
    </v-app-bar>

    <v-main>

      <v-parallax
              :src="require('./assets/hero.png')"
              height="250"
          >
          <v-container fill-width>
              <v-row align-center>
                  <v-col>
                    <h1 class="display-1 font-weight-thin mb-4">
                      Slot Finder
                    </h1>
                    <h4 class="subheading">
                      Does anybody really know what slot it is anyway?
                    </h4>
                  </v-col>
              </v-row>
          </v-container>
      </v-parallax>
      
      <SlotFinder/>
    </v-main>
  </v-app>
</template>

<script>
import SlotFinder from './components/SlotFinder';

export default {
  name: 'App',

  components: {
    SlotFinder,
  },

  data: () => ({
    //
  }),
};
</script>
