// Reducer / Divisi
// state = data dari brankas
// actuib = form dari user

let init = {
    id: "",
    username : "",
}

export default (state = init, action) => {
    switch (action.type){
        case 'LOGIN_SUCCESS':
            return {...state, id : action.payload.id, username: action.payload.username}

        case 'LOGOUT_SUCCESS' :
            return {...state, id : "", username: ""}

        default :
            return state
    }
}

 


// let action = {
//     type : 'LOGIN_SUCCESS',
//     payload : {
//         id: "1",
//         username : rochafi
//     }
// }


// let mobil = {name: 'Avanza', seat : 4}

// let car = {...mobil, name : 'Xpander'}

// car = {name: 'Xpander', seat : 4}