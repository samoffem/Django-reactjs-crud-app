import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../store/actions/auth'
import {createMessage} from '../../store/actions/message'

class Register extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        password2: ""
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e)=>{
        e.preventDefault()
        const {username, email, password, password2} = this.state
        if(password !== password2){
            this.props.createMessage({passwordsNotMatch: "Passwords do not match"})
        }else {
            const newUser = {
                username,
                email,
                password
            }
            this.props.register(newUser)
        }
    }

    render(){
        
        const {message} = this.props
        let errorAlert = ""
        if(message.msg){
            errorAlert = (
            <p style={{float:"right", marginBottom:0}} className="alert alert-danger">{message.msg.passwordsNotMatch}</p>
            )
        }
        const {username, email, password, password2} = this.state
        if(this.props.isAuthenticated){
            return <Redirect to="/" />
        }
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Register</h2>
                    <div className="card card-body mt-4 mb-4" >
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <input value={username} onChange={this.handleChange} type="text" name ="username" className="form-control"  placeholder="Username"/>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input value={email} onChange={this.handleChange} type="email" name ="email" className="form-control" placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input value={password} onChange={this.handleChange} type="password" name="password" className="form-control" placeholder="Password"/>
                            </div>

                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input value={password2} onChange={this.handleChange} type="password" name="password2" className="form-control" placeholder="Confirm Password"/>
                            </div>
                            <div style={{overflow: "hidden"}}>
                                <button style={{height: "50px"}} style={{height: "50px"}} className="btn btn-primary">Register</button>
                                {errorAlert}
                            </div>
                            
                            <div>
                                <p>Already have an account? <Link to="/login">Login</Link></p>
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
        message: state.message
    }
}

export default connect(mapStateToProps, {register, createMessage})(Register)

