import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://vaxplus-backend.vercel.app/api/v1",
})

export default apiClient;