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
   ModalFooter, 
   Label
   } from 'reactstrap';
import Swal from 'sweetalert2'


export default function Header() {

    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [modal, setModal] = useState(false)
    const [user, setUser] = useState({})
    const username = useSelector(state =>  state.auth.username)
    const token = useSelector(state => state.auth.token)
    const role_id = useSelector(state => state.auth.role_id)
    const status_sub = useSelector(state => state.auth.status_subscription)

    const config = {headers: {Authorization: token}}    

    const isToggle = () => setIsOpen((prevState) => !prevState)
    const funModal = () => setModal((prevState) => !prevState)

    const usernameRef = useRef()
    const passwordRef = useRef()

    const onButtonClick = () => {
        const username = usernameRef.current.value
        const password = passwordRef.current.value

        axios.post('/user/login', {username, password})
        .then(({data : {token, user : {id, username, role_id, email, status_subscription}}}) => {
           
           // simpan ke redux
           dispatch(loginAction({id, username, token, role_id, email, status_subscription}))

        })
        .catch(err => alert(err.response.data.message))
        setModal((prevState) => !prevState)
    }

    useEffect(() => {
        getUserDetail()
        renderNav()
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
            // ADMIN
        )}else if (role_id === 1){
            return (
                <Nav className="bg-transparant ml-auto" navbar>
                    <NavItem >
                        <NavLink href="/manageproductadmin">Manage Product Admin</NavLink>
                    </NavItem>
                    <NavItem >
                        <NavLink href="/checkupgrade">Check Upgrade</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle className="font-weight-bold" nav caret>
                             Hello, {username}
                        </DropdownToggle>
                        <DropdownMenu right>
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
                    <NavItem>
                            <NavLink href="/products/cart">Order</NavLink>
                    </NavItem>
                    <NavItem>
                            <NavLink href="/products/cart">Progress</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle className="font-weight-bold" nav caret>
                            Hello, {username}
                        </DropdownToggle>
                        <DropdownMenu right>
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
            // SELLER BASSIC
            else if (role_id === 3 && status_sub === 1){
                return (
                    <Nav className="bg-transparant ml-auto" navbar>
                        <NavItem>
                            <Link to="/subscription">
                                <button className="btn btn-primary">Upgrade to Premium!</button>
                            </Link>
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
            else if (role_id === 3 && status_sub === 2){
                return (
                    <Nav className="bg-transparant ml-auto" navbar>
                    <NavbarBrand tag={Link} to="/" className=" font-weight-bolder">
                        <Label className="ml-auto"> PREMIUM MEMBER </Label> 
                    </NavbarBrand>    
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

    return (token) ?(
        <div className="container-fluid mx-auto">
            <Navbar  className="bg-white" light expand="md">
                <NavbarBrand tag={Link} to="/" className=" font-weight-bolder">JASAJA DOTCOM</NavbarBrand>    
                <NavbarToggler onClick={isToggle} />
                    <Collapse isOpen={isOpen} navbar>
                        
                        {renderNav()}

                    </Collapse>          
            </Navbar>
            <Navbar  className="bg-light" expand="md">
                <NavItem className="mx-auto">
                    <NavLink className="text-dark text-decoration-none font-weight-bold" tag={Link} to="/register">Programming & Tech</NavLink>
                </NavItem>
                <NavItem className="mx-auto">
                    <NavLink className="text-dark text-decoration-none font-weight-bold" tag={Link} to="/register">Writing & Translation</NavLink>
                </NavItem>
                <NavItem className="mx-auto">
                    <NavLink className="text-dark text-decoration-none font-weight-bold" tag={Link} to="/register">Video & Animation</NavLink>
                </NavItem>
                <NavItem className="mx-auto">
                    <NavLink className="text-dark text-decoration-none font-weight-bold" tag={Link} to="/register">Music & Audio</NavLink>
                </NavItem>
                <NavItem className="mx-auto">
                    <NavLink className="text-dark text-decoration-none font-weight-bold" tag={Link} to="/register">Design & Graphic</NavLink>
                </NavItem>
                <NavItem className="mx-auto">
                    <NavLink className="text-dark text-decoration-none font-weight-bold" tag={Link} to="/register">Business</NavLink>
                </NavItem>
                <NavItem className="mx-auto">
                    <NavLink className="text-dark text-decoration-none font-weight-bold" tag={Link} to="/register">Lifestyle</NavLink>
                </NavItem>
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
                    <NavLink tag={Link} to="/forgetPasswordEmail">
                            <DropdownItem>Forget Password?</DropdownItem>
                        </NavLink>
                    <button className="btn btn-success btn-block" onClick={onButtonClick} >Login</button>
                </ModalBody>
            </Modal>
        </div>
    ) : (
        <div className="container-fluid mx-auto">
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
                    <NavLink tag={Link} to="/forgetPasswordEmail">
                            <DropdownItem>Forget Password?</DropdownItem>
                        </NavLink>
                    <button className="btn btn-success btn-block" onClick={onButtonClick} >Login</button>
                </ModalBody>
            </Modal>
        </div>
    )
}
