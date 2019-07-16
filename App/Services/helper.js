import {Consts} from '../Utils'

const helper = {
    paginate: page => {
        if(page) return `pagination[perpage]=${Consts.per_page}&pagination[page]=${page}`
        return ''
    }
}

module.exports = helper