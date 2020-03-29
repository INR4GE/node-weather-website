const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const getWeather = postponed()

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    getWeather(location)

})



function postponed() {
    let allow = true;
    return function (location) {
        if (allow) {
            allow = false
            fetch('http://localhost:3001/weather?address=' + location)
                .then(res => res.json())
                .then((data) => {
                    if (data.error) {
                        messageOne.textContent = data.error
                    } else {
                        messageOne.textContent = data.location
                        messageTwo.textContent = data.forecast
                    }
                }).finally(() => {
                    allow = true
                })
        }
    }
}
