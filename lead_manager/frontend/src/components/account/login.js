import React, {Component} from 'react'
import{Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../store/actions/auth'



class Login extends Component {
    state = {
        username: "",
        password: ""
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e)=>{
        e.preventDefault()
       this.props.login(this.state.username, this.state.password)
    }

    render(){
        const {errors} = this.props
        let errorAlert = ""
        if(errors.msg.non_field_errors){
            console.log(errors.msg)
            errorAlert = (
                <p style={{float:"right", marginBottom:0}} className="alert alert-danger">{errors.msg.non_field_errors.join()}</p>
            )
        }

        if(this.props.isAuthenticated){
            return <Redirect to="/" />
        }
        
        const {username, password} = this.state
        return (
        
            <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
                <h2 className="text-center">Login</h2>
                <div className="card card-body mt-4 mb-4" >
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input value={username} onChange={this.handleChange} type="text" name ="username" className="form-control" placeholder="Username"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input value={password} onChange={this.handleChange} type="password" name="password" className="form-control" placeholder="Password"/>
                        </div>
                        <div style={{overflow: "hidden"}}>
                            <button style={{height: "50px"}} className="btn btn-lg btn-primary">Login</button>
                            {errorAlert}
                        </div>
                       
                        <div className="mt-2">
                            <p>Dont have an account? <Link to="/register">Register</Link></p>
                        </div>
                        
                        
                    </form>   
                </div>
            </div>

        </div>
        
        )

    }
    
}
const mapStateToProps = (state)=>{
    return{
        isAuthenticated: state.auth.isAuthenticated,
        errors: state.errors
    }
}

export default connect(mapStateToProps, {login})(Login)
