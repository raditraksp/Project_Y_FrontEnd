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
import ChangePassword from './Users/ChangePassword'
import EditPassword from './Users/EditPassword'
import Invoice from './Users/Invoice'
import HistoryTransactionUser from './Users/HistoryTransactionUser.jsx'
import HistoryTransactionSeller from './Users/HistoryTransactionSeller'
import Report from './Users/Report'
import Subscription from './Users/Subscription'
import Reportlink from './Users/Reportlink'


// Product
import ManageProduct from './Product/ManageProduct'
import AddProduct from './Product/AddProduct'
import EditProduct from './Product/EditProduct'
import DetailProduct from './Product/DetailProduct'
import SearchProduct from './Product/SearchProduct'
import SearchCategory from './Product/SearchCategory'
import ProductsPremiumSeller from './Product/ProductsPremiumSeller'
import ProductsBestRating from './Product/ProductsBestRating'
import ProductsPopular from './Product/ProductsPopular'

// CART
import Cart from './Product/Cart'

// ORDER
import Order from './Product/Orders'

// ADMIN
import ManageProductAdmin from './Admin/ManageProductAdmin'
import ManageOrderAdmin from './Admin/ManageOrderAdmin'
import CheckTransferSub from './Admin/CheckTransferSub'

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
                <div className="header">
                    <Header/>
                    <Route path="/" exact component={Home} />
                    <Route path="/register" component={Register} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/subscription" component={Subscription} />
                    <Route path="/forgetPasswordEmail" component={ForgetPasswordEmail} />
                    <Route path="/changePassword/:token/:user_id" component={ChangePassword} />
                    <Route path="/editPassword/" component={EditPassword} />
                    <Route path="/history/transaction/user" component={HistoryTransactionUser} />
                    <Route path="/history/transaction/seller" component={HistoryTransactionSeller} />
                    <Route path="/report/" component={Report} />
                    <Route path="/line" component={Reportlink} />


                    {/* PRODUCT  */}
                                      
                    <Route path="/products/cart" component={Cart} />
                    <Route path="/manageproduct" component={ManageProduct} />
                    <Route path="/product/addproduct" component={AddProduct} />
                    <Route path="/product/editproduct/:product_id" component={EditProduct} />
                    <Route path="/product/detailproduct/:product_id" component={DetailProduct} />
                    <Route path="/orders" component={Order} />   
                    <Route path="/manageorderadmin" component={ManageOrderAdmin} />
                    <Route path="/invoice/:user_id/:order_id" component={Invoice} />
                    <Route path="/products/premiumseller" component={ProductsPremiumSeller} />
                    <Route path="/products/bestrating" component={ProductsBestRating} />
                    <Route path="/products/popularproducts" component={ProductsPopular} />
                    <Route path="/searchproduct" component={SearchProduct} />
                    <Route path="/searchcategory/:cat_id" component={SearchCategory} />

                    {/* ADMIN */}
                    <Route path="/manageproductadmin" component={ManageProductAdmin} />
                    <Route path="/checkupgrade" component={CheckTransferSub} />
                </div>
            </BrowserRouter>
            </div>
        )
    }
