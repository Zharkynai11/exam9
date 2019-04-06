import React,{ Component } from 'react';
import axios from 'axios';
import { throws } from 'assert';

class Product extends Component{
    state = {
        title: this.props.title,
        description: this.props.description,
        date: this.props.date,
        categories: this.props.categories,
        price: this.props.price,
        images: this.props.image
    }
    
    componentDidMount() {
      let prod_id = this.props.match.url.split('/')[2];
        axios.get('http://127.0.0.1:8000/api/v1/products/'+prod_id).then(posts => {   
          
          let prod=posts.data;
          console.log(prod);
          let categories =''
          for (let cat of prod.category){
            categories += cat.title+' ';
          }
          this.setState({title: prod.title,
            description: prod.description,
            date: prod.begin_date,
            categories: categories,
            price: prod.price,
            images: prod.image})
        }).catch(error => {
          console.log(error);
        })
      }
    
    render() {
        return (
        <div className="product">

            <h1>{this.state.title}</h1>
            <p>({this.state.categories})</p>
            <pre className='product'>{this.state.description}</pre>
            <p>Дата поступления: {this.state.date}</p>
            <p>Цена: {this.state.price}$</p>
            <img className='product' src={this.state.image} alt = 'image' />
            
            
        </div>
    );
    }
}
export default Product;
