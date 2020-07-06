import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'
import {useParams, Redirect} from 'react-router-dom'
import Swal from 'sweetalert2'

import axios from '../../config/api'

export default function EditProduct() {

    const token = useSelector(state => state.auth.token)
    const role_id = useSelector(state => state.auth.role_id)
    let {product_id} = useParams()
    const config = {headers: {Authorization: token}}

    const getData = () => {
        axios.get(`/product/${product_id}`, config)
            .then(res => setProducts(res.data))
            .catch(err => console.log({err}))

        axios.get(`/product/category/${product_id}`)
            .then((res)=> setCategories(res.data))
            .catch((err)=> console.log(err))
    } 

    useEffect(() => {
        getData()
     }, [])

    // STATE PRODUCT YANG DIPILIH
    const [products, setProducts] = useState({})  
    const [categories, setCategories] = useState([])
    const srcPic = `http://localhost:2022/product/picture/${products.product_photo}`
    
   
    const productRef = useRef()
    const categoryRef = useRef()
    const detailProductRef = useRef()
    const priceBasicRef = useRef()
    const detailBasicRef = useRef()
    const pricePremiumRef = useRef()
    const detailPremiumRef = useRef()
    const productPhotoRef = useRef() 

    // menyimpan data
    const onSaveData = () => {
        const product = productRef.current.value
        const detail_product = detailProductRef.current.value
        const price_basic = parseInt(priceBasicRef.current.value)
        const detail_basic = detailBasicRef.current.value
        const price_premium = parseInt(pricePremiumRef.current.value)
        const detail_premium = detailPremiumRef.current.value

        const data = {
            product, 
            detail_product,
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

    const addCategory = () => {
        const category = categoryRef.current.value
        const data = {
            category_id:category,
            product_id:product_id
        }
        // if(category === categories[0].category) return alert('Category sudah ditambahkan')

        axios.post(`/products/addcategory`, data, config)
        .then((res) => { 

            Swal.fire(
                'Category Added!',
                'Category berhasil ditambahkan',
                'success'
                )
            getData()
            })
    }

    const deleteCategory = (product_category_id) => {
        Swal.fire({
            title: 'Apakah kamu yakin menghapus category ini?',
            text: "Data akan dihapus!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
          }).then((res) => {
            // res.value bernilai true jika kita memilih 'Ya' , sebaliknya
            if (res.value) {
                axios.delete(`/product/category/${product_category_id}`, config)
                .then((res) => { 

                    Swal.fire(
                        'Category Deleted!',
                        'Ctaegory telah dihapus',
                        'success'
                      )
                    getData() 
                })
            }
          })
        .catch((err)=> console.log(err))
    }

    const renderCategory = () => {
        if(categories.length === 0) return (<div> No Category Added</div>)
        return categories.map((category)=>{
            return (
                    <button onClick={()=>{deleteCategory(category.id)}} className="btn btn-outline-danger mr-2">{category.category}</button>
            )
        })
                
      }

    const onSavePhoto = () => {
        const data = new FormData()

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

        return (token && role_id === 3) ?(
            <div className="container">
                <h1 className="text-center display-4">Edit Product</h1>
                {/* EDIT DATA */}
                <form className='form-group'>
                    <div className="card-title ">
                    </div>
                    <label >Product Name:</label>
                    <input ref={productRef} type='text' defaultValue={products.product} className='form-control' required/>

                    
                    <div className="card-title ">
                    </div>
                    <label >Product Detail:</label>
                    <textarea ref={detailProductRef} type='text' defaultValue={products.detail_product} className='form-control'/>

                    <div className="card-title ">
                    </div>
                    <label >Basic Price:</label>
                    <input ref={priceBasicRef} type='text' defaultValue={products.price_basic} className='form-control'/>
                    
                    <div className="card-title ">
                    </div>
                    <label >Product Basic Detail:</label>
                    <textarea ref={detailBasicRef} type='text' defaultValue={products.detail_basic} className='form-control'/>
                    
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
                        <button className="btn btn-success btn-block w-25 mt-3 mb-5" onClick={onSaveData}>Save Data</button>
                    </div>

                {/* ADD CATEGORY */}
                <label>Product Category:</label>
                <div>
                    {renderCategory()}
                </div>
                <div className="mt-4">
                    <label>Choose product category:</label>
                    <select ref={categoryRef} className='form-control'>
                        <option value="2">Writing</option>
                        <option value="3">Translation</option>
                        <option value="4">Video</option>
                        <option value="5">Animation</option>
                        <option value="6">Music</option>
                        <option value="7">Audio</option>
                        <option value="8">Programming</option>
                        <option value="9">Technology</option>
                        <option value="10">Business</option>
                        <option value="11">Lifestyle</option>
                        <option value="12">Design</option>
                        <option value="13">Graphic</option>
                        <option value="1">Other</option>
                    </select>
                </div>
                <div>
                    <button className="btn btn-success btn-block w-25 mt-3 mb-5" onClick={addCategory}>Add Category</button>
                </div>

                {/* SAVE PHOTO */}
                <div className="card-title">
                </div>
                <img className="card ml-3" src={srcPic} height="250" width="300" alt=""/>  
                <label >Product Photo:</label>
                <input ref={productPhotoRef} type='file' className='form-control'/>  
                <div>
                    <button className="btn btn-success btn-block w-25 mt-3 mb-5" onClick={onSavePhoto}>Save Photo</button>
                </div>

            </div>
            
        ): (
            <Redirect to='/' />
          )
    }
