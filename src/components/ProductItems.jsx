import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
// Import action creator
import {onLoginUser} from '../actions/index'
// Akan me-redirect ke alamat tertentu
import {Redirect} from 'react-router-dom'
import Swal from 'sweetalert2'

class ProductItems extends Component {

    state = {
        redirect:false
    }

    addToChart = () => {
        
        
        if(this.props.uname == ""){
            // Swal.fire(
            //     '',
            //     'Silakan login terlebih dahulu',
            //     ''
            //   )
            //   return <Redirect to="/login"/>
            this.setState({redirect : true})
        }else if(!this.qty.value == ""){


            
            Swal.fire('','berhasil di tambahkan','')
        
            console.log(this.qty.value)
            let username = this.props.uname
            let name = this.props.product.name
            let desc = this.props.product.desc
            let price = this.props.product.price
            let src = this.props.product.src
            let qty = parseInt(this.qty.value)
            let id_product = this.props.product.id

            

            let val = {id_product, username, name, desc, price, src, qty, }
            
            console.log(this.props.chartUser)
            let checkBool = []
            this.props.chartUser.forEach((cart) =>{
                checkBool.push(cart.id_product == id_product)})
                var indeks = checkBool.indexOf(true)
               var ser = indeks + 1
                if(checkBool[indeks]== true){
                    console.log("ini if")
                    console.log(`ini adalah cart.id_product:${ser}`)
                    console.log(`ini adalah id_product:${id_product}`)
                    this.props.chartUser[indeks].qty+= qty
                    axios.patch(`http://localhost:2022/chart/${this.props.chartUser[indeks].id}`,{qty : this.props.chartUser[indeks].qty}).then((res) =>
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
            const {redirect} = this.state
            if(redirect){
                return <Redirect to="/login"/>
            }else{
                return (
                    <div key={this.props.product.id} className="card col-lg-5 col-xl-3 mx-auto mx-xl-4 my-3">
                       <img className="card-img-top" src={this.props.product.src} alt=""/>
                       <div className="card-body">
                          <div  style={{height: 50}}>
                                <h5 className="card-title">{this.props.product.name}</h5>
                          </div>
                          <p className="card-text">{this.props.product.desc}</p>
                          <p className="card-text">Rp. {this.props.product.price}</p>
                          <input ref={( input ) => { this.qty = input }} className="form-control" type="text" placeholder="Jumlah Qty"/>
                          <Link to={`/detailproduct/${this.props.product.id}`}>
                                <button className="btn btn-secondary btn-block my-2">Detail</button>
                          </Link>
                          <button onClick={() => {this.addToChart(this.props.product.id)}} className="btn btn-primary btn-block">Add to Cart</button>
                       </div>
                    </div>
                 )
            }
     
   }
}

let mapStateToProps = (state) => {
    return {
        uname: state.auth.username
    }
}


export default connect(mapStateToProps,null)(ProductItems)