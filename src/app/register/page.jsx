'use client'
import {useState, useEffect} from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Script from 'next/script'
import { getParam } from '../components/utils.mjs'

export default function SignUp() {
    const [isSeller, setIsSeller] =  useState(false)
    useEffect( () => {
        if (getParam("seller"))
            setIsSeller(true)
        }, [])
    return (
        <>
        <title>Create {isSeller && "Seller "}Account</title>
            <Header />
                <main>
                <p className='create-account'>Create {isSeller && "Seller "}Account:</p>
                <form className="register-form blue-form" method="post" action="/api/clients">
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
                        Email<span className="asterisk">*</span>
                        <input className="block border-2 border-black"
                            type="email"
                            name="email"
                            title="Required field"
                            required=""
                            placeholder=""
                        />
                        </label>
                        <label className="block" title="Passwords must be at least 8 characters and contain at least 1 number, 1 capital letter and 1 special character">
                        Password<span className="asterisk">*</span>
                        <input
                            className="password-input block border-2 border-black"
                            type="password"
                            name="password"
                            title="Passwords must be at least 8 characters and contain at least 1 number, 1 capital letter and 1 special character"
                            required=""
                            pattern="(?=^.{8,}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                            placeholder=""
                        />
                        <span className="block">
                            Passwords must be at least 8 characters and contain at least 1 number, 1
                            capital letter and 1 special character
                        </span>
                        </label>
                        <label className={isSeller ? "block": "hidden"}>
                        Seller Name, eg. elegantGems<span className="asterisk">*</span>
                        <input className="block border-2 border-black"
                            type="text"
                            name="sellerName"
                            title="Required field"
                            required=""
                            placeholder=""
                        />
                        </label>
                        <label className={isSeller ? "block": "hidden"}>
                        Seller Story to showcase your business, talents, and journey<span className="asterisk">*</span>
                        <input className="block border-2 border-black"
                            type="text"
                            name="story"
                            title="Required field"
                            required=""
                            placeholder=""
                        />
                        </label>
                        <input
                        className="submit-button block cursor-pointer pd-4 border-2 border-black"
                        type="submit"
                        defaultValue="Create Account"
                        />
                        <input type="hidden" name="isSeller" defaultValue={isSeller ? "true": "false"} />
                        <input type="hidden" name="action" defaultValue="submit-register" />
                    </fieldset>
                    </form>
                </main>
            <Footer />
            <Script type='module' src='/js/register.js' />
        </>
    )}