let tokenStorage = localStorage.getItem("JsonToken");
console.log(tokenStorage);
console.log("token requerida!");

let userID = document.getElementById("userID");
 userID.innerHTML = tokenStorage;


const CryptoToken = JSON.stringify(tokenStorage);
console.log("codificando token");
localStorage.setItem("JsonToken", CryptoToken);
console.log("token redefinido");