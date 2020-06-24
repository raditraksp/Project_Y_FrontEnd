import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Collapse,Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class Chart extends Component{

    state = {
        chart: [],
        editChart:[],
        modal: false,
        togle: false,
        isOpen: false,
    }

    // runnning hanya sekali, setelah proses render yang pertama
    componentDidMount() {
            axios.get('http://localhost:2022/chart')
        .then((sil) => {
            let hasil = []
            hasil = sil.data.filter((data) => {
                return (
                    data.username == this.props.uname
                )
                
            })

            this.setState({ chart: hasil })
           console.log(this.state.chartUser)
                })    
                
}
    // Ambil Data
    getData = () => {
        axios.get('http://localhost:2022/chart')
        .then((sil) => {
            let hasil = []
            hasil = sil.data.filter((data) => {
                return (
                    data.username == this.props.uname
                )
                
            })

            this.setState({ chart: hasil })
           console.log(this.state.chartUser)
                })  
    }

    // button delete Cart
    deleteChart = (id) => {
        Swal.fire({
            title: 'Apakah kamu yakin?',
            text: "Kamu tidak bisa mengembalikannya lagi!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
          }).then((res) => {
            // res.value bernilai true jika kita memilih 'Ya' , sebaliknya
            if (res.value) {
                axios.delete(`http://localhost:2022/chart/${id}`)
                .then((res) => { 

                    Swal.fire(
                        'Berhasil!',
                        'Produk di cart berhasil di hapus.',
                        'success'
                    )

                    this.getData() 
                
                })
            }
          })
    }

    editChart = (id) => { 
        this.setState({modal:true})
        axios.get(`http://localhost:2022/Chart/${id}`).then((res) => {
        this.setState({ editChart: res.data })
         })  
        }

        funSave = () =>{
            // let name = this.editName.value ? this.editName.value : this.state.editProducts.name
            // let desc = this.editDesc.value ? this.editDesc.value : this.state.editProducts.desc
            // let price = this.editPrice.value ? this.editPrice.value : this.state.editProducts.price
            // let src = this.editPicture.value ? this.editPicture.value : this.state.editProducts.src
            let qty = this.edit_qty.value ? this.edit_qty.value : this.state.editChart.qty
    
            let linkPatch = `http://localhost:2022/chart/${this.state.editChart.id}`
            let data = {qty}
            axios.patch(linkPatch, data).then((res) => {this.getData()})
            this.setState({modal:false})
    
        }

        funCancel = () => {
            this.setState({modal:false})
    
        }

        checkOut = () => {
        this.setState({isOpen:true})
            }
            
            
            renderCheckout = () => {
                let totalChart = 0
                this.state.chart.map((product) =>{
                    let totalPro = product.qty * product.price
                    totalChart += totalPro
                })
                return (
                    <div className="container-fluid">
                    {/* List Product */}
                    <div ClassName="row">
                    <div className="col-12">
                    
                    
                    <div className="card-body">
                    
                    
                <h1 className="display-4">Total</h1>
                
                
                <table className="table table-hover text-center mb-5">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">NAME</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">QUANTITY</th>
                        <th scope="col">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderChart()}
                    </tbody>
                    <tr>
                        <th colspan ="4">TOTAL</th>  
                        <th>{totalChart.toLocaleString('in')}</th>                      
                        </tr>
                
                </table>   
                </div>
                </div>
                </div>
                </div>
                
                
                
                
                )
            
        }

            renderChart = () => {
               let totalChart = 0
                return this.state.chart.map((product) =>{
                    let totalPro = product.qty * product.price
                    totalChart += totalPro
                    return(
                        <tr>    
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.qty}</td>
                        <td>Rp. {product.price.toLocaleString('in')}</td>
                        <td>Rp. {totalPro.toLocaleString('in')}</td>
                        </tr>
                    )
                })

               


            }
    //Render Map
    renderList = () => {
        return this.state.chart.map((product) => {

            // product.price = product.price.toLocaleString('in')

            return(
                <tr>    
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.desc}</td>
                        <td>Rp. {product.price.toLocaleString('in')}</td>
                        <td>{product.qty}</td>
                        <td className="w-25"><img className="list" src={product.src} alt="" height="100"
                             width="100"/></td>                       
                        <td>
                            <button type="button" onClick={() => {this.editChart(product.id)}} className="btn btn-outline-primary btn-block"> Edit </button>
                            <button type="button" onClick={() => {this.deleteChart(product.id)} } className="btn btn-outline-secondary btn-block"> Delete </button>
                        </td>
                </tr>
            )
        })   
    }


    render() {
        if(!this.props.uname == ""){
            return(        
                <div className="container-fluid">
                {/* List Product */}
                <div ClassName="row">
                <div className="col-12">
                
                <h1 className="display-4">Cart</h1>
                <div className="card-body">
                
                <table className="table table-hover text-center mb-5">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">NAME</th>
                        <th scope="col">DESC</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">QUANTITY</th>
                        <th scope="col">PICTURE</th>
                        <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>
                
                    
                    
                </div>
                
                </div>
                <div className="container-fluid">
                <div className="row">
                <div className="col-4"></div>
                <div className="col-3 mx-auto">
                    <button onClick={this.checkOut} className="btn btn-primary">Checkout
                    </button></div>
                <div className="col-2"></div>
                
                
                </div>
                </div>
                </div>
                <div>
                <Collapse isOpen={this.state.isOpen}>
                    {this.renderCheckout()}
                    </Collapse>
                </div>
                <Modal isOpen={this.state.modal}>
                <ModalHeader>Edit Qty</ModalHeader>
                <ModalBody>
                <label>QTY</label>
                <input ref={(input) => {this.edit_qty = input}} className="form-control" type="text" placeholder={this.state.editChart.qty}/>
                </ModalBody>
                <ModalFooter>
                <Button onClick={this.funSave} color="primary">Save</Button>
                <Button onClick={this.funCancel}color="secondary">Cancel</Button>
                </ModalFooter>
            </Modal>
              

            </div>
            
        )
                
        }else{
            return <Redirect to="/"/>
        }
        }
        

}

let mapStateToProps = (state) => {
    return {
        uname: state.auth.username
    }
}

export default connect(mapStateToProps,null)(Chart)