import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

class Product extends Component {
  state = {};
  render() {
    const product = this.props.product;

    return (
      <div key="product._id" className="card product">
        <Link to={`/product/${product._id}`}>
          <img className="medium product" src={product.image} alt={product.name} />
        </Link>
        <div className="card-body">
          <Link to={`/product/${product._id}`}>
            <h2>{product.name}</h2>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
          <div className="price">Rs. {product.price}</div>
        </div>
      </div>
    );
  }
}

export default Product;
