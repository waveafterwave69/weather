const weatherInputEl = document.querySelector('.weather-input')
const seacrchBtnel = document.querySelector('.weather-search-btn')
const weatherCardEl = document.querySelector('.weather-card')
const dayData = document.querySelector('.day')
const currDayData = document.querySelector('.day-data')
const arrowLeft = document.querySelector('.left')
const arrowRight = document.querySelector('.right')

async function checkWeather() {
    const cityName = weatherInputEl.value
    const apiKey = `https://api.weatherapi.com/v1/forecast.json?key=d8c6141a21074bfbad0120614252102&q=${cityName}&days=7`
    const response = await fetch(apiKey)
    const data = await response.json()
    const forecast = await data.forecast
    const keys = Object.keys(forecast)
    const forecastArr = forecast[keys[0]]
    const da = forecastArr[0]
    const day = await da.day
    const temp = await day.avgtemp_c

    weatherCardEl.classList.remove('hidden')
    const tempp = document.createElement('p')
    tempp.textContent = parseInt(temp)
    const tempimg = document.createElement('img')
    tempimg.src = './img/sun.png'
    weatherCardEl.append(tempimg, tempp)

    dayData.classList.remove('hidden')
    const dayh1 = document.createElement('h1')
    const dayp = document.createElement('p')
    dayh1.textContent = 'СЕГОДНЯ'
    const currDataData = new Date()
    if (currDataData.getDay() < 10) {
        dayp.textContent = `${currDataData.getDate()}.0${currDataData.getDay()}.${currDataData.getFullYear()}`
    } else {
        dayp.textContent = `${currDataData.getDate()}.${currDataData.getDay()}.${currDataData.getFullYear()}`
    }

    currDayData.append(dayh1, dayp)
}

seacrchBtnel.addEventListener('click', function () {
    weatherCardEl.innerHTML = ''
    currDayData.innerHTML = ''
    checkWeather()
})

let dayCount = 0

async function goRight() {
    if (dayCount < 6) {
        dayCount++
    }
    const cityName = weatherInputEl.value
    const apiKey = `https://api.weatherapi.com/v1/forecast.json?key=d8c6141a21074bfbad0120614252102&q=${cityName}&days=7`
    const response = await fetch(apiKey)
    const data = await response.json()
    const forecast = await data.forecast
    const keys = Object.keys(forecast)
    const forecastArr = forecast[keys[0]]
    const da = forecastArr[dayCount]
    const day = await da.day
    const temp = await day.avgtemp_c
    const tempp = document.querySelector('p')
    tempp.textContent = parseInt(temp)

    // tempp.textContent = temp
    // const tempimg = document.createElement('img')
    // tempimg.src = './img/sun.png'
    // weatherCardEl.append(tempimg, tempp)

    // dayData.classList.remove('hidden')
    // const dayh1 = document.createElement('h1')
    // const dayp = document.createElement('p')
    // dayh1.textContent = 'СЕГОДНЯ'
    // const currDataData = new Date()
    // if (currDataData.getDay() < 10) {
    //     dayp.textContent = `${currDataData.getDate()}.0${currDataData.getDay()}.${currDataData.getFullYear()}`
    // } else {
    //     dayp.textContent = `${currDataData.getDate()}.${currDataData.getDay()}.${currDataData.getFullYear()}`
    // }

    // currDayData.append(dayh1, dayp)
}

console.log('a')

arrowRight.addEventListener('click', function () {
    goRight()
})

async function goLeft() {
    if (dayCount > 0) {
        dayCount--
    }
    const cityName = weatherInputEl.value
    const apiKey = `https://api.weatherapi.com/v1/forecast.json?key=d8c6141a21074bfbad0120614252102&q=${cityName}&days=7`
    const response = await fetch(apiKey)
    const data = await response.json()
    const forecast = await data.forecast
    const keys = Object.keys(forecast)
    const forecastArr = forecast[keys[0]]
    const da = forecastArr[dayCount]
    const day = await da.day
    const temp = await day.avgtemp_c
    const tempp = document.querySelector('p')
    tempp.textContent = parseInt(temp)

    // tempp.textContent = temp
    // const tempimg = document.createElement('img')
    // tempimg.src = './img/sun.png'
    // weatherCardEl.append(tempimg, tempp)

    // dayData.classList.remove('hidden')
    // const dayh1 = document.createElement('h1')
    // const dayp = document.createElement('p')
    // dayh1.textContent = 'СЕГОДНЯ'
    // const currDataData = new Date()
    // if (currDataData.getDay() < 10) {
    //     dayp.textContent = `${currDataData.getDate()}.0${currDataData.getDay()}.${currDataData.getFullYear()}`
    // } else {
    //     dayp.textContent = `${currDataData.getDate()}.${currDataData.getDay()}.${currDataData.getFullYear()}`
    // }

    // currDayData.append(dayh1, dayp)
}

arrowLeft.addEventListener('click', function () {
    goLeft()
})
