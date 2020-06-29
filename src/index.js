import React from 'react'
import ReactDOM from 'react-dom'
// Provider akan menghubungkan React App dengan Redux
import {Provider} from 'react-redux'
// createStore akan mengolah hasil dari combineReducers
import store from './config/redux'
import App from './components/App'
import 'bootstrap/dist/css/bootstrap.min.css'
// import hasil combineReducer (belum siap pakai)


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
    document.getElementById('root')
)