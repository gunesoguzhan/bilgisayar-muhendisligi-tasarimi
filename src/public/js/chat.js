const form = document.querySelector('#chat-controls > form')
const messageInput = document.querySelector('#chat-controls > form > input')
const messages = document.querySelector('#chat-panel > ul')
const chatPanel = document.querySelector('#chat-panel')
const chatButton = document.querySelector('#chat-button')
var isChatOn = false

chatButton.addEventListener('click', () => {
    if (isChatOn) hideChatPanel()
    else showChatPanel()
})

form.onsubmit = () => {
    if (!messageInput.value || messageInput.value.replace(/\s/g, '').length < 1)
        return false
    const message = {
        username: USERNAME,
        text: messageInput.value
    }
    createMessageElement(message)
    peerConnections.forEach(p => p.dataChannel.send(JSON.stringify(message)))
    return false
}

const createMessageElement = (message) => {
    var li = document.createElement('li')
    if (message.username == USERNAME) {
        li.setAttribute('class', "message-li my-message-li")
        messageInput.value = ''
    } else
        li.setAttribute('class', "message-li peer-message-li")
    var messageDiv = document.createElement('div')
    var detailsP = document.createElement('p')
    detailsP.setAttribute('class', 'message-details-p')
    var currentDate = new Date()
    detailsP.textContent = message.username + ' ' + ('0' + currentDate.getHours()).slice(-2) + ':' + ('0' + currentDate.getMinutes()).slice(-2)
    var messageP = document.createElement('p')
    messageP.textContent = message.text
    messageDiv.appendChild(messageP)
    messageDiv.appendChild(detailsP)
    li.appendChild(messageDiv)
    messages.appendChild(li)
    chatPanel.scrollTop = chatPanel.scrollHeight
}

const onMessage = (message) => {
    createMessageElement(JSON.parse(message))
}

const hideChatPanel = () => {
    showParticipantsPanel()
    document.querySelector('#chat-container').style.display = 'none'
    chatButton.style.backgroundImage = "url('../img/chat-off.png')"
    isChatOn = false
}

const showChatPanel = () => {
    hideParticipantsPanel()
    document.querySelector('#chat-container').style.display = 'flex'
    chatButton.style.backgroundImage = "url('../img/chat-on.png')"
    isChatOn = true
}