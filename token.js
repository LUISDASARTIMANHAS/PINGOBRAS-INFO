let tokenStorage = localStorage.getItem("JsonToken");
let token = JSON.parse(tokenStorage);
console.log("token requerida!");

let userID = document.getElementById("userID");
 userID.innerHTML = token.token;

let storageTP = localStorage.getItem("JsonTP");
let tp = JSON.parse(storageTP);

const dados = {name: "John", age: 31, city: "New York"};
const DJson = JSON.stringify(dados);
localStorage.setItem("tp", DJson);