// import React, { Component } from 'react'

// class Review extends Component {

//     state= { }


//     //jalan ketika event tertrntu 
//     componentDidMount(){

//     }

//     //setiap component berubah didupdate bakal jalan  
//     componentDidUpdate(){

//     }

//     //ketika ganti component jalan sekali
//     componentWillUnmount(){

//     }

//     //bakal selalu jalan setiap ada perubahan untuk mengupdate yang dilihat user
//     render() {
//         return (
//             <div>
//                 <h1>
//                     ini Review
//                 </h1>
//             </div>
//         )
//     }
// }

// export default Review


//class component 
//lifecycle component

//state  {object} buat nyimpen data di component sendiiri local LOCALLL ajg
//https://rangle.github.io/react-training/react-lifecycles/

//props adalah passing data dari parent ke child pake parent
//cara ngambil data dari parent
//child harus terima props bikin function param nya props
//data yang diturunin ke child 

//this. mengarah ke diirnya sendiri 
//child bisa punya state kalo pake class component this.props.blabla kalo pake class component

//this.props hanya child doang kalo belom punya global state

// const mapStateToProps = (state) => {

// }

//global state

import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Login } from '../Redux/Action'

const Review = () => {
    const [contoh, setContoh] = useState(0) //0 muali dari
 
    const logged = useSelector((state) => {
        return{
            logged:state.auth.logged,
            role: state.auth.role
        }
    })



    const dispatch =useDispatch()

    const LoginHooks = () => {
        dispatch(Login({
            username :'lianeddy',
            email: 'lianeddy@gmail.com',
            role: 'admin',
            password: '123'
        }))
    }

    console.log(logged)
    return(
        <div>
            <input type='button' value='-' onClick={() => setContoh(contoh-1)}/>
            ini review
            {contoh}
            {logged.roles}
            <input type='button' value='+'onClick={() => setContoh(contoh+1)}/>
            <input type='button' value='Login'onClick={LoginHooks}/>
        </div>
    )
}

export default Review