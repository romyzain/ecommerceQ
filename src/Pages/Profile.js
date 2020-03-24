import React, { Component } from 'react';
import Axios from 'axios'
import { connect } from 'react-redux'
// import wall from '../Public/Assets/wallpaper.jpg'
import { API_URL } from '../Support/API_URL';
import { Button, Input } from 'reactstrap';
import  { passChange, KeepLogin }  from '../Redux/Action'
import Swal from 'sweetalert2'
// import {  MDBRow,  MDBCard, MDBCardBody,  MDBIcon, MDBCol, MDBCardImage, MDBCardText, MDBCardTitle } from "mdbreact";

//https://upload.wikimedia.org/wikipedia/commons/d/d1/Mount_Everest_as_seen_from_Drukair2_PLW_edit.jpg


class Profile extends Component {
    state = { 
      data : []
     }

    componentDidMount(){
      let token = localStorage.getItem('token')
      let userdata = JSON.parse(token)
      this.fetchData(userdata)
      console.log(userdata.password)
      Axios.get(`${API_URL}/users?username=${userdata.username}&password=${userdata.password}`)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }

    btnChangePassword = () => {
      let oldPassword = this.oldPassword.value
      let password = this.password.value
      let confirm = this.confirmPass.value

      let token = localStorage.getItem('token')
      let userdata = JSON.parse(token)
      
      if(oldPassword === confirm){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Wrong old password!'
        })
      }else if(password !== confirm ){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'New password or confirm password wrong!'
        })
      }else{
        this.props.passChange(userdata.id, password, userdata.username)
      }
      this.props.KeepLogin(token)
    }
    
    fetchData = () => {
      Axios.get(`${API_URL}/users`)
      .then(res =>{
        this.setState({
          data : res.data
        })
        // console.log(res.data)
      }) 
      .catch(err => {
        console.log(err)
      }) 
    }

    render() { 
        return (
                <div className='container'>
                  <center>
                  <div className='child'>
                    <h3 style={{paddingTop:'20px'}}>Profile</h3>
                    username
                    <p>{this.props.username}</p>
                    <Input type='password' name='password' id='changePassword' placeholder='Old Password' innerRef={(oldPassword) => this.oldPassword = oldPassword}/>
                    <br/>
                    <Input type='password' name='password' id='changePassword' placeholder='change password' innerRef={(password) => this.password = password}/>
                    <br/>
                    <Input type='password' name='password' id='changePassword' placeholder='confirm Password' innerRef={(confirmPass) => this.confirmPass  = confirmPass}/>
                    <br/>
                    <Button onClick={this.btnChangePassword}>
                      change my password
                    </Button>
                  </div>
                  </center>

                </div>
              // </section>
          );
    }
}

 const MapStateToProps = (state) => {
  return{
    username : state.auth.username,
    userId : state.auth.id

  }
}
 
export default connect (MapStateToProps,{passChange, KeepLogin})(Profile);