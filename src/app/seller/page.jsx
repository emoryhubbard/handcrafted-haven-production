'use client'
import { useState, useEffect } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { getParam } from '../components/utils.mjs'
import Script from 'next/script'

export default function Seller() {
    const [allValues, setAllValues] =  useState({seller: null, products: [], name: null, email: null, sellerName: null})
    useEffect( () => {
        let url = '/api/clients'
        if (getParam("name"))
            url += "?sellerName=" + getParam("name")
        fetch(url).then((response) => response.json())
        .then((data) => {
            const fetchSeller = data.seller
          setAllValues({seller: fetchSeller, products: allValues.products, name: allValues.name, email: allValues.email, sellerName: allValues.sellerName})
          console.log(fetchSeller)
          fetch('/api/products?sellerName=' + getParam("name")).then((response) => response.json())
            .then((data) => {
                const products = data.products
            setAllValues({seller: fetchSeller, products: products, name: allValues.name, email: allValues.email, sellerName: allValues.sellerName})
            console.log(products)
            fetch('/api/session')
                .then((response) => response.json())
                .then((data) => {
                    const { name, email, sellerName } = data.session
                    setAllValues({seller: fetchSeller, products: products, name: name, email: email, sellerName: sellerName})
        })
            })
        })
    }, [])

    if (allValues.seller)
        return (
            <>
            <title>{allValues.seller.sellerName} Profile</title>
            <Header />
                <main>
                <p>{allValues.seller.sellerName}, Handcrafted Haven Artisan</p>
                <p>Artisan Story:</p>
                <p>{allValues.seller.story}</p>
                <p className={((allValues.sellerName == allValues.seller.sellerName) ? "block ": "hidden ") + "form-description"}>
                    Add New Product:</p>
                <form className={((allValues.sellerName == allValues.seller.sellerName) ? "block ": "hidden ") + "product-form blue-form"}
                    method="post" action="/api/products">
                    <fieldset className="password-fieldset">
                        <label className="block">
                        Name<span className="asterisk">*</span>
                        <input className="block border-2 border-black"
                            type="text"
                            name="name"
                            title="Required field"
                            required=""
                            placeholder=""
                        />
                        </label>
                        <label className="block">
                        Price<span className="asterisk">*</span>
                        <input className="block border-2 border-black"
                            type="text"
                            name="price"
                            title="Required field"
                            required=""
                            placeholder=""
                        />
                        </label>
                        <label className="block" title="Passwords must be at least 8 characters and contain at least 1 number, 1 capital letter and 1 special character">
                        Category<span className="asterisk">*</span>
                        <input
                            className="password-input block border-2 border-black"
                            type="text"
                            name="category"
                            required=""
                            placeholder=""
                        />
                        <span className="block">
                            Available categories are Accessories, Art, Bath, Clothing, Home, Jewelry, and Purses.
                        </span>
                        </label>
                        <label className="block">
                        Description<span className="asterisk">*</span>
                        <input className="block border-2 border-black"
                            type="text"
                            name="description"
                            title="Required field"
                            required=""
                            placeholder=""
                        />
                        </label>
                        <label className="block">
                        Product image URL<span className="asterisk">*</span>
                        <input className="block border-2 border-black"
                            type="text"
                            name="url"
                            title="Required field"
                            required=""
                            placeholder=""
                        />
                        <span className="block">
                            Copy and paste a direct link to your image. For Google Photos, imgur, etc. right click image and copy link: <a href='https://www.wikihow.com/Get-the-URL-for-Pictures'>https://www.wikihow.com/Get-the-URL-for-Pictures</a>
                        </span>
                        </label>
                        <input
                        className="submit-button block cursor-pointer pd-4 border-2 border-black"
                        type="submit"
                        defaultValue="Add Product"
                        />
                        <input type="hidden" name="seller" defaultValue={allValues.sellerName} />
                    </fieldset>
                </form>
                <p>{allValues.seller.sellerName}&aposs Products:</p>
                <ul id="device-display" className="device-display">
                    {allValues.products.map(getListItem)}
                </ul>
                </main>
            <Footer />
            <Script type='module' src='/js/seller.js' />
            </>
        )
    if (!allValues.seller)
        return (
            <>
            <title>Artisan Profile</title>
            <Header />
                <main>
                <p>Searching For Handcrafted Haven Artisan</p>
                </main>
            <Footer />
            </>)
}
function getListItem(product) {
    return (<li>
        <a href={'/product?id=' + product._id}>
          <img
            loading="lazy"
            src={product.url ? product.url: ("/images/products/" + product.image + ".jpg")}
            data-src={product.url ? product.url: ("/images/products/" + product.image + ".jpg")}
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
          <p className="device-access">Discount offers</p>
          <p className="device-free-trial">Free shipping</p>
        </div>
      </li>)
}