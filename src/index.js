import React from 'react'
import ReactDOM from 'react-dom'
// Provider akan menghubungkan React App dengan Redux
import {Provider} from 'react-redux'
// createStore akan mengolah hasil dari combineReducers
import {createStore} from 'redux'

import App from './components/App'
// import hasil combineReducer (belum siap pakai)
import reducers from './reducers/index'

let store_result = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
    <Provider store={store_result}>
        <App/>
    </Provider>, 
    document.getElementById('root')
)