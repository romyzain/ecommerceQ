import React, { Component } from 'react';
import './App.css';
import Home from './Pages/Home';
import { Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import LoginPage from './Pages/LoginPage';
// import RegisterPage from './Pages/RegisterPage';
import RegisterPage from './Pages/RegisterHooks'
import ProductsPage from './Pages/ProductsPage'
import LatihanAxios from './Pages/LatihanAxios';
import Review from './Pages/Review'
import ProductDetail from './Pages/ProductDetail';
import ManageProducts from './Pages/ManageProducts'
import Cart from './Pages/Cart'
import TransactionHistory from './Pages/TransactionHistory'
import Profile from './Pages/Profile'
// import Axios from 'axios';
// import { API_URL }from './Support/API_URL'
import { Login, KeepLogin } from './Redux/Action'
import { connect } from 'react-redux';

class App extends Component{

  componentDidMount(){
    let token = localStorage.getItem('token')
    if(token){
      this.props.KeepLogin(token)
    }
    // let token= localStorage.getItem('username')//terima 1 param key
    // if(token){
    //   console.log(JSON.parse(token)) //parse membuat sting menjadi object
    //   let tokenParse= JSON.parse(token)
    //   Axios.get(`${API_URL}/users?username=${tokenParse.username}&password=${tokenParse.password}`)
    //   .then((res) => {
    //     console.log(res.data)
    //     let { username, email, role, id} = res.data[0]
    //     this.props.Login({
    //       username,
    //       email,
    //       role,
    //       id
    //     })
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    // }
  }

  render(){
    return(
      <div>
        <Header />
        <Route path='/' component={Home} exact/>
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/products' component={ProductsPage} />
        <Route path='/latihan' component={LatihanAxios} />
        <Route path='/review' component={Review} />
        <Route path='/product-detail' component={ProductDetail} />
        <Route path='/manage-products' component={ManageProducts} />
        <Route path='/cart' component={Cart} />
        <Route path='/transaction' component={TransactionHistory} />
        <Route path='/profile' component={Profile} />
        <Footer/>
      </div>
    )
  }
}

export default connect(null, { Login, KeepLogin })(App); //null berati tidak perlu global
