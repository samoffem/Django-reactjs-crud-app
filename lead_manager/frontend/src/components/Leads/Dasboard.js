import React, { Component, Fragment } from 'react'
import Leads from './Leads'
import Form from './Form'


class Dasboard extends Component {
    render() {
        return (
            <Fragment>
            
                <Form />
                <Leads/> 
                      
            </Fragment>
        )
    }
}

export default Dasboard
