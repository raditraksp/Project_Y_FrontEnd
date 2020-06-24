import React, { Component } from 'react'
import axios from 'axios'
import InputProduct from './InputProduct'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux'
// Import action creator
import {onLoginUser} from '../actions/index'
// Akan me-redirect ke alamat tertentu
import {Redirect} from 'react-router-dom'

class ManageProduct extends Component{

    state = {
        products: [],
        editProducts: [],
        modal: false
    }

    
    getData = () =>{
        axios.get(
            'http://localhost:2022/products'
        ).then((res) => {
            this.setState({ products: res.data })
        })

    } 

    // 2
    componentDidMount(){
        
        axios.get(
            'http://localhost:2022/products'
        ).then((res) => {this.getData()})

    }

    onButtonClick = () => {
        // Ambil value
        let id= this.id.value
        let name = this.name.value
        let desc = this.desc.value
        let price = this.price.value
        let src = this.src.value

        let linkPost = 'http://localhost:2022/products'
        let data = {id, name, desc, price, src}

        axios.post(linkPost, data).then((res) => {this.getData()})

        
    }

    onButtonDelete = (id) => {
        axios.delete(`http://localhost:2022/products/${id}`
        ).then((res) => {this.getData()
})
        
    }

    funedit  = (id) =>{
        this.setState({modal:true})
        axios.get(`http://localhost:2022/products/${id}`).then((res) => {
            this.setState({ editProducts: res.data })
        })
    }

    funSave = () =>{
        let name = this.editName.value ? this.editName.value : this.state.editProducts.name
        let desc = this.editDesc.value ? this.editDesc.value : this.state.editProducts.desc
        let price = this.editPrice.value ? this.editPrice.value : this.state.editProducts.price
        let src = this.editPicture.value ? this.editPicture.value : this.state.editProducts.src

        let linkPatch = `http://localhost:2022/products/${this.state.editProducts.id}`
        let data = {name, desc, price, src}
        axios.patch(linkPatch, data).then((res) => {this.getData()})
        this.setState({modal:false})

    }

    funCancel = () =>{
        this.setState({modal:false})

    }


    // Tugas hari sabtu : Render Map
    renderList = () => {
        return this.state.products.map((produk) => {
            return (
            <tr>
                <td>
                    {produk.id}
                </td>
                <td>
                    {produk.name}
                </td>
                <td>
                    {produk.desc}
                </td>
                <td>
                    {produk.price}
                </td>
                <td>
                <img
                className="card ml-3"
                src={produk.src}
                height="100"
                width="100"
                />
                    
                </td>
                <td>
                    <button onClick={() => {this.funedit(produk.id)}} className="btn btn-outline-secondary mb-2 px-4 btn-block">edit</button>
                    <button onClick={() => {this.onButtonDelete(produk.id)}} className="btn btn-outline-danger btn-block">delete</button>
                </td>
            </tr>
        )
        })

        
    }

    
    // 1
    render(){
        if(!(this.props.uname == "")){
        return (
            <div className="container">
                {/* List Product */}
                <h1 className="text-center display-4">Manage Product</h1>
                <table class="table table-hover text-center mb-5">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">NAME</th>
                        <th scope="col">DESC</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">PICTURE</th>
                        <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>

                <table class="table table-hover text-center mb-5">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">NAME</th>
                        <th scope="col">DESC</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">PICTURE</th>
                        <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td><input ref={(input) => {this.id = input}} type="text" className="form-control"/></td>
                        <td><input ref={(input) => {this.name = input}} type="text" className="form-control"/></td>
                        <td><input ref={(input) => {this.desc = input}} type="text" className="form-control"/></td>
                        <td><input ref={(input) => {this.price = input}} type="text" className="form-control"/></td>
                        <td><input ref={(input) => {this.src = input}} type="file" className="form-control"/></td>
                        <td><button className="btn btn-outline-success mb-2 px-4" onClick={this.onButtonClick}>submit</button></td>
                    </tbody>
                </table>

                <Modal isOpen={this.state.modal}>
                <ModalHeader>Modal title</ModalHeader>
                <ModalBody>
                <label>Nama</label>
                <input ref={(input) => {this.editName = input}} className="form-control" type="text" placeholder={this.state.editProducts.name}/>
                <label>Desc</label>
                <input ref={(input) => {this.editDesc = input}} className="form-control" type="text" placeholder={this.state.editProducts.desc}/>
                <label>Price</label>
                <input ref={(input) => {this.editPrice = input}} className="form-control" type="text" placeholder={this.state.editProducts.price}/>
                <label>Picture</label>
                <input ref={(input) => {this.editPicture = input}} className="form-control" type="text" placeholder={this.state.editProducts.src}/>
                </ModalBody>
                <ModalFooter>
                <Button onClick={this.funSave} color="primary">Save</Button>
                <Button onClick={this.funCancel}color="secondary">Cancel</Button>
                </ModalFooter>
            </Modal>
              
            </div>
        )}else{
            return <Redirect to="/login"/>
        }

    }
}

let mapStateToProps = (state) => {
    return {
        uname: state.auth.username
    }
}


export default connect(mapStateToProps,null)(ManageProduct)