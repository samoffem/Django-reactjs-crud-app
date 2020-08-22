import React  from 'react'
import {connect} from 'react-redux'
import {Router, Redirect, Route} from 'react-router-dom'

const privateRoute = ({component: Component, auth, ...rest})=>(
    <Route 
        {...rest}
        render = {props=>{
            if (auth.isLoading){
                return <h2>Loading...</h2>;
            } else if(!auth.isAuthenticated){
                return <Redirect to='/login' />;
            } else {
                return <Component {...props} />;
            }
        }}
    />
)

const mapStateToProps = (state)=>{
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps)(privateRoute)