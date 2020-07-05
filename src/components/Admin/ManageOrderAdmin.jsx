import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import axios from '../../config/api'
import Swal from 'sweetalert2'
import {Link, Redirect} from 'react-router-dom'
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

export default function ManageOrderAdmin() {

    
    const token = useSelector(state => state.auth.token)
    const role_id = useSelector(state => state.auth.role_id)
    const [orders, setOrders] = useState([])
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)        

    const getData = () => {
        const config = {headers: {Authorization: token}}
         axios.get('/orders/admin', config)
            .then(res => setOrders(res.data))
            .catch(err => console.log({err}))
    } 

    useEffect(() => {
        getData()
     }, [])
    

    // BUTTON APPORVED
    const onApproved = (orders_id) => {
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
                axios.get(`/orders/${orders_id}/approved/admin/`, config)
                .then((res) => { 

                    Swal.fire(
                        'Berhasil!',
                        'Pembayaran sudah diterima.',
                        'success'
                    )
                    getData() 
                })
            }
          })
    }

    // BUTTON REJECTED
    const onRejected = (orders_id) => {        
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
                axios.get(`/orders/${orders_id}/rejected/admin/`, config)
                .then((res) => { 

                    Swal.fire(
                        'Berhasil!',
                        'Pembayaran sudah ditolak.',
                        'success'
                    )
                    getData() 
                })
            }
            })
    }


    const renderList = () => {
        if (orders.length === 0) return <div className="text-center"> <h3>No Orders Ongoing</h3> </div>
        return orders.map((order) => {
            const paymentPic = `http://localhost:2022/orders/${order.id}/payment/${order.payment_photo}`

            return (
                    <tr> 
                        <td>
                            {order.id}
                        </td>
                        <td>
                            <img className="card m-auto" src={paymentPic} height="100" width="150" />  
                        </td>
                        <td>
                            <button type="button" onClick={toggle} className="btn btn-outline-info mb-2 px-4 btn-block">Detail Payment</button>
                            <div className="container_fluid">
                                <div className="row">
                                    <div className="col-6">
                                        <button type="button" onClick={() => {onApproved(order.id)}} className="btn btn-primary btn-block">Approve</button>
                                    </div>
                                    <div className="col-6">
                                        <button type="button" onClick={() => {onRejected(order.id)}} className="btn btn-danger mb-2 px-4 btn-block">Reject</button>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalBody>
                                <div>
                                    <label >Preview : </label>
                                    <img className="card m-auto" src={paymentPic} height="400" width="400" />  
                                    <Button color="secondary" onClick={toggle}>Exit</Button>
                                </div>
                            </ModalBody>
                        </Modal>
                    </tr>
        )
        })
    }
    
    return role_id === 1 ? (
        <div className="fluid-container">
                {/* List Product */}
                <h1 className="text-center display-4">Manage Order</h1>
                <table class="table table-hover text-center mb-5">
                    <thead>
                        <tr>
                        <th scope="col">ID ORDER</th>
                        <th scope="col">PAYMENT PHOTO</th>
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
