import axios from 'axios'
import {returnErrors} from './message'
import {USER_LOADING,
     USER_LOADED, 
     AUTH_ERROR, 
     LOGIN_SUCCESS, 
     LOGIN_FAIL, 
     LOGOUT_SUCCESS,
     REGISTER_SUCCESS,
     REGISTER_FAIL
    } from './types'

export const loadUser = ()=> (dispatch, getState)=>{
    //user loading
    dispatch({type: USER_LOADING})

    axios.get('/api/auth/user', configureToken(getState))
    .then(res=>{
        dispatch({
            type:USER_LOADED,
            payload: res.data
        })
    }).catch(err=>{
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({type:AUTH_ERROR})
    })
}

export const register = ({username, email, password})=> (dispatch)=>{

    //Headers
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    
    const body = JSON.stringify({username, email, password}) 

    axios.post('/api/auth/register', body, config)
    .then(res=>{
        dispatch({
            type:REGISTER_SUCCESS,
            payload: res.data
        })
    }).catch(err=>{
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({type:REGISTER_FAIL})
    })
}


export const login = (username, password)=> (dispatch)=>{

    //Headers
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    
    const body = JSON.stringify({username, password}) 

    axios.post('/api/auth/login', body, config)
    .then(res=>{
        dispatch({
            type:LOGIN_SUCCESS,
            payload: res.data
        })
    }).catch(err=>{
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({type:LOGIN_FAIL})
    })
}

export const logout = ()=> (dispatch, getState)=>{

    axios.post('/api/auth/logout',null, configureToken(getState))
    .then(res=>{
        dispatch({
            type:LOGOUT_SUCCESS,
        })
    }).catch(err=>{
        dispatch(returnErrors(err.response.data, err.response.status));
        
    })
}

// Create helper function
export const configureToken = (getState)=>{
    //get token from state
    const token = getState().auth.token

    //Headers
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }

    //Add to headers if token
    if(token){
        config.headers["Authorization"]= `Token ${token}`
    }
   return config
}