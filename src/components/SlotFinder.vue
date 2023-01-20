<template>
  <v-container>
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
  export default {
    name: 'SlotFinder',

    props: {
      config: Object
    },
    data: () => ({
      slot: 0,
      utcInput: new Date().toISOString()
    }),

    computed: {
      slotTime() {
        const secondsTimestamp = this.config.genesisTime + (this.slot * this.config.secondsPerSlot);
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
        return Math.floor((date.getTime() / 1000 - this.config.genesisTime) / this.config.secondsPerSlot);
      }
    }
  }
</script>
