import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'
import { useParams, Redirect} from 'react-router-dom'
import axios from '../../config/api'
import Pdf from 'react-to-pdf'

export default function Invoice() {    

    const token = useSelector(state => state.auth.token)
    // const id = useSelector(state => state.auth.id)
    const [trxs, setTrx] = useState([])
    let {user_id, order_id} = useParams()
    const config = {headers: {Authorization: token}}
    let ref = useRef()
    
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
            <div className="fluid-container">
                <div ref={ref}>
                    <h1 className="text-center display-4">INVOICE</h1>
                    
                    <label className="ml-3 font-italic">Note: Status 0 = Pending, Status 1 = Approved, Status 2 = Rejected</label>
                        <div>
                            <div>
                                <p>{trx.id}</p>
                                <p>{trx.order_id}</p>
                                <p>{trx.user_id}</p>
                                <p>{trx.seller_id}</p>
                                <p>{trx.product_id}</p>
                                <p>{trx.product_name}</p>
                                <p>{trx.total_amount}</p>
                                <p>{trx.detail_order}</p>
                                <p>{trx.order_time}</p>
                                <p>{trx.finish_time}</p>
                                <p>{trx.status}</p>
                            </div>
                        </div>
                </div>
                <Pdf targetRef={ref} filename={`invoice_${trx.user_id}_${trx.order_id}.pdf`}>
                    {({ toPdf }) => <button type="button" onClick={toPdf} className="btn btn-outline-primary mb-2 px-4 btn-block">Download Invoice</button>}
                </Pdf>
            </div>
        ) : (
            <Redirect to='/'/>
        )
    })
}
