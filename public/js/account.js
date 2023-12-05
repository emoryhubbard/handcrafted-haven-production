import {select, setClick, toggleClass, toggleClasses} from './utils.mjs'
if (select('.sign-out'))
    setClick(async function (e) {
        console.log("Sign out clicked")
        const response = await fetch('/api/session', {
            method: 'DELETE', // Method itself
            headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            // No need to have body, because we don't send anything to the server.
        })
        const json = await response.json();
        if (json.success) {
            select('.please-sign-in').textContent = "Successfully signed out. Sign in:"
            toggleClass('.login-form', '.hidden')
            toggleClass('.sign-out', '.hidden')
        }
    }, '.sign-out')

if (select('.login-form'))
    select('.login-form').addEventListener('submit', async function (event) {
        console.log("Login Form submitted")
        event.preventDefault();

        const formData = new FormData(event.target);
        const jsonData = {};

        formData.forEach((value, key) => {
        jsonData[key] = value;
        });

        const response = await fetch('/api/session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
        });

        const json = await response.json();
        console.log(json)
        if (json.result) {
            select('.please-sign-in').textContent = "Successfully logged in."
            toggleClass('.login-form', '.hidden')
            toggleClasses('.sign-out', '.hidden', '.p-4')
        }
        if (!json.result) {
            select('.please-sign-in').textContent = "Sorry, there was an error logging in to your account. Check if email, password, and other form data is valid."
        }


    })