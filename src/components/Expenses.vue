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
        Add Expense
        <v-icon style="margin-left:3px">mdi-plus</v-icon>
      </v-btn>
    </v-layout>
    <v-card>
      <v-card-title>
        Expenses
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
        :items="expenses"
        :search="search"
        :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus'
      }"
      >
        <template v-slot:item.createdAt="{ item }">{{item.createdAt | myDate}}</template>
        <template v-slot:item.actions="{ item }">
          <v-icon  color="red" @click="deleteExpense(item.id)">mdi-delete</v-icon>
          <v-icon color="green" @click="launchEdit(item.id)">mdi-launch</v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Expense Form</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  v-model="type"
                  :items="types"
                  dense
                  filled
                  label="Choose Expense Type"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12"></v-col>
              <v-col cols="12">
                <v-text-field v-model="amount" label="Expense amount*" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addExpense">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Expense Form</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  v-model="type"
                  :items="types"
                  dense
                  filled
                  label="Choose Expense Type"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12"></v-col>
              <v-col cols="12">
                <v-text-field v-model="amount" label="Expense amount*" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="updateExpense">Edit</v-btn>
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      types: ["Stationary", "Food", "Daily allowances", "Monthly Salary"],
      dialog: false,
      editDialog: false,
      type: "",
      amount: "",
      menu: false,
      modal: false,
      dismis: true,
      payDialog: false,
      payLoanSuccess: false,
      showEditSuccess: false,
      id: "",
      items: [
        {
          text: "Home",
          disabled: false,
          href: "home"
        },
        {
          text: "Expenses",
          disabled: true,
          href: "home/expenses"
        }
      ],
      search: "",
      showSuccess: false,
      headers: [
        {
          text: "DATE ISSUED",
          align: "left",
          value: "createdAt"
        },

        {
          text: "EXPENSE TYPE",
          align: "left",
          sortable: false,
          value: "type"
        },
        { text: "EXPENSE AMOUNT", value: "amount" },
        { text: "ACTIONS", value: "actions" }
      ]
    };
  },
  methods: {
    launchPay(id) {
      this.payDialog = true;
      this.id = id;
    },
    launchEdit(id) {
      this.editDialog = true;
      let expense = this.$store.getters.getExpenseById(id);
      this.type = expense.type;
      this.amount = expense.amount;
      this.id = expense.id;
      console.log(expense.id);
    },
    setNull() {
      this.amount = "";
      this.type = "";
    },
    addExpense() {
      let type = this.type;
      let amount = this.amount;
      this.$store.dispatch("addExpense", { type, amount }).then(() => {
        if (this.addExpenseStatus) {
          Toast.fire({
            icon: "success",
            title: "Expense Added successfully"
          });

          this.dialog = false;
          this.$store.dispatch("fetchExpenses");
          this.setNull();
        } else {
          Toast.fire({
            icon: "error",
            type: "error",
            title: "Error Adding Expense"
          });
        }
      });
    },
    deleteExpense(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$store
            .dispatch("deleteExpense", id)
            .then(() => {
              if (this.deleteExpenseStatus) {
                Swal.fire(
                  "Deleted!",
                  "Expense has been deleted.",
                  "success"
                );
                this.$store.dispatch("fetchExpenses");
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    updateExpense() {
      let id = this.id;
      let type = this.type;
      let amount = this.amount;
      this.$store.dispatch("updateExpense", { id, type, amount }).then(() => {
        if (this.updateExpenseStatus) {
          Toast.fire({
            icon: "success",
            title: "Expense successfully updated"
          });
          this.editDialog = false;
          this.$store.dispatch("fetchExpenses");
          this.setNull();
        } else {
          Toast.fire({
            icon: "error",
            type: "error",
            title: "Error Editing Expense"
          });
        }
      });
    }
  },
  created() {
    this.$store.dispatch("fetchExpenses");
  },
  computed: {
    ...mapState([
      "addExpenseStatus",
      "expenses",
      "updateExpenseStatus",
      "deleteExpenseStatus"
    ])
  }
};
</script>