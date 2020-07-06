import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
// Import action creator
// import {onLoginUser} from '../actions/index'
// Akan me-redirect ke alamat tertentu
import ListProduct from './Product/ListProduct'
import axios from '../config/api'
import './style.css'


export default function Home() {

    const token = useSelector(state => state.auth.token)
    const [products, setProducts] = useState([])
    const [productsBestRating, setProductsBestRating] = useState([])
    const [productsPremiumSeller, setProductsPremiumSeller] = useState([])
        

    const getData = () => {
        // const config = {headers: {Authorization: token}}
        axios.get('/products')
            .then(res => setProducts(res.data))
            .catch(err => console.log({err}))

        axios.get('/products/premiumseller/home')
            .then((res) => setProductsPremiumSeller(res.data))
            .catch(err => console.log({err}))

        axios.get('/products/bestrating/home')
            .then(res => setProductsBestRating(res.data))
            .catch(err => console.log({err}))
    } 

    useEffect(() => {
        getData()
     }, [])

  
    const renderProducts = () => {
        return(
            <ListProduct products={products}/>
        )
    }

    const renderProductsBestRating= () => {
        return (
            productsBestRating.map((product) => {
                const srcPic = `http://localhost:2022/product/picture/${product.product_photo}`
                const srcDetail = `/product/detailproduct/${product.id}`
                const sellerAvatar = `http://localhost:2022/user/avatar/${product.user_id}?unq=${new Date()}`
                // simpan ke redux
    
                if(product.product_total === 0 && product.status_subscription === 1) {
                    return (
                        <div key={product.id} className="card col-2 mx-4 my-2">
                            <a className="text-decoration-none" href={srcDetail}>   
                                <img className="card-img-top align-self-center mt-2 py-0" src={srcPic} style={{height:150}}  alt="Card image cap"/>
                            </a>
                            <div className="card-body p-0">
                            <div className="row my-1">
                                <div className="col-2 align-self-center float-left">
                                    <img  src={sellerAvatar} style={{height:30, width:30, border:1, borderRadius:100}} alt=""/>
                                </div>
                                <div className="col-10 my-2">
                                    <h6 className="card-title my-auto">{product.username}</h6>
                                </div>
                            </div>
                            <h5 className="card-title ">
                                <a className="text-decoration-none" style={{color:'#240075'}} href={srcDetail}>{product.product}</a>
                            </h5>
                            </div>
                            <div className="card-title">
                            </div>
                            <div className="row">
                                <div className="card-title col-4">
                                </div>
                                <div className="card-title col-8">
                                    <label className="card-text font-weight-bold float-right">From Rp {product.price_basic}</label>
                                </div>
                            </div>
                        </div>
                    )
    
                }else if(product.product_total === 0 && product.status_subscription === 2) {
                    return (
                        <div key={product.id} className="card col-2 mx-4 my-2">
                            <a className="text-decoration-none" href={srcDetail}>   
                                <img className="card-img-top align-self-center mt-2 py-0" src={srcPic} style={{height:150}}  alt="Card image cap"/>
                            </a>
                            <div className="card-body p-0">
                            <div className="row my-1">
                                <div className="col-2 align-self-center float-left">
                                    <img  src={sellerAvatar} style={{height:30, width:30, border:1, borderRadius:100}} alt=""/>
                                </div>
                                <div className="col-10 my-2">
                                    <h6 className="card-title my-auto">{product.username}</h6>
                                </div>
                            </div>
                            <h5 className="card-title ">
                                <a className="text-decoration-none" style={{color:'#240075'}} href={srcDetail}>{product.product}</a>
                            </h5>
                            </div>
                            <div className="card-title">
                                <label className="card-text font-weight-bold">Premium Seller</label>
                            </div>
                            <div className="row">
                                <div className="card-title col-4">
                                </div>
                                <div className="card-title col-8">
                                    <label className="card-text font-weight-bold float-right">From Rp {product.price_basic}</label>
                                </div>
                            </div>
                        </div>
                    )
                } else if (product.product_total !=0 && product.status_subscription === 2) {
                    return (
                        <div key={product.id} className="card col-2 mx-4 my-2">
                            <a className="text-decoration-none" href={srcDetail}>   
                                <img className="card-img-top align-self-center mt-2 py-0" src={srcPic} style={{height:150}}  alt="Card image cap"/>
                            </a>
                            <div className="card-body p-0">
                            <div className="row my-1">
                                <div className="col-2 align-self-center float-left">
                                    <img  src={sellerAvatar} style={{height:30, width:30, border:1, borderRadius:100}} alt=""/>
                                </div>
                                <div className="col-10 my-2">
                                    <h6 className="card-title my-auto">{product.username}</h6>
                                </div>
                            </div>
                            <h5 className="card-title ">
                                <a className="text-decoration-none" style={{color:'#240075'}} href={srcDetail}>{product.product}</a>
                            </h5>
                            </div>
                            <div className="card-title">
                                <label className="card-text font-weight-bold">Premium Seller</label>
                            </div>
                            <div className="row">
                                <div className="card-title col-4">
                                    <label className="card-text font-weight-bold text-danger">{product.rating_avg} ({product.product_total})</label>
                                </div>
                                <div className="card-title col-8">
                                    <label className="card-text font-weight-bold float-right">From Rp {product.price_basic}</label>
                                </div>
                            </div>
                        </div>
                    )
    
                }else if (product.product_total !=0 && product.status_subscription === 1) {
                    return (
                        <div key={product.id} className="card col-2 mx-4 my-2">
                            <a className="text-decoration-none" href={srcDetail}>   
                                <img className="card-img-top align-self-center mt-2 py-0" src={srcPic} style={{height:150}}  alt="Card image cap"/>
                            </a>
                            <div className="card-body p-0">
                            <div className="row my-1">
                                <div className="col-2 align-self-center float-left">
                                    <img  src={sellerAvatar} style={{height:30, width:30, border:1, borderRadius:100}} alt=""/>
                                </div>
                                <div className="col-10 my-2">
                                    <h6 className="card-title my-auto">{product.username}</h6>
                                </div>
                            </div>
                            <h5 className="card-title ">
                                <a className="text-decoration-none" style={{color:'#240075'}} href={srcDetail}>{product.product}</a>
                            </h5>
                            </div>
                            <div className="row">
                                <div className="card-title col-4">
                                    <label className="card-text font-weight-bold text-danger">{product.rating_avg} ({product.product_total})</label>
                                </div>
                                <div className="card-title col-8">
                                    <label className="card-text font-weight-bold float-right">From Rp {product.price_basic}</label>
                                </div>
                            </div>
                        </div>
                    )
    
                }
                })
        )
    }

    const renderProductsPremiumSeller = () => {

        return (
            productsPremiumSeller.map((product) => {
                const srcPic = `http://localhost:2022/product/picture/${product.product_photo}`
                const srcDetail = `/product/detailproduct/${product.id}`
                const sellerAvatar = `http://localhost:2022/user/avatar/${product.user_id}?unq=${new Date()}`
                // simpan ke redux
    
                if(product.product_total === 0 && product.status_subscription === 2) {
                    return (
                        <div key={product.id} className="card col-2 mx-4 my-2">
                            <a className="text-decoration-none" href={srcDetail}>   
                                <img className="card-img-top align-self-center mt-2 py-0" src={srcPic} style={{height:150}}  alt="Card image cap"/>
                            </a>
                            <div className="card-body p-0">
                            <div className="row my-1">
                                <div className="col-2 align-self-center float-left">
                                    <img  src={sellerAvatar} style={{height:30, width:30, border:1, borderRadius:100}} alt=""/>
                                </div>
                                <div className="col-10 my-2">
                                    <h6 className="card-title my-auto">{product.username}</h6>
                                </div>
                            </div>
                            <h5 className="card-title ">
                                <a className="text-decoration-none" style={{color:'#240075'}} href={srcDetail}>{product.product}</a>
                            </h5>
                            </div>
                            <div className="card-title">
                                <label className="card-text font-weight-bold">Premium Seller</label>
                            </div>
                            <div className="row">
                                <div className="card-title col-4">
                                </div>
                                <div className="card-title col-8">
                                    <label className="card-text font-weight-bold float-right">From Rp {product.price_basic}</label>
                                </div>
                            </div>
                        </div>
                    )
                } else if (product.product_total !=0 && product.status_subscription === 2) {
                    return (
                        <div key={product.id} className="card col-2 mx-4 my-2">
                            <a className="text-decoration-none" href={srcDetail}>   
                                <img className="card-img-top align-self-center mt-2 py-0" src={srcPic} style={{height:150}}  alt="Card image cap"/>
                            </a>
                            <div className="card-body p-0">
                            <div className="row my-1">
                                <div className="col-2 align-self-center float-left">
                                    <img  src={sellerAvatar} style={{height:30, width:30, border:1, borderRadius:100}} alt=""/>
                                </div>
                                <div className="col-10 my-2">
                                    <h6 className="card-title my-auto">{product.username}</h6>
                                </div>
                            </div>
                            <h5 className="card-title ">
                                <a className="text-decoration-none" style={{color:'#240075'}} href={srcDetail}>{product.product}</a>
                            </h5>
                            </div>
                            <div className="card-title">
                                <label className="card-text font-weight-bold">Premium Seller</label>
                            </div>
                            <div className="row">
                                <div className="card-title col-4">
                                    <label className="card-text font-weight-bold text-danger">{product.rating_avg} ({product.product_total})</label>
                                </div>
                                <div className="card-title col-8">
                                    <label className="card-text font-weight-bold float-right">From Rp {product.price_basic}</label>
                                </div>
                            </div>
                        </div>
                    )
    
                }})
        )
    }

        return (!token) ? (
            <div>
                <div className="jumbotron">
                <img src="../assets/logojasaja.png" alt=""/>
                    <div className="container float-right">
                        <h1 className="display-5 fa-font-awesome font-weight-bold">SELAMAT DATANG DI JASAJA.COM </h1>
                        <h1 className="lead font-weight-bold text-light">PORTAL PENJUALAN JASA TERBAIK DI INDONESIA</h1>
                        <hr className="my-4 font-weight-bold"/>
                        <p>Temukan produk jasa terbaik sesuai dengan kebutuhan anda</p>
                        <Link to="/searchproduct">
                            <div className="row w-50 mx-auto mt-4">
                                <button className="btn btn-info btn-block btn-lg mx-auto my-auto" >Try to find your best product!</button>
                            </div>
                        </Link>
                    </div>
                </div>
                {/* List Products */}
                <div className="mx-auto" style={{width:'80%'}}>
                    <div className="" style={{marginTop:100}}>
                        <a className="h4 text-dark font-weight-bold pl-3 pt-3 text-decoration-none" href="/products/premiumseller">Products From Premium Seller</a>
                        <div className="row">
                            {renderProductsPremiumSeller()}
                        </div>
                    </div>
                    <div className="" style={{marginTop:100}}>
                        <a className="h4 text-dark font-weight-bold pl-3 pt-3 text-decoration-none" href="/products/bestrating">Best Rating Products</a>
                        <div className="row">
                            {renderProductsBestRating()}
                        </div>
                    </div>
                    <div className="" style={{marginTop:100}}>
                        <a className="h4 text-dark font-weight-bold pl-3 pt-3 text-decoration-none" href="/products/popularproducts">Popular Products</a>
                        {renderProducts()}
                    </div >
                    <div className="" style={{marginTop:100}}>
                        <a className="h4 text-dark font-weight-bold pl-3 pt-3 text-decoration-none" href="/products/premiumseller">Popular Category</a>
                        {renderProducts()}
                    </div>
                </div>
            </div>
        ) : (
         
            <div>
            {/* List Products */}
            <div className="mx-auto" style={{width:'85%'}}>
                    <div className="" style={{marginTop:100}}>
                        <a className="h4 text-dark font-weight-bold pl-3 pt-3 text-decoration-none" href="/products/premiumseller">Products From Premium Seller</a>
                        <div className="row">
                            {renderProductsPremiumSeller()}
                        </div>
                    </div>
                    <div className="" style={{marginTop:100}}>
                        <a className="h4 text-dark font-weight-bold pl-3 pt-3 text-decoration-none" href="/products/bestrating">Best Rating Products</a>
                        <div className="row">
                            {renderProductsBestRating()}
                        </div>
                    </div>
                    <div className="" style={{marginTop:100}}>
                        <a className="h4 text-dark font-weight-bold pl-3 pt-3 text-decoration-none" href="/products/popularproducts">Popular Products</a>
                        {renderProducts()}
                    </div >
                    <div className="" style={{marginTop:100}}>
                        <a className="h4 text-dark font-weight-bold pl-3 pt-3 text-decoration-none" href="/products/premiumseller">Popular Category</a>
                        {renderProducts()}
                    </div>
                </div>
        </div>
             
        )
}

