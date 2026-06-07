import api from "./api";

const meService = {

    /**
     * @returns {Promise<Object>}
     */

    getProfileAsync: async () => {
        try {
            const response = await api.get('/me/profile');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getCommentsAsync: async (userId) => {
        try {

            const response = await api.get(
                `/me/commentprofile`
            );

            return response.data;

        } catch (error) {
            throw error;
        }
    },

    getTotalLikesAsync: async (userId) => {
        try {

            const response = await api.get(
                `/me/totallikesprofile`
            );

            return response.data;

        } catch (error) {
            throw error;
        }
    },

    getJobsGivenAsync: async (userId) => {
        try {

            const response = await api.get(
                `/me/givenjobprofile`
            );

            return response.data;

        } catch (error) {
            throw error;
        }
    },

    postPriceOfferProfile: async (data) => {
        try {

            const response = await api.post(
                `/me/createpriceofferprofile`, data
            );

            return response.data;

        } catch (error) {
            throw error;
        }
    },

    createJobAsync: async (data) => {
        try {

            const response = await api.post(
                "/me/createjobprofile",
                data
            );

            return response.data;

        } catch (error) {

            throw error;

        }
    },

    deleteJobAsync: async (id) => {
        try {

            const response = await api.delete(
                `/me/deletejobprofile/${id}`
            );

            return response.data;

        } catch (error) {

            throw error;

        }
    },

    updateJobAsync: async (data) => {
        try {
            const response = await api.put(
                "/me/UpdateJobProfile",
                data
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getPriceOffersAsync: async (jobId) => {
        try {
            const response = await api.get(
                `/me/priceofferprofile/${jobId}`
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getGivenPriceOffersAsync: async () => {
        try {
            const response = await api.get(
                `/me/givenpriceofferprofile`
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getJobsReceivedAsync: async () => {
        try {
            const response = await api.get(
                `/me/receivedjobsprofile`
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    },
    putApprovePriceOfferAsync: async (offerId, jobId) => {
        try {
            const response = await api.put(`/me/approveprofile`, {
                offerId,
                jobId
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    },
    completeJobAsync: async (jobId) => {
        try {
            const response = await api.put(`/me/completejobprofile/${jobId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    addLikeAsync: async (data) => {
        try {
            const response = await api.post("/me/createlikeprofile", data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getJobsBudgetAscAsync: async () => {
        try {
            const response = await api.get(
                "/me/budgetAsc"
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getJobsBudgetDescAsync: async () => {
        try {
            const response = await api.get(
                "/me/budgetDesc"
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }




    // getJobsReceivedAsync: async (userId) => {
    //     try {

    //         const response = await api.get(
    //             `/me/receivedjobprofile`
    //         );

    //         return response.data;

    //     } catch (error) {
    //         throw error;
    //     }
    // }


}

export default meService;