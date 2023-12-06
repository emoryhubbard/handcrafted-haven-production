import {select, setClick, toggleClass, toggleClasses} from './utils.mjs'

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
        if (json.success)
            location.reload()
        if (!json.success)
            select('.please-sign-in').textContent = "Something went wrong while logging out. Please try again."
    }, '.sign-out')

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
        console.log(json.result)
        if (json.result) {
            location.reload()
        }
        if (!json.result) {
            select('.please-sign-in').textContent = "Sorry, there was an error logging in to your account. Check if email, password, and other form data is valid."
        }


    })