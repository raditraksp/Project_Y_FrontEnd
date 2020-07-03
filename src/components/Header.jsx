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

export default function Header() {

    const [isOpen, setIsOpen] = useState(false)
    const [modal, setModal] = useState(false)
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

    const funLogout = () => {
        axios.delete('/logout',config)
        .then(dispatch(logoutAction())) 
        
    }
    

    useEffect(() => {
        renderNav()
    }, [])


    const renderNav = () => {
        // Jika tidak login
        if(!username){
        return  (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} to="/register">Register</NavLink>
                </NavItem>
                <NavItem>
                    <button onClick={funModal} className="btn btn-outline-secondary mb-2 px-4 btn-block">Login</button>
                </NavItem>
            </Nav>
        )}
        // JIKA USER BIASA YANG LOGIN
        else if (role_id === 2){
            return (
                <Nav className="ml-auto" navbar>
                    <NavItem>
                            <NavLink href="/products/cart">Cart</NavLink>
                        </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
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
            //
            else if (role_id === 3){
                return (
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                                <NavLink href="/products/cart">Cart</NavLink>
                            </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Hello, {username}
                            </DropdownToggle>
                            <DropdownMenu right>
    
                                <NavLink tag={Link} to="/manageproduct" >
                                    <DropdownItem> Manage Product</DropdownItem>
                                </NavLink>

                                <NavLink tag={Link} to="/report" >
                                    <DropdownItem>Report</DropdownItem>
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
            <Navbar  color="light" light expand="md">
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
    ) : (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={Link} to="/" className=" font-weight-bolder">JASAJA DOTCOM</NavbarBrand>
                <Nav className="mr-auto" navbar>
                    <NavItem >
                        <NavLink href="/manageproductadmin">Manage Product Admin</NavLink>
                    </NavItem>
                </Nav>      
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
