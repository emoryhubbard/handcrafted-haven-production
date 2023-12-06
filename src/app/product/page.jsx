'use client'
import { useState, useEffect } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { getParam } from '../components/utils.mjs'
import Script from 'next/script'

export default function Product() {
    const [allValues, setAllValues] =  useState({product: null, reviews: [], clients: [], name: null, email: null, sellerName: null})
    useEffect( () => {
        let url = '/api/products'
        if (getParam("id"))
            url += "?id=" + getParam("id")
        fetch(url).then((response) => response.json())
        .then((data) => {
                const fetchProduct = data.products[0];
            setAllValues({product: fetchProduct, reviews: allValues.reviews, clients: allValues.clients, name: allValues.name, email: allValues.email, sellerName: allValues.sellerName});
            console.log(fetchProduct);
            fetch('/api/reviews?productId=' + getParam("id")).then((response) => response.json())
            .then((data) => {
                const fetchReviews = data.reviews;
            setAllValues({product: fetchProduct, reviews: fetchReviews, clients: allValues.clients, name: allValues.name, email: allValues.email, sellerName: allValues.sellerName});
            console.log(fetchReviews);
            fetch('/api/session')
            .then((response) => response.json())
            .then((data) => {
                const { name, email, sellerName } = data.session
                setAllValues({product: fetchProduct, reviews: fetchReviews, clients: allValues.clients, name: name, email: email, sellerName: sellerName})
                console.log("name: " + name, " and email: " + email)
            })
            })
        })
        }, [])

    if (!allValues.product)
        return (
        <>
        <title>Loading Product</title>
        <Header />
            <main>
            <p>Loading Product</p>
            </main>
        <Footer />
        </>)
    return (
        <>
        <title>{allValues.product.name}</title>
        <Header />
            <main className="device-detail-main">
                {/*<a className="back-button p-link" href="javascript:">
                <img
                    className="back-button-arrow-icon"
                    src="/images/site/LeftArrow.svg"
                    alt="back button left arrow icon"
                />
                <p className="back-button-text p-link">Back to search results</p>
                </a>*/}
                <p className="detail-listing-title">
                    {allValues.product.name}
                </p>
                <p className="detail-listing-subtitle">
                {allValues.product.category} category |{" "}
                <span className="access-available">Discounts available</span>
                </p>
                <div className="detail-grid">
                <div className="detail-images">
                    <div className="has-detail-main-img">
                    <img
                        className="detail-main-img"
                        src={allValues.product.url ? allValues.product.url: ("/images/products/" + allValues.product.image + ".jpg")}
                        data-src={allValues.product.url ? allValues.product.url: ("/images/products/" + allValues.product.image + ".jpg")}
                    />
                    </div>
                </div>
                <div className="detail-text">
                    <div className="main-img-subtitle">
                    <p className="main-img-monthly-rate">
                        ${allValues.product.price}
                        <span className="main-img-free-trial">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;Free shipping
                        </span>
                    </p>
                    </div>
                    <ul className="detail-info-table">
                    <li className="detail-info-table-item">
                        <p className="detail-info-table-item-field">Seller: <a href={'/seller?name=' + allValues.product.seller}>{allValues.product.seller}</a></p>
                    </li>
                    <li className="detail-info-table-item">
                        <p className="detail-info-table-item-field">Description</p>
                        <p className="detail-info-table-item-value" />
                    </li>
                    </ul>
                    <p className="detail-description">
                        {allValues.product.description}
                    </p>
                </div>
                </div>{" "}
            </main>
            <div className="has-reviews">
                <h2 className="reviews-h2 pt-4">User Reviews</h2>
                <ul>
                {allValues.reviews.map(getListItem)}
                </ul>
                <p className="please-sign-in pt-4">{(allValues.name) ? ("You are currently signed in as " + allValues.name + ". Leave a review:"): "Sign in to leave a review:"}</p>
                    <a className={((allValues.name) ? "hidden ": "block ") + "sign-out border-2 border-black p-4"} href="/account?action=login">Sign in</a>
                    <form
                    className={((!allValues.name) ? "hidden ": "block ") + "blue-form review-form"}
                    action="/api/reviews"
                    method="post"
                    >
                    <fieldset className="review-form-fieldset">
                        <label className="block">
                        Leave a Rating from 1 to 5:<span className="asterisk">*</span>
                        <input className="block border-2 border-black" type="text" name="rating" required="" placeholder="" />
                        </label>
                        <label className="block">
                        Review text:<span className="asterisk">*</span>
                        <input
                            className="review-input block border-2 border-black"
                            type="text"
                            name="comment"
                            required=""
                            placeholder=""
                        />
                        </label>
                        <input className="submit-button block cursor-pointer p-4 border-2 border-black" type="submit" defaultValue="Post Review" />
                        <input type="hidden" name="email" defaultValue={allValues.email} />
                        <input type="hidden" name="name" defaultValue={allValues.name} />
                        <input type="hidden" name="productId" defaultValue={allValues.product._id} />
                    </fieldset>
                    </form>
                <div className="reviews"></div>
                <p className='delete-form-description'></p>
                <form
                    className={((allValues.sellerName == allValues.product.seller) ? "block ": "hidden ") + "delete-form blue-form"}
                    action="/api/products"
                    method="delete"
                    >
                    <fieldset className="delete-form-fieldset">
                        <input className="submit-button block cursor-pointer p-4 border-2 border-black" type="submit" defaultValue="Delete Product" />
                        <input type="hidden" name="sellerName" defaultValue={allValues.sellerName} />
                        <input type="hidden" name="productId" defaultValue={allValues.product._id} />
                    </fieldset>
                </form>
                <p className={((allValues.sellerName == allValues.product.seller) ? "block ": "hidden ") + 'edit-form-description'}>Edit Product:</p>
                <form className={((allValues.sellerName == allValues.product.seller) ? "block ": "hidden ") + "edit-form blue-form"}
                    method="put" action="/api/products">
                    <fieldset className="password-fieldset">
                        <label className="block">
                        Name<span className="asterisk">*</span>
                        <input className="block border-2 border-black"
                            type="text"
                            name="name"
                            title="Required field"
                            required=""
                            defaultValue={allValues.product.name}
                        />
                        </label>
                        <label className="block">
                        Price<span className="asterisk">*</span>
                        <input className="block border-2 border-black"
                            type="text"
                            name="price"
                            title="Required field"
                            required=""
                            defaultValue={'' + allValues.product.price}
                        />
                        </label>
                        <label className="block" title="Passwords must be at least 8 characters and contain at least 1 number, 1 capital letter and 1 special character">
                        Category<span className="asterisk">*</span>
                        <input
                            className="password-input block border-2 border-black"
                            type="text"
                            name="category"
                            required=""
                            defaultValue={allValues.product.category}
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
                            defaultValue={allValues.product.description}
                        />
                        </label>
                        <label className="block">
                        Product image URL<span className="asterisk">*</span>
                        <input className="block border-2 border-black"
                            type="text"
                            name="url"
                            title="Required field"
                            required=""
                            defaultValue={allValues.product.url}
                        />
                        <span className="block">
                            Copy and paste a direct link to your image. For Google Photos, imgur, etc. right click image and copy link: <a href='https://www.wikihow.com/Get-the-URL-for-Pictures'>https://www.wikihow.com/Get-the-URL-for-Pictures</a>
                        </span>
                        </label>
                        <input
                        className="submit-button block cursor-pointer pd-4 border-2 border-black"
                        type="submit"
                        defaultValue="Update Product"
                        />
                        <input type="hidden" name="seller" defaultValue={allValues.sellerName} />
                        <input type="hidden" name="productId" defaultValue={"" + allValues.product._id} />
                    </fieldset>
                </form>

            </div>
        <Footer />
        <Script type="module" src="/js/product.js" />
        </>
    )
}
function getListItem(review) {
    return (
    <li>
        <p className='pt-4'>Review By {review.clientName}</p>
        <p>Rating: {review.rating}</p>
        <p>{review.comment}</p>
    </li>)
}