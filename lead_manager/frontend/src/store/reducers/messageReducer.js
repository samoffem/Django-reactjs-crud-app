import {CREATE_MSG} from '../actions/types'
const initstate = {}

export default function(state=initstate, action){
    switch (action.type) {
        case CREATE_MSG:
            return {
                msg: action.payload
            }
        default:
            return state
    }

}