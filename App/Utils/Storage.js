import { AsyncStorage } from 'react-native'
import Storage from 'react-native-storage'

var storage = new Storage({
    // maximum capacity, default 1000 
    size: 12000,

    // Use AsyncStorage for RN, or window.localStorage for web.
    // If not set, data would be lost after reload.
    storageBackend: AsyncStorage,

    // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: null,

    // cache data in the memory. default is true.
    enableCache: true,

    // if data was not found in storage or expired,
    // the corresponding sync method will be invoked and return 
    // the latest data.
    sync : {
        
    }
})

storage.doSave = function(key, data, id=null){
	var obj={
		key:key,
		rawData:data
	}
	
	if(id !== null) obj[id] = id
	
	this.save(obj)
}

storage.doLoad = function(key, id=null){
	var obj={key:key}
	
	if(id !== null) obj[id] = id

	return this.load(obj)
}

module.exports = storage