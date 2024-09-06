// const apikey ="f1e037f26c20ff1fa6c4d42b3af33fb6";
// const apiurl ="https://api.openweathermap.org/data/2.5/weather?units=metric&";

// async function checkweather() {
//     const response =await fetch(apiurl+city+`&appid=${apikey}`);
//     var data = await response.json();
//     console.log(data);

//     document.querySelector(".city").innerHTML=data.name;
//     document.querySelector(".temp").innerHTML=data.main.temp+"°C";
    
    
// }

// checkweather()












const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3010;
 
const cors = require('cors');
app.use(cors());
 
const API_KEY = 'f1e037f26c20ff1fa6c4d42b3af33fb6';
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
 
app.post('/weather',async (req, res) => {

    console.log("weather",req.query.city)
  const city = req.query.city;
  if (!city) {
    return res.status(400).send('City name is required');
  }
  
 
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    // console.log("responsee",response.data);
    console.log(response.data.weather);
    const { name, main: { temp } ,weather} = response.data; // Destructure to get the city name and temperature
    const weathercond =weather[0].main;
    res.json({ city: name, temperature: temp , weather: weathercond});
    console.log("weatherrrrr",weathercond)
    
    

} catch (error) {
    console.error('Error fetching the weather data:', error);
    res.status(500).send('Error fetching the weather data1111');
 }}
);
 
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});