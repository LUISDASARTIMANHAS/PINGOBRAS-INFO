let tokenStorage = localStorage.getItem("JsonToken");
let token = JSON.parse(tokenStorage);
console.log(token);
console.log("token requerida!");

let userID = document.getElementById("userID");
 userID.innerHTML = tokenStorage;


const CryptoToken = JSON.stringify(tokenStorage);
console.log("codificando token");
localStorage.setItem("JsonToken", CryptoToken);
console.log("token redefinido");