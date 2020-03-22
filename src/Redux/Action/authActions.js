import Axios from 'axios'
import { API_URL } from '../../Support/API_URL'



// export const Login = (data) => { //subuah funct yang me return object type harus sama dengan di reducer
//     return{ //selalu harus punya type karena supaya dia bisa masuk ke case yang mana
//         type : 'LOGIN',
//         payload : data //data ini dari axios api bentuk object 
//     }
// }

export const Login = (username, password) => {
    return (dispatch) => {
        Axios.get(`${API_URL}/users?username=${username}&password=${password}`)
        .then((res) => {
            if(res.data.length === 0){
                window.alert('Login Failed')
            }else{
                console.log(res.data)
                localStorage.setItem('token', JSON.stringify({username,password, id: res.data[0].id}))
                dispatch({
                    type :'LOGIN',
                    payload: res.data[0] //berasal dari axios
                })
            }
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type :'LOGOUT'
            })
        })
    }
}

export const KeepLogin = (token) => {
    return(dispatch) => {
        token = JSON.parse(token)
        let {username, password}= token
        Axios.get(`${API_URL}/users?username=${username}&password${password}`)
        .then((res) => {
            dispatch({
                type : 'LOGIN',
                payload : res.data[0]
            })
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type : 'LOGOUT'
            })
        })

    }
}

export const Logout = () => {
    return{
        type : 'LOGOUT'
    }
}