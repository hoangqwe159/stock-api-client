import {callAuthedAPI} from './apiCaller'

export const registerUser = body => callAuthedAPI('/user/register', 'POST', body)

export const loginUser = body => callAuthedAPI('/user/login','POST', body)