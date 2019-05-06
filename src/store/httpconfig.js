import axios from "axios";

export const HTTP = axios.create({    
    headers: {
        "X-Requested-With": "XMLHttpRequest"
    }
})