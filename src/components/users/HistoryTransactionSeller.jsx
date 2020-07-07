import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'
import axios from '../../config/api'
import Swal from 'sweetalert2'
import {Link, Redirect} from 'react-router-dom'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';


export default function HistoryTransactionSeller() {    

    const token = useSelector(state => state.auth.token)
    const [histories, setHistories] = useState([])
    const searchRef = useRef()
        

    const getData = () => {
        const config = {headers: {Authorization: token}}
         axios.get('/historytransaction/seller', config)
            .then(res => setHistories(res.data))
            .catch(err => console.log({err}))
    } 

    useEffect(() => {
        getData()
     }, [])

     const onButtonSearch = () => {
        const search = searchRef.current.value
        const config = {headers: {Authorization: token}}
         axios.get('/historytransaction/seller', config)
        .then((res) => {
            let filterResult = []
            filterResult = res.data.filter((data) => {
                return (
                    data.product_name.toLowerCase().includes(search.toLowerCase())
                )
            })
            setHistories(filterResult)
        })
        
    }
    
    const renderList = () => {
        return histories.map((history) => {
            if (histories.length === 0) return <div className="text-center"> <h3>No Product in History</h3> </div>
                const srcPic = `http://localhost:2022/product/picture/${history.picture}`

                return (
                        <tr> 
                            <td>
                                {history.id}
                            </td>
                            <td>
                                {history.username}
                            </td>
                            <td>
                                {history.product_name}
                            </td>
                            <td>
                                {history.detail_order}
                            </td>
                            <td>
                               {history.total_amount}
                            </td>     
                            <td>
                                {history.status}
                            </td>
                            <td>
                                {history.order_time}
                            </td>
                            <td>
                                {history.finish_time}
                            </td>
                            <td>
                                <Link to={`/product/detailproduct/${history.product_id}`}>
                                    <button type="button" className="btn btn-outline-primary mb-2 px-4 btn-block">Detail</button>
                                </Link>
                            </td>
                        </tr>

                    )
                })
    }
    return token ? (
        <div className="fluid-container">
        {/* List Product */}
        <h1 className="text-center display-4">HISTORY TRANSACTION SELLER</h1>
        {/* <Link to="/product/addproduct">
            <button type="button" className="btn btn-success mb-2 px-4 btn-block w-25 float-right mr-3">Add Product</button>
        </Link> */}
        <div className="row w-25 ml-5">
            <div className="col-10 p-0">
                <input ref={searchRef} type="text" defaultValue="" className="form-control my-auto h-100" placeholder='Input product name"'/>
            </div>
            <div className="col-2 p-0">
                {/* <button onClick={onButtonSearch} className="btn btn-primary btn-lg my-auto" >Search</button> */}
                    <button className="btn btn-primary btn-lg my-auto" onClick={onButtonSearch} >Search</button>
            </div>
        </div>
        <label className="ml-3 font-italic">Note: Status 6 = Done, Status 2 = Rejected</label>
        <table class="table table-hover text-center mb-5">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">USER</th>
                <th scope="col">PRODUCT NAME</th>
                <th scope="col">DETAIL</th>
                <th scope="col">AMOUNT</th>
                <th scope="col">STATUS</th>
                <th scope="col">ORDER TIME</th>
                <th scope="col">FINISH TIME</th>
                <th scope="col">ACTION</th>
                </tr>
            </thead>
            <tbody>
                {renderList()}
            </tbody>
        </table>
        
    </div>
        
    ) : (
        <Redirect to='/' />
      )
}
