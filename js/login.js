const elForm = document.querySelector(".js-form");

const elEmail = document.querySelector(".email");
const elPassword = document.querySelector(".password");
const elBtn = document.querySelector(".js-btn");
 
elForm.addEventListener("submit", (evt)=>{
  evt.preventDefault();

login( elEmail.value, elPassword.value);


})

function login(email, password){
  fetch('http://localhost:9090/login',
  {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
       
       email: email,
       password: password,
     
    }),
  }).then((res)=>res.json())
  .then((data)=>{
    console.log(data);
    if(data.token){
      localStorage.setItem("token",data.token);
      console.log(window.location.replace("../index.html"));
    }
  });

} 