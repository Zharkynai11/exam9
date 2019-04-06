import React,{ Component, Fragment} from 'react';
import axios from 'axios';
import { throws } from 'assert';
class Product extends Component{
    state = {
        }
    constructor(){
      super();
      this.image_list = [];
    }
    componentDidMount() {
      let prod_id = this.props.match.url.split('/')[2];
        axios.get('http://127.0.0.1:8000/api/v1/products/'+prod_id).then(posts => {   
          let prod=posts.data;
          let categories =''
          for (let cat of prod.category){
            categories += cat.title+' ';
          }
          for (let photo of prod.photoes){
            this.image_list.push(photo.image)
          }
          if (this.image_list.length==0) this.image_list=['http://denrakaev.com/wp-content/uploads/2015/03/no-image.png'];
          this.setState({title: prod.title,
            description: prod.description,
            date: prod.begin_date,
            categories: categories,
            price: prod.price,
            photoes: this.image_list})
        }).catch(error => {
          console.log(error);
        })
        
        console.log(this.image_list);
      }
    
    render() {
        return (
        <div className="product">

            <h1>{this.state.title}</h1>
            <p>({this.state.categories})</p>
            <pre className='product'>{this.state.description}</pre>
            <p>Дата поступления: {this.state.date}</p>
            <p>Цена: {this.state.price}$</p>
            {this.image_list.map(image => {
                    return <Fragment key = {image}>
                      <img src={image} className='prod_list'></img>
                    </Fragment>
                })}
            
        </div>
    );
    }
}
export default Product;
