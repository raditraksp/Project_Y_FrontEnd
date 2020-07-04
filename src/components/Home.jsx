import React, { useState, useEffect, useRef } from 'react'
import {Link, useParams, NavLink} from 'react-router-dom'
import { useSelector } from 'react-redux'
// Import action creator
// import {onLoginUser} from '../actions/index'
// Akan me-redirect ke alamat tertentu
import {Redirect} from 'react-router-dom'
import ListProduct from './Product/ListProduct'
import SearchProduct from './Product/SearchProduct'
import axios from '../config/api'
import './style.css'


export default function Home() {

    const token = useSelector(state => state.auth.token)
    const [products, setProducts] = useState([])
    const [checkSearch, setCheckSearch] = useState("")
    const searchRef = useRef()
    
    const onButtonSearch = () => {
        const search = searchRef.current.value
        
        if(search == "") return console.log('inputan kosong')
        setCheckSearch(`/searchproduct/${search}`)
    }    
        

    const getData = () => {
        // const config = {headers: {Authorization: token}}
         axios.get('/products')
            .then(res => setProducts(res.data))
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

    // const onButtonSearch = () => {
    //     const search = searchRef.current.value
    //     axios.get('/products')
    //     .then((res) => {
    //         let filterResult = []
    //         filterResult = res.data.filter((data) => {
    //             return (
    //                 data.product.toLowerCase().includes(search.toLowerCase())
    //             )
    //         })
    //         setProducts(filterResult)
    //     })
        
    // }

        return (
            <div>
                <div className="jumbotron">
                    <div className="container">
                        <h1 className="display-5 fa-font-awesome font-weight-bold">SELAMAT DATANG DI JASAJA.COM </h1>
                        <h1 className="lead font-weight-bold text-light">PORTAL PENJUALAN JASA TERBAIK DI INDONESIA</h1>
                        <hr className="my-4 font-weight-bold"/>
                        <p>Temukan produk jasa terbaik sesuai dengan kebutuhan anda</p>
                        <div className="row w-50 mx-auto mt-4">
                            <div className="col-10 p-0">
                                <input ref={searchRef} type="text" defaultValue="" className="form-control my-auto h-100" placeholder='Try "logo design"'/>
                            </div>
                            <div className="col-2 p-0">
                                {/* <button onClick={onButtonSearch} className="btn btn-primary btn-lg my-auto" >Search</button> */}
                                <Link to={checkSearch }>
                                    <button className="btn btn-primary btn-lg my-auto" onClick={onButtonSearch} >Search</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* List Products */}
                <div className="w-75 mx-auto">
                    <div className="card" style={{marginTop:100}}>
                        <label className="h4 font-weight-bold pl-3 pt-3"> RECOMMENDED PRODUCT</label>
                        {renderProducts()}
                        <a className="text-decoration-none h6 font-weight-bold pr-3 text-dark ml-auto" href="#">More ... </a>
                    </div>
                    <div className="card" style={{marginTop:100}}>
                        <label className="h4 font-weight-bold pl-3 pt-3"> BEST RATING</label>
                        {renderProducts()}
                        <a className="text-decoration-none h6 font-weight-bold pr-3 text-dark ml-auto" href="#">More ... </a>
                    </div>
                    <div className="card" style={{marginTop:100}}>
                        <label className="h4 font-weight-bold pl-3 pt-3"> NEWEST PRODUCT ADDED</label>
                        {renderProducts()}
                        <a className="text-decoration-none h6 font-weight-bold pr-3 text-dark ml-auto" href="#">More ... </a>
                    </div >
                    <div className="card" style={{marginTop:100}}>
                        <label className="h4 font-weight-bold pl-3 pt-3"> POPULAR PRODUCT </label>
                        {renderProducts()}
                        <a className="text-decoration-none h6 font-weight-bold pr-3 text-dark ml-auto" href="#">More ... </a>
                    </div>
                </div>
            </div>
        )
    }

