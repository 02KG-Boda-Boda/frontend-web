import axios from "axios";
const API_URL = "http://178.128.100.246:8080/api/V1";
const token = localStorage.getItem("token");

let settings = {
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
};

export default axios.create(settings);
