import React,{ Component } from 'react';

class ProductCard extends Component{

    render() {
        return (
        <div className="product_card">

            <p><b>{this.props.title}</b></p>
            <img className = "product" src = {this.props.image}></img>
        </div>
    );
    }
}
export default ProductCard;
