import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://workout-system.herokuapp.com/",
});
