const form = document.querySelector('#chat-controls > form')
const messageInput = document.querySelector('#chat-controls > form > input')
const messages = document.querySelector('#chat-panel > ul')

form.onsubmit = () => {
    const message = messageInput.value
    if (!message || message.replace(/\s/g, '').length < 1)
        return false
    var li = document.createElement('li');
    li.setAttribute('class', "message-li my-message-li")
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
    messages.appendChild(li);
    messageInput.value = ''
    dc.send(message)
    return false
};

const onMessage = (message) => {
    var li = document.createElement('li');
    li.setAttribute('class', "message-li peer-message-li")
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
    messages.appendChild(li);
}