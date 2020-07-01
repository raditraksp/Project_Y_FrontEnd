import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import axios from '../../config/api'
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';


export default function Cart() {    

    const token = useSelector(state => state.auth.token)
    const [carts, setCart] = useState([])
        

    const getData = () => {
        const config = {headers: {Authorization: token}}
         axios.get('/products/cart', config)
            .then(res => setCart(res.data))
            .catch(err => console.log({err}))
    } 

    useEffect(() => {
        getData()
     }, [])

     // button delete product
    const deleteCart = (cart_id) => {
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
                axios.delete(`/cart/${cart_id}`, config)
                .then((res) => { 

                    Swal.fire(
                        'Berhasil!',
                        'Produk berhasil di hapus dari cart.',
                        'success'
                    )
                    getData() 
                })
            }
          })
    }

    
    const renderList = () => {
        return carts.map((cart) => {
            if (carts.length === 0) return <div className="text-center"> <h3>No Product in Cart</h3> </div>
            return carts.map((cart) => {
                const srcPic = `http://localhost:2022/product/picture/${cart.picture}`

                return (
                        <tr> 
                            <td>
                                {cart.product_id}
                            </td>
                            <td>
                                {cart.username}
                            </td>
                            <td>
                                {cart.product_name}
                            </td>
                            <td>
                                {cart.detail_product}
                            </td>
                            <td>
                                {cart.price}
                            </td>
                            <td>
                                {cart.status}
                            </td>
                            <td>
                                <img className="card m-auto" src={srcPic} height="100" width="150" />  
                            </td>
                            <td>
                                <Link to={`/product/detailproduct/${cart.product_id}`}>
                                    <button type="button" className="btn btn-outline-primary mb-2 px-4 btn-block">Detail</button>
                                </Link>
                                <button type="button" onClick={() => {deleteCart(cart.id)}} className="btn btn-outline-danger btn-block">Delete</button>
                            </td>
                        </tr>

                    )
                    })
                })
    }
    return (
        <div className="fluid-container">
        {/* List Product */}
        <h1 className="text-center display-4">CART</h1>
        {/* <Link to="/product/addproduct">
            <button type="button" className="btn btn-success mb-2 px-4 btn-block w-25 float-right mr-3">Add Product</button>
        </Link> */}
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
                <th scope="col">PICTURE</th>
                <th scope="col">ACTION</th>
                </tr>
            </thead>
            <tbody>
                {renderList()}
            </tbody>
        </table>
        
    </div>
        
    )
}
