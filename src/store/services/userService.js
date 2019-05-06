import { HTTP } from "../httpconfig"

export const userService = {
    login,
   /* logout,
    register,
    getAll,
    getById,
    update */
};

function getURL(additionalPath) {
    return baseURL + additionalPath
}

function login(username, password, tenantId) {
    return HTTP.post("users/authentic",{"username": username, "password": password, "tenantId": tenantId})    
}