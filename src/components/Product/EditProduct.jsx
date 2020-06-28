import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'reactstrap';
import {useParams} from 'react-router-dom'
import Swal from 'sweetalert2'

import axios from '../../config/api'

export default function EditProduct() {

    const token = useSelector(state => state.auth.token)
    let {product_id} = useParams()

    const getData = () => {
        const config = {headers: {Authorization: token}}
         axios.get(`/product/${product_id}`, config)
            .then(res => setProducts(res.data))
            .catch(err => console.log({err}))
    } 

    useEffect(() => {
        getData()
     }, [])


    const [products, setProducts] = useState({})  
    // const productRef = useRef()
    // const product = productRef.current.value
    // setProducts((prevProduct) => {return {...prevProduct, product: product}})
    
   
    // const [source, setSource] = useState([])

    // const onChangeCategory = (text) => { setProducts((prevProduct) => {return {...prevProduct, category_id: text.value}}) }
    // const onChangePriceBasic = (text) => { setProducts((prevProduct) => {return {...prevProduct, price_basic: text.value}}) }
    // const onChangeDetailBasic = (text) => { setProducts((prevProduct) => {return {...prevProduct, detail_basic: text.value}}) }
    // const onChangePricePremium = (text) => { setProducts((prevProduct) => {return {...prevProduct, price_premium: text.value}}) }
    // const onChangeDetailPremium = (text) => { setProducts((prevProduct) => {return {...prevProduct, detail_premium: text.value}}) }

    // menyimpan data
    const onSaveData = () => {

        const config = {headers: {Authorization: token}}
        const data = {
            product: products.product, category_id: products.category_id, price_basic: products.price_basic, detail_basic: products.detail_basic, price_premium: products.price_premium, detail_premium:products.detail_premium
        }
        axios.patch(`/product/${products.id}`, data, config)
        .then(res => console.log({res}))
        .catch(err => console.log({err}))
    }

    const srcPic = `http://localhost:2022/product/picture/${products.product_photo}`

    const editPhotoProduct = () => {

   }

        return (
            <div className="container">
            <h1 className="text-center display-4">Edit Product</h1>
            <form className='form-group'>
                                <div className="card-title ">
                                </div>
                                <label >Product Name:</label>
                                <input  type='text' value={products.product} className='form-control' required/>
        
                                <div className="card-title ">
                                </div>
                                <label for="category">Choose product category:</label>
                                    <select id="category" name="category" className='form-control'>
                                        <option value="1">Design</option>
                                        <option value="2">Software Development</option>
                                        <option value="3">Games</option>
                                        <option value="4">Training Online</option>
                                        <option value="5">Song</option>
                                        <option value="6">Adds</option>
                                        <option value="7">Other</option>
                                    </select>
        
                                <div className="card-title ">
                                </div>
                                <label >Basic Price:</label>
                                <input  type='text' value={products.price_basic} className='form-control'/>
                                
                                <div className="card-title ">
                                </div>
                                <label >Product Basic Detail:</label>
                                <textarea  type='des' value={products.detail_basic}  className='form-control'/>
                                
                                <div className="card-title ">
                                </div>
                                <label >Premium Price:</label>
                                <input  type='text' value={products.price_premium}  className='form-control'/>
                                
                                <div className="card-title ">
                                </div>
                                <label >Product Premium Detail:</label>
                                <textarea  type='text' value={products.detail_premium}  className='form-control'/>
                                
                                <div className="card-title ">
                                </div>
                                <label >Product Photo:</label>
                                <img className="card ml-2 mb-3" src={srcPic} width="300" />
                                <input  type='file' className='form-control'/>  
                            </form>
                            <div>
                                <button className="btn btn-success btn-block w-25 m-auto" onClick={onSaveData}>Save Product</button>
                            </div>

            </div>
        )
    }
