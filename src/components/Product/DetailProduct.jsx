import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from '../../config/api'

export default function DetailProduct() {
    const [products, setProducts] = useState({}) 
    const token = useSelector(state => state.auth.token)
    let {product_id} = useParams()
    const srcPic = `http://localhost:2022/product/picture/${products.product_photo}`

    const getData = () => {
        const config = {headers: {Authorization: token}}
         axios.get(`/product/${product_id}`, config)
            .then(res => setProducts(res.data))
            .catch(err => console.log({err}))
    } 

    useEffect(() => {
        getData()
     }, [])


    

    const addToCart = (id) => {
        
       alert(`${products.product} berhasil ditambahkan ke keranjang`)
    }

    if(products.price_premium != 0) {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="card col-5 mx-auto my-3">
                        <img className="card-img-top w-75 m-auto" src={srcPic} alt=""/>
                        <div className="card-body">
                            <div style={{height:50}}>
                                <h5 className="card-title font-weight-bold">{products.product}</h5>
                            </div>
                            <label className="font-weight-bold">Basic Package Detail: </label>
                            <p className="card-text">{products.detail_basic}</p>
                            
                            <label className="font-weight-bold">Basic Package Price: </label>
                            <p className="card-text font-weight-bold text-danger">Rp. {products.price_basic}</p>

                            <label className="font-weight-bold">Premium Package Detail: </label>
                            <p className="card-text">{products.detail_premium}</p>
                            
                            <label className="font-weight-bold">Premium Package Price: </label>
                            <p className="card-text font-weight-bold text-danger">Rp. {products.price_premium}</p>
                            <button onClick={() => {addToCart(products.id)}} className="btn btn-primary w-75 mx-auto btn-block my-3">Add to Cart</button>

                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="card col-5 mx-auto my-3">
                        <img className="card-img-top w-75 m-auto" src={srcPic} alt=""/>
                        <div className="card-body">
                            <div style={{height:50}}>
                                <h5 className="card-title font-weight-bold">{products.product}</h5>
                            </div>
                            <label className="font-weight-bold">Basic Package Detail: </label>
                            <p className="card-text">{products.detail_basic}</p>
                            
                            <label className="font-weight-bold">Basic Package Detail: </label>
                            <p className="card-text font-weight-bold text-danger">Rp. {products.price_basic}</p>
                            <button onClick={() => {addToCart(products.id)}} className="btn btn-primary w-75 mx-auto btn-block my-3">Add to Cart</button>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
