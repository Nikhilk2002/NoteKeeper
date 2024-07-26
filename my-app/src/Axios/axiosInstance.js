import axios from "axios";

const userInstance = axios.create({
  baseURL: "http://localhost:8000/"
});


export {userInstance}