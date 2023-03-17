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
      <v-col cols=12 sm=6 md=3>
        <v-text-field readonly label="Unix Timestamp" v-model="slotTimestamp"></v-text-field>
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
  const dayjs = require('dayjs')
  const utc = require('dayjs/plugin/utc')
  const timezone = require('dayjs/plugin/timezone')
  const customParseFormat = require('dayjs/plugin/customParseFormat')

  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.extend(customParseFormat)

  const dateFormat = "YYYY-MM-DD HH:mm:ss Z"

  function formatDate(date, tz) {
    date = dayjs(date)
    if (tz != undefined) {
      date = date.tz(tz)
    }
    return date.format(dateFormat)
  }

  export default {
    name: 'SlotFinder',

    props: {
      config: Object
    },
    data: () => ({
      slot: 0,
      utcInput: formatDate(dayjs.utc())
    }),

    computed: {
      slotTime() {
        const secondsTimestamp = this.config.genesisTime + (this.slot * this.config.secondsPerSlot);
        return new Date(secondsTimestamp * 1000);
      },
      slotTimeUTC() {
        return formatDate(this.slotTime, "UTC");
      },
      slotTimeLocal() {
        return formatDate(this.slotTime);
      },
      slotFromUtc() {
        const date = dayjs.utc(this.utcInput, dateFormat);
        return Math.floor((date.valueOf() / 1000 - this.config.genesisTime) / this.config.secondsPerSlot);
      },
      slotTimestamp() {
        return this.slotTime.getTime() / 1000;
      }
    }
  }
</script>
