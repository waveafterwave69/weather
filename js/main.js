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
let dayCount = 0

// ПОИСК ПОГОДЫ ПО ГОРОДУ
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
        console.log(data)

        if (!data.forecast) {
            throw new Error('Неверный ответ от API')
        }

        const currentArr = data.current
        const temp = currentArr.temp_c

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

        const weatherCode = currentArr.condition.code
        console.log(weatherCode)
        if (weatherCode === 1000) {
            // Солнечно
        } else if (
            weatherCode === 1003 ||
            weatherCode === 1006 ||
            weatherCode === 1009 ||
            weatherCode === 1030
        ) {
            // облочно
        } else if (
            weatherCode === 1063 ||
            weatherCode === 1198 ||
            weatherCode === 1150 ||
            weatherCode === 1153 ||
            weatherCode === 1180 ||
            weatherCode === 1183 ||
            weatherCode === 1186 ||
            weatherCode === 1189 ||
            weatherCode === 1198 ||
            weatherCode === 1240 ||
            weatherCode === 1243
        ) {
            // weatherImg.setAttribute('src', './img/')
            // небольшой дождь
        } else if (
            weatherCode === 1192 ||
            weatherCode === 1195 ||
            weatherCode === 1246
        ) {
            // дождь
        } else if (
            weatherCode === 1066 ||
            weatherCode === 1168 ||
            weatherCode === 1171 ||
            weatherCode === 1201 ||
            weatherCode === 1204 ||
            weatherCode === 1210 ||
            weatherCode === 1213
        ) {
            // небольшой снег
        } else if (
            weatherCode === 1114 ||
            weatherCode === 1117 ||
            weatherCode === 1207 ||
            weatherCode === 1216 ||
            weatherCode === 1219 ||
            weatherCode === 1222 ||
            weatherCode === 1225 ||
            weatherCode === 1237 ||
            weatherCode === 1258
        ) {
            // снег
        } else if (
            weatherCode === 1069 ||
            weatherCode === 1072 ||
            weatherCode === 1252 ||
            weatherCode === 1249 ||
            weatherCode === 1255 ||
            weatherCode === 1261 ||
            weatherCode === 1264
        ) {
            // снег с дождём
        } else if (weatherCode === 1087) {
            // гроза
        } else if (
            weatherCode === 1273 ||
            weatherCode === 1276 ||
            weatherCode === 1279 ||
            weatherCode === 1282
        ) {
            // гроза с дождём
        } else if (weatherCode === 1135 || weatherCode === 1147) {
            // туман
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

// СТРЕЛКИ ВПРАВО И ВЛЕВО
const arrOfDay = [
    'сегодня',
    'завтра',
    'послезавтра',
    'через 3 дня',
    'через 4 дня',
    'через 5 дней',
    'через 6 дней',
]
let date = new Date()
let dateDay = date.getDate()
let dateMouth = date.getMonth() + 1
let dateYear = date.getFullYear()

async function goRight() {
    if (dayCount < 6) {
        dayCount++
    }
    dataTitle.textContent = arrOfDay[dayCount]

    const cityName = weatherTitle.textContent
    const weatherApi = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7`
    const response = await fetch(weatherApi)
    const data = await response.json()
    const dataDay = data.forecast.forecastday[dayCount].date

    dataText.textContent = dataDay.split('-').reverse().join('.')

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

    const cityName = weatherTitle.textContent
    const weatherApi = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7`
    const response = await fetch(weatherApi)
    const data = await response.json()
    const dataDay = data.forecast.forecastday[dayCount].date

    dataText.textContent = dataDay.split('-').reverse().join('.')

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
