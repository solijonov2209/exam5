



// EXPENSES ========================================

const elExpensesForm =document.querySelector(".expenses-form");
const elExpensesTitle =document.querySelector(".expenses-title");
const elExpensesAmount =document.querySelector(".expenses-amount");
const elExpensesCategory =document.querySelector(".expenses-category");
const elExpensesDesc =document.querySelector(".expenses-desc");
const elExpensesData =document.querySelector(".expenses-date");
const elExpensesBtn =document.querySelector(".expenses-btn");
const elAllexpenses = document.querySelector(".all-expenses")


elExpensesForm.addEventListener('submit',(evt)=>{
  evt.preventDefault();
  
  createexpenses(elExpensesTitle.value, elExpensesAmount.value, elExpensesCategory.value, elExpensesDesc.value, elExpensesData.value);
  elExpensesTitle.value = "";elExpensesAmount.value = ""; elExpensesCategory.value = ""; elExpensesDesc.value = ""; elExpensesData.value = "";
})


// rendered 
function renderexpenses(array,node){
  node.innerHTML="";
  array.forEach(item => {
    const date = new Date(item.date);
const year = date.getUTCFullYear();
const monthIndex = date.getUTCMonth()

let month = (monthIndex + 1).toString(); 
month = month.length === 1 ? "0" + month : month;

let day = date.getUTCDate();
day = day < 10 ? "0" + day : day;

    node.innerHTML += `<li class="d-flex justify-content-between p-1 border-info align-items-center border around mb-2" > 
    <p class="btn border-info rounded mb-0 ">title:${item.title}  </p> 
    <strong class="btn border rounded">Amount: ${item.amount}$</strong> 
    <strong> ${day}-${month}-${year}</strong>


    <button class="delete-expenses" data-expenses-id=${item.id}></button>
    
    </li>`
  
  });

}



// get 
function getexpenses(){
  fetch("http://localhost:9090/get-expenses",{
  method:"GET",
  headers:{
    token: localData
  },
})
.then((res)=>res.json())
.then((data)=>{
  if(data.length){
    renderexpenses(data,elAllexpenses)
  }
})
}
getexpenses()


// create 
function createexpenses(title,amount,category, description,date){
  fetch("http://localhost:9090/add-expense",{
  method:"POST",
  headers:{
    token: localData,
    "Content-Type":"application/json"
  },
  body:JSON.stringify({
    title,
    amount,
    category, 
    description,
    date
  })
})
.then((res)=>res.json())
.then((data)=>{
  if(data){
    getexpenses()
  }
})
}

//DELETE -
function deletedexpenses(id){
  fetch("http://localhost:9090/delete-expense/" + id, {
    method:"DELETE",
    headers:{
      token:localData,
    },
  })
  .then((res)=>res.json())  
  .then((data)=>{
    if(data){
      getexpenses()
    }
  });
}

elAllexpenses.addEventListener("click",(evt)=>{
if(evt.target.matches(".delete-expenses")){
  
  const deleteexpensesId = evt.target.dataset.expensesId;
  console.log(deleteexpensesId);

  deletedexpenses(deleteexpensesId);
}
})