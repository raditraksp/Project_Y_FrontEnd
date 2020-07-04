import React, {useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Link, Redirect} from 'react-router-dom'
import axios from '../config/api'
import {loginAction,logoutAction} from '../config/redux/actions'
import {
   Button,
   Collapse,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
   Navbar,
   NavbarToggler, 
   Nav,
   NavLink,
   NavItem,
   NavbarText,
   NavbarBrand,
   UncontrolledDropdown,
   Modal,
   ModalHeader, 
   ModalBody, 
   ModalFooter 
   } from 'reactstrap';
import Swal from 'sweetalert2'


export default function Header() {

    const [isOpen, setIsOpen] = useState(false)
    const [modal, setModal] = useState(false)
    const [user, setUser] = useState({})
    const username = useSelector(state =>  state.auth.username)
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const role_id = useSelector(state => state.auth.role_id)

    const config = {headers: {Authorization: token}}    

    const isToggle = () => setIsOpen((prevState) => !prevState)
    const funModal = () => setModal((prevState) => !prevState)

    const usernameRef = useRef()
    const passwordRef = useRef()

    const onButtonClick = () => {
        const username = usernameRef.current.value
        const password = passwordRef.current.value

        axios.post('/user/login', {username, password})
        .then(({data : {token, user : {id, username, role_id, email}}}) => {
           
           // simpan ke redux
           dispatch(loginAction({id, username, token, role_id, email}))

        })
        .catch(err => alert(err.response.data.message))
        setModal((prevState) => !prevState)
    }

    const forgetPassword = () => {
        window.location.href = '/forgetPasswordEmail'
        setModal((prevState) => !prevState)
    }

    useEffect(() => {
        renderNav()
        getUserDetail()
    }, [])

    const getUserDetail = () => {
        axios.get(`/user/profile`, config)
        .then((res)=>setUser(res.data.result[0]))
        .catch((err)=>console.log(err))
    }

    const funLogout = () => {
        axios.delete('/logout', config)
        .then(dispatch(logoutAction())) 
        
    }

    const buttonBecomeSeller = () => {
        
        if(!user.ktp_number) return alert('Lengkapi profile anda terlebih dahulu')

        Swal.fire({
            title: 'Apakah kamu yakin ingin menjadi penjual?',
            text: "Halaman akan terlogout otomatis!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
          }).then((res) => {
            // res.value bernilai true jika kita memilih 'Ya' , sebaliknya
            if (res.value) {
                axios.get('/becomeseller', config)
                .then((result)=> {
                    axios.delete('/logout', config)
                    Swal.fire(
                        'Selamat anda sudah terdaftar sebagai penjual!',
                        'Mohon login ulang terlebih dahulu',
                        'success'
                    )
                    dispatch(logoutAction())
                })
            }
          })

    }

    const buttonSub = () => {
        
        if(!user.ktp_number) return alert('Lengkapi profile anda terlebih dahulu')

        Swal.fire({
            title: 'Apakah kamu yakin ingin menjadi penjual?',
            text: "Halaman akan terlogout otomatis!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
          }).then((res) => {
            // res.value bernilai true jika kita memilih 'Ya' , sebaliknya
            if (res.value) {
                axios.get('/becomeseller', config)
                .then((result)=> {
                    axios.delete('/logout', config)
                    Swal.fire(
                        'Selamat anda sudah terdaftar sebagai penjual!',
                        'Mohon login ulang terlebih dahulu',
                        'success'
                    )
                    dispatch(logoutAction())
                })
            }
          })

    }

    const renderNav = () => {
        // Jika tidak login
        if(!username){
        return  (
            <Nav className="bg-transparant font-weight-bold ml-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} to="/register">Register</NavLink>
                </NavItem>
                <NavItem>
                    <button onClick={funModal} className="btn btn-outline-secondary font-weight-bold mb-2 px-4 btn-block">Login</button>
                </NavItem>
            </Nav>
        )}else if (role_id === 1){
            return (
                <Nav className="bg-transparant ml-auto" navbar>
                    <NavItem >
                        <NavLink href="/manageproductadmin">Manage Product Admin</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle className="font-weight-bold" nav caret>
                             Hello, {username}
                        </DropdownToggle>
                        <DropdownMenu right>
                            <NavLink tag={Link} to="/profile">
                                <DropdownItem>Profile</DropdownItem>
                            </NavLink>
                            <NavLink tag={Link} to="/historytransactionuser">
                                <DropdownItem>History Transaction</DropdownItem>
                            </NavLink>

                            <DropdownItem divider />

                            <NavLink tag={Link} to="/">
                                <DropdownItem onClick={funLogout}>Logout</DropdownItem>
                            </NavLink>

                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            )}
        // JIKA USER BIASA YANG LOGIN
        else if (role_id === 2){
            return (
                <Nav className="bg-transparant  ml-auto" navbar>
                    <NavItem>
                        <button onClick={buttonBecomeSeller} className="btn btn-primary">Become a Seller!</button>
                    </NavItem>
                    <NavItem>
                            <NavLink href="/products/cart">Cart</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle className="font-weight-bold" nav caret>
                            Hello, {username}
                        </DropdownToggle>
                        <DropdownMenu right>
                            <NavLink tag={Link} to="/profile">
                                <DropdownItem>Profile</DropdownItem>
                            </NavLink>
                            <NavLink tag={Link} to="/report">
                                <DropdownItem>Report</DropdownItem>
                            </NavLink>

                            <DropdownItem divider />

                            <NavLink tag={Link} to="/">
                                <DropdownItem onClick={funLogout}>Logout</DropdownItem>
                            </NavLink>

                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            )}
            //
            else if (role_id === 3){
                return (
                    <Nav className="bg-transparant ml-auto" navbar>
                        <NavItem >
                                <NavLink href="/products/cart">Cart</NavLink>
                            </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle className="font-weight-bold" nav caret>
                                Hello, {username}
                            </DropdownToggle>
                            <DropdownMenu right>
    
                                <NavLink tag={Link} to="/manageproduct" >
                                    <DropdownItem> Manage Product</DropdownItem>
                                </NavLink>
    
                                <NavLink tag={Link} to="/profile">
                                    <DropdownItem>Profile</DropdownItem>
                                </NavLink>
    
                                <DropdownItem divider />
    
                                <NavLink tag={Link} to="/">
                                    <DropdownItem onClick={funLogout}>Logout</DropdownItem>
                                </NavLink>
    
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                )}
    }

    return role_id != 1 ? (
        <div>
            <Navbar  className="bg-transparant" light expand="md">
                <NavbarBrand tag={Link} to="/" className=" font-weight-bolder">JASAJA DOTCOM</NavbarBrand>    
                <NavbarToggler onClick={isToggle} />
                    <Collapse isOpen={isOpen} navbar>
                        
                        {renderNav()}

                    </Collapse>          
            </Navbar>

            <Modal isOpen={modal} toggle={funModal}>
                        
                <ModalBody>
                    <div className="border-bottom border-secondary card-title text-center ">
                        <h1>Login to Jasaja</h1>
                    </div>
                    <form className='form-group'>
                        <div className="card-title ">
                        </div>
                        <input ref={usernameRef} type='text' placeholder="Username" className='form-control' required/>

                        <div className="card-title ">
                        </div>
                        <input ref={passwordRef} type='password' placeholder="Password" className='form-control'/>
                    </form>
                    <button className="btn btn-outline-dark mb-2" onClick={forgetPassword} >Forget password?</button>
                    <button className="btn btn-dark btn-block" onClick={onButtonClick} >Login</button>
                </ModalBody>
            </Modal>
        </div>
    ) : (
        <div>
            <Navbar className="bg-transparant" light expand="md">
                <NavbarBrand tag={Link} to="/" className=" font-weight-bolder">JASAJA DOTCOM</NavbarBrand>    
                <NavbarToggler onClick={isToggle} />
                    <Collapse isOpen={isOpen} navbar>
                        
                        {renderNav()}

                    </Collapse>          
            </Navbar>

            {/* <Modal isOpen={modal} toggle={funModal}>
                        
                <ModalBody>
                    <div className="border-bottom border-secondary card-title text-center ">
                        <h1>Login to Jasaja</h1>
                    </div>
                    <form className='form-group'>
                        <div className="card-title ">
                        </div>
                        <input ref={usernameRef} type='text' placeholder="Username" className='form-control' required/>

                        <div className="card-title ">
                        </div>
                        <input ref={passwordRef} type='password' placeholder="Password" className='form-control'/>
                    </form>
                    <button onClick={forgetPassword} >Forget password?</button>
                    <button className="btn btn-success btn-block" onClick={onButtonClick} >Login</button>
                </ModalBody>
            </Modal> */}
        </div>
    )
}
