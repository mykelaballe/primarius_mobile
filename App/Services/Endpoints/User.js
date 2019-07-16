import {Fetch, Storage, Globals} from '../../Utils'
import helper from '../helper'

const user = {
    getUser: async id => {
        return await Fetch.get(`user/${id}`)
    },

    getUsers: async () => {
        return await Fetch.get(`user`)
    },

    createUser: async payload => {
        return await Fetch.post('user',payload)
    },

    updateUser: async params => {
        await Fetch.put(`user/${params.id}`,params.payload)

        let data = await Storage.doLoad(Globals.db.user)
        let user = data.data

        user.firstname = params.payload.firstname
        user.lastname = params.payload.lastname
        user.contact_no = params.payload.contact_no

        await Storage.doSave(Globals.db.user,{data: user})

        return user
    },

    deleteUser: async id => {
        return await Fetch.delete(`user/${id}`)
    },

    resetUserPassword: async (params = {}) => {
        return await Fetch.post(`adminspark/users/reset-password`,params.payload)
    },

    changeUserPassword: async (params = {}) => {
        return await Fetch.post(`userspark/update/password`,params.payload)
    },

    getJobs: async userId => {
        return await Fetch.get(`user/${userId}/jobs`)
    },
    updateBankDetails: async payload => {
        return await Fetch.post(`user/set-bank`,payload)
    }
}

module.exports = user