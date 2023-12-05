'use client'
import { useState, useEffect } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { getParam } from '../components/utils.mjs'

export default function Search() {
    const [products, setProducts] =  useState([])
    useEffect( () => {
        let url = '/api/products'
        if (getParam("category"))
            url += "?category=" + getParam("category")
        fetch(url).then((response) => response.json())
        .then((data) => {
            const fetchProducts = data.products;
          setProducts(fetchProducts);
          console.log(fetchProducts);
        })
    }, [])

    return (
        <>
        <title>Search Results</title>
        <Header />
            <main>
            <ul id="device-display" className="device-display">
                {products.map(getListItem)}
            </ul>
            </main>
        <Footer />
        </>
    )
}
function getListItem(product) {
    return (<li>
        <a href={'/product?id=' + product._id}>
          <img
            loading="lazy"
            src={"/images/products/" + product.image + ".jpg"}
            data-src={"/images/products/" + product.image + ".jpg"}
            alt={"Image of " + product.name}
          />
        </a>
        <div className="device-info">
          <a href={'/product?id=' + product._id}>
            <p className="listing-title">
                {product.name}
            </p>
          </a>
          <p className="classification-name">{product.category}</p>
          <p className="device-monthly-rate">{product.price}</p>
          <p className="device-brand">{product.seller}</p>
          {/*<p className="device-model">PlayStation 1</p>*/}
          <p className="device-access">Discount offers</p>
          <p className="device-free-trial">Free shipping</p>
        </div>
      </li>)
}