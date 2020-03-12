import React, { Component } from 'react'
import { Table, Button,Input } from 'reactstrap'
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'
import Swal from 'sweetalert2'

class ManageProducts extends Component {
    state= { 
        data: [],
        selectedId :null

    }
    componentDidMount(){
        
        Axios.get(`${API_URL}/products`)
        .then((res) => {
            this.setState({
                data : res.data
            })
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
        //this.fetchData() sama saja



    }

    fetchData = () => {
        Axios.get(`${API_URL}/products`)
        .then((res) => {
            this.setState({
                data : res.data
            })
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderTable = () => {
        return this.state.data.map((val) => {
            if(val.id === this.state.selectedId){
                return(
                    <tr>
                        <td></td>
                        <td>
                            <Input defaultValue={val.name} innerRef={(editName) => this.editName=editName}/>
                        </td>
                        <td>
                            <Input defaultValue={val.brand} innerRef={(editBrand) => this.editBrand=editBrand}/>
                        </td>
                        <td>
                            <Input defaultValue={val.price} type='number' innerRef={(editPrice) => this.editPrice=editPrice}/>
                        </td>
                        <td>
                            <Input defaultValue={val.category} innerRef={(editCategory) => this.editCategory=editCategory}/>
                        </td>
                        <td>
                            <Input defaultValue={val.image} innerRef={(editImage) => this.editImage=editImage}/>
                        </td>
                        <td>
                            <Button color='danger' onClick={() => this.setState({selectedId : null})}>
                                Cancel
                            </Button>
                        </td>
                        <td>
                            <Button color='primary' onClick={()=> this.confirmEdit(val.id)}>
                                Save
                            </Button>
                        </td>
                    </tr>
                )
            }
            return(
                    <tr>
                        <td>{val.id}</td>
                        <td>{val.name}</td>
                        <td>{val.brand}</td>
                        <td>{val.price}</td>
                        <td>{val.category}</td>
                        <td>
                            <img src={val.image} alt={val.image} style={{width:'150px'}}/>
                        </td>
                        <td>
                            <Button color="warning" onClick={()=>this.selectEdit(val.id)}>
                                Edit
                            </Button>
                        </td>
                        <td>
                            <Button color="danger" onClick={() => this.deleteData(val.id, val.image)}>
                                Delete
                            </Button>
                        </td>
                    </tr> 
                    
            )
        })
    }

    selectEdit = (id) => {
        this.setState({
            selectedId : id
        })
    }

    confirmEdit = (id) => {
        let name =this.editName.value
        let brand =this.editBrand.value
        let price =this.editPrice.value
        let category =this.editCategory.value
        let image =this.editImage.value

        Axios.put(`http://localhost:2000/products/${id}`, {name, brand,price,category,image})
        .then((res) => {
            console.log(res)
            this.setState({selectedId : null})
            this.fetchData() //merefresh data{}
        })
        .catch((err) => {
            console.log(err)
        })

    }

    deleteData = (id,image) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            imageUrl: image ,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                Axios.delete(`${API_URL}/products/${id}`)
                .then((res) => {
                    console.log(res.data)
                    this.fetchData()
                    Swal.fire(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                    )
                })
            }
        })
            .catch((err) => {
        
            })
    }







    addProduct = () => {
        let name = this.name.value
        let brand = this.brand.value
        let price = this.price.value
        let category = this.category.value
        let image = this.image.value
        
        let productData= {
            name,
            brand,
            price,
            category,
            image
        }


        Axios.post(`${API_URL}/products`, productData)
        .then((res) =>{
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
        this.fetchData()
    }

    // deleteProduct = () => {
    //     let id=this.props.location.search.split('=')[1]
    //     console.log(id)

    //     let name = this.name.value
    //     let brand = this.brand.value
    //     let price = this.price.value
    //     let category = this.category.value
    //     let image = this.image.value
        
    //     let productData= {
    //         name,
    //         brand,
    //         price,
    //         category,
    //         image
    //     }
    //     console.log(productData)

    //     Axios.delete(`${API_URL}/products/${id}`, productData)
    //     .then((res) => {
    //         this.setState({
    //             data:res.data
    //         })
    //         console.log(this.res.data)      
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // }
        
    

    render(){
        return(

            <div>
                <Table dark>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th colSpan='2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th><Input type='text' placeholder='Name' innerRef={(name) => this.name = name}/></th>
                            <th><Input type='text' placeholder='Brand' innerRef={(brand) => this.brand = brand}/></th>
                            <th><Input type='text' placeholder='Price' innerRef={(price) => this.price = price}/></th>
                            <th>
                                <Input type='select' innerRef={(category) => this.category = category}>
                                    <option>Men</option>
                                    <option>Woman</option>
                                    <option>Kids</option>
                                </Input>
                            </th>
                            <th><Input placeholder='Image' innerRef={(image) => this.image = image}/></th>
                            <th>
                                <Button color="primary" onClick={this.addProduct}>
                                    Add product
                                </Button>
                            </th>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        
        )
    }
}

export default ManageProducts