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
        Add Saving
        <v-icon style="margin-left:3px">mdi-plus</v-icon>
      </v-btn>
    </v-layout>
    <v-card>
      <v-card-title>
        Savings
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
        :items="savings"
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
        <template v-slot:item.clientNumber="{ item }">CT{{item.clientNumber}}</template>
        <template v-slot:item.actions="{ item }">
          <v-icon color="red" @click="deleteSaving(item.id)">mdi-delete</v-icon>
          <v-icon color="green" @click="launchEdit(item.id)">mdi-launch</v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Saving Form</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="client" label="Client Name" required></v-text-field>
              </v-col>
             <v-col cols="12">
                <v-text-field v-model="number" label="Client Number" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="amount" label="Saving amount*" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addSaving">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Saving Form</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
               <v-col cols="12">
                <v-text-field v-model="client" label="Client Name" required></v-text-field>
              </v-col>
             <v-col cols="12">
                <v-text-field v-model="number" label="Client Number" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="amount" label="Saving amount*" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="updateSaving">Edit</v-btn>
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
      clients: ["Stationary", "Food", "Daily allowances", "Monthly Salary"],
      dialog: false,
      editDialog: false,
      client: "",
      amount: "",
      number:"",
      menu: false,
      modal: false,
      dismis: true,
      id: "",
      items: [
        {
          text: "Home",
          disabled: false,
          href: "home"
        },
        {
          text: "Savings",
          disabled: true,
          href: "home/Savings"
        }
      ],
      search: "",
      headers: [
        {
          text: "DATE",
          align: "left",
          value: "createdAt"
        },

        {
          text: "CLIENT",
          align: "left",
          sortable: false,
          value: "client"
        },

        {
          text: "CLIENT NUMBER",
          align: "left",
          sortable: false,
          value: "clientNumber"
        },
        { text: "AMOUNT (Ugx)", value: "amount" },
        { text: "ACTIONS", value: "actions" }
      ]
    };
  },
  methods: {
    launchEdit(id) {
      this.editDialog = true;
      let Saving = this.$store.getters.getSavingById(id);
      this.client = Saving.client;
      this.amount = Saving.amount;
      this.number = Saving.clientNumber;
      this.id = Saving.id;
    },
    setNull() {
      this.amount = "";
      this.client = "";
      this.number="";
    },
    addSaving() {
      let client = this.client;
      let amount = this.amount;
      let clientNumber = this.number;
      this.$store.dispatch("addSaving", { client, amount,clientNumber }).then(() => {
        if (this.addSavingStatus) {
          Toast.fire({
            icon: "success",
            title: "Saving Added successfully"
          });

          this.dialog = false;
          this.$store.dispatch("fetchSavings");
          this.setNull();
        } else {
          Toast.fire({
            icon: "error",
            client: "error",
            title: "Error Adding Saving"
          });
        }
      });
    },
    deleteSaving(id) {
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
            .dispatch("deleteSaving", id)
            .then(() => {
              if (this.deleteSavingStatus) {
                Swal.fire(
                  "Deleted!",
                  "Saving has been deleted.",
                  "success"
                );
                this.$store.dispatch("fetchSavings");
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    updateSaving() {
      let id = this.id;
      let client = this.client;
      let amount = this.amount;
      let clientNumber = this.number;
      this.$store.dispatch("updateSaving", { id, client, amount,clientNumber }).then(() => {
        if (this.updateSavingStatus) {
          Toast.fire({
            icon: "success",
            title: "Saving successfully updated"
          });
          this.editDialog = false;
          this.$store.dispatch("fetchSavings");
          this.setNull();
        } else {
          Toast.fire({
            icon: "error",
            client: "error",
            title: "Error Editing Saving"
          });
        }
      });
    }
  },
  created() {
    this.$store.dispatch("fetchSavings");
  },
  computed: {
    ...mapState([
      "addSavingStatus",
      "savings",
      "updateSavingStatus",
      "deleteSavingStatus"
    ])
  }
};
</script>