import {Fetch} from '../../Utils'

const role = {
    getRoles: async () => {
        return await Fetch.get(`role`)
    }
}

module.exports = role