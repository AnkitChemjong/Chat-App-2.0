import axios from 'axios';
import {HOST } from "@/utils/constants.js";

const apiClient=axios.create({
    baseURL:HOST,
})
export default apiClient;