import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
// Import action creator
// import {onLoginUser} from '../actions/index'
// Akan me-redirect ke alamat tertentu
import {Redirect} from 'react-router-dom'
import ProductItems from './ProductItems'

class Home extends Component {

    state = {
        products : [], // 7 products
        chartUser : [],
        modal: false
    }


    componentDidMount() {
        axios.get('http://localhost:2022/products')
        .then((res) => {
           
            this.setState({ products: res.data })
        })

            axios.get('http://localhost:2022/chart')
        .then((sil) => {
            let hasil = []
            hasil = sil.data.filter((data) => {
                return (
                    data.username == this.props.uname
                )
                
            })

            this.setState({ chartUser: hasil })
           console.log(this.state.chartUser)
                })    
                
}



    getProducts = () => {
        axios.get('http://localhost:2022/products')
        .then((res) => {
            this.name.value = ""
            this.min.value = ""
            this.max.value = ""
            this.setState({ products: res.data })
        })

        axios.get('http://localhost:2022/chart')
        .then((sil) => {
            let hasil = []
            hasil = sil.data.filter((data) => {
                return (
                    data.username == this.props.uname
                )
            })

            this.setState({ chartUser: hasil })
           console.log(this.state.chartUser)
                })    
    }

    renderProducts = () => {
        return this.state.products.map((product) => {

            // Untuk memisahkan setiap 3 digit angka dengan karakter titik.
            // product.price = product.price.toLocaleString('in')

            return (
                <ProductItems product={product}
                chartUser={this.state.chartUser} />
            )
        })
    }

    

    onBtnSearch = () => {
        axios.get('http://localhost:2022/products')
        .then((res) => {
            
            let keyword = this.name.value
            let min = parseInt(this.min.value) 
            let max = parseInt(this.max.value)
            let filterResult = []

            if(isNaN(min) && isNaN(max)){ // Search by Name
                filterResult = res.data.filter((data) => {
                    return (
                        data.name.toLowerCase().includes(keyword.toLowerCase())
                    )
                })

            } else if (isNaN(max)){
                filterResult = res.data.filter((data) => { // Search by Minimum and Name
                    return (
                        data.name.toLowerCase().includes(keyword.toLowerCase())&&
                        data.price >= min
                    )
                })

            } else if (isNaN(min)){
                filterResult = res.data.filter((data) => { // Search by Maximum and Name
                    return (
                        data.name.toLowerCase().includes(keyword.toLowerCase())&&
                        data.price <= max
                    )
                })

            } else {
                filterResult = res.data.filter((data) => { // Search by Name, Minimum, and Maximum
                    return (
                        data.name.toLowerCase().includes(keyword.toLowerCase()) &&
                        data.price >= min &&
                        data.price <= max
                    )
                })
            }
            

            this.setState({ products: filterResult })
        })

    }

    render() {
        return (
            <div>
            <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="banner">
                    <div className="row">
                    <div className="col-6">
                        <div className="ml-5 pt-2">
                        <h1>Find the perfect freelance services 
                         your business</h1>
                         <div className="container-fluid">
                            <div className="row">
                            <div className="col-10 ">
                        <input ref={ (input) => { this.name = input } } placeholder='Try "building mobile app"' className="form-control text-w" type="text"/>                       
                        </div>
                        <div>
                        <button className="btn btn-success">Search</button>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    {/* Search Box */}
                    <div className="col-10 col-lg-3 col-xl-2">
                        <div className="mt-3">
                            <div className="card">

                                <div className=" border-bottom border-secondary card-title">
                                    <h1 className="text-center">Search</h1>
                                </div>

                                <div className="card-body">
                                    

                                    <h4>Price</h4>
                                    <input ref={ (input) => { this.min = input } } placeholder="Minimum" className="form-control mb-2" type="text"/>
                                    <input ref={ (input) => { this.max = input } } placeholder="Maximum" className="form-control" type="text"/>

                                    <button onClick={this.onBtnSearch} className="btn btn-block btn-outline-primary mt-5" >Search</button>
                                    <button onClick={this.getProducts} className="btn btn-block btn-outline-danger" >Reset</button>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* List Products */}
                    <div className=" row col-10 col-lg-9">
                        {this.renderProducts()}
                    </div>
                </div>
            </div>
            </div>
        )
    }
}



let mapStateToProps = (state) => {
    return {
        uname: state.auth.username
    }
}


export default connect(mapStateToProps,null)(Home)