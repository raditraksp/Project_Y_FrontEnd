import React, {useState, useEffect, useRef} from 'react'
import {Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button} from 'reactstrap'
import axios from '../../config/api'

export default function ForgetPasswordEmail() {

    const [email, setEmail] = useState({})    
    const emailRef = useRef()

    const sendEmail = () => {
        const email = emailRef.current.value
        axios.post('user/forget',{email})
        .then(res => {
            alert(res.data.message)
         })
         .catch(err => {
            alert(err.response.data.message)
         })
   
         
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-6 mx-auto mt-3">
                <Card>
                  <CardBody>
                  <form className='form-group'>
                        <div className="card-title ">
                        </div>
                        <input ref={emailRef} type='text' placeholder="Input your Email" className='form-control'/>
                    </form>
                  
                  <button onClick={sendEmail} className="btn btn-block btn-dark mt-2 mb-1">Verify Email</button>
                  </CardBody>
                  </Card>
                </div>
            </div>
        </div>
    )
}


