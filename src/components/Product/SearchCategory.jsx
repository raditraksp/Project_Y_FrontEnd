import React, { useState, useEffect, useRef } from 'react'
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
import {useParams , Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from '../../config/api'



export default function SearchProduct() {   
    let {cat_id} = useParams()
    const [products, setProducts] = useState([])
    const minRef = useRef()
    const searchRef = useRef()
    const maxRef = useRef()

    useEffect(() => {
        getData()
     }, [])

     const getData = () => {
         axios.get('/product/search/category')
        .then((res) => {
            let filterResult = []
            filterResult = res.data.filter((data) => {
                return data.category_id == cat_id
            })
            setProducts(filterResult)
        })
     }
    
    const onSearchName = () => {
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

    const onProg = () => {
        axios.get('/product/search/category')
        .then((res) => {
            let filterResult = []
            filterResult = res.data.filter((data) => {
                return data.category_id == 8
            })
            setProducts(filterResult)
            console.log(filterResult)
        })

    }

    const onTech = () => {
        axios.get('/product/search/category')
        .then((res) => {
            let filterResult = []
            filterResult = res.data.filter((data) => {
                return data.category_id == 9
            })
            setProducts(filterResult)
            console.log(filterResult)
        })
        

    }

    const onWrit = () => {
        axios.get('/product/search/category')
        .then((res) => {
            let filterResult = []
            filterResult = res.data.filter((data) => {
                return data.category_id == 2
            })
            setProducts(filterResult)
            console.log(filterResult)
        })
        

    }

    const onTrans = () => {
        axios.get('/product/search/category')
        .then((res) => {
            let filterResult = []
            filterResult = res.data.filter((data) => {
                return data.category_id == 3
            })
            setProducts(filterResult)
            console.log(filterResult)
        })
        

    }

    const onVideo = () => {
        axios.get('/product/search/category')
        .then((res) => {
            let filterResult = []
            filterResult = res.data.filter((data) => {
                return data.category_id == 4
            })
            setProducts(filterResult)
            console.log(filterResult)
        })
        

    }

    const onAni = () => {
        axios.get('/product/search/category')
        .then((res) => {
            let filterResult = []
            filterResult = res.data.filter((data) => {
                return data.category_id == 5
            })
            setProducts(filterResult)
            console.log(filterResult)
        })
        

    }

    const onMusic = () => {
        axios.get('/product/search/category')
        .then((res) => {
            let filterResult = []
            filterResult = res.data.filter((data) => {
                return data.category_id == 6
            })
            setProducts(filterResult)
            console.log(filterResult)
        })
        

    }

    const onAudio = () => {
        axios.get('/product/search/category')
        .then((res) => {
            let filterResult = []
            filterResult = res.data.filter((data) => {
                return data.category_id == 7
            })
            setProducts(filterResult)
            console.log(filterResult)
        })
        

    }

    const onDesign = () => {
        axios.get('/product/search/category')
        .then((res) => {
            let filterResult = []
            filterResult = res.data.filter((data) => {
                return data.category_id == 12
            })
            setProducts(filterResult)
            console.log(filterResult)
        })
        

    }

    const onGraph = () => {
        axios.get('/product/search/category')
        .then((res) => {
            let filterResult = []
            filterResult = res.data.filter((data) => {
                return data.category_id == 13
            })
            setProducts(filterResult)
            console.log(filterResult)
        })
        

    }

    const onBusiness = () => {
        axios.get('/product/search/category')
        .then((res) => {
            let filterResult = []
            filterResult = res.data.filter((data) => {
                return data.category_id == 10
            })
            setProducts(filterResult)
            console.log(filterResult)
        })
        

    }


    const onLife = () => {
        axios.get('/product/search/category')
        .then((res) => {
            let filterResult = []
            filterResult = res.data.filter((data) => {
                return data.category_id == 11
            })
            setProducts(filterResult)
            console.log(filterResult)
        })
        

    }



    const onSearchPrice = () => {
        const min = parseInt(minRef.current.value)
        const max = parseInt(maxRef.current.value)

        console.log(min)
        console.log(max)

        
            
            let priceList = []
              
                priceList = products.filter((data) => {
                    return (
                        data.price_basic >= min && data.price_basic <= max
                    )
            })
            setProducts(priceList)
        
        
    }
    
    const renderSearch = products.map((product) => {
            const srcPic = `http://localhost:2022/product/picture/${product.product_photo}`
            const srcDetail = `/product/detailproduct/${product.product_id}`
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
            <Navbar  className="bg-light list-unstyled" expand="md">
                    <NavItem className="mx-auto">
                        <button className="btn btn-group-vertical" onClick={onProg}>Programming</button>
                    </NavItem>
                    <NavItem className="mx-auto">
                        <button className="btn btn-group-vertical" onClick={onTech}>Tech</button>
                    </NavItem>
                    <NavItem className="mx-auto">
                        <button className="btn btn-group-vertical" onClick={onWrit}>Writing</button>
                    </NavItem>
                    <NavItem className="mx-auto">
                        <button className="btn btn-group-vertical" onClick={onTrans}>Translation</button>
                    </NavItem>
                    <NavItem className="mx-auto">
                        <button className="btn btn-group-vertical" onClick={onVideo}>Video</button>
                    </NavItem>
                    <NavItem className="mx-auto">
                        <button className="btn btn-group-vertical" onClick={onAni}>Animation</button>
                    </NavItem>
                    <NavItem className="mx-auto">
                        <button className="btn btn-group-vertical" onClick={onMusic}>Music</button>
                    </NavItem>
                    <NavItem className="mx-auto">
                        <button className="btn btn-group-vertical" onClick={onAudio}>Audio</button>
                    </NavItem>
                    <NavItem className="mx-auto">
                        <button className="btn btn-group-vertical" onClick={onDesign}>Design</button>
                    </NavItem>
                    <NavItem className="mx-auto">
                        <button className="btn btn-group-vertical" onClick={onGraph}>Graphic</button>
                    </NavItem>
                    <NavItem className="mx-auto">
                        <button className="btn btn-group-vertical" onClick={onBusiness}>Business</button>
                    </NavItem>
                    <NavItem className="mx-auto">
                        <button className="btn btn-group-vertical" onClick={onLife}>Lifestyle</button>
                    </NavItem>
                </Navbar>
                <div className="row my-5">
                    <div className="row w-25 ml-5">
                        <div className="col-10 p-0">
                            <input ref={searchRef} type="text" defaultValue="" className="form-control my-auto h-100" placeholder='Try "logo design"'/>
                        </div>
                        <div className="col-2 p-0">
                            {/* <button onClick={onButtonSearch} className="btn btn-primary btn-lg my-auto" >Search</button> */}
                                <button className="btn btn-primary btn-lg my-auto" onClick={onSearchName} >Search</button>
                        </div>
                    </div>
                    {/* Filter Price */}
                    <div className="row w-50 ml-5">
                        <div className="col-3 p-0">
                            <input ref={minRef} type="text" defaultValue="" className="form-control my-auto h-100" placeholder='Price Min'/>
                        </div>
                        <div className="col-3 p-0">
                            <input ref={maxRef} type="text" defaultValue="" className="form-control my-auto h-100" placeholder='Price Max'/>
                        </div>
                        <div className="col-5 p-0">    
                                <button className="btn btn-primary btn-lg my-auto" onClick={onSearchPrice} >Search</button>
                        </div>
                    </div>
                </div>
            <div className= "row">
                {renderSearch}    
            </div>
            </div>
           
        
    )
}