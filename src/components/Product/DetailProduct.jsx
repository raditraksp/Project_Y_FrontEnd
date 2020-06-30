import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'
import {useParams, Link} from 'react-router-dom'
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

        return (
            <div className="container-fluid w-75 justify-content-between">
                <div className="row">
                    <div className="col-7 mx-auto my-3">
                        <div className="">
                            <div style={{height:50}}>
                                <h5 className=" font-weight-bold h3">{products.product}</h5>
                            </div>
                        </div>
                        <div className="mb-3">
                            <img className=" w-100 m-auto" src={srcPic} alt=""/>
                        </div>
                        <div className="my-5">
                            <label className="font-weight-bold h3">Detail Product: </label>
                            <p className="my-3">{products.detail_product}</p>
                        </div>
                    </div>

                    <div className="col-1">
                    </div>

                    <div className="card col-4 mx-auto my-3" style={{height:'50%'}}>
                        <div className="card-body ">
                            <div style={{height:50}}>
                                <h5 className="card-title font-weight-bold text-center">Pilihan Paket</h5>
                            </div>
                            <div className="row my-5">
                                <div className="col-6">
                                    <label className="font-weight-bold">Basic Package Detail: </label>
                                    <p className="card-text">{products.detail_basic}</p>
                                    
                                    <label className="font-weight-bold">Basic Package Price: </label>
                                    <p className="card-text font-weight-bold text-danger">Rp. {products.price_basic}</p>
                                </div>
                                <div className="col-6">

                                    <label className="font-weight-bold">Premium Package Detail: </label>
                                    <p className="card-text">{products.detail_premium}</p>
                                    
                                    <label className="font-weight-bold">Premium Package Price: </label>
                                    <p className="card-text font-weight-bold text-danger">Rp. {products.price_premium}</p>
                                </div>
                            </div>
                            
                            <Link to={`/product/editproduct/${products.id}`}>
                                <button type="button" className="btn btn-outline-secondary mb-2 px-4 btn-block">Edit</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
}
