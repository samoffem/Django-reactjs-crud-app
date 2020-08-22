import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom'
import Header from './layout/Header' 
import Dashboard from './Leads/Dasboard'
import store from '../store/store'
import { Provider } from 'react-redux'
import { HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Login from './account/login'
import Register from './account/register'
import PrivateRoute from './common/PrivateRoute'
import {loadUser} from '../store/actions/auth'

class App extends Component {

    componentDidMount(){
        store.dispatch(loadUser())
    }
    render(){
        return(
            <Router>
                <Fragment>
                    <Header/>
                    <div className="container">
                        <Switch>
                            <PrivateRoute exact path="/" component={Dashboard} />
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Register}/>
                        </Switch>
                        
                    </div>
                </Fragment>
            </Router>
    
            
        )
    }
}

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('app') )