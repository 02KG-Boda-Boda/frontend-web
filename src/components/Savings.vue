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
      <v-btn
        @click.stop="dialog = true"
        color="success"
        style="text-transform:capitalize"
      >
        add saving
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
        <template v-slot:item.date_issued="{ item }">
          <h5>{{ item.date_issued | myDate }}</h5>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon color="green" @click="launchEdit(item.id)">mdi-launch</v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <h5>Save Money</h5>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  v-model="member"
                  :items="getMembersNames"
                  dense
                  label="Choose member"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Loan amount*"
                  v-model="amount"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
            @click="postSaving"
            :loading="postSavingLoading"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <h5>Edit Saving</h5>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  v-model="member"
                  :items="getMembersNames"
                  dense
                  label="Choose member"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Loan amount*"
                  v-model="amount"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editDialog = false"
            >Close</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
            @click="updateSaving"
            :loading="updateSavingLoading"
            >Edit</v-btn
          >
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
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      member: "",
      editDialog: false,
      menu: false,
      modal: false,
      amount: "",
      items: [
        {
          text: "Home",
          disabled: false,
          href: "breadcrumbs_dashboard"
        },
        {
          text: "Savings",
          disabled: true,
          href: "breadcrumbs_link_1"
        }
      ],
      search: "",
      headers: [
        {
          text: "DATE ISSUED",
          align: "left",
          value: "date_issued"
        },
        {
          text: "MEMBER NAME",
          align: "left",
          sortable: false,
          value: "member"
        },
        { text: "ISSUED BY", value: "issued_by" },
        { text: "AMOUNT", value: "amount" },
        { text: "ACTIONS", value: "actions" }
      ]
    };
  },
  methods: {
    setNull() {
      this.member = "";
      this.amount = "";
    },
    launchEdit(id) {
      this.editDialog = true;
      let saving = this.$store.getters.getSavingById(id);
      this.member = saving.member;
      this.amount = saving.amount;
      this.id = id;
    },
    postSaving() {
      let member = this.$store.getters.getMemberByName(this.member);

      let data = {
        memberId: member.id,
        amount: this.amount
      };
      this.$store
        .dispatch("postSavings", data)
        .then(() => {
          if (this.postSavingStatus) {
            this.dialog = false;
            this.setNull();
            this.$store.dispatch("fetchSavings");
            Toast.fire({
              icon: "success",
              title: "Amount Saved successfully"
            });
          } else {
            Toast.fire({
              icon: "error",
              title: "Form validation failed"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateSaving() {
      let member = this.$store.getters.getMemberByName(this.member);

      let data = {
        memberId: member.id,
        amount: this.amount,
        id: this.id
      };
      this.$store
        .dispatch("updateSaving", data)
        .then(() => {
          if (this.updateSavingStatus) {
            this.editDialog = false;
            this.setNull();
            this.$store.dispatch("fetchSavings");
            Toast.fire({
              icon: "success",
              title: "Saving sucessfully edited"
            });
          } else {
            Toast.fire({
              icon: "error",
              title: "Form validation failed"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeCreate() {
    this.$store.dispatch("fetchSavings");
  },
  computed: {
    ...mapState([
      "postSavingStatus",
      "postSavingLoading",
      "savings",
      "savingsLoading",
      "updateSavingStatus",
      "updateSavingLoading"
    ]),
    ...mapGetters(["getMembersNames"])
  }
};
</script>
