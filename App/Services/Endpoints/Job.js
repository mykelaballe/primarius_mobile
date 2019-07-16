import {Fetch} from '../../Utils'

const job = {
    getJobFeed: async (params = {}) => {
        let endpoint = `jobs`
        let filters = []

        if(params.organization) filters.push(`organization=${params.organization}`)
        if(params.date) filters.push(`date=${params.date}`)
        if(params.status) filters.push(`status=${params.status}`)

        if(filters.length > 0) endpoint += `?${filters.join('&')}`

        return await Fetch.get(endpoint)
    },
    getJob: async id => {
        return await Fetch.get(`jobs/${id}`)
    },
    postJob: async payload => {
        return await Fetch.post(`jobs`,payload)
    },
    editJob: async params => {
        return await Fetch.put(`jobs/${params.id}`,params.payload)
    },
    deleteJob: async id => {
        return await Fetch.delete(`jobs/${id}`)
    },
    completeJob: async (job_id, user_id) => {
        return await Fetch.put(`jobs/${job_id}/complete/${user_id}`)
    },
    missedJob: async (job_id, user_id) => {
        return await Fetch.put(`jobs/${job_id}/missed/${user_id}`)
    }
}

module.exports = job