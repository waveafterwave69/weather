const weatherInputEl = document.querySelector('.weather-input')
const seacrchBtnel = document.querySelector('.weather-search-btn')
const weatherCardEl = document.querySelector('.weather-card')
const dayData = document.querySelector('.day')
const currDayData = document.querySelector('.day-data')

async function checkWeather() {
    const cityName = weatherInputEl.value
    const apiKey = `https://api.weatherapi.com/v1/current.json?key=d8c6141a21074bfbad0120614252102&q=${cityName}`
    const response = await fetch(apiKey)
    const data = await response.json()
    const current = await data.current
    const temp = await current.temp_c

    weatherCardEl.classList.remove('hidden')
    const tempp = document.createElement('p')
    tempp.textContent = temp
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
