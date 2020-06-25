
const init = {
   id: "",
   username: "",
   token : ""
}

export default (state = init , {type, payload}) => {
   switch(type) {
      case 'LOGIN_SUCCESS':
         return {...state, id: payload.id, username: payload.username, token : payload.token}
      case 'LOGOUT_SUCCESS':
         return {...init}
      
      default :
         return state
   }
}