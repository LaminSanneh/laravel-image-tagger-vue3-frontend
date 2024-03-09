import { SERVER_BASE_API_URL } from "@/utils/constants";
import axios from "axios";

export default {
    getPhotos() {
        return axios.get(`${SERVER_BASE_API_URL}/photos`).then((results) => {
            return results.data;
        });
    },

    getPhoto(id) {
        return axios.get(`${SERVER_BASE_API_URL}/photos/${id}`).then((results) => {
            return results.data;
        });
    }
};