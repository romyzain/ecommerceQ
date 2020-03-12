import React, { Component } from 'react';
import { Input, FormGroup, Label, Form, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { Login } from '../Redux/Action';
import { API_URL } from '../Support/API_URL'

class LoginPage extends Component {
    state = {  }

    onBtnLogin = () => {

        let username = this.username.value;
        let password = this.password.value;

        this.props.Login(username,password)
        
        // axios.get(`${API_URL}/users?username=${username}&password=${password}`)
        // .then((res) => {
        //     console.log(res.data)
        //     if(res.data.length === 0){
        //         window.alert('User does not Exist')
        //     }else{
        //         let { id, username, email, role, password } = res.data[0]
        //         this.props.Login({
        //             id,
        //             username,
        //             email,
        //             role
        //         })
        //         //buat nyimpen data kalo di refresh ga bakal ilang 
        //         //simpen username dilocal storage
        //         //key nyimpen apa, value isinya
        //         //di loginpage sama header
        //         localStorage.setItem('username', JSON.stringify({username, password})) //param 1 key, param 2 value
        //     }
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
        
    }

    render() { 
        if(this.props.logged){
            return(
                <Redirect to='/' />
            )
        }
        console.log(this.props.logged)
        return ( 
            <div className='d-flex justify-content-center' style={{height : '100vh', alignItems : 'center'}}>
                <Form style={{width : '400px', height: '400px'}}>
                    <FormGroup>
                      <Label for="exampleEmail">Username</Label>
                      <Input type="text" name="email" id="exampleEmail" placeholder="Username" innerRef={(username) => this.username = username}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
                      <Input type="password" name="password" id="examplePassword" placeholder="Password" innerRef={(password) => this.password = password}/>
                    </FormGroup>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <Button onClick={this.onBtnLogin}>
                            Login
                        </Button>
                        <Link to='/register'>
                            <Button>
                                Register
                            </Button>
                        </Link>
                    </div>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        logged : state.auth.logged
    }
}
 
export default connect(mapStateToProps, { Login } )(LoginPage);