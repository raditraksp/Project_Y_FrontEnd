import React, {useState, useEffect, useRef} from 'react'
import {Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button} from 'reactstrap'
import { useSelector } from 'react-redux'
import { useParams, Redirect } from 'react-router-dom'
import axios from '../../config/api'


export default function EditPassword() {

    const oldPasswordRef = useRef()
    const newPasswordRef1 = useRef()
    const newPasswordRef2 = useRef()
    
    const sendpassword = () => {
        const oldPassword = oldPasswordRef.current.value
        const newPassword1 = newPasswordRef1.current.value
        const newPassword2 = newPasswordRef2.current.value
        
        axios.post('/change_password',{oldPassword,newPassword1,newPassword2})
        .then(res => {
            alert('berhasil')
        }).catch(err => {
            alert(console.log(err))
         })
        
   
         
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-6 mx-auto mt-3">
                    
                <Card>
                <h3 className="text-center mt-3">Please insert new password</h3>
                  <CardBody>
                  <form className='form-group'>
                        <div className="card-title ">
                        </div>
                        <input ref={oldPasswordRef} type='password' placeholder="password" className='form-control'/>
                        <div className="card-title ">
                        </div>
                        <input ref={newPasswordRef1} type='password' placeholder="password" className='form-control'/>
                        <div className="card-title ">
                        </div>
                        <input ref={newPasswordRef2} type='password' placeholder="password" className='form-control'/>
                    </form>
                    
                  
                  <button onClick={sendpassword} className="btn btn-block btn-dark mt-2 mb-1">verifed password</button>
                  </CardBody>
                  </Card>
                </div>
            </div>
        </div>
    )
}


