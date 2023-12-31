let elLogOutBtn = document.querySelector(".log-out");
const localData = localStorage.getItem('token');

if(!localData){
  location.replace("./login.html");
}


elLogOutBtn.addEventListener('click',()=>{
  localStorage.removeItem("token");
  location.replace("./login.html");
})

