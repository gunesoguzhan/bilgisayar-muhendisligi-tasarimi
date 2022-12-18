const form = document.querySelector('#chat-controls > form')
const messageInput = document.querySelector('#chat-controls > form > input')
const messages = document.querySelector('#chat-panel > ul')
const chatPanel = document.querySelector('#chat-panel')
const chatButton = document.querySelector('#chat-button')
const closeChatButton = document.querySelector("#close-chat > button")
var isChatOpen = false

chatButton.addEventListener('click', () => {
    showChatPanel()
})

closeChatButton.addEventListener('click', () => {
    hideChatPanel()
})

form.onsubmit = () => {
    if (!messageInput.value || messageInput.value.replace(/\s/g, '').length < 1)
        return false
    const message = {
        userId: USERID,
        username: USERNAME,
        text: messageInput.value
    }
    messageInput.value = ''
    createMessageElement(message)
    Object.keys(peerConnections).forEach(k => {
        peerConnections[k].dataChannel.send(JSON.stringify(message))
    })
    return false
}

const createMessageElement = (message) => {
    var li = document.createElement('li')
    if (message.userId == USERID)
        li.setAttribute('class', "message-li my-message-li")
    else
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
    document.querySelector('#right-panel').style.flex = '0'
    document.querySelector('#left-panel').style.flex = '1'
    isChatOpen = false
}

const showChatPanel = () => {
    document.querySelector('#right-panel').style.flex = '1'
    document.querySelector('#left-panel').style.flex = '0'
    isChatOpen = true
}

const resetChatPanel = () => {
    hideChatPanel()
    document.querySelector('#right-panel').style.flexBasis = '320px'
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 1200) {
        resetChatPanel()
    }
    if (window.innerWidth <= 1200)
        if (!isChatOpen)
            hideChatPanel()
})