const hideParticipantsPanel = () => {
    document.querySelector('#participants-container').style.display = 'none'
    document.querySelector('#participants-button').style.backgroundImage = "url('../img/participants-off.png')"
}

const showParticipantsPanel = () => {
    document.querySelector('#participants-container').style.display = 'flex'
    document.querySelector('#participants-button').style.backgroundImage = "url('../img/participants-on.png')"
} 