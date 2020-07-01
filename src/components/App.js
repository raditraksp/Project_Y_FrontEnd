import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginAction } from '../config/redux/actions'

// Components
import Header from './Header'
import Home from './Home'
import Register from './Register'

// User
import Profile from './Users/Profile'
import ForgetPasswordEmail from './Users/ForgetPasswordEmail'

// Product
import ManageProduct from './Product/ManageProduct'
import AddProduct from './Product/AddProduct'
import EditProduct from './Product/EditProduct'
import DetailProduct from './Product/DetailProduct'


export default function App() {


    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
 
    useEffect(() => {
       const user = JSON.parse(localStorage.getItem('user'))
 
       if(user) dispatch(loginAction(user)) 
       setLoading(false)
 
    }, [])

    return loading ? (
        <h1 className="text-center">L O A D I N G ...</h1>
     ) : (
        <div>
            <BrowserRouter>
                <div class="header">
                    <Header/>
                    <Route path="/" exact component={Home} />
                    <Route path="/register" component={Register} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/forgetPasswordEmail" component={ForgetPasswordEmail} />

                    <Route path="/manageproduct" component={ManageProduct} />
                    <Route path="/product/addproduct" component={AddProduct} />
                    <Route path="/product/editproduct/:product_id" component={EditProduct} />
                    <Route path="/product/detailproduct/:product_id" component={DetailProduct} />
                </div>
            </BrowserRouter>
            </div>
        )
    }
