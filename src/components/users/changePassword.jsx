import React, {useState, useEffect, useRef} from 'react'
import {Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button} from 'reactstrap'
import axios from '../../config/api'

export default function changePassword() {
    <div className="container-fluid">
            <div className="row">
                <div className="col-6 mx-auto mt-3">
                <Card>
                  <CardBody>
                  <form className='form-group'>
                        <div className="card-title ">
                        </div>
                        <input ref={emailRef} type='text' placeholder="email" className='form-control'/>
                    </form>
                  
                  <button onClick={sendEmail} className="btn btn-block btn-dark mt-2 mb-1">ganti password</button>
                  </CardBody>
                  </Card>
                </div>
            </div>
        </div>


}