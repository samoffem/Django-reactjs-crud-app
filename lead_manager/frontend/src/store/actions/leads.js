import axios from 'axios'
import {returnErrors} from './message'
import {configureToken} from './auth'

export const getLeads = ()=>{
    return (dispatch,getState)=>{
        return axios
                .get("/api/leads/",configureToken(getState))
                .then((res)=>{
                    dispatch({
                        type: 'GET_LEADS',
                        payload: res.data
                    })
                }).catch(err=>
                    dispatch(returnErrors(err.response.data, err.response.status)))
    }
}

export const deleteLead = (id)=>{
    return (dispatch, getState)=>{
        return axios
                .delete(`/api/leads/${id}`, configureToken(getState))
                .then((res)=>{

                    dispatch({
                        type: 'DELETE_LEAD',
                        payload: id
                    })
                    dispatch({type: 'CREATE_MSG', payload: 'Lead has been deleted'})
                }).catch(err=> console.log(err))
    }
}

export const addLead = (lead)=>{
    console.log(lead)
    return (dispatch, getState)=>{
        return axios
                .post("/api/leads/", lead, configureToken(getState))
                .then((res)=>{
                    dispatch({
                        type: 'ADD_LEAD',
                        payload: res.data
                    })
                    dispatch({type: 'CREATE_MSG', payload: 'Lead has been added'})
                }).catch(err=>{
                    console.log(err.response.data)
                    dispatch(returnErrors(err.response.data, err.response.status))})
    }
}