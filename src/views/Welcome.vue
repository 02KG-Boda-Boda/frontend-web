<template>
  <v-app id="inspire">
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down" style="font-size:28px">2G0</span>
      </v-toolbar-title>
      <v-spacer />
      <v-menu offset-y transition="scale-transition">
        <template v-slot:activator="{ on }">
          <p v-on="on">
            <v-avatar>
              <img :src="user.photo" style="padding:5px" />
            </v-avatar>
            {{user.firstName}} {{user.lastName}}
            <v-icon>mdi-chevron-down</v-icon>
          </p>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer dark v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="{name: item.path}"
          active-class="dashboard-active"
          exact
        >
          <v-list-item-icon style="font-size:16px">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title style="font-size:15px">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-divider></v-divider>
        <v-list-item two-line>
          <v-row>
            <v-col cols="6">
              <v-list-item-content class="text-right">
                <v-list-item-title>{{day}}</v-list-item-title>
                <v-list-item-subtitle>{{date}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-col>
            <v-divider vertical class="my-4"></v-divider>
            <v-col cols="5" class="my-2" style="font-size:1.7rem">{{time}}</v-col>
          </v-row>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer class="font-weight-medium">
      <v-col class="text-center" cols="12">
        &copy; {{ new Date().getFullYear() }} —
        <strong>2G0 </strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import Logo from "@/assets/logo.png";
export default {
  name: "toolbar",
  data() {
    return {
      firstname: "",
      lastname: "",
      drawer: null,
      day: moment().format("dddd"),
      date: moment().format("MMM Do YY"),
      time: moment().format("LT"),
      logo: Logo,
      items: [
        { title: "Dashboard", icon: "mdi-home", path: "home.dashboard" },
        {
          title: "Agents",
          icon: "mdi-account-group",
          path: "home.agents"
        },
        {
          title: "Bodabodas",
          icon: "mdi-motorbike",
          path: "home.bodabodas"
        },
        {
          title: "Loans",
          icon: "mdi-cash-multiple",
          path: "home.loans"
        },
        {
          title: "Expenses",
          icon: "mdi-cash-register",
          path: "home.expenses"
        },
        {
          title: "Savings",
          icon: "mdi-bank-plus",
          path: "home.savings"
        }
      ]
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>
<style lang="scss">
.dashboard-active {
  background-color: #2e7d32;
  color: #fff !important;
  font-weight: bold;
}
</style>
