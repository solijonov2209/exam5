const elForm = document.querySelector(".js-form");
const elFirstName = document.querySelector(".first-name");
const elLastName = document.querySelector(".last-name");
const elAge = document.querySelector(".age");
const elEmail = document.querySelector(".email");
const elPassword = document.querySelector(".password");
const elBtn = document.querySelector(".js-btn");
 
elForm.addEventListener("submit", (evt)=>{
  evt.preventDefault();

register( elLastName.value, elFirstName.value, elEmail.value, elPassword.value, elAge.value);

elLastName.value = "";elFirstName.value="";elEmail.value="";elPassword.value="";elAge.value="";
})

function register(last_name, frist_name, email, password, age){
  fetch('http://localhost:9090/register',
  {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
       last_name: last_name,
       frist_name:frist_name,
       email: email,
       password: password,
       age:age,
    }),
  }).then((res)=>res.json())
  .then((data)=>{
    if(data.token){
      localStorage.setItem("token",data.token);
      console.log(window.location.replace("../index.html"));
    }
  });

} 