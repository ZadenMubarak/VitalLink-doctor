fetch('https://5af0-197-184-183-73.ngrok-free.app/login_doctor',{
    method: 'POST',
    body: JSON.stringify({
        "email": "thabo.mokoena@parktownmedical.co.za",
        "password": "SecurePassword123!!!"
    }),
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    }
}).then(response => response.json())
.then(data => console.log('data:',data))
.catch(error => console.error('Error:', error));