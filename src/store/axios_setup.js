import axios from "axios";
const API_URL = "http://167.71.203.63:3000/api/V1";
const token = localStorage.getItem("token");

let settings = {
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
};

export default axios.create(settings);
