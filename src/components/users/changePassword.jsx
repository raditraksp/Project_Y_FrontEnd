import React, {useState, useEffect, useRef} from 'react'
import {Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button} from 'reactstrap'
import { useSelector } from 'react-redux'
import { useParams, Redirect } from 'react-router-dom'
import axios from '../../config/api'


export default function ChangePassword() {

    const passwordRef = useRef()
    const passwordRef2 = useRef()
    const {token,user_id} = useParams()
    const sendpassword = () => {
        const password = passwordRef.current.value
        const password2 = passwordRef2.current.value
        password == password2 ?(
            axios.patch(`user/forget/${user_id}`,{password})
        .then(res => {
            axios.delete(`/deletetoken/${user_id}`)
            alert("password berhasil di ganti")
            window.location = '/'
         })
         .catch(err => {
            alert("tidak berhasil terganti")
         })
        ) : (alert("password doesnt match"))
        
   
         
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
                        <input ref={passwordRef} type='password' placeholder="password" className='form-control'/>
                        <div className="card-title ">
                        </div>
                        <input ref={passwordRef2} type='password' placeholder="password" className='form-control'/>
                    </form>
                  
                  <button onClick={sendpassword} className="btn btn-block btn-dark mt-2 mb-1">verifed password</button>
                  </CardBody>
                  </Card>
                </div>
            </div>
        </div>
    )
}


