
export const loginAction = (data) => {

   localStorage.setItem('user',JSON.stringify(data))
   return { type: 'LOGIN_SUCCESS', payload: data }
}