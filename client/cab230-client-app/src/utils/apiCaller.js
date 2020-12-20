import axios from 'axios';
import * as Config from './../constants/Config'

/**
 *Call API
 * @param {string} endpoint - The endpoint of API
 * @param {string} method - The moethod of API
 * @param {string} data - The data 
 */
export default function callApi(endpoint, method = 'GET', body) {
    return axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body
      }).catch(err => {
        console.log(err);      
      });
};
/**
 *Call API
 * @param {string} endpoint - The endpoint of API
 * @param {string} method - The moethod of API
 * @param {string} params - The optional parameter 
 */
export const callAuthedAPI = async (endpoint, method = 'GET', params) => {
  if (localStorage.getItem("token")) {
    var token = JSON.parse(localStorage.getItem("token"));
    
  } else {
    token = '';
  }
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${token.value}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }

  if(params){
    if(method === 'GET'){
      endpoint += '?' + objectToQueryString(params)
    }else{
      options.body = JSON.stringify(params)
    }
  }
  const res = await fetch(`${Config.API_URL}${endpoint}`, options)

  const result = await res.json()
  return result
}

/**
 * Convert parameter object to string
 * @param {string} object - The parameter object
 */
function objectToQueryString(obj) {
  return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}