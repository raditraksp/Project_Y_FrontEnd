import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'
import { useParams, Redirect} from 'react-router-dom'
import axios from '../../config/api'
import Pdf from 'react-to-pdf'

export default function Invoice() {    

    const token = useSelector(state => state.auth.token)
    const user = useSelector(state => state.auth.username)
    // const id = useSelector(state => state.auth.id)
    const [trxs, setTrx] = useState([])
    let {user_id, order_id} = useParams()
    const config = {headers: {Authorization: token}}
    let ref = useRef()
    const d = new Date()
    const option = {
        orientation: 'landscape'
    }
    
    const getData = () => {
        axios.get(`/invoice/${user_id}/${order_id}`, config)
            .then(res => setTrx(res.data))
            .catch(err => console.log({err}))
    } 

    useEffect(() => {
        getData()
    }, [])
    
    return trxs.map((trx) => {
        return token ? (
            <div className="container">
                <div className="" ref={ref}>
                    <h1 className="text-center display-4">INVOICE</h1>
                        <div>
                            <div>
                                <label className="ml-3 font-weight-bold">No Invoice : {trx.order_id}/{d.getMonth(trx.finish_time)}/{d.getFullYear(trx.finish_time)}/{user}</label>
                            </div>
                            <div>
                                <label className="ml-3">Buyer : {user}</label>
                            </div>
                            <div>
                                <label className="ml-3">Seller : {trx.username}</label>
                            </div>
                        </div>
                        <div>
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                    <th className="text-center" scope="col">NO ORDER</th>
                                    <th className="text-center" scope="col">PRODUK</th>
                                    <th className="text-center" scope="col">DETAIL</th>
                                    <th className="text-center" scope="col">START</th>
                                    <th className="text-center" scope="col">FINISH</th>
                                    <th className="text-center" scope="col">HARGA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <th className="text-center" scope="row">{trx.order_id}</th>
                                    <td className="text-center">{trx.product_name}</td>
                                    <td className="text-center">{trx.detail_order}</td>
                                    <td className="text-center">{d.getDate(trx.order_time)}/{d.getMonth(trx.order_time)}/{d.getFullYear(trx.order_time)}</td>
                                    <td className="text-center">{d.getDate(trx.finish_time)}/{d.getMonth(trx.finish_time)}/{d.getFullYear(trx.finish_time)}</td>
                                    <td className="text-center">{trx.total_amount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                <div className="mt-5 d-flex justify-content-center">
                    <Pdf targetRef={ref} filename={`invoice_${trx.user_id}_${trx.order_id}.pdf`} options={option} x={.5} y={.5}>
                        {({ toPdf }) =><button type="button" onClick={toPdf} className="btn btn-outline-primary mb-2 px-4 d-inline-block">Download Invoice</button>}
                    </Pdf>
                </div>
            </div>
            
        ) : (
            <Redirect to='/'/>
            )
        })
    }
    