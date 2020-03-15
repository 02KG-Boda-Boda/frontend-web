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
        add agent
        <v-icon style="margin-left:3px">mdi-plus</v-icon>
      </v-btn>
    </v-layout>
    <v-card>
      <v-card-title>
        Agents
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
        :items="agents"
        :search="search"
        :loading="agentsLoading"
        loading-text="Loading... Please wait"
        :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-minus',
      nextIcon: 'mdi-plus'
    }"
      >
        <template v-slot:item.photo="{ item }">
          <div v-viewer="viewerOptions">
            <img
              :src="item.photo"
              :data-href="item.photo"
              style="width: 70px;height: 70px;border-radius: 50%;padding:5px;"
              alt="john"
            />
          </div>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon color="red" @click="deleteAgent(item.id)">mdi-delete</v-icon>
          <v-icon color="green" @click="launchEdit(item.id)">mdi-launch</v-icon>
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
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="First name*" v-model="firstname" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Last Name*" v-model="lastname"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Phone Number*" v-model="phoneNumber" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-file-input show-size counter label="Upload photo" v-model="photo" type="file"></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" v-model="email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="NIN*" v-model="nin" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password*" v-model="password" type="password" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addAgent">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Agent</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="First name*" v-model="firstname" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Last Name*" v-model="lastname"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Phone Number*" v-model="phoneNumber" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-file-input show-size counter label="Upload photo" v-model="photo" type="file"></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" v-model="email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="NIN*" v-model="nin" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password*" v-model="password" type="password" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="editAgent">edit</v-btn>
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
        movable: false,
        rotatable: false,
        scalable: false,
        url: "data-href"
      },
      firstname: "",
      lastname: "",
      phoneNumber: "",
      nin: "",
      email: "",
      password: "",
      id: "",
      photo: null,
      dialog: false,
      items: [
        {
          text: "Home",
          disabled: false,
          href: "home"
        },
        {
          text: "Agents",
          disabled: true,
          href: "home/agents"
        }
      ],
      search: "",
      headers: [
        {
          text: "PHOTO",
          align: "left",
          sortable: false,
          value: "photo"
        },
        { text: "FIRST NAME", value: "firstName" },
        { text: "LAST NAME", value: "lastName" },
        { text: "PHONE NUMBER", value: "phoneNumber" },
        { text: "EMAIL", value: "email" },
        { text: "NIN", value: "nin" },
        { text: "ACTIONS", value: "actions" }
      ]
    };
  },
  methods: {
    launchEdit(id) {
      this.editDialog = true;
      let agent = this.$store.getters.getAgentById(id);
      this.firstname = agent.firstName;
      this.lastname = agent.lastName;
      this.email = agent.email;
      this.phoneNumber = agent.phoneNumber;
      this.nin = agent.nin;
      this.id = agent.id;
    },
    setNull() {
      this.firstname = "";
      this.lastname = "";
      this.nin = "";
      this.photo = null;
      this.email = "";
      this.phoneNumber = "";
      this.password = "";
    },
    deleteAgent(id) {
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
            .dispatch("deleteAgents", id)
            .then(() => {
              if (this.deleteAgentStatus) {
                Swal.fire(
                  "Deleted!",
                  "Agent has been deleted.",
                  "success"
                );
                this.$store.dispatch("fetchAgents");
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    addAgent() {
      let data = {
        firstName: this.firstname,
        lastName: this.lastname,
        nin: this.nin,
        phoneNumber: this.phoneNumber,
        password: this.password,
        email: this.email,
        role: "agent"
      };
      var formData = new FormData();
      formData.append("photo", this.photo);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("nin", data.nin);
      formData.append("password", data.password);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("role", data.role);
      this.$store.dispatch("addAgent", formData).then(() => {
        if (this.isAgentPosted) {
           Toast.fire({
            icon: "success",
            title: "Agent successfully added"
          });
          this.$store.dispatch("fetchAgents");
          this.dialog = false;
          this.setNull();
        }
      });
    },
    editAgent() {
      let data = {
        firstName: this.firstname,
        lastName: this.lastname,
        nin: this.nin,
        phoneNumber: this.phoneNumber,
        password: this.password,
        email: this.email,
        role: "agent"
      };
      let id = this.id;
      var formData = new FormData();
      if (this.photo != null) {
        formData.append("photo", this.photo);
      }
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("nin", data.nin);
      formData.append("password", data.password);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("role", data.role);
      this.$store.dispatch("updateAgents", { id, formData }).then(() => {
        if (this.updateAgentStatus) {
           Toast.fire({
            icon: "success",
            title: "Agent successfully updated"
          });
          this.$store.dispatch("fetchAgents");
          this.editDialog = false;
          this.setNull();
        }
      });
    }
  },

  created() {
    this.$store.dispatch("fetchAgents");
  },
  computed: {
    ...mapState([
      "postAgentLoading",
      "isAgentPosted",
      "agents",
      "agentsLoading",
      "deleteAgentStatus",
      "updateAgentStatus"
    ])
  }
};
</script>