// combineReducers digunakan untuk menghubungkan semua reducer dengan 'brankas'
import {combineReducers} from 'redux'

// daftar reducers yang akan dihubungkan ke brankas
import AuthReducer from './AuthReducer'

export default combineReducers(
    {
        auth : AuthReducer
    }
) 



// {
//     cust : Costumer,
//     comp : Complain,
//     mon :Money
// }