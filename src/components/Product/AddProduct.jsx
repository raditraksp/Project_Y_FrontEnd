import React, { useRef} from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import {Redirect} from 'react-router-dom'


import axios from '../../config/api'



export default function AddProduct() {

    const token = useSelector(state => state.auth.token)
    const role_id = useSelector(state => state.auth.role_id)
      // ADD PRDUCT
    const productRef = useRef()
    const detailProductRef = useRef()
    const priceBasicRef = useRef()
    const detailBasicRef = useRef()
    const pricePremiumRef = useRef()
    const detailPremiumRef = useRef()
    const productPhotoRef = useRef()    

    const addProduct = () => {
        const data = new FormData()
        const config = {headers: {Authorization: token}}
    
        const product = productRef.current.value
        const detail_product = detailProductRef.current.value
        const price_basic = parseInt(priceBasicRef.current.value)
        const detail_basic = detailBasicRef.current.value
        const price_premium = parseInt(pricePremiumRef.current.value)
        const detail_premium = detailPremiumRef.current.value
        const product_photo  = productPhotoRef.current.files[0]


        if(isNaN(price_basic && price_premium)) return alert('Inputan harga harus berupa angka!')
        // if(!category) return alert('Category belum dipilih!')
        if(!product_photo) return alert('Photo belum diupload')

        // Data (name, email, password, image) yang sudah berhasil di ambil, akan 'dimasukkan' ke formData
        data.append("product", product)
        // data.append("category_id", category)
        data.append("detail_product", detail_product)
        data.append("price_basic", price_basic)
        data.append("detail_basic", detail_basic)
        data.append("price_premium", price_premium)
        data.append("detail_premium", detail_premium)
        data.append("product_photo", product_photo)
        
        
        // Kirim ke API
        axios.post('/products', data, config)
         .then(res => Swal.fire(
            'New Product Added!',
            'Mohon menunggu untuk konfirmasi dari admin untuk persetujuan dari product anda akan jual, paling lama 1x24 jam',
            'success'
          ))
         .catch(err => console.log({err}))
   }

    if(token && role_id === 3){
        return  (
            <div className="container">
            <h1 className="text-center display-4">Add Product</h1>
                <form className='form-group'>
                    <div className="card-title ">
                    </div>
                    <label >Product Name:</label>
                    <input ref={productRef} type='text' placeholder="Input Product Name" className='form-control' required/>

                    <div className="card-title ">
                    </div>
                    <label >Product Detail:</label>
                    <textarea ref={detailProductRef} type='text' placeholder="Input detail product" className='form-control' required/>

                    <div className="card-title ">
                    </div>
                    <label >Basic Price:</label>
                    <input ref={priceBasicRef} type='text' placeholder="Input basic price" className='form-control' required/>
                    
                    <div className="card-title ">
                    </div>
                    <label >Product Basic Detail:</label>
                    <textarea ref={detailBasicRef} type='text' placeholder="Input detail basic" className='form-control' required/>
                    
                    <div className="card-title ">
                    </div>
                    <label >Premium Price:</label>
                    <input ref={pricePremiumRef} type='text' placeholder="Input premium price" className='form-control' required/>
                    
                    <div className="card-title ">
                    </div>
                    <label >Product Premium Detail:</label>
                    <textarea ref={detailPremiumRef} type='text' placeholder="Input detail premium" className='form-control' required/>
                    
                    <div className="card-title ">
                    </div>
                    <label >Product Photo:</label>
                    <input ref={productPhotoRef} type='file' className='form-control'/>  
                </form>
                <div>
                    <button className="btn btn-success btn-block w-25 m-auto" onClick={addProduct}>Add</button>
                </div>

            </div>
        )}
        else {
        return (
            <Redirect to='/' />
        )}
    }
