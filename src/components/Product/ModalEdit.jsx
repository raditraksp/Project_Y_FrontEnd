import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from '../../config/api'


export default function ModalEdit() {

    const token = useSelector(state => state.auth.token)
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState("")
    const [category, setCategory] = useState("")
    const [detailBasic, setDetailBasic] = useState("")
    const [priceBasic, setPriceBasic] = useState("")
    const [detailPremium, setDetailPremium] = useState("")
    const [pricePremium, setPricePremium] = useState("")

    const getData = () => {
        const config = {headers: {Authorization: token}}
         axios.get('/products/me', config)
            .then(res => setProducts(res.data))
            .catch(err => console.log({err}))
    } 

        return (
            <div>
                {/* <Modal isOpen={this.state.modal} toggle = {this.onCancelToggle} > jika ingin klik sembarang menutup modal*/}
                <Modal isOpen={this.props.a} >
                    <ModalHeader >Add new product</ModalHeader>
                    <ModalBody>
                        Product Name : <input className="form-control" type="text" onChange = {(e) => { setProduct( e.target.value )}}/>
                        Category : <input className="form-control" type="text" onChange = {(e) => { setCategory( e.target.value )}}/>
                        Detail Basic : <input className="form-control" type="text" onChange = {(e) => { setDetailBasic( e.target.value )}}/>
                        Price Basic : <input className="form-control" type="text" onChange = {(e) => { setPriceBasic( e.target.value )}}/>
                        Detail Premium : <input className="form-control" type="text" onChange = {(e) => { setDetailPremium( e.target.value )}}/>
                        Price Premium : <input className="form-control" type="text" onChange = {(e) => { setPricePremium( e.target.value )}}/>
                    </ModalBody>
                    <ModalFooter>
                        {/* <Button outline color="warning" onClick={this.props.c} >Cancel</Button> */}
                        {/* this.state akan masuk ke 'editObj' pada function 'onSaveProduct' di komponen 'ManageProduct' */}
                        {/* <Button outline color="success" onClick={ () => { this.props.d(this.state) } } >Save</Button> */}
                    </ModalFooter>
                </Modal>

            </div>
        )
    }
