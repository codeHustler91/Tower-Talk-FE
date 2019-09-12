const socket = io.connect('https://tower-talk-database.herokuapp.com/')
// const socket = io.connect('https://localhost:5000')

const chatRecieve = document.querySelector('#chat-recieve')
const chatSend = document.querySelector('#chat-send-message')
const chatSendButton = document.querySelector('#chat-send-button')
const feedback = document.querySelector('#feedback')
const roomSelect = document.querySelector('#room-select')

let room = 'abc123'

// roomSelect.addEventListener('change', event => {
//     room = event.target.value
//     console.log(room)
// })

chatSendButton.addEventListener('click', function(){
    event.preventDefault()
    const profile = getProfileFromSession()

    socket.emit('chat', {
        message: chatSend.value,
        name: profile.name
    })
    chatSend.value = ''
})

chatSend.addEventListener('keypress', function(){
    const profile = getProfileFromSession()
    socket.emit('typing', profile.name)
})

// listen for events
socket.on('connect', function(){
    socket.emit('room', room)
})
socket.on('chat', function(data){
    feedback.innerText = ''
    const p = document.createElement('p')
    p.innerText = `${data.name.toUpperCase()}: ${data.message}\n`
    chatRecieve.appendChild(p)
})
socket.on('typing', function(data){
    feedback.innerText = `${data} is typing a message...`
})

function getProfileFromSession(){
    const rawData = sessionStorage.getItem('profile')
    const profile = JSON.parse(rawData)
    return profile
}