import React, {useState, useEffect, useRef} from 'react'
import axios from '../../config/api'
import { useSelector } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
   Card, CardImg, CardBody, ListGroup, ListGroupItem, Modal, ModalBody
 } from 'reactstrap';



export default function Profile() {

   const [user, setUser] = useState({})
   const [avatar, setAvatar] = useState({})
   const token = useSelector(state => state.auth.token)
   const username = useSelector(state => state.auth.username)
   const email = useSelector(state => state.auth.email)
   // const Id = useSelector(state => state.auth.id)
   const {name, phone_number, address, birth_of_date, gender, ktp_number } = user
   // const [isOpen, setIsOpen] = useState(false)
   const [modal, setModal] = useState(false)
   // const [modal2, setModal2] = useState(false)
   // const isToggle = () => setIsOpen((prevState) => !prevState)
   const funModal = () => setModal((prevState) => !prevState)
   // const funModal2 = () => setModal2((prevState) => !prevState)
   const nameRef = useRef()
   const phone_numberRef = useRef()
   const birthRef = useRef()
   const addressRef = useRef()
   const noktpRef = useRef()
   const genderRef = useRef()
   const avatarRef = useRef()
   const avatarSrc = `http://localhost:2022/user/avatar/${user.user_id}?unq=${new Date()}`

   const getData = () => {
      const config = { headers: { Authorization : token } }

      axios.get(`/user/profile`, config)
         .then(res => setUser(res.data.result[0]))
         
         .catch(err => console.log(err))

   }

   useEffect(() => {
      getData()
      
   }, []
   )
   const onSaveData = () => {
      const name = nameRef.current.value
      const phone_number = phone_numberRef.current.value
      const date_of_birth = birthRef.current.value
      const address = addressRef.current.value
      const ktp_number = noktpRef.current.value
      const gender = genderRef.current.value
      const data = {
         name, 
         phone_number, 
         date_of_birth, 
         address, 
         ktp_number, 
         gender        
      }

      Swal.fire({
          title: 'Apakah kamu yakin?',
          text: "Data sebelumnya akan diubah!",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya!'
        }).then((res) => {
          // res.value bernilai true jika kita memilih 'Ya' , sebaliknya
          if (res.value) {
              const config = {headers: {Authorization: token}}
              axios.patch(`/user/profile`, data, config)
              .then((res) => { 

                  Swal.fire(
                      'Profile Updated!',
                      'Data profile berhasil diubah',
                      'success'
                    )
                  getData()
              }).catch((err) => {
                 console.log(err)
              })
          }
        })
  }
  
  const changeImage = (e) => {
     setAvatar({avatar : URL.createObjectURL(e.target.files[0])})
   }

  const onSavePhoto = () => {
   const data = new FormData()
   const config = {headers: {Authorization : token}}

   const avatar_profile  = avatarRef.current.files[0]

   data.append("avatar", avatar_profile)

   Swal.fire({
       title: 'Apakah kamu yakin?',
       text: "Data sebelumnya akan diubah!",
       icon: 'question',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Ya!'
     }).then((res) => {
       // res.value bernilai true jika kita memilih 'Ya' , sebaliknya
       if (res.value) {
           const config = {headers: {Authorization: token}}

           axios.post(`/user/avatar`, data, config)
           .then(() => { 

               Swal.fire(
                   'avatar Updated!',
                   'Photo avatar berhasil diubah',
                   'success'
                 )
               getData() 
           })
       }
     })
   .catch(err => console.log(err))
}

 

   return username ?(
      <div className="container-fluid">
         <div className="row">
            <div className="col-4 ml-5 mt-5">
                        <div>
                  <Card>
                  <CardImg className="card-img-top" src={avatarSrc} alt={username}/>
                  <CardBody>
                  <ListGroup>
                     <ListGroupItem color="light">username : {username}</ListGroupItem>
                     <ListGroupItem color="dark">name : {name}</ListGroupItem>
                     <ListGroupItem color="light">phone number : {phone_number}</ListGroupItem>
                     <ListGroupItem color="dark">email : {email}</ListGroupItem>
                  </ListGroup>
                  <button onClick={funModal} className="btn btn-block btn-dark mt-2 mb-1" >Edit Profile</button>
                  <Link to= {`/editpassword/${user.user_id}`}>
                  <button className="btn btn-block btn-dark mt-2 mb-1 text-decoration-none" >Change Password</button>
                  </Link>
                  </CardBody>
                  </Card>
                      </div>
            </div>
            <div className="col-8">

            </div>
         </div>
         <Modal isOpen={modal} toggle={funModal}>
                        
                <ModalBody>
                <div className="border-bottom border-secondary card-title text-center ">
                        <h1>Edit Profile</h1>
                    </div>
                   <div className="container-fluid">
                      <div className="row">
                      
                           <div className="col-6">
                           <form className='form-group'>
                        <div className="card-title ">
                           Name :
                        </div>
                        <input ref={nameRef} type='text' defaultValue={name} className='form-control' required/>
                        <div className="card-title ">
                           Gender :
                        </div>
                        <select ref={genderRef} className="form-control">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        </select>

                        <div className="card-title ">
                           Phone Number :
                        </div>
                        <input ref={phone_numberRef} type='text' defaultValue={phone_number} className='form-control'/>
                        
                        <div className="card-title ">
                           Birth of Date :
                        </div>
                        <input ref={birthRef} type='date' defaultValue={birth_of_date} className='form-control'/>
                        <div className="card-title ">
                           Address :
                        </div>
                        <textarea ref={addressRef} type='text' defaultValue={address} className='form-control'/>
                        <div className="card-title ">
                           KTP number :
                        </div>
                        <input ref={noktpRef} type='text' defaultValue={ktp_number} className='form-control'/>
                        
                        
                    </form>
                           </div>
                           <div className="col-6">
                              <form className='form-group'>
                                 <div className="card-title mt-5">
                                 </div>
                                 <img className="card ml-3" src={avatar.avatar} height="200" width="200" />  
                                 <label >Avatar : </label>
                                 <input onChange={changeImage} ref={avatarRef} type='file' className='form-control'/>  
                              </form>
                           </div>
                      </div>
                      <div className="container-fluid">
                         <div className="row">
                            <div className="col-6">
                            <button className="btn btn-success btn-block" onClick={onSaveData} >submit profile</button> 
                            </div>
                            <div className="col-6">
                            <button className="btn btn-success btn-block" onClick={onSavePhoto}>Save Photo</button>  
                            </div>
                         </div>
                      </div>
                       
                                     
                   </div>                   
                </ModalBody>
            </Modal>

            


      </div>
      
      
   ) : (
      <Redirect to='/' />
   )
}



                    

                    