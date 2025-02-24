const weatherInput = document.querySelector('.weather-input')
const seacrchBtn = document.querySelector('.weather-search-btn')
const weatherContent = document.querySelector('.weather-content')
const loading = document.querySelector('.loading')
const error = document.querySelector('.error')
const weatherTemp = document.querySelector('.weather-temp')
const weatherTitle = document.querySelector('.weather-title')
const weatherWeek = document.querySelector('.weather-weekday')
const dataTitle = document.querySelector('.weather-card-title')
const dataText = document.querySelector('.weather-card-text')
const arrowLeft = document.querySelector('.left')
const arrowRight = document.querySelector('.right')
const apiKey = 'd8c6141a21074bfbad0120614252102'
let dayCount = 0
let days = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
]

// ПОИСК ПОГОДЫ ПО ГОРОДУ
async function checkWeather(query) {
    try {
        loading.classList.toggle('hidden')
        error.classList.add('hidden')
        weatherContent.classList.add('hidden')

        // const cityName =

        const weatherApi = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=7`
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

        dataTitle.textContent = '(сегодня)'
        const date = new Date()
        weatherWeek.textContent = `${days[date.getDay()]}`
        const dateDay = date.getDate()
        const dateMouth = date.getMonth() + 1
        const dateYear = date.getFullYear()
        if (dateMouth < 10) {
            dataText.textContent = `${dateDay}.0${dateMouth}.${dateYear}`
        } else {
            dataText.textContent = `${dateDay}.${dateMouth}.${dateYear}`
        }
        setTimeout(() => {
            weatherContent.classList.remove('hidden')
            loading.classList.add('hidden')
        }, 750)
    } catch (err) {
        document.querySelector('.error').classList.remove('hidden')
        document.querySelector('.loading').classList.add('hidden')
        document.querySelector('.error').textContent = `Ошибка: ${err.message}`
        // } finally {
        //     weatherContent.classList.remove('hidden')
        //     loading.classList.add('hidden')
        // }
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
    checkWeather(weatherInput.value.trim())
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
    dataTitle.textContent = `(${arrOfDay[dayCount]})`

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
    weatherWeek.textContent = `${days[date.getDay() + dayCount]}`
}

arrowRight.addEventListener('click', goRight)

async function goLeft() {
    if (dayCount > 0) {
        dayCount--
    }
    dataTitle.textContent = `(${arrOfDay[dayCount]})`

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
    weatherWeek.textContent = `${days[date.getDay() + dayCount]}`
}

arrowLeft.addEventListener('click', goLeft)

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                checkWeather(`${latitude},${longitude}`) // Передаём координаты в API
            },
            (error) => {
                // return
            }
        )
    } else {
        // return
    }
}

document.addEventListener('DOMContentLoaded', getUserLocation)
