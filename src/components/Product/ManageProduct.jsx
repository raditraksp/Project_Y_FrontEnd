import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'
import axios from '../../config/api'
import Swal from 'sweetalert2'
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


export default function ManageProduct() {

    
    const token = useSelector(state => state.auth.token)
    const [products, setProducts] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [modal, setModal] = useState(false)

    // ADD PRODUCT
    const [product, setProduct] = useState("")
    const [category, setCategory] = useState("")
    const [detailBasic, setDetailBasic] = useState("")
    const [priceBasic, setPriceBasic] = useState("")
    const [detailPremium, setDetailPremium] = useState("")
    const [pricePremium, setPricePremium] = useState("")
    const [source, setSource] = useState([])

    const isToggle = () => setIsOpen((prevState) => !prevState)
    const funModal = () => setModal((prevState) => !prevState)
    
    // ADD PRDUCT
    const productRef = useRef()
    const categoryRef = useRef()
    const priceBasicRef = useRef()
    const detailBasicRef = useRef()
    const pricePremiumRef = useRef()
    const detailPremiumRef = useRef()
    const productPhotoRef = useRef()

    const getData = () => {
        const config = {headers: {Authorization: token}}
         axios.get('/products/me', config)
            .then(res => setProducts(res.data))
            .catch(err => console.log({err}))
    } 

    useEffect(() => {
        getData()
     }, [])

    const addProduct = () => {
        const data = new FormData()
        const config = {headers: {Authorization: token}}
    
        const product = productRef.current.value
        const category = categoryRef.current.value
        const price_basic = parseInt(priceBasicRef.current.value)
        const detail_basic = detailBasicRef.current.value
        const price_premium = parseInt(pricePremiumRef.current.value)
        const detail_premium = detailPremiumRef.current.value
        const product_photo  = productPhotoRef.current.files[0]

        console.log(product_photo)

        // Data (name, email, password, image) yang sudah berhasil di ambil, akan 'dimasukkan' ke formData
        data.append("product", product)
        data.append("category_id", category)
        data.append("price_basic", price_basic)
        data.append("detail_basic", detail_basic)
        data.append("price_premium", price_premium)
        data.append("detail_premium", detail_premium)
        data.append("product_photo", product_photo)
        // Kirim ke API
        
        axios.post('/products', data, config)
         .then(res => console.log({res}))
         .catch(err => console.log({err}))
   }

//     const onButtonClick = () => {
//         const username = usernameRef.current.value
//         const password = passwordRef.current.value

//         axios.post('/user/login', {username, password})
//         .then(({data : {token, user : {id, username}}}) => {
           
//            // simpan ke redux
//            dispatch(loginAction({id, username, token}))

//         })
//         .catch(err => alert(err.response.data.message))
//         setModal((prevState) => !prevState)
//   }

    

      // button delete product
    const deleteProduct = (id) => {
        // axios.delete(`/products/${id}`)
        // // .then( this.getData() ) => bisa langsung seperti ini kalau case delete
        // .then((res)=>{this.getData()})
        Swal.fire({
            title: 'Apakah kamu yakin?',
            text: "Kamu tidak bisa mengembalikannya lagi!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
          }).then((res) => {
            // res.value bernilai true jika kita memilih 'Ya' , sebaliknya
            if (res.value) {
                const config = {headers: {Authorization: token}}
                axios.delete(`/product/${id}`, config)
                .then((res) => { 

                    Swal.fire(
                        'Berhasil!',
                        'Produk berhasil di hapus.',
                        'success'
                    )
                    getData() 
                })
            }
          })
    }

    // toggle setelah klib button edit
    const editToggle = (id) => {
        getData()
        .then((res)=>{setModal(true)})
    }

    // Cancel edit
    const onCancelToggle = () => {
        setModal(false)
    }

    const renderList = () => {
        if (products.length === 0) return <div className="text-center"> <h3>No Product Added</h3> </div>
        return products.map((product) => {
            const srcPic = `http://localhost:2022/product/picture/${product.product_photo}`
            console.log(product)

            return (
            <tr>
                <td>
                    {product.id}
                </td>
                <td>
                    {product.product}
                </td>
                <td>
                    {product.category}
                </td>
                <td>
                    {product.detail_basic}
                </td>
                <td>
                    {product.price_basic}
                </td>
                <td>
                    {product.detail_premium}
                </td>
                <td>
                    {product.price_premium}
                </td>
                <td>
                    <img className="card" src={srcPic} height="100" width="100" />  
                </td>
                <td>
                    <button type="button" onClick={() => {editToggle(product.id)}} className="btn btn-outline-secondary mb-2 px-4 btn-block">Edit</button>
                    <button type="button" onClick={() => {deleteProduct(product.id)}}  className="btn btn-outline-danger btn-block">Delete</button>
                </td>
            </tr>
        )
        })
    }
    
    return (
        <div className="fluid-container">
                {/* List Product */}
                <h1 className="text-center display-4">Manage Product</h1>
                <button type="button" className="btn btn-success mb-2 px-4 btn-block w-25 float-right mr-3" onClick={funModal}>Add Product</button>
                <table class="table table-hover text-center mb-5">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">PRODUCT NAME</th>
                        <th scope="col">CATEGORY</th>
                        <th scope="col">DETAIL BASIC</th>
                        <th scope="col">BASIC PRICE</th>
                        <th scope="col">DETAIL PREMIUM</th>
                        <th scope="col">PREMIUM PRICE</th>
                        <th scope="col">PICTURE</th>
                        <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderList()}
                    </tbody>
                </table>

                <Modal isOpen={modal} toggle={funModal}>
                        
                <ModalHeader >Add New Product</ModalHeader>
                <ModalBody>
                    <form className='form-group'>
                        <div className="card-title ">
                        </div>
                        <input ref={productRef} type='text' placeholder="Product" className='form-control' required/>

                        <div className="card-title ">
                        </div>
                        <input ref={categoryRef} type='text' placeholder="Category" className='form-control'/>

                        <div className="card-title ">
                        </div>
                        <input ref={priceBasicRef} type='text' placeholder="Price Basic" className='form-control'/>
                        
                        <div className="card-title ">
                        </div>
                        <input ref={detailBasicRef} type='text' placeholder="Detail Basic" className='form-control'/>
                        
                        <div className="card-title ">
                        </div>
                        <input ref={pricePremiumRef} type='text' placeholder="Price Premium" className='form-control'/>
                        
                        <div className="card-title ">
                        </div>
                        <input ref={detailPremiumRef} type='text' placeholder="Detail Premium" className='form-control'/>
                        
                        <div className="card-title ">
                        </div>
                         Choose Image <input ref={productPhotoRef} type='file' className='form-control'/>  
                    </form>

                    <button className="btn btn-success btn-block" onClick={addProduct}>Add</button>
                </ModalBody>
                    </Modal>
              
            </div>
    )
}
