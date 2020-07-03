import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import axios from '../../config/api'
import Swal from 'sweetalert2'
import {Link, Redirect} from 'react-router-dom'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';


export default function Orders() {    

    const token = useSelector(state => state.auth.token)
    const [orders, setOrder] = useState([])
    const id = useSelector(state => state.auth.id)
        

    const getData = () => {
        const config = {headers: {Authorization: token}}
         axios.get('/orders', config)
            .then(res => setOrder(res.data))
            .catch(err => console.log({err}))
    } 

    useEffect(() => {
        getData()
     }, [])

    const renderListUser = () => {
        return orders.map((order) => {
                if (id === order.user_id) return (
                        <tr> 
                            <td>
                                {order.product_id}
                            </td>
                            <td>
                                {order.seller_id}
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
                                {/* <Link to={`/product/detailproduct/${cart.product_id}`}> */}
                                    <button type="button" onClick={() => {}} className="btn btn-outline-primary mb-2 px-4 btn-block">Checkout</button>
                                {/* </Link> */}
                                <button type="button" onClick={() => {}} className="btn btn-outline-danger btn-block">Delete</button>
                            </td>
                        </tr>

                )
        })
    }

    const renderListSeller = () => {
        return orders.map((order) => {
                if (id === order.seller_id) return (
                        <tr> 
                            <td>
                                {order.product_id}
                            </td>
                            <td>
                                {order.user_id}
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
                                {/* <Link to={`/product/detailproduct/${cart.product_id}`}> */}
                                    <button type="button" onClick={() => {}} className="btn btn-outline-primary mb-2 px-4 btn-block">Checkout</button>
                                {/* </Link> */}
                                <button type="button" onClick={() => {}} className="btn btn-outline-danger btn-block">Delete</button>
                            </td>
                        </tr>

                )
        })
    }

    return token ? (
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
        
    ) : (
        <Redirect to='/' />
      )
}