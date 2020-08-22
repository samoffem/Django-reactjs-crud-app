import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addLead} from '../../store/actions/leads'
import {createMsg} from '../../store/actions/message' //come back to this !Important


class Form extends Component {
    state = {
        name: "",
        email: "",
        message: ""
    }
    errorRef = React.createRef()

    componentDidUpdate(prevProps){
        let {error, message} = this.props
        if(error !== prevProps.error){
           this.errorRef.current.className = "alert alert-danger"
           if (error.msg.name)
                this.errorRef.current.textContent =`Name Field: ${error.msg.name}`
           if (error.msg.email)
                this.errorRef.current.textContent = error.msg.email.join()
           if (error.msg.detail)
                this.errorRef.current.textContent = error.msg.detail
         }
        // if(message.msg !== prevProps.message.msg)
        //     this.errorRef.current.className = "alert alert-success"
        //     this.errorRef.current.textContent = message.msg

    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e)=>{
        e.preventDefault()
        const {name, email, message} = this.state
        const lead = {
            name,
            email,
            message
        }   
        this.props.addLead(lead);
        this.setState({
            name:"",
            email:"",
            message:""
        })
    }

    render(){        
        const {name, email, message} = this.state
        return (
        
            <div className="card card-body mt-4 mb-4" >
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Userame</label>
                        <input value={name} onChange={this.handleChange} type="text" name ="name" className="form-control" placeholder="Username"/>
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input value={email} onChange={this.handleChange} type="email" name="email" className="form-control" placeholder="name@example.com"/>
                    </div>
      
                    <div className="form-group">
                        <label>Message</label>
                        <textarea value={message} onChange={this.handleChange} type="text" name="message" className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                    </div>
                    <div className="container" style={{display: "flex"}}>
                        <button style={{height: "50px"}} className="btn btn-primary">Enter</button>
                        <div className="col" ref={this.errorRef}></div>
                    </div>
                    
                </form>   
            </div>
        )

    }
    
}
const mapStateToProps = (state)=>{
    return{
        error: state.errors,
        message: state.message
    }

}

export default connect(mapStateToProps, {addLead})(Form)
