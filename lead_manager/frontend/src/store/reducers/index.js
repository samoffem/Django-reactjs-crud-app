import { combineReducers } from 'redux'
import leads from './leads'
import errors from './errorReducer'
import message from './messageReducer'
import auth from './authReducer'

export default combineReducers({
    leads,
    errors,
    message,
    auth

})