<template>
    <v-card flat>
        <v-toolbar flat>
            <v-row>
                <v-col cols=12 sm=12 md=3>
                    <v-select label="Network" v-model="genesisTime" :items="networks" item-text="name" item-value="genesisTime"></v-select>
                </v-col>
            </v-row>
        </v-toolbar>
    
        <v-tabs v-model="tabs" centered>
            <v-tab href="#slot-finder" left>Slots</v-tab>
            <v-tab href="#upgrade-scheduler" left>Upgrade Scheduler</v-tab>
            <v-tab-item value="slot-finder">
                <slot-finder :genesisTime="genesisTime"></slot-finder>
            </v-tab-item>
            <v-tab-item value="upgrade-scheduler">
                <upgrade-scheduler :genesisTime="genesisTime"></upgrade-scheduler>
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>


<script>
  import SlotFinder from './SlotFinder';
  import UpgradeScheduler from './UpgradeScheduler';

  const MainNetGenesisTime = 1606824023;
  export default {
    name: 'MainNav',

    data: () => ({
      networks: [
        { name: "MainNet", genesisTime: MainNetGenesisTime },
        { name: "Pyrmont", genesisTime: 1605700807 },
        { name: "Prater", genesisTime: 1616508000 },
        { name: "Görli Shadow Fork 4", genesisTime: 1650031500},
      ],
      genesisTime: MainNetGenesisTime,
      tabs: null,
    }),

    components: {
        SlotFinder,
        UpgradeScheduler,
    },
  }
</script>

        UpgradeScheduler
