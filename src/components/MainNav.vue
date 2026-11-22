<template>
    <v-card flat>
        <v-row class="pa-4">
            <v-col cols="12" sm="6" md="3">
                <v-select label="Network" v-model="config" :items="networks" item-title="name" item-value="config"></v-select>
            </v-col>
        </v-row>
        <v-tabs v-model="tabs" align-tabs="center">
            <v-tab value="slot-finder">Slots</v-tab>
            <v-tab value="upgrade-scheduler">Upgrade Scheduler</v-tab>
        </v-tabs>
        <v-tabs-window v-model="tabs">
            <v-tabs-window-item value="slot-finder">
                <slot-finder :config="config"></slot-finder>
            </v-tabs-window-item>
            <v-tabs-window-item value="upgrade-scheduler">
                <upgrade-scheduler :config="config"></upgrade-scheduler>
            </v-tabs-window-item>
        </v-tabs-window>
    </v-card>
</template>


<script>
  import SlotFinder from './SlotFinder.vue';
  import UpgradeScheduler from './UpgradeScheduler.vue';

  const MainNetConfig = {
    genesisTime: 1606824023,
    secondsPerSlot: 12,
    slotsPerEpoch: 32
  }

  const GnosisConfig = {
    genesisTime: 1638993340,
    secondsPerSlot: 5,
    slotsPerEpoch: 16
  }

  export default {
    name: 'MainNav',

    data: () => ({
      networks: [
        { name: "MainNet", config: MainNetConfig },
        { name: "Hoodi", config: { ...MainNetConfig, genesisTime: 1742213400 } },
        { name: "Sepolia", config: { ...MainNetConfig, genesisTime: 1655733600 } },
        { name: "Holesky", config: { ...MainNetConfig, genesisTime: 1695902400 } },
        { name: "Goerli", config: { ...MainNetConfig, genesisTime: 1616508000 } },
        { name: "Gnosis", config: GnosisConfig },
        { name: "Chiado", config: { ...GnosisConfig, genesisTime: 1665396300 } }
      ],
      config: MainNetConfig,
      tabs: 'slot-finder',
    }),

    components: {
        SlotFinder,
        UpgradeScheduler,
    },
  }
</script>
