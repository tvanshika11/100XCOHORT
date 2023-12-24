const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');  // Import the path module

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Adjust the file path
});

app.post('/calculate-interest', (req, res) => {
    const principal = parseInt(req.body.principal);
    const rate = parseInt(req.body.rate);
    const years = parseInt(req.body.years);
    if (isNaN(principal) || isNaN(rate) || isNaN(years)) {
        return res.status(400).json({ error: 'Invalid input. Please provide valid numbers.' });
    }
    

    console.log('Received data:', { principal, rate, years }); // Log received data

    const interest = (principal * rate * years) / 100;

    if (isNaN(interest)) {
       return res.status(400).json({ error: 'Error calculating interest. Please check your input.' });
    }

    console.log('Calculated interest:', interest); // Log calculated interest

    res.json({ interest: interest.toString() });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
