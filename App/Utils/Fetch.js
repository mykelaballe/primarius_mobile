import {Globals, Storage} from './'
import axios from 'axios'

let headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

let Fetch = {

  post: async (endpoint,data = null) => {
    let user = await Storage.doLoad(Globals.db.user)
    if(user.data) {
      headers.Authorization = 'Bearer ' + user.data.token
    }
    
    let response = await axios({
      method: 'post',
      url: `${Globals.api}${endpoint}`,
      headers,
      data: JSON.stringify(data)
    })

    return response.data || response
  },

  put: async(endpoint,data = null) => {
    let user = await Storage.doLoad(Globals.db.user)
    if(user.data) {
      headers.Authorization = 'Bearer ' + user.data.token
    }

    let response = await axios({
      method: 'put',
      url: `${Globals.api}${endpoint}`,
      headers,
      data: JSON.stringify(data)
    })

    return response.data || response
  },

  delete: async endpoint => {
    let user = await Storage.doLoad(Globals.db.user)
    if(user.data) {
      headers.Authorization = 'Bearer ' + user.data.token
    }

    let response = await axios({
      method: 'delete',
      url: `${Globals.api}${endpoint}`,
      headers
    })

    return response.data || response
  },

  get: async endpoint => {
    let user = await Storage.doLoad(Globals.db.user)
    if(user.data) {
      headers.Authorization = 'Bearer ' + user.data.token
    }

    let response = await axios({
      method: 'get',
      url: `${Globals.api}${endpoint}`,
      headers,
    })

    return response.data || response
  }
}

module.exports = Fetch