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
    const productRef = useRef()
    const categoryRef = useRef()
    const priceBasicRef = useRef()
    const detailBasicRef = useRef()
    const pricePremiumRef = useRef()
    const detailPremiumRef = useRef()
    const productPhotoRef = useRef() 

    // menyimpan data
    const onSaveData = () => {
        const product = productRef.current.value
        const category = categoryRef.current.value
        const price_basic = parseInt(priceBasicRef.current.value)
        const detail_basic = detailBasicRef.current.value
        const price_premium = parseInt(pricePremiumRef.current.value)
        const detail_premium = detailPremiumRef.current.value

        const config = {headers: {Authorization: token}}
        const data = {
            product, 
            category_id: category, 
            price_basic, 
            detail_basic, 
            price_premium, 
            detail_premium        
        }

        Swal.fire({
            title: 'Apakah kamu yakin?',
            text: "Data sebelumnya akan diubah!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
          }).then((res) => {
            // res.value bernilai true jika kita memilih 'Ya' , sebaliknya
            if (res.value) {
                const config = {headers: {Authorization: token}}
                axios.patch(`/product/${products.id}`, data, config)
                .then((res) => { 

                    Swal.fire(
                        'Product Updated!',
                        'Data product berhasil diubah',
                        'success'
                      )
                    getData() 
                })
            }
          })
    }

    const srcPic = `http://localhost:2022/product/picture/${products.product_photo}`

    const onSavePhoto = () => {
        const data = new FormData()
        const config = {headers: {Authorization : token}}

        const product_photo  = productPhotoRef.current.files[0]

        data.append("product_photo", product_photo)

        Swal.fire({
            title: 'Apakah kamu yakin?',
            text: "Data sebelumnya akan diubah!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
          }).then((res) => {
            // res.value bernilai true jika kita memilih 'Ya' , sebaliknya
            if (res.value) {
                const config = {headers: {Authorization: token}}

                axios.post(`/product/photo/${products.id}`, data, config)
                .then((res) => { 

                    Swal.fire(
                        'Product Updated!',
                        'Photo product berhasil diubah',
                        'success'
                      )
                    getData() 
                })
            }
          })
        .catch(err => console.log(err))
   }

        return (
            <div className="container">
                <h1 className="text-center display-4">Edit Product</h1>
                <form className='form-group'>
                    <div className="card-title ">
                    </div>
                    <label >Product Name:</label>
                    <input ref={productRef} type='text' defaultValue={products.product} className='form-control' required/>

                    <div className="card-title ">
                    </div>
                    <label>Choose product category:</label>
                        <select ref={categoryRef} defaultValue={products.category_id} name="category" className='form-control'>
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
                    <input ref={priceBasicRef} type='text' defaultValue={products.price_basic} className='form-control'/>
                    
                    <div className="card-title ">
                    </div>
                    <label >Product Basic Detail:</label>
                    <textarea ref={detailBasicRef} type='des' defaultValue={products.detail_basic} className='form-control'/>
                    
                    <div className="card-title ">
                    </div>
                    <label >Premium Price:</label>
                    <input ref={pricePremiumRef} type='text' defaultValue={products.price_premium} className='form-control'/>
                    
                    <div className="card-title ">
                    </div>
                    <label >Product Premium Detail:</label>
                    <textarea ref={detailPremiumRef} type='text' defaultValue={products.detail_premium} className='form-control'/>
                    
                    
                </form>
                <div>
                    <button className="btn btn-success btn-block w-25 float-right mt-3" onClick={onSaveData}>Save Data</button>
                </div>

                <form className='form-group'>
                    <div className="card-title mt-5">
                    </div>
                    <img className="card ml-3" src={srcPic} height="250" width="300" />  
                    <label >Product Photo:</label>
                    <input ref={productPhotoRef} type='file' className='form-control'/>  
                </form>
                <div>
                    <button className="btn btn-success btn-block w-25 float-right mt-3" onClick={onSavePhoto}>Save Photo</button>
                </div>

            </div>
            
        )
    }
