

export const createMessage = (msg)=>{
    return {
        type: "CREATE_MSG",
        payload: msg
    }
}

export const returnErrors = (msg, status)=>{
    return{
        type: "GET_ERRORS",
        payload: {msg, status}
    }
}