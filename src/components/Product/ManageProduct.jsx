import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import axios from '../../config/api'
import Swal from 'sweetalert2'
import {Link, Redirect} from 'react-router-dom'


export default function ManageProduct() {

    
    const token = useSelector(state => state.auth.token)

    const [products, setProducts] = useState([])        

    const getData = () => {
        const config = {headers: {Authorization: token}}
         axios.get('/products/me', config)
            .then(res => setProducts(res.data))
            .catch(err => console.log({err}))
    } 

    useEffect(() => {
        getData()
     }, [])
    

      // button delete product
    const deleteProduct = (id) => {
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
                axios.delete(`/product/${id}`, config)
                .then((res) => { 

                    Swal.fire(
                        'Berhasil!',
                        'Produk berhasil di hapus.',
                        'success'
                    )
                    getData() 
                })
            }
          })
    }

    


    const renderList = () => {
        if (products.length === 0) return <div className="text-center"> <h3>No Product Added</h3> </div>
        return products.map((product) => {
            const srcPic = `http://localhost:2022/product/picture/${product.product_photo}`
            // simpan ke redux


            return (
                    <tr> 
                        <td>
                            {product.id}
                        </td>
                        <td>
                            {product.product}
                        </td>
                        <td>
                            {product.category}
                        </td>
                        <td>
                            {product.status}
                        </td>
                        <td>
                            {product.detail_basic}
                        </td>
                        <td>
                            {product.price_basic}
                        </td>
                        <td>
                            {product.detail_premium}
                        </td>
                        <td>
                            {product.price_premium}
                        </td>
                        <td>
                            <img className="card m-auto" src={srcPic} height="100" width="150" />  
                        </td>
                        <td>
                            <Link to={`/product/editproduct/${product.id}`}>
                                <button type="button" className="btn btn-outline-secondary mb-2 px-4 btn-block">Edit</button>
                            </Link>
                            <Link to={`/product/detailproduct/${product.id}`}>
                                <button type="button" className="btn btn-outline-primary mb-2 px-4 btn-block">Detail</button>
                            </Link>
                            <button type="button" onClick={() => {deleteProduct(product.id)}}  className="btn btn-outline-danger btn-block">Delete</button>
                        </td>
                    </tr>

        )
        })
    }
    
    return token ?(
        <div className="fluid-container">
            {/* List Product */}
            <h1 className="text-center display-4">Manage Product</h1>
            <Link to="/product/addproduct">
                <button type="button" className="btn btn-success mb-2 px-4 btn-block w-25 float-right mr-3">Add Product</button>
            </Link>
            <label className="ml-3 font-italic">Note: Status 0 = Pending, Status 1 = Approved, Status 2 = Rejected</label>
            <table class="table table-hover text-center mb-5">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">PRODUCT NAME</th>
                    <th scope="col">CATEGORY</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">DETAIL BASIC</th>
                    <th scope="col">BASIC PRICE</th>
                    <th scope="col">DETAIL PREMIUM</th>
                    <th scope="col">PREMIUM PRICE</th>
                    <th scope="col">PICTURE</th>
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
