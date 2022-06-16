
let  JsonKeys = localStorage.getItem("JsonKeys");
let key = JSON.parse(JsonKeys);
console.log(key.senha);


let inputsenha = document.getElementById("senha")
console.log(inputsenha.value)

let msgError = document.getElementById("msgError");
let msgSuccess = document.getElementById("msgSuccess");



var enviar = document.querySelector("#submit");
enviar.addEventListener("click", function entrar() {  
  alert('Verificando!...');
   if(inputsenha.value == key.senha) {
    window.location.href = "https://pingobras.glitch.me"
    let mathRandom = Math.random().toString(16).substr(2)
    let storageToken = {token: mathRandom};
    
const Cryptotoken = JSON.stringify(storageToken);
console.log("codificando token");
localStorage.setItem("JsonToken", Cryptotoken);
console.log("token redefinido");
    
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
