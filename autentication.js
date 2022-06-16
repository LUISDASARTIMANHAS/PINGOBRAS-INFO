
let  JsonKeys = localStorage.getItem("JsonKeys");
let key = JSON.parse(JsonKeys);
console.log(key.senha);
let tokenR = localStorage.getItem("token");
console.log(tokenR);

let inputsenha = document.getElementById("senha")
console.log(inputsenha.value)

let msgError = document.getElementById("msgError");
let msgSuccess = document.getElementById("msgSuccess");
let userID = document.getElementById("userID");

 userID.innerHTML = tokenR;



var enviar = document.querySelector("#submit");
enviar.addEventListener("click", function entrar() {  
  alert('Verificando!...');
   if(inputsenha.value == key.senha) {
    window.location.href = "https://pingobras.glitch.me"
    let mathRandom = Math.random().toString(16).substr(2)
    let token = mathRandom + mathRandom
    localStorage.setItem('token', token)
    
    msgSuccess.setAttribute('style', 'display: block')
    msgSuccess.innerHTML = 'senha correta! redirecionando!'
  }
  else{
    inputsenha.setAttribute('style', 'color: red')
    inputsenha.setAttribute('style', 'border-color: red')
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = 'senha incorreta!'}
});

function refresh(){
  const adminKey = {senha: 9645};
const CryptoKey = JSON.stringify(adminKey);
localStorage.setItem("JsonKeys", CryptoKey);
alert('O banco de dados foi restaurado!')
}
