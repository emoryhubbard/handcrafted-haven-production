'use client'
import Header from '../components/header'
import Footer from '../components/footer'
import {useState, useEffect} from 'react'
import Script from 'next/script'
const dotenv = require('dotenv')
dotenv.config();

export default function Account() {
    const [allValues, setAllValues] =  useState({name: null, email: null})
    useEffect( () => {
       fetch('/api/session')
        .then((response) => response.json())
        .then((data) => {
            const { name, email, sellerName } = data.session
            setAllValues({name: name, email: email, sellerName: sellerName})
        })
        }, [])
    return (
            <>
            <title>Sign In</title>
                <Header />
                    <main>
                    <p className="please-sign-in">{(allValues.name) ? ("You are currently signed in as " + allValues.name + "."): "Please Sign In:"}</p>
                    <a className={(allValues.sellerName ? "block ": "hidden ") + "p-4 border-2 border-black"} href={"/seller?name=" + allValues.sellerName}>Seller Profile Page</a>
                    <a className={((!allValues.name) ? "hidden ": "block ") + "sign-out border-2 border-black p-4"} href="javascript:">Sign out</a>
                    <form
                    className={((allValues.name) ? "hidden ": "block ") + "blue-form login-form"}
                    action="/api/session"
                    method="post"
                    >
                    <fieldset className="login-form-fieldset">
                        <label className="block">
                        Email<span className="asterisk">*</span>
                        <input className="block border-2 border-black" type="email" name="email" required="" placeholder="" />
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
                        <span>
                            Passwords must be at least 8 characters and contain at least 1 number, 1
                            capital letter and 1 special character
                        </span>
                        </label>
                        <input className="submit-button block cursor-pointer p-4 border-2 border-black" type="submit" defaultValue="Sign in" />
                        <label className="no-account block">
                        No account?{" "}
                        <a className="block p-4 border-2 border-black" href="/register">Sign up</a>
                        <a className="block p-4 border-2 border-black" href="/register?seller=true">Sign up as Seller</a>
                        </label>
                        <input type="hidden" name="action" defaultValue="submit-login" />
                    </fieldset>
                    </form>
                    </main>
                <Footer />
                <Script type="module" src="/js/account.js" />
            </>)}