const express = require('express'); // Import biblioteki Express, ktora ulatwia tworzenie serwera HTTP w Node.js.
const axios = require('axios'); // Import biblioteki Axios, która sluzy do wykonywania zapytan HTTP (np. do API pogodowego).
const dotenv = require('dotenv');// Import biblioteki dotenv, ktora pozwala wczytywac zmienne srodowiskowe z pliku `.env`.
const app = express(); //Tworzy nowa app Express
dotenv.config();//Wczytuje zmienne z pliku `.env`


//port i klucz api pobierane z pliku .env
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

//predefiniowana lista krajow i miast
const cities = {
  Poland: ['Warsaw', 'Gdańsk', 'Lublin',],
  Germany: ['Berlin', 'Munich']
};

//uzycie folderu do statycznych plikow (index.html)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.post('/weather', async (req, res) => {
  const { country, city } = req.body; //pobiera dane z formularza
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`;
  try {
    const response = await axios.get(url);// Wysyła zapytanie GET do API i czeka na odpowiedź.
    const weather = response.data;//zapis danych z odp
    res.send(`<h1>Weather in ${city}, ${country}</h1><p>${weather.weather[0].description}, temp: ${weather.main.temp}°C</p>`);
     // Wyświetla prosty HTML z opisem pogody i temperaturą.
  } catch {
    res.send(`<p>Error getting weather for ${city}</p>`);
  }
});

app.listen(PORT, () => { //uruchamia serwer i nasluchuje na okreslonym porcie
  console.log(`App started on port ${PORT}`);
  console.log(`Author: Yuliia Kozlova`);
  console.log(`Start date: ${new Date().toISOString()}`);
});
