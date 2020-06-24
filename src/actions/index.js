// Action Creator = Customers

// object user saat login awal
// user = {id : 1 , username : 'rochafi, password: 'satuduatiga}

// object user saat refresh browser
// user = {id : 1 , username : 'rochafi}
export let onLoginUser = (user) => {

    // destruct object
    let {id, username} = user

    // Menyimpan data di localstorage
    localStorage.setItem('userData', JSON.stringify({id, username}))

    // Mengirim data ke redux untuk kemudian disimpan di redux state
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            id : user.id,
            username : user.username
        }
    }
}

export let onLogoutUser = () => {

    // Menghapus data dari local storage
    localStorage.removeItem('userData')

    // Mengirim data ke redux, untuk menghapus data user yang login dari redux state
    return {
        type: "LOGOUT_SUCCESS"
    }
} 


  