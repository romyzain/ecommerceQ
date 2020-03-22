import React, { Component } from 'react';
import Axios from 'axios'
import { connect } from 'react-redux'
// import wall from '../Public/Assets/wallpaper.jpg'
import { API_URL } from '../Support/API_URL';
import { Login } from '../Redux/Action'
// import {  MDBRow,  MDBCard, MDBCardBody,  MDBIcon, MDBCol, MDBCardImage, MDBCardText, MDBCardTitle } from "mdbreact";

//https://upload.wikimedia.org/wikipedia/commons/d/d1/Mount_Everest_as_seen_from_Drukair2_PLW_edit.jpg


class Profile extends Component {
    state = { 
      data : []
     }

    componentDidMount(){
      Axios.get(`${API_URL}/users`)//?username=${this.props.username}
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    
    passusr = (password) => {
      Axios.get(`${API_URL}/users?password=${password}`)
      .then((res ) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    }

    render() { 
        return (
              // <section>
                <div className='container'>
                  <center>
                  <div className='child'>
                    <h3 style={{paddingTop:'20px'}}>Profile</h3>
                    <p>username</p>
                    <p>{this.props.username}</p>
                    
              
                    {this.props.email}
                    {this.passusr()}

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
    email : state.auth.email

  }
}
 
export default connect (MapStateToProps)(Profile);