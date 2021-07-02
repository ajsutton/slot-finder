<template>
  <v-container>
    <v-row>
      <v-col cols=12 sm=12 md=3>
        <v-select label="Network" v-model="genesisTime" :items="networks" item-text="name" item-value="genesisTime"></v-select>
      </v-col>
    </v-row>
    <v-row>
      <h2>Slot to Time</h2>
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

    <v-row>
      <h2>Time to Slot</h2>
    </v-row>
    <v-row>
      <v-col cols=12 sm=6 md=3>
        <v-text-field label="Time" v-model="utcInput"></v-text-field>
      </v-col>
      <v-col cols=12 sm=6 md=3>
        <v-text-field readonly type="number" pattern="\d*" label="Slot" v-model="slotFromUtc"></v-text-field>
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
        { name: "Prater", genesisTime: 1616508000 },
      ],
      genesisTime: MainNetGenesisTime,
      slot: 0,
      utcInput: new Date().toISOString()
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
      },
      slotFromUtc() {
        const date = new Date(this.utcInput);
        return Math.floor((date.getTime() / 1000 - this.genesisTime) / SecondsPerSlot);
      }
    }
  }
</script>
