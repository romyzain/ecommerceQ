import React, { Component } from 'react';
import { Table, Button } from 'reactstrap'
import Swal from 'sweetalert2'
import Axios from 'axios';
import { API_URL } from '../Support/API_URL';
import { connect } from 'react-redux'

class TransactionHistory extends Component {
    state = { 
        data : []
     }
     
     componentDidMount(){
         let token = localStorage.getItem('token')
         let userAccount = JSON.parse(token)
         console.log(userAccount)
         this.fetchData(userAccount.id)
     }

     fetchData = (userId) => {
         Axios.get(`${API_URL}/transaction?userId=${userId}`)
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

     detailProducts = (products, total, date) => {
        let html = `<strong><p>Pembelian pada tanggal: ${date}</p></strong><hr />`
        products.forEach((val, index) => {
            html += `<img width='30%' src='${val.image}' alt='foto'/>
            <h5>${val.name}</h5>
            <p>Size: ${val.sizes}</p>
            <p>Quantity: ${val.quantity} @ ${val.price.toLocaleString()}</p>
            <p>Subtotal: Rp. ${(val.quantity * val.price).toLocaleString()}</p>
            <hr/>
            `
        })
        html += `<strong>Grand Total: ${total.toLocaleString('id-ID',{style:'currency', currency:'IDR'})}</strong>`
        Swal.fire({
            html: html
        })
     }



     tablePayment = () => {
         return this.state.data.map((val, index)=> {
             return(
                    <tr key={index}>
                        <td>{val.date}</td>
                        <td>{(val.total).toLocaleString('id-ID',{style:'currency', currency:'IDR'})}</td>
                        <td>
                            <Button color='primary' onClick={() => this.detailProducts(val.products, val.total, val.date)}>
                                products
                            </Button></td>
                    </tr>
             )
         })
     }

    render() { 
        if(this.state.data.length === 0 ){
            return(
                <h1 style={{textAlign : 'center', height:'400px', marginTop:'200px'}}>You don't have any transaction history.</h1>
            )
        }
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Detail Products</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tablePayment()}
                    </tbody>
                </Table>  
            </div>
          );
    }
}

const MapStateToProps = (state) => {
    return{
        userId : state.auth.id
    }
    
}
 
export default connect(MapStateToProps)(TransactionHistory);