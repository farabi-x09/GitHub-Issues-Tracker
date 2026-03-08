let allIssues = [];
// toggle bts
const all_btn = document.getElementById("all_btn");
const open_btn = document.getElementById("open_btn");
const closed_btn = document.getElementById("closed_btn");
const count_issues = document.getElementById("count_issues");
const loading_spinner = document.getElementById("loading_spinner");
const my_modal_1 = document.getElementById("my_modal_1");
const modal_title = document.getElementById("title");
const modal_labels = document.getElementById("labels");
const modal_status = document.getElementById("status");
const modal_assignee = document.getElementById("assignee");
const modal_updatedAt = document.getElementById("updatedAt");
const modal_description = document.getElementById("description");
const assignee_name = document.getElementById("assignee_name");
const priority = document.getElementById("priority");




 const btnList = [all_btn, open_btn, closed_btn];

all_btn.classList.add("btn-primary", "text-white");

function toggle_btn(clickedBtn , status){
    
    // console.log(btn);
   btnList.forEach((btn) =>{
          btn.classList.remove("btn-primary", "text-white");
    });
     clickedBtn.classList.add("btn-primary", "text-white");
     show_loading()
setTimeout(() => {
     if(status === 'all'){
        display(allIssues);
    }
    else{
        const filter_data = allIssues.filter(issue => issue.status === status);
        display(filter_data);
    }
    hide_loading()
}, 500);
   

 
};
// toggle btns end



// cart container
const cart_container = document.getElementById("cart_container");

function show_loading(){
    loading_spinner.classList.remove("hidden");
    cart_container.innerHTML ="";

}
function hide_loading(){
    loading_spinner.classList.add("hidden");
}

async function showCart(){
    show_loading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const dataItem = await res.json();
    allIssues = dataItem.data;
    display(allIssues);

    hide_loading()
};



function getLabelData(label) {
    const l = label.toLowerCase();
    
    if (l === 'bug') {
        return { 
            icon: 'fa-bug', 
            color: 'bg-red-100 text-red-600 border-red-200' 
        };
    }
    if (l === 'help wanted') {
        return { 
          
            icon: 'fa-life-ring', 
            color: 'bg-yellow-100 text-yellow-600 border-yellow-200' 
        };
    }
    if (l === 'enhancement') {
        return { 
            icon: 'fa-wand-magic-sparkles', 
            color: 'bg-green-100 text-green-600 border-green-200' 
        };
    }
    if (l === 'good first issue') {
        return { 
            icon: 'fa-clover', 
            color: 'bg-blue-100 text-blue-600 border-blue-200' 
        };
    }
    
    return { 
        icon: 'fa-tag', 
        color: 'bg-gray-100 text-gray-600 border-gray-200' 
    };
};

function getPriorityStyle(priority) {
    const p = priority.toLowerCase();
    if (p === 'high') {
        return {
            color: 'bg-red-200 p-1 rounded-lg text-red-500'
        };
    }
    if (p === 'medium') {
        return {
            color: 'bg-yellow-200 p-1 rounded-lg text-yellow-500'
        };
    }
    if (p === 'low') {
        return {
            color: 'bg-green-200 p-1 rounded-lg text-green-500'
        };
    }
    return { color: 'text-gray-500' };
}


function display(data1){
    count_issues.innerText = data1.length;
    cart_container.innerHTML = "";
    // console.log(data1);
    data1.forEach((data2) =>{
        // console.log(data2);
        const div = document.createElement("div");
      const pStyle = getPriorityStyle(data2.priority);
      const statusColor = data2.status === 'open' ? 'border-green-500' : 'border-purple-500';

        div.innerHTML = `
        <div class="card bg-base-100 h-full shadow-2xl border-t-4 ${statusColor} cursor-pointer">
 
  <div class="card-body " onclick="openModal(${data2.id})">

    <div class="flex items-center justify-between ">
      <div>
      <img id="open_closed" class="w-5 h-5" src="${data2.status === 'open' ? './assets/Open-Status.png' : './assets/Closed-Status .png'} " alt="">
      </div>  
      <div>
     <p class="text-xs font-semibold uppercase ${pStyle.color}">${data2.priority}</p>
      </div>
    </div>
    <h2 id="title" class="card-title">${data2.title}</h2>
    <p id="description" class="line-clamp-2">${data2.description}</p>
 
    <div id="labels" class="flex flex-wrap gap-2 mt-2">
    ${data2.labels.map(label => {
        const info = getLabelData(label);
        
        return `
            <span class="px-2 py-1 rounded-md border text-[10px] font-bold uppercase flex items-center gap-1 ${info.color}">
                <i class="fa-solid ${info.icon}"></i> 
                ${label}
            </span>
        `;
    }).join('')}
</div>
    
    <hr>
    <div class="space-y-2">
      <p class="text-[#64748B]" id="">#<span id="id"> ${data2.id}</span> by <span id="author"> ${data2.author}</span></p>
      <p class="text-[#64748B]" id="createdAt">${new Date(data2.createdAt).toLocaleDateString('en-GB')}</p>
    </div>
   
  </div>
</div>
        `
        cart_container.append(div)
    })
}
showCart();

async function openModal(modId){
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${modId}`);
    const data = await res.json();
    const modDetails = data.data;
    console.log(modDetails);
    modal_title.textContent= modDetails.title
    modal_labels.innerHTML=`
    <div id="labels" class="flex flex-wrap gap-2 mt-2">
    ${modDetails.labels.map(label => {
        const info = getLabelData(label);
        
        return `
            <span class="px-2 py-1 rounded-md border text-[10px] font-bold uppercase flex items-center gap-1 ${info.color}">
                <i class="fa-solid ${info.icon}"></i> 
                ${label}
            </span>
        `;
    }).join('')}
</div> 
    `

const status_badge = modal_status;
    status_badge.textContent = modDetails.status;
status_badge.className = "px-3 py-1 rounded-full text-white text-xs font-bold uppercase";
    
    if (modDetails.status === 'open') {
        status_badge.classList.add("bg-green-500");
    } else {
        status_badge.classList.add("bg-purple-500");
    }


modal_assignee.textContent= modDetails.assignee;
assignee_name.textContent= modDetails.assignee
modal_updatedAt.textContent= new Date(modDetails.updatedAt).toLocaleDateString('en-GB');
modal_description.textContent =modDetails.description;

priority.textContent= modDetails.priority;
priority.className = " p-2 rounded-xl text-white font-semibold uppercase";
if(modDetails.priority=== "high"){
    priority.classList.add("bg-red-500");
}
else if(modDetails.priority=== "medium"){
    priority.classList.add("bg-yellow-500");
}else{
    priority.classList.add("bg-green-500")
}

    

    
    my_modal_1.showModal();
};
// search


const searchField = document.getElementById("search_field");

searchField.addEventListener("input", async (e) => {
    const searchText = e.target.value.trim();
     
    show_loading();

    if (!searchText) {
        display(allIssues);
        hide_loading();
        return;
    }

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`);
    const data = await res.json();
    const searchResult = data.data;

    setTimeout(() => {
        display(searchResult);
        hide_loading();
    }, 300);
});