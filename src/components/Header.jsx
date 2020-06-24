import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter 
} from 'reactstrap';

import {connect} from 'react-redux'
import {onLogoutUser} from '../actions/index'
// Import action creator
import {onLoginUser} from '../actions/index'
// Akan me-redirect ke alamat tertentu

class Header extends Component {

    state = {
        isOpen : false,
        modal: false
    }

  

    funLogin  = () =>{
        this.setState({modal:true})
    }
    toggle = () => this.setState({ isOpen : !this.state.isOpen })
    modal = () => this.setState({ modal : !this.state.modal })

    onButtonClick = () => {
        let _username = this.username.value
        let _pswd = this.password.value

        // Get data with parameters
        let link = 'http://localhost:2022/users'
        let data = {username : _username, pswd: _pswd}
        
        axios.get(link,{params : data}).then((res) => {

            if(res.data.length > 0){
                // res.data[0] = {id : 1, username: 'rochafi', password: 'satuduatiga'}
                // user ditemukan : simpan info user ke redux
                this.props.onLoginUser(res.data[0])
                this.setState({modal:false})
            } else {
                // user tidak ditemukan : munculkan notif
                alert('username or password is incorrect')
            }
            
        })

    }

    // Menentukan apa yang harus ditampilkan di header (Register dan login) atau (Hello, username)
    renderNav = () => {

        // Jika tidak login
        if(this.props.uname == ""){ 
            return (
                <Nav className="ml-auto " navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/Register">SignUp</NavLink>
                    </NavItem>
                    <NavItem>
                    <button onClick={() => {this.funLogin()}} className="btn btn-outline-secondary mb-2 px-4 btn-block">Login</button>
                    </NavItem>
                </Nav>
            )
        }

        // Jika login
        return (
            <Nav className="ml-auto " navbar>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Hello, {this.props.uname}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem tag={Link} to="/manageproduct">
                            Manage Product
                        </DropdownItem>

                        <DropdownItem tag={Link} to="/chart">
                            chart
                        </DropdownItem>

                        <DropdownItem divider />

                        <DropdownItem onClick={this.props.onLogoutUser}>
                            Logout
                        </DropdownItem>

                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        )
    }

    render() {
            return (
                <div> 
                    <Navbar color="light" light expand="md">
                        <NavbarBrand tag={Link} to="/">reactstrap</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            
                            {this.renderNav()}

                        </Collapse>
                    </Navbar>

                    <Modal isOpen={this.state.modal} toggle={this.modal}>
                        
                <ModalBody>
                <div className="border-bottom border-secondary card-title text-center ">
                                    <h1>Login to Jasaja</h1>
                                </div>
    
                                <form className='form-group'>
                                    <div className="card-title ">
                                    </div>
                                    <input ref={(input) => {this.username = input}} type='text' placeholder="Username" className='form-control' required/>
    
                                    <div className="card-title ">
                                    </div>
                                    <input ref={(input) => {this.password = input}} type='password' placeholder="Password" className='form-control'/>
                                </form>
    
                                <button className="btn btn-success btn-block" onClick={this.onButtonClick} >Login</button>
                </ModalBody>
            </Modal>
                </div>
            )
    }
}

let mapStateToProps = (state) => {
    return {
        uname : state.auth.username
    }
}

export default connect(mapStateToProps, {onLoginUser,onLogoutUser})(Header)

// const [isOpen, setIsOpen] = useState(false);
// const togglex = () => setIsOpen(!isOpen);