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