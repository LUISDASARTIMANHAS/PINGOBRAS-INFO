
let  JsonKeys = localStorage.getItem("JsonKeys");
let key = JSON.parse(JsonKeys);
console.log(key.senha);

let inputsenha = document.getElementById("senha")
console.log(inputsenha.value)

function entrar(){
    
  let msgError = document.getElementById("msgError")
  alert('Verificando!...')
  if(inputsenha.value == key.senha) {
    window.location.href = "https://codepen.io/luisdasartimanhas/full/ZEaVByy"
    
    let mathRandom = Math.random().toString(16).substr(2)
    let token = mathRandom + mathRandom
    
    localStorage.setItem('token', token)
  }
  else{
    inputsenha.setAttribute('style', 'color: red')
    inputsenha.setAttribute('style', 'border-color: red')
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = 'Usuário ou senha incorretos'}
}

function refresh(){
  const adminKey = {senha: 9645};
const CryptoKey = JSON.stringify(adminKey);
localStorage.setItem("JsonKeys", CryptoKey);
alert('O banco de dados foi restaurado!')
}
