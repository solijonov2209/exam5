const allHistory = document.querySelector(".all-transactions");
const all = [];

function getIncomes() {
  return fetch("http://localhost:9090/get-incomes", {
    method: "GET",
    headers: {
      token: localData
    },
  })
  .then((res) => res.json());
}

function getExpenses() {
  return fetch("http://localhost:9090/get-expenses", {
    method: "GET",
    headers: {
      token: localData
    },
  })
  .then((res) => res.json())
}

Promise.all([getIncomes(), getExpenses()])
  .then(([incomes, expenses]) => {
    all.push(...incomes, ...expenses);
    all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    console.log(all);
  
    renderedTransaction(all,allHistory)
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

  renderedTransaction(all,allHistory)

  