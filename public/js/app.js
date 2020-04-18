console.log('Client side js file is loaded!!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    message1.textContent = 'Loading......'
    message2.textContent = ''

    e.preventDefault()

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = 'Error!'
                message2.textContent = data.error
            }
            else {
                message1.textContent = 'Forecast : ' + data.forecast;
                message2.textContent = 'Location : ' + data.location
            }
        })
    })
    // console.log(search.value)
})