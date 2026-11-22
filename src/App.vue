<template>
  <v-app>
    <v-app-bar
      color="primary"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Ethereum Logo"
          class="shrink mr-2"
          fit="contain"
          :src="logo"
          transition="scale-transition"
          width="150"
        />
      </div>
    </v-app-bar>

    <v-main>

      <v-parallax
              class="text-white"
              :src="hero"
              height="250"
          >
          <v-container class="fill-height d-flex align-center flex-wrap">
              <v-row align="center">
                  <v-col>
                    <h1 class="text-headline-large font-weight-thin mb-4">
                      Slot Finder
                    </h1>
                    <h4 class="text-title-medium">
                      Does anybody really know what slot it is anyway?
                    </h4>
                  </v-col>
              </v-row>
          </v-container>
      </v-parallax>
      
      <v-container>
        <v-row>
          <v-col>
          <MainNav/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import MainNav from './components/MainNav.vue';
import logo from './assets/logo.png';
import hero from './assets/hero.png';

export default {
  name: 'App',

  components: {
    MainNav,
  },

  data: () => ({
    logo,
    hero,
  }),
};
</script>

<style>
h1, h2, h4 { margin: 0; }
</style>
