
let  JsonKeys = localStorage.getItem("JsonKeys");
let key = JSON.parse(JsonKeys);
console.log(key.senha);

let password = document.getElementById("senha")
console.log(password.value)

function entrar(){
    
  let msgError = document.getElementById("msgError")
  alert('Verificando!...')
  if( password.value === key.senha) {
    window.location.href = "https://codepen.io/luisdasartimanhas/full/ZEaVByy"
    
    let mathRandom = Math.random().toString(16).substr(2)
    let token = mathRandom + mathRandom
    
    localStorage.setItem('token', token)
  }
  else {
    password.setAttribute('style', 'color: red')
    password.setAttribute('style', 'border-color: red')
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = 'Usuário ou senha incorretos'
   
  }
}

function refresh(){
  const adminKey = {senha: 2004};
const CryptoKey = JSON.stringify(adminKey);
localStorage.setItem("JsonKeys", CryptoKey);
alert('O banco de dados foi restaurado!')
}
