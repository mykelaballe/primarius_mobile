import {Fetch} from '../../Utils'

const appointment = {
    getAppointments: async () => {
        return await Fetch.get(`appointment`)
    },
    getAppointment: async id => {
        return await Fetch.get(`appointment/${id}`)
    },
    createAppointment: async payload => {
        return await Fetch.post(`appointment`,payload)
    },
    deleteAppointment: async id => {
        return await Fetch.delete(`appointment/${id}`)
    },
    setAppointment: async payload => {
        return await Fetch.post(`appointment/set`,payload)
    },
    completeAppointment: async userId => {
        return await Fetch.post(`appointment/complete-registration/${userId}`)
    }
}

module.exports = appointment