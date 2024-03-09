import { SERVER_BASE_API_URL } from "@/utils/constants";
import axios from "axios";

export default {
    saveTagForPhoto(photoId, tagAtributes) {
        // debugger;
        return axios.post(`${SERVER_BASE_API_URL}/photos/${photoId}/tags`, tagAtributes).then((results) => {
            return results.data;
        });
    },
    updateTag(tagId, tagAtributes) {
        // debugger;
        return axios.put(`${SERVER_BASE_API_URL}/tags/${tagId}`, tagAtributes).then((results) => {
            return results.data;
        });
    }
};