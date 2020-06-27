import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import axios from '../../config/api'

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

    const renderList = () => {
        if (products.length === 0) return <div className="text-center"> <h3>No Product Added</h3> </div>
        return products.map((product) => {
            const srcPic = `http://localhost:2022/product/picture/${product.product_photo}`
            console.log(product)

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
                    <img className="card" src={srcPic} height="100" width="100" />  
                </td>
                <td>
                    <button className="btn btn-outline-secondary mb-2 px-4 btn-block">Edit</button>
                    <button className="btn btn-outline-danger btn-block">Delete</button>
                </td>
            </tr>
        )
        })
    }

    
    return (
        <div className="fluid-container">
                {/* List Product */}
                <h1 className="text-center display-4">Manage Product</h1>
                <table class="table table-hover text-center mb-5">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">PRODUCT NAME</th>
                        <th scope="col">CATEGORY</th>
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
    )
}
