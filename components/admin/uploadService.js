import axios from "axios";
import { API_URL } from "../constants";

class UploadService {

    /**
     * 
     * @param {FileList} files 
     * @param {string} apiKey
     * @param {int} id
     */
    uploadImages(files, apiKey, id) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
        }

        axios.post(`${API_URL}/admin/uploadImage/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${apiKey}`
            }
        });
    }
}

export default UploadService;