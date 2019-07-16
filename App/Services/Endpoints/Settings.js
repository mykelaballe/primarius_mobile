import {Fetch} from '../../Utils'

const settings = {
    getBanners: async () => {
        return await Fetch.get(`settings/banners`)
    },
    setBanners: async payload => {
        return await Fetch.post(`settings/banners`,payload)
    },
}

module.exports = settings