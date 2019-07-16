import {Fetch} from '../../Utils'

const organization = {
    getOrganizations: async () => {
        return await Fetch.get(`organization`)
    },
    getOrganization: async id => {
        return await Fetch.get(`organization/${id}`)
    },
    createOrganization: async payload => {
        return await Fetch.post(`organization`,payload)
    },
    editOrganization: async (params = {}) => {
        return await Fetch.put(`organization/${params.id}`,params.payload)
    },
    deleteOrganization: async id => {
        return await Fetch.delete(`organization/${id}`)
    }
}

module.exports = organization