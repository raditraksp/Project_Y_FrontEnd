import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
// Import action creator
// import {onLoginUser} from '../actions/index'
// Akan me-redirect ke alamat tertentu
import {Redirect} from 'react-router-dom'
import ListProduct from './Product/ListProduct'
import axios from '../config/api'
import './style.css'


export default function Home() {

    const token = useSelector(state => state.auth.token)
    const [products, setProducts] = useState([])
        

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

    const onButtonSearch = () => {
        alert('alert search')
    }

    const renderJumbotron = () => {
        if(!token){
            return (
                <div className="jumbotron">
                    <div className="container">
                        <h1 className="display-5 fa-font-awesome font-weight-bold">SELAMAT DATANG DI JASAJA.COM </h1>
                        <h1 className="lead font-weight-bold text-light">PORTAL FREELANCER TERBAIK DI INDONESIA</h1>
                        <hr className="my-4 font-weight-bold"/>
                        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                        <div className="row w-50 mx-auto mt-4">
                            <div className="col-10 p-0">
                                <input type="text" className="form-control my-auto h-100" placeholder='Try "logo design"'/>
                            </div>
                            <div className="col-2 p-0">
                                <button onClick={onButtonSearch} className="btn btn-primary btn-lg my-auto" >Search</button>
                            </div>
                        </div>
                    </div>
                </div> 
            )
        }
    }

        return (
            <div>
                <div>
                    {renderJumbotron()}
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

