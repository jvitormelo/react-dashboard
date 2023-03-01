import axios from "axios";
import { envVariables } from "../constants/secrets";

export const httpClient = axios.create({
  baseURL: envVariables.apiBaseURL,
});

httpClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
