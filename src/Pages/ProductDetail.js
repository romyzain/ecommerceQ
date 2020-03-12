import React, { Component } from 'react'
// import Axios from 'axios'
// import { API_URL } from '../Support/API_URL'
import { Button } from 'reactstrap'
import Select from 'react-select'
import { connect } from 'react-redux'
import { fetchDataById } from '../Redux/Action'
import Loader from 'react-loader-spinner'

class productDetail extends Component {
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
        ]
     }

    componentDidMount(){
        let id=this.props.location.search.split('=')[1]
        console.log(id)
        this.props.fetchDataById(id)

        // Axios.get(`${API_URL}/products/${id}`)
        // .then((res) => {
        //     this.setState({
        //         data: res.data
        //     })
        //     console.log(this.state.data)
        // })
        // .catch((err) => {
        //     console.log(err)
        // })

    //     const options = [
    //         { value: 'chocolate', label: 'Chocolate' },
    //         { value: 'strawberry', label: 'Strawberry' },
    //         { value: 'vanilla', label: 'Vanilla' }
    //       ]
          
    //       const MyComponent = () => (
    //         <Select options={options} />
    //       )
    }

    

    render(){
        let {data} =this.props
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
                <div className='col-5 shoesBackground'>
                    <div style={{fontWeight:'900',color:'white'}}>
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
                        <Select placeholder='Select Size' options={this.state.sizes}/>
                    </div>
                        <Button className='btnBuy'>
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
        loading : state.product.loading

    }
}

export default connect(mapStateToProps,{fetchDataById})(productDetail)