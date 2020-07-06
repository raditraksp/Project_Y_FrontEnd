import React, { useState, useEffect, useRef } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import {useParams} from 'react-router-dom'
import { useSelector } from 'react-redux'
// Import action creator
// import {onLoginUser} from '../actions/index'
// Akan me-redirect ke alamat tertentu
// import ListProduct from '.'
import axios from '../../config/api'


export default function SearchProduct() {   
    let {product_name} = useParams()
    const [products, setProducts] = useState([])

    const searchRef = useRef()

    useEffect(() => {
        getData()
     }, [])

    
    const getData = () => {
        axios.get('/products')
        .then((res) => {
            let filterResult = []
            filterResult = res.data.filter((data) => {
                return (
                    data.product.toLowerCase().includes(product_name.toLowerCase())
                )
            })
            setProducts(filterResult)
        })
        
    }

    const onButtonSearch = () => {
        const search = searchRef.current.value
        axios.get('/products')
        .then((res) => {
            let filterResult = []
            filterResult = res.data.filter((data) => {
                return (
                    data.product.toLowerCase().includes(search.toLowerCase())
                )
            })
            setProducts(filterResult)
        })
        
    }
    
    const renderSearch = products.map((product) => {
            const srcPic = `http://localhost:2022/product/picture/${product.product_photo}`
            const srcDetail = `/product/detailproduct/${product.id}`
            const sellerAvatar = `http://localhost:2022/user/avatar/${product.user_id}?unq=${new Date()}`
            // simpan ke redux

            return (
                <div key={product.id} className="card col-2 mx-4 my-4">
                    <a className="text-decoration-none" href={srcDetail}>   
                        <img className="card-img-top align-self-center mt-2 py-0" src={srcPic} alt="Card image cap"/>
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
                    <p className="card-text">Rating</p>
                    </div>
                    
                    <div>
                        <label className="card-text font-weight-bold float-right">STARTING AT Rp {product.price_basic}</label>
                    </div>
                </div>
        )
    })
    return (
            <div>
                <div className= "row">
                    <div className="row w-25 mx-2 mb-5">
                        <div className="col-10 p-0">
                            <input ref={searchRef} type="text" defaultValue="" className="form-control my-auto h-100" placeholder='Try "logo design"'/>
                        </div>
                        <div className="col-2 p-0">
                            {/* <button onClick={onButtonSearch} className="btn btn-primary btn-lg my-auto" >Search</button> */}
                                <button className="btn btn-primary btn-lg my-auto" onClick={onButtonSearch} >Search</button>
                        </div>
                    </div>
                </div>
                <div className= "row">
                {renderSearch}    

                </div>
            </div>
        
    )
}
