//const apiKey = process.env.API_KEY
//const apiCountryURL = "https://flagsapi.com/"

const cityInput = document.getElementById('city-input')
const searchBtn = document.getElementById('search')

const cityElement = document.getElementById('city')
const tempElement = document.querySelector("#temperature span")
const descElement = document.getElementById('description')
const weatherIconElement = document.getElementById('weather-icon')
const countryElement = document.getElementById('country')
const umidityElement = document.querySelector('#umidity span')
const windElement = document.querySelector('#wind span')

const weatherContainer = document.querySelector("#weather-data")
const containerError = document.querySelector("#container-error")

//Funções 
const getWeatherData = async(city) => { //O "async" é para esperar uma resposta da API
    const response = await fetch(`weather?city=${city}`)
    const data = await response.json()
    return data
}

const showWeatherData = async (city) => {
    try {
        const data = await getWeatherData(city);
        console.log(data);  // Exibe os dados da API no console

        if(data.cod !== 200){
            throw new Error('Cidade não encontrada')
        }

        cityElement.innerText = data.name
        tempElement.innerText = `${Math.round(parseInt(data.main.temp)-273)}°C`
        descElement.innerText = data.weather[0].description
        weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
        countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`)
        umidityElement.innerText = `${data.main.humidity}%`
        windElement.innerText = `${parseInt(data.wind.speed)}km/h`
       
        weatherContainer.style.display = "block"     
        containerError.style.display = "none"
    } catch (error) {
        console.error('Erro ao buscar os dados do clima:', error);
        weatherContainer.style.display = "none"
        containerError.style.display = "flex"
    }
}

//Eventos
searchBtn.addEventListener("click", function(event){
    event.preventDefault()
    const city = cityInput.value
    showWeatherData(city)
})

document.getElementById("city-input").addEventListener("keypress", function(event) {
    if(event.key === "Enter"){
        event.preventDefault()
        const city = event.target.value
        showWeatherData(city)
    }
})