const express = require('express');
require('dotenv').config();

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const app = express();
const port = process.env.PORT || 3000;

// Servir arquivos estáticos como HTML, CSS e JS
app.use(express.static('public'));

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br`;

    try {
        const response = await fetch(apiUrl); //Espera e recebe os dados da API
        const data = await response.json(); //Espera a chegada dos dados da API e os transforma em .json
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
