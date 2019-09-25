import axios from "axios"
import {
    getCookie
} from '../commit/Cookie.js'
export default {
    //方法1
    install(Vue) {
        Vue.prototype.$get = function (url) {
                return axios.get('http://192.168.50.198'+url, {
                    Headers: {
                        'token': getCookie()
                    },
                    // params: data,  
                });
            },
            Vue.prototype.$post = function (url, data) {
                return axios.post('http://192.168.50.198'+url,data,
            
                    {
                        Headers:{
                            'token':getCookie()
                        }
                    }
                    
                );
            }

    }
}