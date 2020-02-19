<template>
  <div style="padding:10px">
    <v-row>
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-forward</v-icon>
        </template>
      </v-breadcrumbs>
    </v-row>
    <v-layout flex align-end justify-end style="padding-bottom:10px">
      <v-btn @click.stop="dialog = true" color="success" style="text-transform:capitalize">
        add payments
        <v-icon style="margin-left:3px">mdi-plus</v-icon>
      </v-btn>
    </v-layout>
    <v-card>
      <v-card-title>
        Loans
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus'
      }"
      >
      <template v-slot:item.status="{ item }">
        <v-chip class="ma-2" color="green" text-color="white"  v-if="item.status=='paid'">{{item.status}}</v-chip>
        <v-chip class="ma-2" color="red" text-color="white" v-else>{{ item.status}}</v-chip>
      </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Agent</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete v-model="value" :items="riders" dense filled label="Choose Rider"></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Stage Name*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Loan amount*" type="password" required></v-text-field>
              </v-col>
            </v-row>
            <v-col cols="12">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    label="Picker in menu"
                    prepend-icon="mdi-calendar-minus"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      date: new Date().toISOString().substr(0, 10),
      riders: [
        "wamozo cosmas",
        "mugarura allan",
        "busuulwa martin",
        "kigundu ssali"
      ],
      menu: false,
      modal: false,
      items: [
        {
          text: "Home",
          disabled: false,
          href: "breadcrumbs_dashboard"
        },
        {
          text: "Loans",
          disabled: true,
          href: "breadcrumbs_link_1"
        }
      ],
      search: "",
      headers: [
        {
          text: "DATE ISSUED",
          align: "left",
          value: "date"
        },
        { text: "RETURN DATE", value: "return_date" },
        {
          text: "RIDER NAME",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "ISSUED BY", value: "calories" },
        { text: "LOAN AMOUNT", value: "fat" },
        { text: "STAGE NAME", value: "protein" },
        { text: "LOAN STATUS", value: "status" }
      ],
      desserts: [
        {
          date: "12/7/19195",
          return_date: "12/7/19195",
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          protein: 4.0,
          status: "paid"
        },
        {
          date: "12/7/19195",
          return_date: "12/7/19195",
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          protein: 4.0,
          status: "paid"
        },
        {
          date: "12/7/19195",
          return_date: "12/7/19195",
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          protein: 4.0,
          status: "unpaid"
        },
        {
          date: "12/7/19195",
          return_date: "12/7/19195",
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          protein: 4.0,
          status: "paid"
        },
        {
          date: "12/7/19195",
          return_date: "12/7/19195",
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          protein: 4.0,
          status: "unpaid"
        },
        {
          date: "12/7/19195",
          return_date: "12/7/19195",
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          protein: 4.0,
          status: "unpaid"
        }
      ]
    };
  }
};
</script>