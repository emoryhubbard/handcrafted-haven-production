import {select, setClick, toggleClass, toggleClasses} from './utils.mjs'

select('.product-form').addEventListener('submit', async function (event) {
    console.log("Product Form submitted")
    event.preventDefault();

    const formData = new FormData(event.target);
    const jsonData = {};

    formData.forEach((value, key) => {
    jsonData[key] = value;
    });

    const response = await fetch('/api/products', {
    method: 'POST',
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
        select('.form-description').textContent = "Sorry, there was an error adding your product. Please try again, and check if price and other form data is valid."



})