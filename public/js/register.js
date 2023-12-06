import {select} from './utils.mjs'

select('.register-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const jsonData = {};

    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    const response = await fetch('/api/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    });

    const json = await response.json();
    console.log(json)
    if (json.result)
      window.location.replace('/account')
    if (!json.result)
      select('.create-account').textContent = "Sorry, there was an error creating your account. Check if email already exists, and if other form data is valid."
  });