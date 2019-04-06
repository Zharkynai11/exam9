import React,{Component, Fragment } from 'react';
import axios from 'axios';
import ProductCard from "../components/ProductCard";
import Select from 'react-select'

class ProductList extends Component{
    state = {
        all_products : [],
        products : [],
        current_category: [],
        categories : []
    }
    constructor () {
      super();
      axios.get('http://127.0.0.1:8000/api/v1/products/').then(posts => {   
          console.log(posts);
          let prods=[];
          for (let prod of posts.data){
            prods.push(prod);
          }
          prods.sort(function(a, b) {
            return new Date(b.begin_date) - new Date(a.begin_date);
        });
          this.setState({products: prods, all_products:prods});
        }).catch(error => {
          console.log(error);
        })
        axios.get('http://127.0.0.1:8000/api/v1/categories/').then(posts => {   
          let categs=[];
          for (let categ of posts.data){
            categs.push({value: categ.id, label: categ.title})
          }
          this.setState({categories: categs});
          console.log('categeories:  '+this.state.categories);
        }).catch(error => {
          console.log(error);
        })
    }
    set_filter = () => {
        let m = document.getElementById('filter').textContent.split(' ');
        m=m.slice(0,m.indexOf('focused,'));
        m=m.slice(m.lastIndexOf('option')+1,m.length);
        let category = m.join(' '); 
        let prods = []
        for (let prod of this.state.all_products){
          for (let prod_cat of prod.category)
          {
            //alert(prod.title+': '+prod_cat.title+' - ' + category)
            if (prod_cat.title == category) 
            {
              prods.push(prod);
              continue;
            }
          }
        }
        this.setState({current_category: category, products: prods});
    }
    
    render() {
        return (
        <div className="product_list">
          <Select onChange={this.set_filter} id='filter' options={this.state.categories} />
            {this.state.products.map(product => {
                    let image=0;
                    let hr = 'product/' + product.id
                    if (product.photoes.length>0) image = product.photoes[0].image;
                    else image='http://denrakaev.com/wp-content/uploads/2015/03/no-image.png';
                    return <Fragment key = {product.id}>
                      <a href = {hr}><ProductCard url={product.url} title={product.title} image={image}></ProductCard></a>
                    </Fragment>
                })}
        </div>
    );
    }
}
export default ProductList;
