import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
// Import action creator
// import {onLoginUser} from '../actions/index'
// Akan me-redirect ke alamat tertentu
import {Redirect} from 'react-router-dom'
import ListProduct from './Product/ListProduct'
import axios from '../config/api'

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

        return (
            <div className = "container-fluid">
                {/* List Products */}
                {renderProducts()}
            </div>
        )
    }
