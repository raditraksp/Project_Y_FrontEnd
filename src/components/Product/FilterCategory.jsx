import React, { useState, useEffect, useRef } from 'react'
import {Link} from 'react-router-dom'
  import {
 
    Navbar,
    NavbarToggler, 
    Nav,
    NavLink,
    NavItem,
    NavbarText,
    NavbarBrand,
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
    // let {product_name} = useParams()
    let {category1} = useParams()
    let {category2} = useParams()
    const [products,setProducts] = useState([])
    const minRef = useRef()
    const maxRef = useRef()

    useEffect(() => {
        onSearchCategory()
     }, [])

    
    // const getData = () => {
    //     axios.get('/products')
    //     .then((res) => {
    //         let filterResult = []
    //         filterResult = res.data.filter((data) => {
    //             return (
    //                 data.product.toLowerCase().includes(product_name.toLowerCase())
    //             )
    //         })
    //         setProducts(filterResult)
    //     })
        
    // }

    const onSearchCategory = () => {
        axios.get(`/product/category/${category1}/${category2}`)
        .then((res) => {
          setProducts(res.data)
        })
        

    }

    const onSearchPrice = () => {
        const min = parseInt(minRef.current.value)
        const max = parseInt(maxRef.current.value)

        console.log(min)
        console.log(max)

        axios.get('/products')
        .then((res) => {
            
            let priceList = []
              
                priceList = res.data.filter((data) => {
                    return (
                        data.price_basic >= min && data.price_basic <= max
                    )
            })
            setProducts(priceList)
        }).catch(err => console.log({err}))
        
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
            
            <div className="ml-5 my-3">
                <h3 className="font-weight-bold ">{category1} & {category2}</h3>
            </div>
            <div className="row w-50 mt-4 ml-5">
                            <div className="col-3 p-0">
                                <input ref={minRef} type="text" defaultValue="" className="form-control my-auto h-100" placeholder='Try "logo design"'/>
                            </div>
                            <div className="col-3 p-0">
                                <input ref={maxRef} type="text" defaultValue="" className="form-control my-auto h-100" placeholder='Try "logo design"'/>
                            </div>
                            <div className="col-5 p-0">    
                                    <button className="btn btn-primary btn-lg my-auto" onClick={onSearchPrice} >Search</button>
            </div>
            </div>
            <div className= "row">
                {renderSearch}    
            </div>
            </div>
           
        
    )
}
