import {Fetch} from '../../Utils'

const type = {
    getTypes: async () => {
        return await Fetch.get(`type`)
    }
}

module.exports = type