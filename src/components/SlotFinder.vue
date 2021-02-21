<template>
  <v-container>
    <v-row>
      <v-col cols=12 sm=12 md=3>
        <v-select label="Network" v-model="genesisTime" :items="networks" item-text="name" item-value="genesisTime"></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols=12 sm=6 md=3>
        <v-text-field type="number" pattern="\d*" label="Slot" v-model="slot"></v-text-field>
      </v-col>
      <v-col cols=12 sm=6 md=3>
        <v-text-field readonly label="Time (UTC)" v-model="slotTimeUTC"></v-text-field>
      </v-col>
      <v-col cols=12 sm=6 md=3>
        <v-text-field readonly label="Time (Local)" v-model="slotTimeLocal"></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  const MainNetGenesisTime = 1606824023;
  const SecondsPerSlot = 12;
  export default {
    name: 'SlotFinder',

    data: () => ({
      networks: [
        { name: "MainNet", genesisTime: MainNetGenesisTime },
        { name: "Pyrmont", genesisTime: 1605700807 },
      ],
      genesisTime: MainNetGenesisTime,
      slot: 0
    }),

    computed: {
      slotTime() {
        const secondsTimestamp = this.genesisTime + (this.slot * SecondsPerSlot);
        return new Date(secondsTimestamp * 1000);
      },
      slotTimeUTC() {
        return this.slotTime.toLocaleString(undefined, {timeZone: "UTC"});
      },
      slotTimeLocal() {
        return this.slotTime.toLocaleString();
      }
    }
  }
</script>
