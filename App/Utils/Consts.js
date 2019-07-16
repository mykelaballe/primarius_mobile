import {Colors} from '../Themes'
import codePush from 'react-native-code-push'

const consts = {
	roles: {
		su:1,
		admin:2,
		hr:3,
		operation:4,
		user:5
	},
	role_names: {
		1:'Superadmin',
		2:'Administrator',
		3:'HR Manager',
		4:'Operation Manager',
		5:'User'
	},
	status: {
		completed: {label:'Completed', color:Colors.success},
		missed: {label:'Missed', color:Colors.missed},
		cancelled: {label:'Cancelled', color:Colors.cancelled},
		pending: {label:'Pending', color:Colors.pending},
	},
	per_page: 15,
	codepush: {
		deploymentKey: 'C1ie5ogYkt6jJ-PHWJQjbCounoDHH1yXdSoCV',
		installMode: codePush.InstallMode.IMMEDIATE
	},
	initialRoute: 'Dashboard'
}

module.exports = consts