import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
// Import action creator
// import {onLoginUser} from '../actions/index'
// Akan me-redirect ke alamat tertentu
import {Redirect} from 'react-router-dom'

class DetailProduct extends Component {

    state = {
        product : [],
        chartUser : []
    }


    componentDidMount() {
        axios.get(`http://localhost:2022/products/${this.props.match.params.idPrdct}`)
        .then((res) => {
           
            this.setState({ product: res.data })
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

addToChart = () => {
        
        
    if(this.props.uname == ""){
        Swal.fire(
            '',
            'Silakan login terlebih dahulu',
            ''
          )
    }else if(!this.qty.value == ""){


        
        Swal.fire('','berhasil di tambahkan','')
    
        console.log(this.qty.value)
        let username = this.state.uname
        let name = this.state.product.name
        let desc = this.state.product.desc
        let price = parseInt(this.state.product.price)
        let src = this.state.product.src
        let qty = parseInt(this.qty.value)
        let id_product = this.state.product.id

        

        let val = {id_product, username, name, desc, price, src, qty, }
        
        console.log(this.state.chartUser)
        let checkBool = []
        this.state.chartUser.forEach((cart) =>{
            checkBool.push(cart.id_product == id_product)})
            var indeks = checkBool.indexOf(true)
           var ser = indeks + 1
            if(checkBool[indeks]== true){
                console.log("ini if")
                console.log(`ini adalah cart.id_product:${ser}`)
                console.log(`ini adalah id_product:${id_product}`)
                this.state.chartUser[indeks].qty+= qty
                axios.patch(`http://localhost:2022/chart/${this.state.chartUser[indeks].id}`,{qty : this.state.chartUser[indeks].qty}).then((res) =>
                {this.qty.value = ""
                axios.get('http://localhost:2022/chart')
        .then((sil) => {
            let hasil = []
            hasil = sil.data.filter((data) => {
                return (
                    data.username == this.props.uname
                )
            })

            this.setState({ chartUser: hasil })
        //    console.log(this.state.chartUser)
           console.log(this.props.chartUser)
                })})
                    
                
            }else{
                console.log("ini else")
                console.log(`ini adalah cart.id_product:${indeks+1}`)
                console.log(`ini adalah id_product:${id_product}`)
                axios.post('http://localhost:2022/chart',val).then((res) => {
                    // this.setState({chartUser : res.data})
                this.qty.value = ""
                axios.get('http://localhost:2022/chart')
        .then((sil) => {
            let hasil = []
            hasil = sil.data.filter((data) => {
                return (
                    data.username == this.props.uname
                )
            })

            this.setState({ chartUser: hasil })
        //    console.log(this.state.chartUser)
           console.log(this.props.chartUser)
                })    
                
            })}
        
        
    }
    else{
        Swal.fire('','masukkan qty yang ingin kamu beli','')
    }

}


    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="card col5 mx-auto my-3">
                        <img className="card-img-top" src={this.state.product.src} alt=""/>
                        <div className="card-body">
                            <div  style={{height: 50}}>
                                <h5 className="card-title">{this.state.product.name}</h5>
                            </div>
                            <p className="card-text">{this.state.product.desc}</p>
                            <p className="card-text">Rp. {this.state.product.price}</p>
                            <input ref={( input ) => { this.qty = input }} className="form-control" type="text" placeholder="Jumlah Qty"/>
                            <button onClick={() => {this.addToChart(this.state.product.id)}} className="btn btn-primary btn-block">Add to Cart</button>
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

export default connect(mapStateToProps,null)(DetailProduct)