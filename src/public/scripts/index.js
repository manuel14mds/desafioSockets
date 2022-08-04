
const socket = io({
    autoConnect: false//para que no se autoconecte el socket
});

function chatSocket() {
    if (chatBox.value.trim().length > 0) {
        socket.emit('message', { userName: userName, message: chatBox.value })
        chatBox.value = ''
    }
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
        chatSocket()
    }
})

//sends a new chat message
const sendButton = document.getElementById('send')
sendButton.addEventListener('click', () => {
    console.log('entra al boton enviar')
    chatSocket()
})

//listening the chat messages and show them
socket.on('log', (data) => {
    const chats = document.getElementById('chats')
    chats.innerText = ''
    chats.innerHTML = chatsHTML(data)
    chats.scrollTop = chats.scrollHeight
})


// It shows a toast when a new user is connected
socket.on('newUserConnected', (data) => {
    if (userName) {
        Swal.fire({
            text: 'A new user joined!!',
            toast: true,
            position: 'top-right',
            timer: 1000
        })
    }
})

// render the products list
socket.on('productList', (data) => {
    let listProducts = document.getElementById('listProducts')
    listProducts.innerText = ''
    listProducts.innerHTML = createProductListHTML(data.products)
})


// add product DOM engine
const productName = document.getElementById('name')
const price = document.getElementById('price')
const img = document.getElementById('img')
const btn = document.getElementById('btnSubmit')
btn.addEventListener('click', (e) => {
    e.preventDefault()
    let product = {}
    if (productName.value.trim().length > 0 && img.value.trim().length > 0) {
        product.name = productName.value
        product.price = price.value
        product.img = img.value
        socket.emit('addProduct', product)
        productName.value = ''
        price.value = ''
        img.value = ''
    } else {
        Swal.fire({
            text: "don't let void fields on form!",
            toast: true
        })
    }
})
