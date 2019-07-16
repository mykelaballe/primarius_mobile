import {Fetch} from '../../Utils'

const application = {
    applyJob: async payload => {
        return await Fetch.post(`application`,payload)
    },
    cancelJob: async job_id => {
        return await Fetch.post(`application/cancel/${job_id}`)
    },
    checkApplication: async job_id => {
        return await Fetch.get(`application/check/${job_id}`)
    },
    approveApplication: async payload => {
        return await Fetch.post(`application/approve`,payload)
    },
    rejectApplication: async payload => {
        return await Fetch.post(`application/reject`,payload)
    }
}

module.exports = application