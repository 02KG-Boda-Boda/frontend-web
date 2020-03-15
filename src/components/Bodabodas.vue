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
        add bodabodas
        <v-icon style="margin-left:3px">mdi-plus</v-icon>
      </v-btn>
    </v-layout>
    <v-card>
      <v-card-title>
        Bodaboda Riders
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
        :items="riders"
        :search="search"
        :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-minus',
      nextIcon: 'mdi-plus'
    }"
      >
        <template v-slot:item.passport_photo="{ item }">
          <div v-viewer="viewerOptions">
            <img
              :src="item.passport_photo"
              :data-href="item.passport_photo"
              style="width: 70px;height: 70px;border-radius: 50%;padding:5px;"
              alt="john"
            />
          </div>
        </template>
        <template v-slot:item.address_proof="{ item }">
          <div v-viewer="viewerOptions">
            <img
              :src="item.address_proof"
              :data-href="item.address_proof"
              style="width: 70px;height: 70px;padding:5px;"
              alt="john"
            />
          </div>
        </template>
        <template v-slot:item.gurantor1_passport_photo="{ item }">
          <div v-viewer="viewerOptions">
            <img
              :src="item.gurantor1_passport_photo"
              :data-href="item.gurantor1_passport_photo"
              style="width: 70px;height: 70px;border-radius: 50%;padding:5px;"
              alt="john"
            />
          </div>
        </template>
        <template v-slot:item.gurantor1_stagecard="{ item }">
          <div v-viewer="viewerOptions">
            <img
              :src="item.gurantor1_stagecard"
              :data-href="item.gurantor1_stagecard"
              style="width: 70px;height: 70px;padding:5px;"
              alt="john"
            />
          </div>
        </template>
        <template v-slot:item.gurantor2_stagecard="{ item }">
          <div v-viewer="viewerOptions">
            <img
              :src="item.gurantor1_stagecard"
              :data-href="item.gurantor2_stagecard"
              style="width: 70px;height: 70px;padding:5px;"
              alt="john"
            />
          </div>
        </template>
        <template v-slot:item.gurantor2_passport_photo="{ item }">
          <div v-viewer="viewerOptions">
            <img
              :src="item.gurantor2_passport_photo"
              :data-href="item.gurantor2_passport_photo"
              style="width: 70px;height: 70px;border-radius: 50%;padding:5px;"
              alt="john"
            />
          </div>
        </template>
        <template v-slot:item.application_form="{ item }">
          <div v-viewer="viewerOptions">
            <img
              :src="item.application_form"
              :data-href="item.application_form"
              style="width: 70px;height: 70px;padding:5px;"
              alt="john"
            />
          </div>
        </template>
        <template v-slot:item.LC1_letter="{ item }">
          <div v-viewer="viewerOptions">
            <img
              :src="item.LC1_letter"
              :data-href="item.LC1_letter"
              style="width: 70px;height: 70px;padding:5px;"
              alt="john"
            />
          </div>
        </template>
        <template v-slot:item.stage_chairman_letter="{ item }">
          <div v-viewer="viewerOptions">
            <img
              :src="item.stage_chairman_letter"
              :data-href="item.stage_chairman_letter"
              style="width: 70px;height: 70px;padding:5px;"
              alt="john"
            />
          </div>
        </template>
        <template v-slot:item.date_of_birth="{ item }">{{item.date_of_birth | myDate}}</template>
        <template v-slot:item.actions="{ item }">
          <v-icon color="red" @click="deleteBodaboda(item.id)">mdi-delete</v-icon>
          <v-icon color="green" @click="launchEdit(item.id)">mdi-launch</v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Bodaboda Rider</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="First name*" v-model="firstName" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Last Name*" v-model="lastName"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Phone Number*" required v-model="phoneNumber"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="NIN*" required v-model="nin"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
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
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Gurantor 1 NIN*" required v-model="gurantor1_nin"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Gurantor 2 NIN*" required v-model="gurantor2_nin"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  show-size
                  counter
                  label="Upload passport photo*"
                  v-model="passport_photo"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input show-size counter label="Upload LC1 Letter*" v-model="LC1_letter"></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  show-size
                  counter
                  label="Upload Riding Permit*"
                  v-model="riding_permit"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  show-size
                  counter
                  label="Upload Application Form*"
                  v-model="application_form"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  show-size
                  counter
                  label="Stage Chairman letter*"
                  v-model="stage_chairman_letter"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  show-size
                  counter
                  label="Upload Gurantor 1 passport photo*"
                  v-model="gurantor1_passport_photo"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  show-size
                  counter
                  label="Upload Gurantor 2 passport photo*"
                  v-model="gurantor2_passport_photo"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  show-size
                  counter
                  label="Upload Address proof*"
                  v-model="address_proof"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  show-size
                  counter
                  label="Upload Gurantor 1 Stage Card*"
                  v-model="gurantor1_stagecard"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  show-size
                  counter
                  label="Upload Gurantor 2 Stage Card*"
                  v-model="gurantor2_stagecard"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addRider">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Bodaboda Rider</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="First name*" v-model="firstName" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Last Name*" v-model="lastName"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Phone Number*" required v-model="phoneNumber"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="NIN*" required v-model="nin"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
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
                      label="Date of birth"
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
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Gurantor 1 NIN*" required v-model="gurantor1_nin"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Gurantor 2 NIN*" required v-model="gurantor2_nin"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  show-size
                  counter
                  label="Upload passport photo*"
                  v-model="passport_photo"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input show-size counter label="Upload LC1 Letter*" v-model="LC1_letter"></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  show-size
                  counter
                  label="Upload Riding Permit*"
                  v-model="riding_permit"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  show-size
                  counter
                  label="Upload Application Form*"
                  v-model="application_form"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  show-size
                  counter
                  label="Stage Chairman letter*"
                  v-model="stage_chairman_letter"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  show-size
                  counter
                  label="Upload Gurantor 1 passport photo*"
                  v-model="gurantor1_passport_photo"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  show-size
                  counter
                  label="Upload Gurantor 2 passport photo*"
                  v-model="gurantor2_passport_photo"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  show-size
                  counter
                  label="Upload Address proof*"
                  v-model="address_proof"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  show-size
                  counter
                  label="Upload Gurantor 1 Stage Card*"
                  v-model="gurantor1_stagecard"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  show-size
                  counter
                  label="Upload Gurantor 2 Stage Card*"
                  v-model="gurantor2_stagecard"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="editBodaboda">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import "viewerjs/dist/viewer.css";

import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000
});
export default {
  data() {
    return {
      editDialog: false,
      viewerOptions: {
        movable: true,
        rotatable: true,
        scalable: true,
        url: "data-href"
      },
      firstName: "",
      lastName: "",
      phoneNumber: "",
      nin: "",
      gurantor1_nin: "",
      gurantor2_nin: "",
      passport_photo: null,
      stage_chairman_letter: null,
      gurantor1_passport_photo: null,
      gurantor2_passport_photo: null,
      address_proof: null,
      gurantor1_stagecard: null,
      gurantor2_stagecard: null,
      LC1_letter: null,
      riding_permit: null,
      application_form: null,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      dialog: false,
      id: "",
      items: [
        {
          text: "Home",
          disabled: false,
          href: "home"
        },
        {
          text: "Bodabodas",
          disabled: true,
          href: "home/bodabodas"
        }
      ],
      search: "",
      headers: [
        {
          text: "PASSPORT PHOTO",
          align: "left",
          sortable: false,
          value: "passport_photo"
        },
        { text: "FIRST NAME", value: "firstName" },
        { text: "LAST NAME", value: "lastName" },
        { text: "PHONE NUMBER", value: "phoneNumber" },
        { text: "NIN", value: "nin" },
        { text: "DATE OF BIRTH", value: "date_of_birth" },
        { text: "GURANTOR 1 NIN", value: "gurantor1_nin" },
        { text: "GURANTOR 2 NIN", value: "gurantor1_nin" },
        {
          text: "GURANTOR 1 PASSPORT PHOTO",
          value: "gurantor1_passport_photo"
        },
        {
          text: "GURANTOR 2 PASSPORT PHOTO",
          value: "gurantor2_passport_photo"
        },
        { text: "GURANTOR 1 STAGE CARD", value: "gurantor1_stagecard" },
        { text: "GURANTOR 2 STAGE CARD", value: "gurantor2_stagecard" },
        { text: "ADDRESS PROOF", value: "address_proof" },
        { text: "APPLICATION FORM", value: "application_form" },
        { text: "LC1 LETTER", value: "LC1_letter" },
        { text: "STAGE CHAIRMAN LETTER", value: "stage_chairman_letter" },
        { text: "ACTIONS", value: "actions" }
      ]
    };
  },
  methods: {
    launchEdit(id) {
      this.editDialog = true;
      let rider = this.$store.getters.getRiderById(id);
      this.firstName = rider.firstName;
      this.lastName = rider.lastName;
      this.date = rider.date_of_birth;
      this.phoneNumber = rider.phoneNumber;
      this.nin = rider.nin;
      this.gurantor1_nin = rider.gurantor1_nin;
      this.gurantor2_nin = rider.gurantor2_nin;
      this.id = rider.id;
    },
    setNull() {
      this.firstName = "";
      this.lastName = "";
      this.nin = "";
      this.passport_photo = null;
      this.riding_permit = "";
      this.phoneNumber = "";
      this.application_form = null;
      this.LC1_letter = null;
      this.gurantor1_stagecard = null;
      this.gurantor2_stagecard = null;
      this.gurantor1_passport_photo = null;
      this.gurantor2_passport_photo = null;
      this.gurantor1_nin = null;
      this.gurantor2_nin = null;
      this.address_proof = null;
      this.stage_chairman_letter = null;
    },
    addRider() {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        date_of_birth: this.date,
        phoneNumber: this.phoneNumber,
        nin: this.nin,
        gurantor1_nin: this.gurantor1_nin,
        gurantor2_nin: this.gurantor2_nin
      };
      var formData = new FormData();
      formData.append("riding_permit", this.riding_permit);
      formData.append("stage_chairman_letter", this.stage_chairman_letter);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("nin", data.nin);
      formData.append("address_proof", this.address_proof);
      formData.append("passport_photo", this.passport_photo);
      formData.append("application_form", this.application_form);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("gurantor1_nin", data.gurantor1_nin);
      formData.append("gurantor2_nin", data.gurantor2_nin);
      formData.append("LC1_letter", this.LC1_letter);
      formData.append("date_of_birth", data.date_of_birth);
      formData.append(
        "gurantor1_passport_photo",
        this.gurantor1_passport_photo
      );
      formData.append(
        "gurantor2_passport_photo",
        this.gurantor2_passport_photo
      );
      formData.append("gurantor1_stagecard", this.gurantor1_stagecard);
      formData.append("gurantor2_stagecard", this.gurantor2_stagecard);
      this.$store.dispatch("addBodaboda", formData).then(() => {
        if (this.addRiderStatus) {
          
           Toast.fire({
            icon: "success",
            title: "Rider successfully added"
          });
          this.dialog = false;
          this.setNull();
          this.$store.dispatch("fetchRiders");
        }
      });
    },
    deleteBodaboda(id) {
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
            .dispatch("deleteRiders", id)
            .then(() => {
              if (this.deleteBodabodaStatus) {
                Swal.fire(
                  "Deleted!",
                  "Rider has been deleted.",
                  "success"
                );
                this.$store.dispatch("fetchRiders");
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    editBodaboda() {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        nin: this.nin,
        gurantor1_nin: this.gurantor1_nin,
        gurantor2_nin: this.gurantor2_nin,
        phoneNumber: this.phoneNumber,
        date_of_birth: this.date
      };
      let id = this.id;
      var formData = new FormData();
      if (this.passport_photo != null) {
        formData.append("passport_photo", this.passport_photo);
      }
      if (this.LC1_letter != null) {
        formData.append("LC1_letter", this.LC1_letter);
      }
      if (this.application_form != null) {
        formData.append("application_form", this.application_form);
      }
      if (this.stage_chairman_letter != null) {
        formData.append("stage_chairman_letter", this.stage_chairman_letter);
      }
      if (this.address_proof != null) {
        formData.append("address_proof", this.address_proof);
      }
      if (this.gurantor1_passport_photo != null) {
        formData.append(
          "gurantor1_passport_photo",
          this.gurantor1_passport_photo
        );
      }
      if (this.gurantor2_passport_photo != null) {
        formData.append(
          "gurantor2_passport_photo",
          this.gurantor2_passport_photo
        );
      }
      if (this.gurantor1_stagecard != null) {
        formData.append("gurantor1_stagecard", this.gurantor1_stagecard);
      }
      if (this.gurantor2_stagecard != null) {
        formData.append("gurantor2_stagecard", this.gurantor2_stagecard);
      }
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("nin", data.nin);
      formData.append("date_of_birth", data.date_of_birth);
      formData.append("gurantor1_nin", data.gurantor1_nin);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("gurantor2_nin", data.gurantor2_nin);
      this.$store.dispatch("updateBodaboda", { id, formData }).then(() => {
        if (this.updateBodabodaStatus) {
           Toast.fire({
            icon: "success",
            title: "Rider successfully updated"
          });
          this.$store.dispatch("fetchRiders");
          this.editDialog = false;
          this.setNull();
        }
      });
    }
  },
  computed: {
    ...mapState(["addRiderStatus", "riders", "deleteBodabodaStatus","updateBodabodaStatus"])
  },
  created() {
    this.$store.dispatch("fetchRiders");
  }
};
</script>