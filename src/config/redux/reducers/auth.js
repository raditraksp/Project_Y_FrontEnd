
const init = {
   id: "",
   username: "",
   token : "",
   role_id : "",
   status_subscription : ""
}

export default (state = init , {type, payload}) => {
   switch(type) {
      case 'LOGIN_SUCCESS':
         return {...state, id: payload.id, username: payload.username, token : payload.token, role_id : payload.role_id, email : payload.email, status_subscription: payload.status_subscription}
      case 'LOGOUT_SUCCESS':
         return {...init}
      
      default :
         return state
   }
}