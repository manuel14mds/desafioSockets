
let username

//Its creates from all chatList the html chats
function chatsHTML(chatList) {
    console.log(chatList)
    let str = ''

    for (const chat of chatList) {
        if (chat.user.first_name === username) {
            str += `
            <div>
                <span class="u2 chat">
                    <span class="userSay">${chat.user.first_name}:</span><br>
                    ${chat.message}<br>
                    <span class="date">${chat.createdAt}</span>
                </span>
        </div>
                `
        } else {
            str += `
                <div>
                <span class="u1 chat">
                    <span class="userSay">${chat.user.first_name}:</span><br>
                    ${chat.message}<br>
                    <span class="date">${chat.createdAt}</span>
                </span>
        </div>
            `
        }
    }
    return str
}

//Its creates from list products the html list
function createProductListHTML(products){
    const listProducts = products.reverse()
    let str = ''
    if(products.length==0){
        str='<br><h3>There are NOT products jet</h3>'
    }else{
        for(const product of listProducts){
            str+=`
            <ul class="list-group list-group-horizontal row">
                <li class="list-group-item col-4">${product.name}</li>
                <li class="list-group-item col-4">$ ${product.price}</li>
                <li class="list-group-item col-4">
                    <img src="${product.thumbnail}" alt="${product.name} image" style="height: 80px;">
                </li>
            </ul>
            `
        }
    }
    return str
}