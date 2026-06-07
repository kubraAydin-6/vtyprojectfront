import api from "./api";

const authService = {

    /**
     * Login
     * @param {Object} data - {email, password}
     * @returns {Promise<Object>}
     */

    loginAsync: async (data) => {
        try{
            const response = await api.post('/auth', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}

export default authService;