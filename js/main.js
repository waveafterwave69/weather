const weatherInput = document.querySelector('.weather-input')
const seacrchBtn = document.querySelector('.weather-search-btn')
const weatherTemp = document.querySelector('.weather-temp')
const weatherTitle = document.querySelector('.weather-title')
const weatherImg = document.querySelector('.weather-img')
const dataTitle = document.querySelector('.weather-card-title')
const dataText = document.querySelector('.weather-card-text')
const arrowLeft = document.querySelector('.left')
const arrowRight = document.querySelector('.right')
const apiKey = 'd8c6141a21074bfbad0120614252102'

async function checkWeather() {
    const cityName = weatherInput.value
    const weatherApi = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7`
    const response = await fetch(weatherApi)
    const data = await response.json()

    const forecastArr = data.forecast.forecastday[0]
    const day = forecastArr.day
    const temp = day.avgtemp_c

    weatherTitle.textContent = cityName
    weatherTemp.textContent = Math.round(temp)

    document.querySelector('.weather-content').classList.remove('hidden')

    dataTitle.textContent = 'СЕГОДНЯ'
    const date = new Date()
    const dateDay = date.getDate()
    const dateMouth = date.getMonth() + 1
    const dateYear = date.getFullYear()
    if (dateMouth < 10) {
        dataText.textContent = `${dateDay}.0${dateMouth}.${dateYear}`
    } else {
        dataText.textContent = `${dateDay}.${dateMouth}.${dateYear}`
    }
}

seacrchBtn.addEventListener('click', function () {
    checkWeather()
})

const arrOfDay = [
    'СЕГОДНЯ',
    'ЗАВТРА',
    'ПОСЛЕЗАВТРА',
    'ЧЕРЕЗ 2 ДНЯ',
    'ЧЕРЕЗ 3 ДНЯ',
    'ЧЕРЕЗ 4 ДНЯ',
    'ЧЕРЕЗ 5 ДНЯ',
]
let dayCount = 0
let date = new Date()
let dateDay = date.getDate()
let dateMouth = date.getMonth() + 1
let dateYear = date.getFullYear()

async function goRight() {
    if (dayCount < 6) {
        dayCount++
    }
    dataTitle.textContent = arrOfDay[dayCount]
    if (dateMouth < 10) {
        dataText.textContent = `${dateDay + dayCount}.0${dateMouth}.${dateYear}`
    } else {
        dataText.textContent = `${dateDay + dayCount}.${dateMouth}.${dateYear}`
    }
    const cityName = weatherInput.value
    const weatherApi = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7`
    const response = await fetch(weatherApi)
    const data = await response.json()

    const forecastArr = data.forecast.forecastday[dayCount]
    const day = forecastArr.day
    const temp = day.avgtemp_c

    weatherTemp.textContent = Math.round(temp)
}

arrowRight.addEventListener('click', goRight)

async function goLeft() {
    if (dayCount > 0) {
        dayCount--
    }
    dataTitle.textContent = arrOfDay[dayCount]
    if (dateMouth < 10) {
        dataText.textContent = `${dateDay + dayCount}.0${dateMouth}.${dateYear}`
    } else {
        dataText.textContent = `${dateDay + dayCount}.${dateMouth}.${dateYear}`
    }
    const cityName = weatherInput.value
    const weatherApi = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7`
    const response = await fetch(weatherApi)
    const data = await response.json()

    const forecastArr = data.forecast.forecastday[dayCount]
    const day = forecastArr.day
    const temp = day.avgtemp_c

    weatherTemp.textContent = Math.round(temp)
}

arrowLeft.addEventListener('click', goLeft)
