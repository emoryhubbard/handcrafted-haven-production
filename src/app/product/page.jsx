'use client'
import { useState, useEffect } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { getParam } from '../components/utils.mjs'

export default function Product() {
    const [allValues, setAllValues] =  useState({product: null, reviews: [], clients: []})
    useEffect( () => {
        let url = '/api/search'
        if (getParam("id"))
            url += "?id=" + getParam("id")
        fetch(url).then((response) => response.json())
        .then((data) => {
                const fetchProduct = data.products[0];
            setAllValues({product: fetchProduct, reviews: allValues.reviews, clients: allValues.clients});
            console.log(fetchProduct);
            fetch('/api/reviews?productId=' + getParam("id")).then((response) => response.json())
            .then((data) => {
                const fetchReviews = data.reviews;
            setAllValues({product: fetchProduct, reviews: fetchReviews, clients: allValues.clients});
            console.log(fetchReviews);
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
                        src={"/images/products/" + allValues.product.image + ".jpg"}
                        alt={"Image of " + allValues.product.name}
                    />
                    </div>
                </div>
                <div className="detail-text">
                    <div className="main-img-subtitle">
                    <p className="main-img-monthly-rate">
                        $10.00
                        <span className="main-img-free-trial">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;Free shipping
                        </span>
                    </p>
                    </div>
                    <ul className="detail-info-table">
                    <li className="detail-info-table-item">
                        <p className="detail-info-table-item-field">Seller</p>
                        <p className="detail-info-table-item-value">{allValues.product.seller}</p>
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
                <h2 className="reviews-h2">User Reviews</h2>
                <ul>
                {allValues.reviews.map(getListItem)}
                </ul>
                <p>
                Add a review by{" "}
                <a className="p-link" href="/accounts?action=login">
                    logging in
                </a>
                </p>{" "}
                <div className="reviews"></div>
            </div>
        <Footer />
        </>
    )
}
function getListItem(review) {
    return (
    <li>
        <p>Review By {review.clientName}</p>
        <p>Rating: {review.rating}</p>
        <p>{review.comment}</p>
    </li>)
}