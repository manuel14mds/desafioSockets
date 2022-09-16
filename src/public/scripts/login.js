const form = document.getElementById('loginForm');
console.log('conectado con el script de login')

form.addEventListener('submit',evt=>{
    evt.preventDefault();
    let data = new FormData(form);
    let obj = {};
    data.forEach((value,key)=>obj[key]=value);
    fetch('api/sessions/login',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(result=>result.json()).then(json=>console.log(json))
    .finally(()=>{
        location.href = "http://localhost:8080/home"
    })
})

const btnRegister = document.getElementById('registerBtn')
btnRegister.addEventListener('click',event=>{
    location.href = "http://localhost:8080/register"
})