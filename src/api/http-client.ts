import axios from "axios";
import { envVariables } from "../constants/secrets";

export const httpClient = axios.create({
  baseURL: envVariables.apiBaseURL,
});
