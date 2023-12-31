let elLogOutBtn = document.querySelector(".log-out");
const localData = localStorage.getItem('token');

if(!localData){
  location.replace("./pages/login.html");
}

elLogOutBtn.addEventListener('click',()=>{
  localStorage.removeItem("token");
  location.replace("./pages/login.html");
});

const totalIncome= document.querySelector(".total-incomes");
const totalExpense= document.querySelector(".total-expenses");
const totalBalance= document.querySelector(".total-balance");
const lastFiveTranzaksiya = document.querySelector(".transactions");

let resultincome = 0;
let resultexpense = 0;

function getIncomes(){
  return fetch("http://localhost:9090/get-incomes", {
    method: "GET",
    headers: {
      token: localData
    },
  })
  .then((res) => res.json())
  .then((data) => {
    resultincome = data.reduce((acc, item) => acc + item.amount, 0);
    totalIncome.textContent = resultincome;
    Balance();
    return data;  
  });
}

function getExpenses(){
  return fetch("http://localhost:9090/get-expenses", {
    method: "GET",
    headers: {
      token: localData
    },
  })
  .then((res) => res.json())
  .then((data) => {
    resultexpense = data.reduce((acc, item) => acc + item.amount, 0);
    totalExpense.textContent = resultexpense;
    Balance();
    return data;  
  });
}

function Balance() {
  totalBalance.textContent = resultincome - resultexpense;
}



// Oxirgi  5 ta tranzaksiya 

Promise.all([getIncomes(), getExpenses()])
  .then(([incomes, expenses]) => {
    let all = [...incomes, ...expenses];  
    all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const lastFiveTransactions = all.slice(0, 5);
    renderedTransaction(lastFiveTransactions, lastFiveTranzaksiya);
  })
  .catch(err => {
    console.error("xatolik:", err);
  });

  function renderedTransaction(array, node){
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
      <p class="btn border-info rounded mb-0 ">title:${item.title}</p> 
      <strong class="btn border rounded">Amount: ${item.amount}$</strong> 
      <strong class="btn border rounded">Type: ${item.type}</strong> 
      <strong class="btn border rounded">Category: ${item.category}</strong> 
      <strong class="btn border rounded">Description: ${item.description}</strong> 
      <strong> ${day}-${month}-${year}</strong>
  
  
      
      
      </li>`
    
    });
  }
