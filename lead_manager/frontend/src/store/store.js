import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

const initstate = {

}

const middleware = [thunk]
const store = createStore(rootReducer, initstate, applyMiddleware(...middleware))


export default store
