import React from 'react'
import {Link} from 'react-router-dom'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';


export default function ListProduct(props) {    
    
    const renderList = props.products.map((product) => {
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
            <div className= "row">
                {renderList}    
            </div>
        
    )
}
