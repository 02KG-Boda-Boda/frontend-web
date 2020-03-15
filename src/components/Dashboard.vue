<template>
  <div style="padding:10px">
    <v-row>
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-forward</v-icon>
        </template>
      </v-breadcrumbs>
    </v-row>
    <v-row justify="space-between">
      <v-col cols="12" sm="6" md="4">
        <v-card
          class="mx-auto"
          max-width="300"
          max-height="150"
          to="/home/agents"
          :loading="count_agentsLoading"
          outline
        >
          <v-list-item>
            <v-icon color="teal lighten-2" size="120">mdi-account-group</v-icon>
            <v-list-item-content>
              <v-list-item-title class="headline" style="padding:5px">
                <pulse-loader :loading="count_agentsLoading" ></pulse-loader>
                {{count_agents}}
              </v-list-item-title>
              <v-divider></v-divider>
              <v-list-item-subtitle style="font-size:16px;padding:5px">Agents</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-card
          class="mx-auto"
          max-width="300"
          to="/home/bodabodas"
          :loading="count_ridersLoading"
          outline
        >
          <v-list-item>
            <v-icon color="lime darken-1" size="120">mdi-motorbike</v-icon>
            <v-list-item-content>
              <v-list-item-title class="headline" style="padding:5px">
                <pulse-loader :loading="count_ridersLoading" ></pulse-loader>
                {{count_riders}}
              </v-list-item-title>
              <v-divider></v-divider>
              <v-list-item-subtitle style="font-size:16px; padding:5px">Bodabodas</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-card
          class="mx-auto"
          max-width="300"
          to="/home/loans"
          :loading="count_loansLoading"
          outline
        >
          <v-list-item>
            <v-icon color="brown darken-2" size="120">mdi-cash-multiple</v-icon>
            <v-list-item-content>
              <v-list-item-title class="headline" style="padding:5px">
                <pulse-loader :loading="count_loansLoading" ></pulse-loader>
                {{count_loans}}
              </v-list-item-title>
              <v-divider></v-divider>
              <v-list-item-subtitle style="font-size:16px; padding:5px">Loans</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <p
      class="headline text-center"
      style="font-size:22px; padding-top:30px"
    >Trend of paid and unpaid loans over time</p>
    <v-row>
      <canvas id="myChart" width="1100" height="400"></canvas>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import Chart from "chart.js";
export default {
  components: {
    PulseLoader
  },
  data() {
    return {
      items: [
        {
          text: "Home",
          disabled: false,
          href: "home"
        },
        {
          text: "Dashboard",
          disabled: true,
          href: "home"
        }
      ],
      graph_labels: ["feb", "May", "June", "July", "March", "August"],
      graph_data_one: [34, 70, 78, 89, 10, 45],
      graph_data_two: [12, 56, 78, 25, 20, 67]
    };
  },
  methods: {
    payments(data_one, labels, data_two) {
      this.renderTo = "myChart";
      const ctx = document.getElementById(this.renderTo);
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "paid",
              data: data_one,
              backgroundColor: "#191970",
              fill: false,
              borderColor: "#191970",
              borderWidth: 1
            },
            {
              label: "unpaid",
              data: data_two,
              backgroundColor: "#800000",
              fill: false,
              borderColor: "#800000",
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          title: {
            display: true
          },
          tooltips: {
            mode: "index",
            intersect: false
          },
          hover: {
            mode: "nearest",
            intersect: true
          },
          scales: {
            x: {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Month"
              }
            },
            y: {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Value"
              }
            }
          }
        }
      });
      window.mygraph = myChart;
    }
  },
  computed: {
    ...mapState([
      "count_riders",
      "count_ridersLoading",
      "count_agents",
      "count_agentsLoading",
      "count_loans",
      "count_loansLoading"
    ])
  },
  created() {
    this.$store.dispatch("countRiders");
    this.$store.dispatch("countAgents");
    this.$store.dispatch("countLoans");
    this.$store.dispatch("paid");
    this.$store.dispatch("unpaid");
  },
  mounted() {
    this.payments(this.graph_data_one, this.graph_labels, this.graph_data_two);
  }
};
</script>