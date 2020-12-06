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
    weatherIcon.style.display = 'none'


        fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.classList.add("alert")
                messageOne.classList.add("alert-danger")
                messageOne.textContent = data.error
                messageTwo.textContent = ' '
                messageTwo.classList.add("")
            } else {
                //messageOne.style.word-wrap='break-word'
                messageOne.classList.add("alert")
                messageOne.classList.add("alert-success")
                messageOne.classList.add("alert-heading")
                messageOne.textContent = 'Location: ' +data.place
                messageTwo.classList.add("alert")
                messageTwo.classList.add("alert-success")
                messageTwo.append(document.createElement("br"))
                weatherIcon.setAttribute("src",data.icon)
                weatherIcon.style.display = 'block'
                messageOne.style.display = 'block'
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