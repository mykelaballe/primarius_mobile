import {Fetch} from '../Utils'
import {
    Authentication,
    User,
    Job,
    Organization,
    Application,
    Appointment,
    Type,
    Role,
    Settings,
    BankDetail,
    Report,
} from './Endpoints'
import helper from './helper'

const api = {
    ...Authentication,
    ...User,
    ...Job,
    ...Organization,
    ...Application,
    ...Appointment,
    ...Type,
    ...Role,
    ...Settings,
    ...BankDetail,
    ...Report,
}

module.exports = api