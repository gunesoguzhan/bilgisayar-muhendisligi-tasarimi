const form = document.querySelector('#chat-controls > form')
const messageInput = document.querySelector('#chat-controls > form > input')
const messages = document.querySelector('#chat-panel > ul')
const chatPanel = document.querySelector('#chat-panel')

form.onsubmit = () => {
    const message = messageInput.value
    if (!message || message.replace(/\s/g, '').length < 1)
        return false
    var li = document.createElement('li')
    var messageDiv = document.createElement('div')
    var detailsP = document.createElement('p')
    detailsP.setAttribute('class', 'message-details-p')
    var currentDate = new Date()
    detailsP.textContent = 'You ' + ('0' + currentDate.getHours()).slice(-2) + ':' + ('0' + currentDate.getMinutes()).slice(-2)
    var messageP = document.createElement('p')
    messageP.textContent = message
    messageDiv.appendChild(messageP)
    messageDiv.appendChild(detailsP)
    li.appendChild(messageDiv)
    messages.appendChild(li)
    li.setAttribute('class', "message-li my-message-li")
    messageInput.value = ''
    Object.keys(dataChannels).forEach(k => {
        var c = dataChannels[k]
        c.send(message)
    })
    chatPanel.scrollTop = chatPanel.scrollHeight
    return false
}

const onMessage = (message, id) => {
    var li = document.createElement('li')
    li.setAttribute('class', "message-li peer-message-li")
    var messageDiv = document.createElement('div')
    var detailsP = document.createElement('p')
    detailsP.setAttribute('class', 'message-details-p')
    var currentDate = new Date()
    detailsP.textContent = id + ('0' + currentDate.getHours()).slice(-2) + ':' + ('0' + currentDate.getMinutes()).slice(-2)
    var messageP = document.createElement('p')
    messageP.textContent = message
    messageDiv.appendChild(messageP)
    messageDiv.appendChild(detailsP)
    li.appendChild(messageDiv)
    messages.appendChild(li)
    chatPanel.scrollTop = chatPanel.scrollHeight
}