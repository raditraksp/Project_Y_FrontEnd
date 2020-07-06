import React, {useState, useRef, useEffect} from 'react'
import axios from '../../config/api'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'




export default function Subscription() {

    const token = useSelector(state => state.auth.token)
    const status_sub = useSelector(state => state.auth.status_subscription)
    const user_id = useSelector(state => state.auth.id)
    const config = {headers: {Authorization: token}}    
    
    const [user, setUser] = useState(undefined)


    const getData = () => {
        axios.get(`/user/transfer/upgrade`, config)
        .then((res)=>setUser(res.data[0]))
        .catch((err)=>console.log(err))
    }

    useEffect(() => {
        getData()
    }, [])


    const transferPhotoRef = useRef()    

    const onDelete = () => {
        Swal.fire({
            title: 'Apakah kamu yakin?',
            text: "Upload nominal uang sesuai dengan deskripsi!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
          }).then((res) => {
            // res.value bernilai true jika kita memilih 'Ya' , sebaliknya
            if (res.value) {
                const config = {headers: {Authorization: token}}
                axios.delete(`/upgrade/${user_id}`, config)
                .then((res) => { 
     
                    Swal.fire(
                        'Upgrade Upremium Cancel!',
                        'Transaksi dibatalkan',
                        'failed'
                      )
                })
            }
            getData()
        })
        .catch(err => console.log(err))
    }

    const onTransferPhoto = () => {
        const data = new FormData()
        const config = {headers: {Authorization : token}}
     
        const transfer_photo  = transferPhotoRef.current.files[0]
     
        data.append("transfer_photo", transfer_photo)
     
        Swal.fire({
            title: 'Apakah kamu yakin?',
            text: "Upload nominal uang sesuai dengan deskripsi!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
          }).then((res) => {
            // res.value bernilai true jika kita memilih 'Ya' , sebaliknya
            if (res.value) {
                const config = {headers: {Authorization: token}}
     
                axios.post(`/transfer_photo`, data, config)
                .then((res) => { 
     
                    Swal.fire(
                        'Bukti Transfer Terkirim!',
                        'Akan dikonfirmasi oleh admin paling lambat 1x24 jam',
                        'success'
                      )
                })
            }
        })
        .catch(err => console.log(err))
     }

    if (!user && status_sub === 1) {
    return (
        <div className="container">
            <div className="text-center">
                <h1>Subscription</h1>
                <div>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia ea itaque officia repudiandae asperiores
                        fugiat temporibus optio nihil. Quam debitis corporis illo impedit deleniti ipsam laborum magni labore molestiae expedita?
                        orem ipsum dolor sit, amet consectetur adipisicing elit. Quia ea itaque officia repudiandae asperiores
                        fugiat temporibus optio nihil. Quam debitis corporis illo impedit deleniti ipsam laborum magni labore molestiae expedita?
                        orem ipsum dolor sit, amet consectetur adipisicing elit. Quia ea itaque officia repudiandae asperiores
                        fugiat temporibus optio nihil. Quam debitis corporis illo impedit deleniti ipsam laborum magni labore molestiae expedita?
                        orem ipsum dolor sit, amet consectetur adipisicing elit. Quia ea itaque officia repudiandae asperiores
                        fugiat temporibus optio nihil. Quam debitis corporis illo impedit deleniti ipsam laborum magni labore molestiae expedita?
                        orem ipsum dolor sit, amet consectetur adipisicing elit. Quia ea itaque officia repudiandae asperiores
                        fugiat temporibus optio nihil. Quam debitis corporis illo impedit deleniti ipsam laborum magni labore molestiae expedita?
                        orem ipsum dolor sit, amet consectetur adipisicing elit. Quia ea itaque officia repudiandae asperiores
                        fugiat temporibus optio nihil. Quam debitis corporis illo impedit deleniti ipsam laborum magni labore molestiae expedita?
                    </p>
                </div>

                <div className="container">
                <form className='form-group w-25 mx-auto'>
                    <div className="card-title ">
                    </div>
                    <label >Kirim Bukti Transfer:</label>
                    <input ref={transferPhotoRef} type='file' className='form-control'/>  
                </form>
                <div>
                    <button className="btn btn-success btn-block w-25 m-auto" onClick={onTransferPhoto}>Send Photo</button>
                </div>

            </div>
            </div>
        </div>
    )} else if (user.status === 2){
        const srcTransfer = `http://localhost:2022/transferphoto/${user.transfer_photo}`
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Pembayaran Anda DITOLAK</h1>

                    <div className="container-sm">
                        <img src={srcTransfer} alt=""/>
                    </div>
                    <div>
                        Status: REJECTED
                    </div> 
                    <form className='form-group w-25 mx-auto'>
                        <div className="card-title ">
                        </div>
                        <label >Kirim Ulang Bukti Transfer:</label>
                        <input ref={transferPhotoRef} type='file' className='form-control'/>  
                    </form>
                    <div>
                        <button className="btn btn-success btn-block w-25 m-auto" onClick={onTransferPhoto}>Send Photo</button>
                    </div>
                    <div>
                        <button className="btn btn-danger btn-block w-25 mx-auto mt-3" onClick={onDelete}>Batalkan Upgrade</button>
                    </div>
                </div>
            </div>
        )
    } else if (user.status === 0){
        const srcTransfer = `http://localhost:2022/transferphoto/${user.transfer_photo}`
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Menunggu Konfirmasi Admin</h1>
    
                    <div className="container-sm">
                        <img src={srcTransfer} alt=""/>
                    </div>
                    <div>
                        <h3 className='my-5'>Status konfirmasi: PENDING</h3>
                    </div> 
                </div>
            </div>
        )
    } else if (status_sub === 2){
        return (
            <div className="container">
                <div className="text-center">
                    <h1>SELAMAT ANDA ADALAH MEMBER PREMIUM</h1>
    
                    <div>
                        <h3 className='my-5'>Status: PREMIUM MEMBER</h3>
                    </div> 
                </div>
            </div>
        )
    }
}
