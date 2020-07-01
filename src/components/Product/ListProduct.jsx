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
    
    const renderList = props.products.map((product) => {
            const srcPic = `http://localhost:2022/product/picture/${product.product_photo}`
            const srcDetail = `/product/detailproduct/${product.id}`
            // simpan ke redux


            return (
                <div key={product.id} className="card col-2 mx-4 my-4">
                    <a className="text-decoration-none" href={srcDetail}>   
                        <img class="card-img-top align-self-center mt-2 py-0" src={srcPic} style={{height: 200}} alt="Card image cap"/>
                    </a>
                    <div class="card-body p-0">
                    <div className="row my-1">
                        <div className="col-2 align-self-center float-left">
                            <img  src="https://placeimg.com/640/480/tech" style={{height:30, width:30, border:1, borderRadius:50}} alt=""/>
                        </div>
                        <div className="col-10 my-2">
                            <h6 class="card-title my-auto">{product.username}</h6>
                        </div>
                    </div>
                    <h5 class="card-title ">
                        <a className="text-decoration-none" style={{color:'#240075'}} href={srcDetail}>{product.product}</a>
                    </h5>
                    <p class="card-text">Rating</p>
                    </div>
                    
                    <div>
                        <label class="card-text font-weight-bold float-right">STARTING AT Rp {product.price_basic}</label>
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
