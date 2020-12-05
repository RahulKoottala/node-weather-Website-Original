const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value
    
    messageOne.textContent = 'Loading weather data ...'
    messageTwo.textContent = ''

    //console.log(location)
        fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ' '
                //console.log(data.error)
            } else {
                //const br1 = document.createElement("br")
                messageOne.textContent = 'Location: ' +data.place
                messageTwo.textContent = 'Current Weather: ' +data.currentWeather 
                messageTwo.append(document.createElement("br"))
                messageTwo.append('Temperature: ' ,data.temperature)
                messageTwo.append(document.createElement("br"))
                messageTwo.append('Feels Like: ' ,data.feelsLike)
            }
        })
    })
})