const tokenR = localStorage.getItem("token");
console.log(tokenR);
console.log("token requerida!");

let userID = document.getElementById("userID");
 userID.innerHTML = tokenR;
localStorage.setItem("token", tokenR);
console.log("token requerida!");
