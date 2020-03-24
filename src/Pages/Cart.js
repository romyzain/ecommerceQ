import React, { Component } from 'react'
import { Table, Button } from 'reactstrap'
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import {  Redirect } from 'react-router-dom'

class Cart extends Component{
    state= { 
        data : [],
        grandTotal : 0,
        finishCart: false
    }
    componentDidMount(){
        let token = localStorage.getItem('token')
        let userAccount = JSON.parse(token)
        console.log(userAccount)
        this.fetchData(userAccount.id)
    }

    fetchData = (userId) => {
        Axios.get(`${API_URL}/cart?userId=${userId}`)
        .then((res)=> {
            this.setState({
                data : res.data
            })
            this.grandTotal()
        })
        .catch((err) => {
            console.log(err)

        })
    }

    editData = (id, num) => {
        Axios.get(`${API_URL}/cart?userId=${this.props.userId}&id=${id}`)
        .then((res) => {
            Axios.patch(`${API_URL}/cart/${res.data[0].id}`,{quantity: res.data[0].quantity + num})
            .then((res) => {
                if(res.data.quantity === 0){
                    this.deleteProduct(id, res.data.image, num)
                }
                this.componentDidMount()
            })
            .catch((err)=> {
                console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    deleteProduct = (id, image, num) => {
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
                Axios.delete(`${API_URL}/cart/${id}`)
                .then((res) => {
                    console.log(res.data)
                    this.fetchData(this.props.userId)
                    Swal.fire(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                    )
                })
            }else if(!result.value && num){
                this.editData(id, (num*num))
            }
        })
            .catch((err) => {
                console.log(err)
        
            })
    }

    tableCart = () => {
        return this.state.data.map((val, index) => {
            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{val.name}</td>
                    <td>
                        <img src={val.image} alt={val.image} style={{width:'150px'}}/>
                    </td>
                    <td>{val.sizes}</td>
                    <td>
                        <Button onClick={() => this.editData(val.id, -1)}>-</Button>
                        {val.quantity}
                        <Button onClick={() => this.editData(val.id, 1)}>+</Button>
                    </td>
                    <td>{(val.price * val.quantity).toLocaleString('id-ID',{style:'currency', currency:'IDR'})}</td>
                    <td><Button color='danger' onClick={() => this.deleteProduct(val.id,val.image) }>Delete</Button></td>
                </tr>
            )
        })
    }

    grandTotal = () => {
        console.log(this.state.data)
        this.setState({
            grandTotal: 0
        })
        this.state.data.forEach(val => {
            console.log(val)
            this.setState(prevState => {
                return{
                    grandTotal :prevState.grandTotal + (val.price * val.quantity)
                }
            })
        });
    }

    payment = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.value) {
                Axios.get(`${API_URL}/cart?userId=${this.props.userId}`)
                .then(res => {
                    let newDate = new Date()
                    let weekday = new Array(7)
                        weekday[0] = 'Sunday' 
                        weekday[1] = 'Monday' 
                        weekday[2] = 'Tuesday' 
                        weekday[3] = 'Wednesday' 
                        weekday[4] = 'Thursday' 
                        weekday[5] = 'Friday' 
                        weekday[6] = 'Saturday'
                    let months = new Array(12)
                        months[0] = 'January' 
                        months[1] = 'February' 
                        months[2] = 'March' 
                        months[3] = 'April' 
                        months[4] = 'May' 
                        months[5] = 'June' 
                        months[6] = 'July' 
                        months[7] = 'August' 
                        months[8] = 'September' 
                        months[9] = 'October' 
                        months[10] = 'November' 
                        months[11] = 'December' 
                    let date = `${weekday[newDate.getDay()]}, ${newDate.getDate()} ${months[newDate.getMonth()]} ${newDate.getFullYear()}`
                    let userId = this.props.userId
                    let products = this.state.data
                    let total = this.state.grandTotal
            
                    let paymentData ={date, userId, products, total}
            
                    Axios.post(`${API_URL}/transaction`, paymentData)
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
        
                    res.data.forEach(val => {
                        Axios.delete(`${API_URL}/cart/${val.id}`)
                        .then(res => {
                            console.log(res)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    })
                    this.setState({
                        finishCart: true
                    })
                })
                .catch(err => {
                    console.log(err)
                })
              
            }
          })

    }

    render(){
        if(this.state.data.length === 0 ){
            return(
                <h1 style={{textAlign : 'center', height:'400px', marginTop:'200px'}}>Your Cart is Empty.</h1>
            )
        }else if(this.state.finishCart){
            return(
                <Redirect to='/transaction'/>
            )
        }
        return(
            <div>
                <Table dark>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tableCart()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{this.state.grandTotal.toLocaleString('id-ID',{style:'currency', currency:'IDR'})}</td>
                            <td>
                                <Button color="success" onClick={this.payment}> 
                                    Check Out
                                </Button>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        )
    }
}

const MapStateToProps = (state) => {
    return{
        userId : state.auth.id // harus ngambil dulu dari global 
    }
}

export default connect(MapStateToProps)(Cart)