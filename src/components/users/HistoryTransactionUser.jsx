import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'
import axios from '../../config/api'
import Swal from 'sweetalert2'
import {Link, Redirect} from 'react-router-dom'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Modal, ModalHeader, ModalBody, ModalFooter
  } from 'reactstrap';


export default function HistoryTransactionUser() {    

    const token = useSelector(state => state.auth.token)
    const [histories, setHistories] = useState([])
    const [ratings, setRatings] = useState([])
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const msgUser = useRef() 
    const selectRating = useRef()         

    const getData = () => {
        const config = {headers: {Authorization: token}}
         axios.get('/historytransaction/me', config)
            .then(res => setHistories(res.data))
            .catch(err => console.log({err}))
    } 

    useEffect(() => {
        getData()
     }, [])

     // ADD RATING PRODUCT
    const onAddRating = (product_id, order_id) => {  

        console.log(product_id, order_id)

        const config = {headers: {Authorization: token}}
        
        const getRating = () => {
            axios.get(`/product/ratings/${product_id}/${order_id}`, config)
            .then(res => { 
                setRatings(res.data)
            })
            getRating()
        }

        const message = msgUser.current.value
        const rating = parseInt(selectRating.current.value)
        const data = {message, rating}
        axios.post(`/product/addrating/${product_id}/${order_id}`, data, config)
        .then((res) => Swal.fire(
            'Ratting Submit!',
            'Terima kasih telah memberikan ulasan untuk produk ini',
            'success'
        ))
            .catch(err => alert('Product sudah di beri rating'))

    }

    
     const renderList = () => {
        return histories.map((history) => {
            if (histories.length === 0) return <div className="text-center"> <h3>No Product in History</h3> </div>
                const srcPic = `http://localhost:2022/product/picture/${history.picture}`

                return (
                        <tr> 
                            <td>
                                {history.id}
                            </td>
                            <td>
                                {history.username}
                            </td>
                            <td>
                                {history.order_id}
                            </td>
                            
                            <td>
                                {history.product_name}
                            </td>
                            <td>
                                {history.detail_order}
                            </td>
                            <td>
                               {history.total_amount}
                            </td>     
                            <td>
                                {history.status}
                            </td>
                            <td>
                                {history.order_time}
                            </td>
                            <td>
                                {history.finish_time}
                            </td>
                            <td>
                                <Link to={`/product/detailproduct/${history.product_id}`}>
                                    <button type="button" className="btn btn-outline-primary mb-2 px-4 btn-block">Detail</button>
                                </Link>
                                <button type="button" onClick={toggle} className="btn btn-success mb-2 px-4 btn-block">Add Rating</button>
                            </td>

                            <Modal isOpen={modal} toggle={toggle}>
                                    <ModalBody>
                                        <div>
                                            <label >Feedback untuk product ini :</label>
                                            <textarea ref={msgUser} type='text' className='form-control'/>
                                        </div>
                                        <div>
                                            <label >Pilih Rating :</label>
                                            <select ref={selectRating} className='form-control'>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                        <div className="container_fluid">
                                            <div className="row">
                                                <div className="col-6">
                                                    <button type="button" onClick={() => {onAddRating(history.product_id, history.order_id)}} className="btn btn-primary btn-block">Submit</button>
                                                </div>
                                                <div className="col-6">
                                                    <button type="button" onClick={toggle} className="btn btn-danger mb-2 px-4 btn-block">Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </ModalBody>
                                </Modal>
                        </tr>

                    )
                })
    }
    return token ? (
        <div className="fluid-container">
        {/* List Product */}
        <h1 className="text-center display-4">HISTORY TRANSACTION</h1>
        {/* <Link to="/product/addproduct">
            <button type="button" className="btn btn-success mb-2 px-4 btn-block w-25 float-right mr-3">Add Product</button>
        </Link> */}
        <label className="ml-3 font-italic">Note: Status 4 = Done, Status 2 = Rejected</label>
        <table class="table table-hover text-center mb-5">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">SELLER</th>
                <th scope="col">ORDER ID</th>
                <th scope="col">PRODUCT NAME</th>
                <th scope="col">DETAIL</th>
                <th scope="col">AMOUNT</th>
                <th scope="col">STATUS</th>
                <th scope="col">ORDER TIME</th>
                <th scope="col">FINISH TIME</th>
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
