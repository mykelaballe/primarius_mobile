import {Fetch, Storage, Globals} from '../../Utils'

const authentication = {
    login: async payload => {

        let data = await Fetch.post(`login`,payload)

        if(data.success) {

            //delete data.user.password
    
            await Storage.doSave(Globals.db.user,{data: data.user})

            return {
                user: data.user
            }
        }
        else {
            return {
                message: data.message
            }
        }
    },

    signup: async payload => {
        return await Fetch.post(`signup`,payload)
    },
    
    forgotPassword: async (params = {}) => {
        return await Fetch.post(`https://${params.domain}/api/forgot`,params.payload)
    }
}

module.exports = authentication