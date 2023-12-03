document.getElementById('register-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const jsonData = {};

    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    const response = await fetch('/api/submitregister', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    });
    console.log(response)
    // Handle the response as needed
  });