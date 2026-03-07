// toggle bts
const all_btn = document.getElementById("all_btn");
const open_btn = document.getElementById("open_btn");
const closed_btn = document.getElementById("closed_btn");

 const btnList = [all_btn, open_btn, closed_btn];

all_btn.classList.add("btn-primary");

function toggle_btn(clickedBtn){
    
    // console.log(btn);
   btnList.forEach((btn) =>{
          btn.classList.remove("btn-primary", "text-white");
    });
     clickedBtn.classList.add("btn-primary", "text-white");
 
};
// toggle btns end



// cart container
const cart_container = document.getElementById("cart_container");

async function showCart(){
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const dataItem = await res.json();
    display(dataItem.data);


};

function display(data1){
    console.log(data1);
    data1.forEach((data2) =>{
        console.log(data2);
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card bg-base-100 h-full shadow-2xl">
 
  <div class="card-body">

    <div class="flex items-center justify-between ">
      <div>
      <img class="w-5 h-5" src="./assets/Open-Status.png" alt="">
      </div>  
      <div>
      <p id="priority">${data2.priority}</p>
      </div>
    </div>
    <h2 id="title" class="card-title">${data2.title}</h2>
    <p id="description" class="line-clamp-2">${data2.description}</p>
   <div id="labels" class="flex flex-wrap gap-2 ">
  ${data2.labels.map(label => `
    <span class="badge badge-outline text-xs p-3">${label}</span>
  `).join('')}
</div>
    
    <hr>
    <div class="space-y-2">
      <p class="text-[#64748B]" id="">#1 by <span id="author"> ${data2.author}</span></p>
      <p class="text-[#64748B]" id="createdAt">${new Date(data2.createdAt).toLocaleDateString('en-GB')}</p>
    </div>
   
  </div>
</div>
        `
        cart_container.append(div)
    })
}
showCart();
