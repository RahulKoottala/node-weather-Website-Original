const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherIcon = document.querySelector('#weather-icon')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value
    
    messageOne.textContent = 'Loading weather data ...'
    messageTwo.textContent = ''
    weatherIcon.setAttribute("src",'')

        fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ' '
            } else {
                messageOne.textContent = 'Location: ' +data.place
                messageTwo.append(document.createElement("br"))
                weatherIcon.setAttribute("src",data.icon)
                messageTwo.textContent = 'Current Weather: ' +data.currentWeather 
                messageTwo.append(document.createElement("br"))
                messageTwo.append('Temperature: ' ,data.temperature)
                messageTwo.append(document.createElement("br"))
                messageTwo.append('Feels Like: ' ,data.feelsLike)
                messageTwo.append(document.createElement("br"))
                messageTwo.append('Humidity: ' ,data.humidity)
                messageTwo.append(document.createElement("br"))

            }
        })
    })
})