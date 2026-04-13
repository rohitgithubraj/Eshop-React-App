import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const getProduct = () => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err));
    }
    useEffect(() => {
        getProduct();
    }, [id])

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="wrapper">
                        <img src={product.image} alt={product.title} className="img-fluid" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="wrapper">
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <h2><span>&#8377;{product.price}</span></h2>
                        <button className="btn btn-primary">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductDetail;