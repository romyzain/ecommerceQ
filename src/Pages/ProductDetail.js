import React, { Component } from 'react'
// import Axios from 'axios'
// import { API_URL } from '../Support/API_URL'
import { Button } from 'reactstrap'
import Select from 'react-select'
import { connect } from 'react-redux'
import { fetchDataById } from '../Redux/Action'
import Loader from 'react-loader-spinner'
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'
// import { addToCart }from '../Redux/Action'
import Swal from 'sweetalert2'


class ProductDetail extends Component {
    state= {
        data: { },
        sizes : [
            {
                value : 40,
                label : 40
            },
            {
                value : 41,
                label : 41
            },
            {
                value : 42,
                label : 42
            },
            {
                value : 43,
                label : 43
            },
            {
                value : 44,
                label : 44
            },
        ],selectSizes: '',
        qty : [
            {
                value : 1,
                label : 1
            },
            {
                value : 2,
                label : 2
            },
            {
                value : 3,
                label : 3
            },
            {
                value : 4,
                label : 4
            }
        ], selectQty : ''
     }

    componentDidMount(){
        let id=this.props.location.search.split('=')[1]
        console.log(id)
        // this.props.fetchDataById(id)

        Axios.get(`${API_URL}/products/${id}`)
        .then((res) => {
            this.setState({
                data: res.data
            })
            console.log(this.state.data)
        })
        .catch((err) => {
            console.log(err)
        })

    //     const options = [
    //         { value: 'chocolate', label: 'Chocolate' },
    //         { value: 'strawberry', label: 'Strawberry' },
    //         { value: 'vanilla', label: 'Vanilla' }
    //       ]
          
    //       const MyComponent = () => (
    //         <Select options={options} />
    //       )
    }

    selectSizes = (e) => {
        this.setState({
            selectSizes : e.value
        })
    }

    selectQty = (e) => {
        this.setState({
            selectQty : e.value
        })
    }
    
    handleClick = () => {
        let userId = this.props.userId
        let brand =this.state.data.brand
        let productId = this.state.data.id 
        let category = this.state.category
        let image = this.state.data.image
        let sizes = this.state.selectSizes
        let quantity = this.state.selectQty
        let price = this.state.data.price
        let name = this.state.data.name

        let cartData= {sizes,userId,image, quantity, price,name, productId, brand, category
        }
        Axios.get(`${API_URL}/cart?userId=${cartData.userId}&productId=${cartData.productId}&sizes=${cartData.sizes}`)
        .then((res) => {
            Swal.fire({
                icon: 'success',
                title: 'Product added To Cart',
                showConfirmButton: false,
                timer: 1500
            })
            if(res.data.length === 0){
                Axios.post(`${API_URL}/cart`,cartData)
                .then((res)=> {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
            }else{
                Axios.patch(`${API_URL}/cart/${res.data[0].id}`, {quantity: res.data[0].quantity + 1})
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }) 
    }

    render(){
        let {data} =this.state
        if(this.props.loading){
            return(
                <div className='d-flex justify-content-center'>
                     <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        //  timeout={3000} //3 secs
                    />
                </div>
             )
        }
        return(
            <div className='row'>
                <div className='col-6 shoesBackground'>
                    <img src={data.image} alt='sepatu' width='400px' height='400px'/>
                </div>
                <div className='col-6 shoesBackground'>
                    <div style={{fontWeight:'900',color:'white',marginTop:'30px'}} >
                        <h2>
                            {data.name}
                        </h2>
                    </div>
                    <div style={{color:'white'}}>
                        <h2>
                            <b>
                                {data.brand}
                            </b>
                        </h2>
                    </div>
                    <div style={{color:'white'}}>
                        <h3>
                            {data.category}
                        </h3>
                    </div>
                    <div style={{color:'white'}}>
                        <h1>
                        Rp.
                    {
                        data.price
                        ?
                        data.price.toLocaleString()
                        :
                        null
                    }
                        </h1>
                    </div>
                    <div style={{width:'300px'}} >
                        <Select placeholder='Select Size'ref='size' onChange={this.selectSizes} options={this.state.sizes}/>
                        <br></br>
                        <Select placeholder='Select Qty'ref='size' onChange={this.selectQty} options={this.state.qty}/>
                    </div>
                        <Button color='primary' className='btnBuy' onClick={() => this.handleClick()}>
                            Add to cart
                        </Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        data : state.product.productById,
        loading : state.product.loading,
        userId : state.auth.id

    }
}

// const mapDispatchToProps =(dispatch) => {
//     return{
//         addToCart :(id)=>{dispatch(addToCart(id))}
//     }
// }

export default connect(mapStateToProps,/*mapDispatchToProps,*/{fetchDataById})(ProductDetail)