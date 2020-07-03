import React, {useState, useRef, useEffect} from 'react'
import axios from '../../config/api'
import { useSelector } from 'react-redux';



export default function BecomeSeller() {

    const token = useSelector(state => state.auth.token)
    const config = {headers: {Authorization: token}}    

    const [user, setUser] = useState({})


    useEffect(() => {
        getUserDetail()
    }, [])

    const getUserDetail = () => {
        axios.get(`/user/profile`, config)
        .then((res)=>setUser(res.data.result[0]))
        .catch((err)=>console.log(err))
    }

    const buttonBecomeSeller = () => {
        
        if(!user.ktp_number) return alert('Lengkapi profile anda terlebih dahulu')

        

    }

    return (
        <div>
            <h1>BECOME SELLER</h1>
            <button></button>
        </div>
    )
}
