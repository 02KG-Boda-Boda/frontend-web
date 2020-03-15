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
        issue loan
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
        :items="loans"
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
          <v-chip class="ma-2" color="green" text-color="white" v-if="item.amount<=0">paid</v-chip>
          <v-chip class="ma-2" color="red" text-color="white" v-else>unpaid</v-chip>
        </template>
        <template v-slot:item.date_issued="{ item }">{{item.date_issued | myDate}}</template>
        <template v-slot:item.return_date="{ item }">{{item.return_date | myDate}}</template>
        <template v-slot:item.actions="{ item }">
          <v-icon  color="orange" @click="launchPay(item.id)" :disabled="item.amount<=0">mdi-cash-plus</v-icon>
          <v-icon  color="green" @click="launchEdit(item.id)">mdi-launch</v-icon>
          <v-icon  color="red" @click="deleteLoan(item.id)" v-if="item.amount<=0">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Issue Loan Form</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  v-model="rider"
                  :items="getRiderNames"
                  dense
                  filled
                  label="Choose Rider"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="stage_name" label="Stage Name*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="amount" label="Loan amount*" required></v-text-field>
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
                    label="Return Date"
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
          <v-btn color="blue darken-1" text @click="addLoan">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Loan Form</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  v-model="rider"
                  :items="getRiderNames"
                  dense
                  filled
                  label="Choose Rider"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="stage_name" label="Stage Name*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="amount" label="Loan amount*" required></v-text-field>
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
                    label="Return Date"
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
          <v-btn color="blue darken-1" text @click="editDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="updateLoan">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="payDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Pay Loan</v-card-title>
        <v-card-text>
          <v-text-field v-model="amount" label="Amount" required></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="payDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="payLoan">Pay</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000
});
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      editDialog: false,
      date: new Date().toISOString().substr(0, 10),
      rider: "",
      stage_name: "",
      amount: "",
      menu: false,
      modal: false,
      dismis: true,
      payDialog: false,
      id: "",
      items: [
        {
          text: "Home",
          disabled: false,
          href: "home"
        },
        {
          text: "Loans",
          disabled: true,
          href: "home/loans"
        }
      ],
      search: "",
      headers: [
        {
          text: "DATE ISSUED",
          align: "left",
          value: "date_issued"
        },
        { text: "RETURN DATE", value: "return_date" },
        {
          text: "RIDER NAME",
          align: "left",
          sortable: false,
          value: "rider_name"
        },
        {
          text: "RIDER PHONE",
          align: "left",
          sortable: false,
          value: "rider_phone"
        },
        { text: "ISSUED BY", value: "agent_name" },
        {
          text: "AGENT PHONE",
          align: "left",
          sortable: false,
          value: "agent_phone"
        },
        { text: "LOAN AMOUNT", value: "amount" },
        { text: "STAGE NAME", value: "stage_name" },
        { text: "LOAN STATUS", value: "status" },
        { text: "ACTIONS", value: "actions" }
      ]
    };
  },
  methods: {
    launchPay(id){
      this.payDialog = true
      this.id =id
    },
    launchEdit(id) {
      this.editDialog = true;
      let loan = this.$store.getters.getLoanById(id);
      this.stage_name = loan.stage_name;
      this.rider = loan.rider_name;
      this.amount = loan.amount;
      this.id = loan.id;
      console.log(loan.id);
    },
    setNull() {
      this.stage_name = "";
      this.amount = "";
      this.rider = "";
    },
    addLoan() {
      let rider = this.$store.getters.getRiderByName(this.rider);
      let bodabodaId = rider.id;
      let stage_name = this.stage_name;
      let return_date = this.date;
      let amount = this.amount;
      this.$store
        .dispatch("addLoan", { bodabodaId, stage_name, return_date, amount })
        .then(() => {
          if (this.addLoanStatus) {
            Toast.fire({
            icon: "success",
            title: "Loan successfully added"
          });
            this.dialog = false;
            this.$store.dispatch("fetchLoans");
            this.setNull();
          }
        });
    },
    updateLoan() {
      let id = this.id;
      console.log(id);
      let stage_name = this.stage_name;
      let return_date = this.date;
      let amount = this.amount;
      this.$store
        .dispatch("updateLoan", { id, stage_name, return_date, amount })
        .then(() => {
          if (this.updateLoanStatus) {
             Toast.fire({
            icon: "success",
            title: "Loan successfully updated"
          });
            this.editDialog = false;
            this.$store.dispatch("fetchLoans");
            this.setNull();
          }
        });
    },
    payLoan() {
      let id = this .id;
      let amount = this.amount;
      this.$store
        .dispatch("payLoan", { id, amount })
        .then(() => {
          if (this.loanPaymentStatus) {
             Toast.fire({
            icon: "success",
            title: "Loan payment made succeffully"
          });
            this.payDialog = false;
            this.$store.dispatch("fetchLoans");
            this.amount="";
          }
        });
    },
    deleteLoan(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        client: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$store
            .dispatch("deleteLoan", id)
            .then(() => {
              if (this.deleteLoanStatus) {
                Swal.fire(
                  "Deleted!",
                  "Loan has been deleted.",
                  "success"
                );
                this.$store.dispatch("fetchLoans");
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
  },
  created() {
    this.$store.dispatch("fetchRiders");
    this.$store.dispatch("fetchLoans");
  },
  computed: {
    ...mapGetters(["getRiderNames"]),
    ...mapState(["addLoanStatus", "loans", "updateLoanStatus","loanPaymentStatus","deleteLoanStatus"])
  }
};
</script>