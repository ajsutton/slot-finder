<template>
    <v-card flat>
        <v-toolbar flat>
            <v-row>
                <v-col cols=12 sm=12 md=3>
                    <v-select label="Network" v-model="config" :items="networks" item-text="name" item-value="config"></v-select>
                </v-col>
            </v-row>
        </v-toolbar>
    
        <v-tabs v-model="tabs" centered>
            <v-tab href="#slot-finder" left>Slots</v-tab>
            <v-tab href="#upgrade-scheduler" left>Upgrade Scheduler</v-tab>
            <v-tab-item value="slot-finder">
                <slot-finder :config="config"></slot-finder>
            </v-tab-item>
            <v-tab-item value="upgrade-scheduler">
                <upgrade-scheduler :config="config"></upgrade-scheduler>
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>


<script>
  import SlotFinder from './SlotFinder';
  import UpgradeScheduler from './UpgradeScheduler';

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
        { name: "Holesky", config: { ...MainNetConfig, genesisTime: 1695902400 } },
        { name: "Goerli", config: { ...MainNetConfig, genesisTime: 1616508000 } },
        { name: "Sepolia", config: { ...MainNetConfig, genesisTime: 1655733600 } },
        { name: "Gnosis", config: GnosisConfig },
        { name: "Chiado", config: { ...GnosisConfig, genesisTime: 1665396300 } }
      ],
      config: MainNetConfig,
      tabs: null,
    }),

    components: {
        SlotFinder,
        UpgradeScheduler,
    },
  }
</script>

        UpgradeScheduler
