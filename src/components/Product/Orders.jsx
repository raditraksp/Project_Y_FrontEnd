import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import axios from '../../config/api'
import Swal from 'sweetalert2'
import {Link, Redirect, NavLink} from 'react-router-dom'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { useRef } from 'react'


export default function Orders() {    

    const token = useSelector(state => state.auth.token)
    const [orders, setOrder] = useState([])
    const id = useSelector(state => state.auth.id)
    const uName = useSelector(state => state.auth.username)
    const roleId = useSelector(state => state.auth.role_id)
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const [buktiTrx, setBuktiTrx] = useState({})
    const buktiTrxRef = useRef()
    
    const getData = () => {
        const config = {headers: {Authorization: token}}
        axios.get('/orders', config)
            .then(res => setOrder(res.data))
            .catch(err => console.log({err}))
    }
    
    useEffect(() => {
        getData()
    }, [])

    // Button Accept Order
    const acceptOrder = (orders_id) => {
        Swal.fire({
            title: 'Apakah kamu yakin menerima orderan ini?',
            text: "Setelah ini Anda tinggal menunggu konfirmasi Admin.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
        }).then((res) => {
            // res.value bernilai true jika kita memilih 'Ya' , sebaliknya
            if (res.value) {
                const config = {headers: {Authorization: token}}
                axios.get(`/accepted/orders/${orders_id}`, config)
                .then(() => { 
                    Swal.fire(
                        'Berhasil!',
                        'Order sudah Anda terima.',
                        'success'
                    )
                    getData()
                })
            }
        })
    }

    // Button Reject Order
    const rejectOrder = (orders_id) => {
        Swal.fire({
            title: 'Apakah kamu yakin menolak orderan ini?',
            text: "Anda tidak bisa mengembalikannya lagi!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
        }).then((res) => {
            // res.value bernilai true jika kita memilih 'Ya' , sebaliknya
            if (res.value) {
                const config = {headers: {Authorization: token}}
                axios.get(`/rejected/orders/${orders_id}`, config)
                .then((res) => { 
                    Swal.fire(
                        'Berhasil!',
                        'Order sudah Anda tolak.',
                        'success'
                    )
                    getData()
                })
            }
        })
    }

    // Button Delete Order
    const deleteOrder = (orders_id) => {
        Swal.fire({
            title: 'Apakah kamu yakin menolak orderan ini?',
            text: "Anda tidak bisa mengembalikannya lagi!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
        }).then((res) => {
            // res.value bernilai true jika kita memilih 'Ya' , sebaliknya
            if (res.value) {
                const config = {headers: {Authorization: token}}
                axios.delete(`/orders/${orders_id}`, config)
                .then((res) => { 
                    Swal.fire(
                        'Berhasil!',
                        'Order sudah Anda tolak.',
                        'success'
                    )
                    getData()
                })
            }
        })
    }

    // Button Finish Order Seller
    const finishOrderSeller = (orders_id) => {
        Swal.fire({
            title: 'Apakah kamu yakin orderan sudah selesai?',
            text: "Setelah ini Anda tinggal menunggu konfirmasi User.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
        }).then((res) => {
            // res.value bernilai true jika kita memilih 'Ya' , sebaliknya
            if (res.value) {
                const config = {headers: {Authorization: token}}
                axios.get(`/seller_finish/orders/${orders_id}`, config)
                .then(() => { 
                    Swal.fire(
                        'Berhasil!',
                        'Mohon tunggu konfirmasi dari User.',
                        'success'
                    )
                    getData()
                })
            }
        })
    }

    // Button Finish Order User
    const finishOrderUser = (orders_id) => {
        Swal.fire({
            title: 'Apakah kamu yakin orderan sudah selesai?',
            text: "Setelah ini Anda tinggal memberikan rating Seller.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
        }).then((res) => {
            // res.value bernilai true jika kita memilih 'Ya' , sebaliknya
            if (res.value) {
                const config = {headers: {Authorization: token}}
                axios.get(`/user_finish/orders/${orders_id}`, config)
                .then(() => { 
                    Swal.fire(
                        'Berhasil!',
                        'Order Anda sudah selesai.',
                        'success'
                    )
                    getData()
                })
            }
        })
    }

    const changeBukti = (e) => {
        setBuktiTrx({file : URL.createObjectURL(e.target.files[0])})
    }

    const onSaveBuktiTrx = (orders_id) => {
        const data = new FormData()

        const bukti_trx = buktiTrxRef.current.files[0]

        data.append("payment_photo", bukti_trx)

        Swal.fire({
            title: 'Apakah bukti transfer sudah benar?',
            text: "Data sebelumnya akan diubah!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
        }).then((res) => {
            // res.value bernilai true jika kita memilih 'Ya' , sebaliknya
            if (res.value) {
                const config = {headers: {Authorization: token}}
                axios.post(`/orders/${orders_id}/payment_photo`, data, config)
                .then((res) => { 
                    Swal.fire(
                        'Bukti transfer sudah diupload!',
                        'Silahkan tunggu konfirmasi dari Admin',
                        'success'
                    )
                    getData() 
                })
            }
        })
        .catch(err => console.log(err))
    }

    const renderListUser = () => {
        return orders.map((order) => {
            if (id === order.user_id && order.status === 0 && uName != order.username){
                return (
                    <tr> 
                        <td>
                            {order.id}
                        </td>
                        <td>
                            {order.username}
                        </td>
                        <td>
                            {order.product_name}
                        </td>
                        <td>
                            {order.detail_order}
                        </td>
                        <td>
                            {order.total_amount}
                        </td>
                        <td>
                            {order.status}
                        </td>
                        <td>
                            <p>Masih menunggu konfirmasi</p>
                            <button type="button" onClick={() => {deleteOrder(order.id)}} className="btn btn-outline-danger btn-block">Batalkan</button>
                        </td>
                    </tr>
                )
            } else if (id === order.user_id && order.status === 1 && uName != order.username  && order.payment_photo == null){
                return (
                    <tr> 
                        <td>
                            {order.id}
                        </td>
                        <td>
                            {order.username}
                        </td>
                        <td>
                            {order.product_name}
                        </td>
                        <td>
                            {order.detail_order}
                        </td>
                        <td>
                            {order.total_amount}
                        </td>
                        <td>
                            {order.status}
                        </td>
                        <td>
                            <p>Mohon lakukan pembayaran segera!</p>
                            <div className="container_fluid">
                                <div className="row">
                                    <div className="col-6">
                                        <button type="button" onClick={toggle} className="btn btn-outline-primary mb-2 px-4 btn-block">Upload Bukti Transfer</button>
                                    </div>
                                    <div className="col-6">
                                        <button type="button" onClick={() => {deleteOrder(order.id)}} className="btn btn-outline-danger btn-block">Batalkan</button>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalBody>
                                <form className='form-group'>
                                    <label >Preview : </label>
                                    <img className="card m-auto" src={buktiTrx.file} height="200" width="200" />  
                                    <input onChange={changeBukti} ref={buktiTrxRef} type='file' className='form-control mt-3'/>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => {onSaveBuktiTrx(order.id)}}>Upload Bukti</Button>
                                <Button color="secondary" onClick={toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </tr>
                )
            } else if (id === order.user_id && order.status === 1 && uName != order.username){
                return (
                    <tr> 
                        <td>
                            {order.id}
                        </td>
                        <td>
                            {order.username}
                        </td>
                        <td>
                            {order.product_name}
                        </td>
                        <td>
                            {order.detail_order}
                        </td>
                        <td>
                            {order.total_amount}
                        </td>
                        <td>
                            {order.status}
                        </td>
                        <td>
                            <p>Bukti Transfer Anda sedang diproses!</p>
                        </td>
                    </tr>
                )
            } else if (id === order.user_id && order.status === 2 && uName != order.username){
                return (
                    <tr> 
                        <td>
                            {order.id}
                        </td>
                        <td>
                            {order.username}
                        </td>
                        <td>
                            {order.product_name}
                        </td>
                        <td>
                            {order.detail_order}
                        </td>
                        <td>
                            {order.total_amount}
                        </td>
                        <td>
                            {order.status}
                        </td>
                        <td>
                            <p>Maaf order Anda ditolak oleh Seller</p>
                            <button type="button" onClick={() => {deleteOrder(order.id)}} className="btn btn-outline-danger btn-block">Hapus Order</button>
                        </td>
                    </tr>
                )
            } else if (id === order.user_id && order.status === 3 && uName != order.username) {
                return (
                    <tr> 
                        <td>
                            {order.id}
                        </td>
                        <td>
                            {order.username}
                        </td>
                        <td>
                            {order.product_name}
                        </td>
                        <td>
                            {order.detail_order}
                        </td>
                        <td>
                            {order.total_amount}
                        </td>
                        <td>
                            {order.status}
                        </td>
                        <td>
                            <p>Pembayaran Anda sudah kami terima.</p>
                            <p>Silahkan tunggu pesanan Anda hingga selesai.</p>
                        </td>
                    </tr>
                )
            } else if (id === order.user_id && order.status === 4 && uName != order.username) {
                return (
                    <tr> 
                        <td>
                            {order.id}
                        </td>
                        <td>
                            {order.username}
                        </td>
                        <td>
                            {order.product_name}
                        </td>
                        <td>
                            {order.detail_order}
                        </td>
                        <td>
                            {order.total_amount}
                        </td>
                        <td>
                            {order.status}
                        </td>
                        <td>
                            <p>Maaf, pembayaran Anda ditolak. Silahkan upload ulang bukti transfer Anda!</p>
                            <div className="container_fluid">
                                <div className="row">
                                    <div className="col-6">
                                        <button type="button" onClick={toggle} className="btn btn-outline-primary mb-2 px-4 btn-block">Upload Bukti Transfer</button>
                                    </div>
                                    <div className="col-6">
                                        <button type="button" onClick={() => {deleteOrder(order.id)}} className="btn btn-outline-danger btn-block">Batalkan</button>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalBody>
                                <form className='form-group'>
                                    <label >Preview : </label>
                                    <img className="card m-auto" src={buktiTrx.file} height="200" width="200" />  
                                    <input onChange={changeBukti} ref={buktiTrxRef} type='file' className='form-control mt-3'/>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => {onSaveBuktiTrx(order.id)}}>Upload Bukti</Button>
                                <Button color="secondary" onClick={toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </tr>
                )
            } else if (id === order.user_id && order.status === 5 && uName != order.username) {
                return (
                    <tr> 
                        <td>
                            {order.id}
                        </td>
                        <td>
                            {order.username}
                        </td>
                        <td>
                            {order.product_name}
                        </td>
                        <td>
                            {order.detail_order}
                        </td>
                        <td>
                            {order.total_amount}
                        </td>
                        <td>
                            {order.status}
                        </td>
                        <td>
                            <p>Order Anda sudah dikerjakan Seller, silahkan klik "Selesai" jika order sudah Anda terima</p>
                            <button type="button" onClick={() => {finishOrderUser(order.id)}} className="btn btn-primary btn-block">Selesai</button>
                        </td>
                    </tr>
                )
            }
        })
    }

    const renderListSeller = () => {
        return orders.map((order) => {
            if (id === order.seller_id && order.status === 0 && uName != order.username){
                return (
                    <tr> 
                        <td>
                            {order.id}
                        </td>
                        <td>
                            {order.username}
                        </td>
                        <td>
                            {order.product_name}
                        </td>
                        <td>
                            {order.detail_order}
                        </td>
                        <td>
                            {order.total_amount}
                        </td>
                        <td>
                            {order.status}
                        </td>
                        <td>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-6">
                                        <button type="button" onClick={() => {acceptOrder(order.id)}} className="btn btn-outline-primary mb-2 px-4 btn-block">Accept</button>
                                    </div>
                                    <div className="col-6">
                                        <button type="button" onClick={() => {rejectOrder(order.id)}} className="btn btn-outline-danger btn-block">Reject</button>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                )
            } else if (id === order.seller_id && order.status === 1 && uName != order.username) {
                return (
                    <tr> 
                        <td>
                            {order.id}
                        </td>
                        <td>
                            {order.username}
                        </td>
                        <td>
                            {order.product_name}
                        </td>
                        <td>
                            {order.detail_order}
                        </td>
                        <td>
                            {order.total_amount}
                        </td>
                        <td>
                            {order.status}
                        </td>
                        <td>
                            <p>Mohon ditunggu pembayaran dari User.</p>
                        </td>
                    </tr>
                )
            } else if (id === order.seller_id && order.status === 2 && uName != order.username) {
                return (
                    <tr> 
                        <td>
                            {order.id}
                        </td>
                        <td>
                            {order.username}
                        </td>
                        <td>
                            {order.product_name}
                        </td>
                        <td>
                            {order.detail_order}
                        </td>
                        <td>
                            {order.total_amount}
                        </td>
                        <td>
                            {order.status}
                        </td>
                        <td>
                            <p>Anda sudah menolak orderan ini</p>
                        </td>
                    </tr>
                )
            } else if (id === order.seller_id && order.status === 3 && uName != order.username) {
                return (
                    <tr> 
                        <td>
                            {order.id}
                        </td>
                        <td>
                            {order.username}
                        </td>
                        <td>
                            {order.product_name}
                        </td>
                        <td>
                            {order.detail_order}
                        </td>
                        <td>
                            {order.total_amount}
                        </td>
                        <td>
                            {order.status}
                        </td>
                        <td>
                            <p>Pembayaran sudah kami terima, Silahkan kerjakan orderan Anda!</p>
                            <button type="button" onClick={() => {finishOrderSeller(order.id)}} className="btn btn-outline-primary mb-2 px-4 btn-block">Finish</button>
                        </td>
                    </tr>
                )
            } else if (id === order.seller_id && order.status === 4 && uName != order.username) {
                return (
                    <tr> 
                        <td>
                            {order.id}
                        </td>
                        <td>
                            {order.username}
                        </td>
                        <td>
                            {order.product_name}
                        </td>
                        <td>
                            {order.detail_order}
                        </td>
                        <td>
                            {order.total_amount}
                        </td>
                        <td>
                            {order.status}
                        </td>
                        <td>
                            <p>Pembayaran User ditolak, silahkan tunggu User mengupload ulang bukti pembayaran.</p>
                        </td>
                    </tr>
                )
            } else if (id === order.seller_id && order.status === 5 && uName != order.username) {
                return (
                    <tr> 
                        <td>
                            {order.id}
                        </td>
                        <td>
                            {order.username}
                        </td>
                        <td>
                            {order.product_name}
                        </td>
                        <td>
                            {order.detail_order}
                        </td>
                        <td>
                            {order.total_amount}
                        </td>
                        <td>
                            {order.status}
                        </td>
                        <td>
                            <p>Mohon tunggu User menyelesaikan orderan.</p>
                        </td>
                    </tr>
                )
            }
        })
    }

    if (token && roleId === 2) {
        return (
            <div className="fluid-container">
                <h1 className="text-center display-4">ORDER USER</h1>
                <label className="ml-3 font-italic">Note: Status 0 = Pending, Status 1 = Approved, Status 2 = Rejected</label>
                <table class="table table-hover text-center mb-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">SELLER</th>
                            <th scope="col">PRODUCT NAME</th>
                            <th scope="col">DETAIL</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">STATUS</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderListUser()}
                    </tbody>
                </table>
            </div>
        )
    } else if (token && roleId === 3) {
        return (
            <div className="fluid-container">
                <h1 className="text-center display-4">ORDER SELLER</h1>
                <label className="ml-3 font-italic">Note: Status 0 = Pending, Status 1 = Approved, Status 2 = Rejected</label>
                <table class="table table-hover text-center mb-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">USER</th>
                            <th scope="col">PRODUCT NAME</th>
                            <th scope="col">DETAIL</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">STATUS</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderListSeller()}
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <Redirect to='/' />
        )
    }
}