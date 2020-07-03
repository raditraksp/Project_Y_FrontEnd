import React, {useState, useEffect, useRef} from 'react'
import {Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button} from 'reactstrap'
import { useSelector } from 'react-redux'
import { useParams, Redirect } from 'react-router-dom'
import axios from '../../config/api'


export default function EditPassword() {

    const token = useSelector(state => state.auth.token)

    const oldPasswordRef = useRef()
    const newPassword1Ref = useRef()
    const newPassword2Ref = useRef()

    const sendpassword = () => {

        const config = {headers: {Authorization: token}}

        const oldPassword = oldPasswordRef.current.value
        const newPassword1 = newPassword1Ref.current.value
        const newPassword2 = newPassword2Ref.current.value

        axios.patch(`/changepassword`, {oldPassword,newPassword1,newPassword2}, config)
        .then(res => {
            alert("berhasil")
        }).catch( err => {
            console.log(err)
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
                        <input ref={oldPasswordRef} type='password' placeholder="Old Password" className='form-control'/>
                        <div className="card-title ">
                        </div>
                        <input ref={newPassword1Ref} type='password' placeholder="New Password" className='form-control'/>
                        <div className="card-title ">
                        </div>
                        <input ref={newPassword2Ref} type='password' placeholder=" Confirm New Password" className='form-control'/>
                    </form>
                  
                  <button onClick={sendpassword} className="btn btn-block btn-dark mt-2 mb-1">Change password</button>
                  </CardBody>
                  </Card>
                </div>
            </div>
        </div>
    )
}


