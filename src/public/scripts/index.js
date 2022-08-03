
const socket = io({
    autoConnect: false//para que no se autoconecte el socket
});

let userName
function chatSocket(message) {
    if (chatBox.value.trim().length > 0) {
        socket.emit('message', { userName: userName, message: message })
        chatBox.value = ''
        console.log(message)
    }
}

function chatsHTML(chatList) {
    let str = ''

    for (const chat of chatList) {
        if (chat.userName === userName) {
            str += `
            <div>
                <span class="u2 chat">
                    <span class="userSay">${chat.userName}:</span><br>
                    ${chat.message}<br>
                    <span class="date">${chat.date}</span>
                </span>
        </div>
                `
        } else {
            str += `
                <div>
                <span class="u1 chat">
                    <span class="userSay">${chat.userName}:</span><br>
                    ${chat.message}<br>
                    <span class="date">${chat.date}</span>
                </span>
        </div>
            `
        }
    }
    return str
}


const header = document.getElementById('header')

Swal.fire({
    title: 'Username',
    input: 'text',
    text: 'Type your username',
    inputValidator: (value => {
        return !value && 'Type your username to indentificate you'
    }),
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result => {
    userName = result.value
    socket.connect()//se autoconecta el socket despues de las validaciones que haga
    header.innerText = userName
})

//sends a new chat message
const chatBox = document.getElementById('chatBox')
chatBox.addEventListener('keyup', (evt) => {
    if (evt.key === 'Enter') {
        chatSocket(chatBox.value)
    }
})

//sends a new chat message
const sendButton = document.getElementById('send')
sendButton.addEventListener('click', () => {
    console.log('entra al boton enviar')
    chatSocket(chatBox.value)
})

//It shows the chat messages
socket.on('log', (data) => {
    const chats = document.getElementById('chats')
    chats.innerText = ''
    chats.innerHTML = chatsHTML(data)
    chats.scrollTop = chats.scrollHeight
})

// It shows a toast when a new user is connected
socket.on('newUser', (data)=>{
    if(userName){
        Swal.fire({
            text:'Nuevo ususario en el chat',
            toast:true, 
            position:'top-right',
            timer:1000
        })
    }
})