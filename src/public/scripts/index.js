
const socket = io({
    autoConnect: false//para que no se autoconecte el socket
});

let form = document.getElementById('addProduct')
form.addEventListener('submit', async(e)=>{
    e.preventDefault()
    let data = new FormData(form)
    let obj={}
    data.forEach((value,key) => obj[key]=value);
    console.log('formData: ',data )
    console.log('obj: ',obj)
    fetch('api/newProduct',{
        method:'POST',
        body:JSON.stringify(data),
        header:{
            'Content-Type': 'application/json'
        }

    }).then(result=>result.json())
    .then(json=>console.log(json))
    .finally(console.log(obj))
})
/* let productName = document.getElementById('name')
let price = document.getElementById('price')
let img = document.getElementById('img')

const btn = document.getElementById('btn')
btn.addEventListener('click', (e)=>{
    e.preventDefault()
    console.log('entras')
    let product={
        name:productName.value, 
        price:price.value, 
        img:img.value
    }
    console.log(JSON.stringify(product))
    fetch('/api/newProduct', {
        method:'POST',
        body:JSON.stringify(product),
        header:{
            "Content-Type": "application/json",
        }
    }).then(result=>result.json())
    .then(json=>console.log(json))
    .finally(
        productName.value='',
        price.value='',
        img.value=''
    )
}) */


let userEmail
function chatSocket() {
    if (chatBox.value.trim().length > 0) {
        console.log('entra a enviar chat')
        socket.emit('message', { userEmail: userEmail, message: chatBox.value })
        chatBox.value = ''
    }

}
function chatsHTML(chatList) {
    let str = ''

    for (const chat of chatList) {
        if (chat.userEmail === userEmail) {
            str += `
            <div>
                <span class="u2 chat">
                    <span class="userSay">${chat.userEmail}:</span><br>
                    ${chat.message}<br>
                    <span class="date">${chat.date}</span>
                </span>
        </div>
                `
        } else {
            str += `
                <div>
                <span class="u1 chat">
                    <span class="userSay">${chat.userEmail}:</span><br>
                    ${chat.message}<br>
                    <span class="date">${chat.date}</span>
                </span>
        </div>
            `
        }
    }
    return str
}

Swal.fire({
    title: 'Ingresa tu correo',
    input: 'text',
    text: 'Correo con que te identificarás',
    inputValidator: (value => {
        return !value && 'Ingresa tu direccion de e-mail'
    }),
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result => {
    userEmail = result.value
    socket.connect()//se autoconecta el socket despues de las validaciones que haga
    header.innerText = userEmail
})

const header = document.getElementById('header')

const chatBox = document.getElementById('chatBox')
chatBox.addEventListener('keyup', (evt) => {
    if (evt.key === 'Enter') {
        chatSocket()
    }
})

const sendButton = document.getElementById('send')
sendButton.addEventListener('click', () => {
    console.log('entra al boton enviar')
    chatSocket()
})

socket.on('log', (data) => {
    const chats = document.getElementById('chats')
    chats.innerText = ''
    chats.innerHTML = chatsHTML(data)
    chats.scrollTop = chats.scrollHeight
})
socket.on('newUser', (data)=>{
    if(userEmail){
        Swal.fire({
            text:'Nuevo ususario en el chat',
            toast:true, 
            position:'top-right',
            timer:1000
        })
    }
})