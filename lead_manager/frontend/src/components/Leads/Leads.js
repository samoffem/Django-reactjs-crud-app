import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {getLeads, deleteLead} from '../../store/actions/leads'
import PropType from 'prop-types'
import trash from '../assets/icons/trash.svg'
import pencil from '../assets/icons/pencil-square.svg'

export class Leads extends Component {

    static propType = {
        leads: PropType.array.isRequired
    };
    
    componentDidMount(){
        this.props.getLeads()
    }
    render() {
        let count = 1
        
        return (
            <Fragment>
                <div ref={this.inputRef}></div>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Message</th>
                        <th></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.leads.map((lead)=>(
                            <tr key={lead.id}>
                                <th scope="row">{count++}</th>
                                <td>{lead.name}</td>
                                <td>{lead.email}</td>
                                <td>{lead.message}</td>
                                <td><img style={{cursor:"pointer", }} src={pencil} width="32" height="32"/></td>
                                <td><img style={{cursor:"pointer", }} src={trash} onClick={()=>this.props.deleteLead(lead.id)} alt="" width="32" height="32"/></td>
                            </tr>
                        ))}     
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        leads:state.leads.leads
    }

}
const mapDispatchToProps = (dispatch)=>{
    return{
        getLeads: ()=> dispatch(getLeads()),
        deleteLead: ()=> dispatch(deleteLead)
    }

}

export default connect(mapStateToProps, {getLeads, deleteLead})(Leads)
