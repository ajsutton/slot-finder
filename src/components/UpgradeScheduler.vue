<template>
  <v-container>
    <v-row>
        <v-col cols="12" sm="6" md="4">
            <v-menu
                v-model="dateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="date"
                    label="Upgrade Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker
                v-model="date"
                @input="dateMenu = false"
                ></v-date-picker>
            </v-menu>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="6" md="6">
            <v-checkbox v-model="boundaryOnly" label="Show only accumulator boundaries"></v-checkbox>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-simple-table fixed-header height="500px">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th>Epoch</th>
                            <th>Start Slot</th>
                            <th>UTC ({{tzOffset("UTC")}})</th>
                            <th>Moscow ({{tzOffset("Europe/Moscow")}})</th>
                            <th>Los Angeles ({{tzOffset("America/Los_Angeles")}})</th>
                            <th>New York ({{tzOffset("America/New_York")}})</th>
                            <th>Brisbane  ({{tzOffset("Australia/Brisbane")}})</th>
                            <th>Local Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :key="row.epoch" v-for="row in rows">
                            <td :class="roundNumberBackground(row.epoch)">{{row.epoch}}</td>
                            <td :class="roundNumberBackground(row.slot)">{{row.slot}}</td>
                            <td :class="timeBackground(row.slotTime, 'UTC')">{{inTimeZone(row.slotTime, "UTC")}}</td>
                            <td :class="timeBackground(row.slotTime, 'Europe/Moscow')">{{inTimeZone(row.slotTime, "Europe/Moscow")}}</td>
                            <td :class="timeBackground(row.slotTime, 'America/Los_Angeles')">{{inTimeZone(row.slotTime, "America/Los_Angeles")}}</td>
                            <td :class="timeBackground(row.slotTime, 'America/New_York')">{{inTimeZone(row.slotTime, "America/New_York")}}</td>
                            <td :class="timeBackground(row.slotTime, 'Australia/Brisbane')">{{inTimeZone(row.slotTime, "Australia/Brisbane")}}</td>
                            <td :class="timeBackground(row.slotTime, undefined)">{{asLocalTime(row.slotTime)}}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
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

    const dateFormat = "YYYY-MM-DD HH:mm:ss"

    export default {
        data: () => ({
            date: new Date(Date.now()).toISOString().substr(0, 10),
            dateMenu: false,
            boundaryOnly: false,
        }),
        props: {
            config: Object,
        },
        computed: {
            rows() {
                const dayStartTimestamp = new Date(this.date).getTime() / 1000;
                const dayStartOffset = dayStartTimestamp - this.config.genesisTime;
                const dayStartEpoch = Math.floor(dayStartOffset / this.config.secondsPerSlot / this.config.slotsPerEpoch);
                const rows = [];
                for (var i = -112; i <= 225; i++) {
                    const epoch = dayStartEpoch + i;
                    const slot = epoch * this.config.slotsPerEpoch;
                    const slotTime = this.slotTime(slot);
                    const isHistoricalRootBoundary = (slot % 8192 == 0)
                    if (isHistoricalRootBoundary || !this.boundaryOnly) {
                        rows.push({epoch, slot, slotTime, isHistoricalRootBoundary});
                    }
                }
                return rows;
            }
        },
        methods: {
            slotTime(slot) {
                const secondsTimestamp = this.config.genesisTime + (slot * this.config.secondsPerSlot);
                return dayjs.utc(secondsTimestamp * 1000);
            },
            asUTC(slotTime) {
                return slotTime.tz("UTC").format(dateFormat);
            },
            inTimeZone(slotTime, timeZone) {
                return slotTime.tz(timeZone).format(dateFormat, timeZone);
            },
            asLocalTime(slotTime) {
                return slotTime.tz(dayjs.tz.guess()).format(dateFormat);
            },
            tzOffset(timeZone) {
                return dayjs(this.date).tz(timeZone).format("Z")
            },

            roundNumberBackground(value) {
                const text = String(value);
                if (text.endsWith("00")) {
                    return "green lighten-1";
                } else if (text.endsWith("0")) {
                    return "green lighten-3";
                } else {
                    return ""
                }
            },
            timeBackground(time, timeZone) {
                const hour = time.tz(timeZone).hour();
                if (hour >= 8 && hour < 17) {
                    return "green lighten-1";
                } else if (hour > 7 && hour < 21) {
                    return "green lighten-2";
                } else if (hour > 6 && hour < 22) {
                    return "green lighten-4";
                } else if (hour >= 5 && hour < 24) {
                    return "yellow lighten-4";
                } else if (hour < 5) {
                    return "red lighten-4";
                }
                return "";
            }
        },
    }
</script>