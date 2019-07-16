import {Alert} from 'react-native'
import {Globals, Consts} from './'
import RNFetchBlob from 'react-native-fetch-blob'
import FilePickerManager from 'react-native-file-picker'
import Toast from 'react-native-root-toast'

const moment = require('moment')

const func = {
  	formatSecondsToMinutes: seconds => {
		
		if(seconds <= 0) return '00:00'

		let mod = parseInt(seconds / 60)
		let secPart = seconds - (mod * 60)

		return `${mod < 10 ? '0' : ''}${mod}:${secPart < 10 ? '0' : ''}${secPart}`
	},
	log: data => {
		let x = ''
		for(let prop in data) x += `${prop} : ${data[prop]}\n`
		return x
	},
	checkIfValidEmail: email => {
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    	return re.test(String(email).toLowerCase())
	},
	checkIfValidPassword: pwd => {
		let special_chars = ['@','#','$','%','^','&','+','=','{','}','|','(',')','/','\\','!','-','~','`','.','*','?','[',']','<','>',',']
		let has_special_char = false, has_uppercase = false, has_number = false
		
		for(let s in pwd) {
            let ascii = pwd.charCodeAt(s)
            
            if(ascii >= 65 && ascii <= 90) has_uppercase = true

            if(ascii >= 48 && ascii <= 57) has_number = true

			if(special_chars.indexOf(pwd[s]) >= 0) has_special_char = true
		}
		
		return !has_special_char || !has_uppercase || !has_number ? false : true
	},
	isNumeric: value => {
		let valid = true
		for(let v in value) {
			let ascii = value.charCodeAt(v)

			if(ascii < 48 || ascii > 57) valid = false
		}

		return valid
	},
	checkPasswordLength: pwd => {
		return pwd.length < Consts.min_pwd_len || pwd.length > Consts.max_pwd_len ? false : true
	},
	generateUsername: value => {
		return value.substr(-5,5)
	},
	getCurYear: () => moment().format('YYYY'),
	getCurMonth() {
		 return this.getMonth(parseInt(moment().format('M') - 1), true)
	},
	getCurWeekRange() {
		let startDate = moment().startOf('week').format('M DD, YYYY')
		let endDate = moment().endOf('week').format('M DD, YYYY')
		let sDate = startDate.split(' ')
		let eDate = endDate.split(' ')

		return `${this.getMonth(sDate[0] - 1)} ${sDate[1]} ${sDate[2]} - ${this.getMonth(eDate[0] - 1)} ${eDate[1]} ${eDate[2]}`
	},
	getCurDate() {
		return `${this.getCurMonth()} ${moment().format('DD')}, ${this.getCurYear()}`
	},
	getToday() {
		return moment().format('YYYY-MM-DD')
	},
	getDatePeriod(range) {
		if(range === 'year') return this.getCurYear()
		else if(range === 'month') return this.getCurMonth()
		else if(range === 'week') return this.getCurWeekRange()
		else if(range === 'today') return this.getCurDate()
	},
	formatDate (date) {
		return `${this.getMonth(moment(date).format('M') - 1)} ${moment(date).format('DD, YYYY HH:mm a')}`
	},
	isImageRemote (path) {
		return path.includes('https')
	},
	ask:(msg, title, buttons) => Alert.alert(title, msg, buttons),
	downloadFile: async file => {
		try {
			const {config, fs} = RNFetchBlob
			let PictureDir = fs.dirs.PictureDir
			let options = {
				fileCache:true,
				addAndroidDownloads:{
					useDownloadManager:true,
					notification:false,
					path:`${PictureDir}/${file}`,
					description:'Downloading File'
				}
			}
			config(options)
			.fetch('GET',`${Globals.s3}${file}`)
			.then((res) => {
				Toast.show('Download Complete')
			})
			.catch(err => {})
		}
		catch(err) {
			Toast.show(Globals.error.generic)
		}
	  }
}

module.exports = func