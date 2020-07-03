import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {useParams, Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from '../../config/api'

export default function DetailProduct() {

    
    const [products, setProducts] = useState({}) 
    const [categories, setCategories] = useState([])
    
    
    const token = useSelector(state => state.auth.token)
    const id = useSelector(state => state.auth.id)
    const config = {headers: {Authorization: token}}
    
    let {product_id} = useParams()
    const srcPic = `http://localhost:2022/product/picture/${products.product_photo}`
    const sellerAvatar = `http://localhost:2022/user/avatar/${products.user_id}?unq=${new Date()}`
    
    
    const getData = () => {
        // const config = {headers: {Authorization: token}}
         axios.get(`/product/${product_id}`)
            .then(res => setProducts(res.data))
            .catch(err => console.log({err}))
    } 
    const getCategory = () => {
        axios.get(`/product/category/${product_id}`)
        .then((res)=> setCategories(res.data))
        .catch((err)=> console.log(err))
    }

    useEffect(() => {
        getData()
        getCategory()
     }, [])


     const renderCategory = () => {
        if(categories.length === 0) return (<div> No Category Added</div>)
        return categories.map((category)=>{
            return (
                    <button className="btn btn-outline-danger mr-2">{category.category}</button>
            )
        })
                
      }

    const addToCart = (price, detail) => {

        if (!token) return alert ('Anda Belum Login')
        const data = {
            user_id :id,
            seller_id:products.user_id,
            product_id: products.id,
            product_name: products.product, 
            detail_product: detail,
            price: price, 
            picture: products.product_photo
        }
       axios.post('/products/addtocart', data, config)
        .then(res => {
            Swal.fire(
                'New Product Added!',
                'Product ditambahkan ke dalam cart!',
                'success'
              )
            console.log(res.data)
        })
        .catch(err => console.log({err}))
    }

    // PRODUCT SENDIRI
        return id === products.user_id ? (
            <div className="container-fluid w-75 justify-content-between">
                <div className="font-italic">
                    Category Tag : {renderCategory()}
                </div>
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
        ) : (
            // PRODUCT ORANG LAIN
            <div>
            <div className="container-fluid w-75 justify-content-between">
                <div className="font-italic">
                    Category Tag : {renderCategory()}
                </div>
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

                    <div className="col-4 mx-auto my-3" style={{height:'50%'}}>
                        <div className="card">
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

                                <button type="button" className="btn btn-success mb-2 px-4 btn-block" onClick={()=>{addToCart(products.price_basic, products.detail_basic)}}>Add to Cart (Rp {products.price_basic})</button>
                                <button type="button" className="btn btn-success mb-2 px-4 btn-block" onClick={()=>{addToCart(products.price_premium, products.detail_premium)}}>Add to Cart (Rp {products.price_premium})</button>
                            </div>
                        </div>

                        {/* ABOUT THE SELLER */}
                        <div className="card mt-5 ">
                            <div className="card-body">
                                <div style={{height:50}}>
                                    <h5 className="card-title font-weight-bold text-center">About the Seller</h5>
                                </div>
                                <div className="row my-1">
                                    <div className="col-6 align-self-center float-left">
                                        <img  src={sellerAvatar} style={{height:150, width:150, border:1, borderRadius:100}} alt=""/>
                                    </div>
                                    <div className="col-6 my-2">
                                        <h4 class="card-title mt-5">{products.username}</h4>
                                    </div>
                                </div>
                                <div className="my-4">
                                    <h6 class="card-title mx-auto">Rating: </h6>
                                </div>
                                <div className="my-4">
                                <h6 class="card-title mx-auto">E-Mail: {products.email} </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}
