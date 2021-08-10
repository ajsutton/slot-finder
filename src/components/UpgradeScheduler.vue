<template>
  <v-container>
    <v-row>
        <v-col
        cols="12"
        sm="6"
        md="4"
        >
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
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <th>Epoch</th>
                        <th>Start Slot</th>
                        <th>UTC</th>
                        <th>New York</th>
                        <th>Brisbane</th>
                        <th>Local Time</th>
                    </thead>
                    <tbody>
                        <tr :key="row.epoch" v-for="row in rows">
                            <td :class="roundNumberBackground(row.epoch)">{{row.epoch}}</td>
                            <td :class="roundNumberBackground(row.slot)">{{row.slot}}</td>
                            <td :class="timeBackground(row.slotTime, 'UTC')">{{inTimeZone(row.slotTime, "UTC")}}</td>
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
    const SecondsPerSlot = 12;
    const SlotsPerEpoch = 32;
    export default {
        data: () => ({
            date: new Date(Date.now()).toISOString().substr(0, 10),
            dateMenu: false,
        }),
        props: {
            genesisTime: Number,
        },
        computed: {
            rows() {
                const dayStartTimestamp = new Date(this.date).getTime() / 1000;
                const dayStartOffset = dayStartTimestamp - this.genesisTime;
                const dayStartEpoch = Math.floor(dayStartOffset / SecondsPerSlot / SlotsPerEpoch);
                const rows = [];
                for (var i = -112; i <= 225; i++) {
                    const epoch = dayStartEpoch + i;
                    const slot = epoch * SlotsPerEpoch;
                    const slotTime = this.slotTime(slot);
                    rows.push({epoch, slot, slotTime, utc: this.asUTC(slotTime), local: this.asLocalTime(slotTime),
                        newYork: this.inTimeZone(slotTime, "America/New_York"),
                        brisbane: this.inTimeZone(slotTime, "Australia/Brisbane"),
                    });
                }
                return rows;
            }
        },
        methods: {
            slotTime(slot) {
                const secondsTimestamp = this.genesisTime + (slot * SecondsPerSlot);
                return new Date(secondsTimestamp * 1000);
            },
            asUTC(slotTime) {
                return slotTime.toLocaleString(undefined, {timeZone: "UTC"});
            },
            inTimeZone(slotTime, timeZone) {
                return slotTime.toLocaleString(undefined, {timeZone});
            },
            asLocalTime(slotTime) {
                return slotTime.toLocaleString();
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
                const str = time.toLocaleString(undefined, {timeZone});
                const date = new Date(Date.parse(str));
                const hour = date.getHours();
                if (hour >= 8 && hour < 17) {
                    return "green lighten-1";
                } else if (hour > 7 && hour < 22) {
                    return "green lighten-2";
                } else if (hour > 5 && hour < 23) {
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