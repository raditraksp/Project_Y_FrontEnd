import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import axios from '../../config/api'
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';


export default function ListProduct(props) {    

    const [user, setUser] = useState({})
    const token = useSelector(state => state.auth.token)
    const userName = useSelector(state => state.auth.username)
    const Id = useSelector(state => state.auth.id)
    const {id, username, phone_number , email, avatar} = user

    useEffect(() => {
        const config = { headers: { Authorization : token } }
  
        axios.get(`/user/profile`, config)
           .then(res => setUser(res.data))
           .catch(err => alert(err.response.data.message))
        
     }, []
     )

    const addToCart = () => {
        alert('Add to cart')
    }

    if(!props.products.length) return <h1>KOSONG</h1>
    
    const renderList = props.products.map((product) => {
            const srcPic = `http://localhost:2022/product/picture/${product.product_photo}`
            // simpan ke redux


            return (
                <div key={product.id} className="card col-2 mx-4 my-4">
                    <img class="card-img-top align-self-center mt-2 py-0" src={srcPic} style={{height: 200}} alt="Card image cap"/>
                    <div class="card-body">
                    <div className="row">
                        <div className="col-2 align-self-center float-left">
                            <img  src="https://placeimg.com/640/480/tech" style={{height:30, width:30, border:1, borderRadius:50}} alt=""/>
                        </div>
                        <div className="col-10 my-2">
                            <h5 class="card-title">{product.username}</h5>
                        </div>
                    </div>
                    <h5 class="card-title ">{product.product}</h5>
                    <p class="card-text">Ratting</p>
                    </div>
                    <Link to={`/product/detailproduct/${product.id}`}>
                        <button type="button" className="btn btn-outline-primary mb-2 px-4 btn-block">Detail</button>
                    </Link>
                    <div>
                        <label class="card-text text-danger font-weight-bold float-right">STARTING AT Rp {product.price_basic}</label>
                    </div>
                </div>
        )
    })
    return (
            <div className= "row">
                {renderList}    
            </div>
        
    )
}
