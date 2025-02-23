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
    try {
        const loading = document.querySelector('.loading')
        const error = document.querySelector('.error')
        loading.classList.toggle('hidden')
        error.classList.add('hidden')
        const weatherContent = document.querySelector('.weather-content')
        weatherContent.classList.add('hidden')

        const cityName = weatherInput.value.trim()
        const weatherApi = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7`
        const response = await fetch(weatherApi)
        const data = await response.json()

        if (!data.forecast) {
            throw new Error('Неверный ответ от API')
        }

        const forecastArr = data.current
        const temp = forecastArr.temp_c

        weatherTitle.textContent = data.location.name
        weatherTemp.textContent = `${Math.round(temp)}℃`

        dataTitle.textContent = 'сегодня'
        const date = new Date()
        const dateDay = date.getDate()
        const dateMouth = date.getMonth() + 1
        const dateYear = date.getFullYear()
        if (dateMouth < 10) {
            dataText.textContent = `${dateDay}.0${dateMouth}.${dateYear}`
        } else {
            dataText.textContent = `${dateDay}.${dateMouth}.${dateYear}`
        }

        setTimeout(() => {
            document
            weatherContent.classList.remove('hidden')
            loading.classList.add('hidden')
        }, 1250)
    } catch (err) {
        document.querySelector('.error').classList.remove('hidden')
        document.querySelector('.loading').classList.add('hidden')
        document.querySelector('.error').textContent = `Ошибка: ${err.message}`
    }
}

function handleEvent(e) {
    dayCount = 0
    if (e.type === 'click' || (e.type === 'keydown' && e.key === 'Enter')) {
        checkWeather(weatherInput.value.trim())
        weatherInput.value = ''
    }
}

seacrchBtn.addEventListener('click', function () {
    dayCount = 0
    checkWeather()
    weatherInput.value = ''
})

weatherInput.addEventListener('keydown', handleEvent)

const arrOfDay = [
    'сегодня',
    'завтра',
    'послезавтра',
    'через 3 дня',
    'через 4 дня',
    'через 5 дней',
    'через 6 дней',
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

    const cityName = weatherTitle.textContent
    const weatherApi = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7`
    const response = await fetch(weatherApi)
    const data = await response.json()
    if (dayCount === 0) {
        const forecastArr = data.current
        const temp = forecastArr.temp_c
        weatherTemp.textContent = `${Math.round(temp)}℃`
    } else {
        const forecastArr = data.forecast.forecastday[dayCount]
        const day = forecastArr.day
        const temp = day.avgtemp_c
        weatherTemp.textContent = `${Math.round(temp)}℃`
    }
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
    const cityName = weatherTitle.textContent
    const weatherApi = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7`
    const response = await fetch(weatherApi)
    const data = await response.json()

    if (dayCount === 0) {
        const forecastArr = data.current
        const temp = forecastArr.temp_c
        weatherTemp.textContent = `${Math.round(temp)}℃`
    } else {
        const forecastArr = data.forecast.forecastday[dayCount]
        const day = forecastArr.day
        const temp = day.avgtemp_c
        weatherTemp.textContent = `${Math.round(temp)}℃`
    }
}

arrowLeft.addEventListener('click', goLeft)
