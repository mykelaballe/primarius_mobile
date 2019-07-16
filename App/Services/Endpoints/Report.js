import {Fetch, Globals} from '../../Utils'

const report = {
    getReportUserDemerits: async (params = {}) => {
        let endpoint = `report/demerits`
        let filters = []

        if(params.date) filters.push(`date=${params.date}`)
        if(params.from) filters.push(`from=${params.from}`)
        if(params.to) filters.push(`to=${params.to}`)

        if(filters.length > 0) endpoint += `?${filters.join('&')}`

        return await Fetch.get(endpoint)
    }
}

module.exports = report