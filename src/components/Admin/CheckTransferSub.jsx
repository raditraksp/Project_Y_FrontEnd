import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import axios from '../../config/api'
import Swal from 'sweetalert2'
import { Redirect} from 'react-router-dom'


export default function CheckTransferSub() {

    
    const token = useSelector(state => state.auth.token)
    const role_id = useSelector(state => state.auth.role_id)
    const [users, setUsers] = useState([])        

    const getData = () => {
        const config = {headers: {Authorization: token}}
         axios.get('/admin/checkupgrade', config)
            .then(res => setUsers(res.data))
            .catch(err => console.log({err}))
    } 

    useEffect(() => {
        getData()
     }, [])
    

    // BUTTON APPORVED
    const onApproved = (user_id) => {
        Swal.fire({
            title: 'Apakah kamu yakin?',
            text: "Kamu tidak bisa mengembalikannya lagi!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
          }).then((res) => {
            // res.value bernilai true jika kita memilih 'Ya' , sebaliknya
            if (res.value) {
                const config = {headers: {Authorization: token}}
                axios.get(`/approved/upgrade/${user_id}`, config)
                .then((res) => { 

                    Swal.fire(
                        'Berhasil!',
                        'Produk berhasil di terima.',
                        'success'
                    )
                    getData() 
                })
                axios.delete(`/upgrade/${user_id}`, config)
            }
          })
    }

    // BUTTON REJECTED
    const onRejected = (user_id) => {        
        Swal.fire({
            title: 'Apakah kamu yakin?',
            text: "Kamu tidak bisa mengembalikannya lagi!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
            }).then((res) => {
            // res.value bernilai true jika kita memilih 'Ya' , sebaliknya
            if (res.value) {
                const config = {headers: {Authorization: token}}
                axios.get(`/rejected/upgrade/${user_id}`, config)
                .then((res) => { 

                    Swal.fire(
                        'Berhasil!',
                        'User berhasil di tolak.',
                        'success'
                    )
                    getData() 
                })
            }
            })
    }


    const renderList = () => {
        if (users.length === 0) return <div className="text-center"> <h3>No users</h3> </div>
        return users.map((user) => {
            const srcTransfer = `http://localhost:2022/transferphoto/${user.transfer_photo}`

            // simpan ke redux

            return (
                    <tr> 
                        <td>
                            {user.id}
                        </td>
                        <td>
                            {user.status}
                        </td>
                        <td>
                            {user.user_id}
                        </td>
                        <td>
                            <img className="card m-auto" src={srcTransfer} alt="" height="100" width="150" />  
                        </td>
                        <td>
                            <button type="button" onClick={() => {onApproved(user.user_id)}}  className="btn btn-warning btn-block"  >Approve</button>
                            <button type="button" onClick={() => {onRejected(user.user_id)}} className="btn btn-danger mb-2 px-4 btn-block">Reject</button>
                        </td>
                    </tr>

        )
        })
    }
    
    return role_id === 1 ? (
        <div className="fluid-container">
                {/* List user */}
                <h1 className="text-center display-4">CHECK USER UPGRADE</h1>
                <table class="table table-hover text-center mb-5">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">STATUS</th>
                        <th scope="col">USER ID</th>
                        <th scope="col">BUKTI TRANSFER</th>
                        <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderList()}
                    </tbody>
                </table>
              
            </div>
    ) : (
        <Redirect to='/' />
    )
}
