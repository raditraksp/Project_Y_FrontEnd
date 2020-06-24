// let keyword = 'merah'
// let checkBool= []

// let products = [
//     {
//         "id": 1,
//         "name": "Hoodie Red",
//     },
//     {
//         "id": 2,
//         "name": "Sandal Red",
//     },
//     {
//         "id": 3,
//         "name": "Shoes Blue",
//     },
//     {
//         "id": 4,
//         "name": "T-Shirt O",
//     },
//     {
//         "id": 5,
//         "name": "T-Shirt v",
//     },
// ]

// // forEach akan me-running function sebanyak data di array (products)
// products.forEach((product) => {
//     checkBool.push(product.name.toLowerCase().includes(keyword.toLowerCase()))
// })


// console.log(checkBool.includes(true))

let products = [
    {
        "id": 1,
        "name": "Hoodie Red",
    },
    {
        "id": 2,
        "name": "Sandal Red",
    },
    {
        "id": 3,
        "name": "Shoes Blue",
    },
    {
        "id": 4,
        "name": "T-Shirt O",
    },
    {
        "id": 5,
        "name": "T-Shirt v",
    },
]

checkBool = []

products.forEach((product) => {
        checkBool.push(product.id == 1)
    })

    console.log(checkBool)

    var indeks = checkBool.indexOf(true)


    
    console.log(indeks)
    
    if(checkBool[indeks] == true){
        console.log("anda benar")
        hasil = indeks + 1
        console.log(hasil)
        
    }else{
        console.log("anda salah")
    }

    <h1 className="text-center display-4">Cart</h1>
                
                <table className="table table-hover text-center mb-5">
                    <thead>
                        <tr>
                        <th scope="col">CART ID</th>
                        <th scope="col">NAME</th>
                        <th scope="col">DESC</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">PICTURE</th>
                        <th scope="col">QUANTITY</th>
                        <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>
                


                <div className="mt-3">
                        <div className="card">

                            <div className=" border-bottom border-secondary card-title">
                                <h1 className="text-center">Total Cart</h1>
                            </div>

                            <div className="card-body">
                                {this.totalCart()}
                            </div>
                            </div>
                        
                    </div>