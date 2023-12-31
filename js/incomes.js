// Get incomes---------------------------------------------------------------------------

const elIncomeForm =document.querySelector(".incomes-form");
const elIncomeTitle =document.querySelector(".income-title");
const elIncomeAmount =document.querySelector(".income-amount");
const elIncomeCategory =document.querySelector(".income-category");
const elIncomeDesc =document.querySelector(".income-desc");
const elIncomeData =document.querySelector(".income-date");
const elIncomeBtn =document.querySelector(".income-btn");
const elAllIncomes = document.querySelector(".all-incomes")


elIncomeForm.addEventListener('submit',(evt)=>{
  evt.preventDefault();
  
  createIncomes(elIncomeTitle.value, elIncomeAmount.value, elIncomeCategory.value, elIncomeDesc.value, elIncomeData.value);
  elIncomeTitle.value = "";elIncomeAmount.value = ""; elIncomeCategory.value = ""; elIncomeDesc.value = ""; elIncomeData.value = "";
})


// rendered 
function renderIncomes(array,node){
  node.innerHTML="";
  array.forEach(item => {
    const date = new Date(item.date);
const year = date.getUTCFullYear();
const monthIndex = date.getUTCMonth()

let month = (monthIndex + 1).toString(); // 0-dan boshlanadi, shuning uchun +1 qo'shamiz
month = month.length === 1 ? "0" + month : month;

let day = date.getUTCDate();
day = day < 10 ? "0" + day : day;

    node.innerHTML += `<li class="d-flex flex-wrap justify-content-between p-1 border-info align-items-center border around mb-2" > 
    <p class="btn border-info rounded mb-0 ">title:${item.title}  </p> 
    <strong class="btn border rounded">Amount: ${item.amount}$</strong> 
    <strong> ${day}-${month}-${year}</strong>


    <button class="delete-incomes" data-incomes-id=${item.id}></button>
    
    </li>`
  
  });

}



// get 
function getIncomes(){
  fetch("http://localhost:9090/get-incomes",{
  method:"GET",
  headers:{
    token: localData
  },
})
.then((res)=>res.json())
.then((data)=>{
  if(data.length){
    renderIncomes(data,elAllIncomes)
  }
})
}
getIncomes()


// create 
function createIncomes(title,amount,category, description,date){
  fetch("http://localhost:9090/add-income",{
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
    getIncomes()
  }
})
}

//DELETE -
function deletedIncomes(id){
  fetch("http://localhost:9090/delete-income/" + id, {
    method:"DELETE",
    headers:{
      token:localData,
    },
  })
  .then((res)=>res.json())  
  .then((data)=>{
    if(data){
      getIncomes()
    }
  });
}

elAllIncomes.addEventListener("click",(evt)=>{
if(evt.target.matches(".delete-incomes")){
  
  const deleteIncomesId = evt.target.dataset.incomesId;
  console.log(deleteIncomesId);

  deletedIncomes(deleteIncomesId);
}
})
// end incomes --------------------------------------------------------------

