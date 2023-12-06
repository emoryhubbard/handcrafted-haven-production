import {select, setClick, toggleClass, toggleClasses} from './utils.mjs'

select('.review-form').addEventListener('submit', async function (event) {
        console.log("Review Form submitted")
        event.preventDefault();

        const formData = new FormData(event.target);
        const jsonData = {};

        formData.forEach((value, key) => {
        jsonData[key] = value;
        });

        const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
        });

        const json = await response.json();
        console.log(json)
        if (json.result) {
            location.reload()
        }
        if (!json.result) {
            select('.please-sign-in').textContent = "Sorry, there was an error posting the review. Please try again."
        }


    })
select('.delete-form').addEventListener('submit', async function (event) {
    console.log("Delete Form submitted")
    event.preventDefault();

    const formData = new FormData(event.target);
    const jsonData = {};

    formData.forEach((value, key) => {
    jsonData[key] = value;
    });

    const response = await fetch('/api/products', {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData),
    });

    const json = await response.json();
    console.log(json)
    if (json.result) {
        window.location.replace('/account')
    }
    if (!json.result) {
        select('.delete-form-description').textContent = "Sorry, there was an error deleting the product. Please try again."
    }
})

select('.edit-form').addEventListener('submit', async function (event) {
    console.log("Update Form submitted")
    event.preventDefault();

    const formData = new FormData(event.target);
    const jsonData = {};

    formData.forEach((value, key) => {
    jsonData[key] = value;
    });

    const response = await fetch('/api/products', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData),
    });

    const json = await response.json();
    console.log(json)
    console.log(json.result)
    if (json.result)
        location.reload()
    if (!json.result)
        select('.edit-form-description').textContent = "Sorry, there was an error updating your product. Please try again, and check if price and other form data is valid."
})