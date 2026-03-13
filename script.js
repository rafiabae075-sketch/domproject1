const draggable_list = document.getElementById("draggable-list");
const check =document.getElementById("check");

const richestPeople = [
  "Elon Musk",
  "Larry Page",
  "Sergey Brin",
  "Jeff Bezos",
  "Mark Zuckerberg",
  "Larry Ellison",
  "Bernard Arnault",
  "Jensen Huang",
  "Warren Buffett",
  "Amancio Ortega"
];
const listItems=[]; //  Isme created li elements store honge.
let dragStartIndex; // Ye store karega drag start item ka index.

createList();       // Page load hone par list create hogi.
function createList() {

      [...richestPeople]  //   Spread operator.Ye array ki copy banata hai.
      .map((a)=>({value:a, sort: Math.random()})) //    Har item ko object banaya:
      .sort((a,b)=>a.sort - b.sort) //   Random number ke base par shuffle.
      .map((a)=> a.value) //   Wapas sirf names nikale.
       .forEach((person,index)=>{ // Har person ke liye li create hota hai.
        //  console.log(person);

        const listItem =document.createElement("li"); // New <li> element create.
        // listItem.classList.add("over");

        listItem.setAttribute("data-index",index); // Custom attribute.

        listItem.innerHTML=`<span class="number">${index + 1}</span>

         <div class="dragabble" draggable="true">
           <p class ="person-name">${person}</p> 
           <i class="fa-solid fa-grip-lines"></i>
           </div>`;

           listItems.push(listItem)
           draggable_list.appendChild(listItem);

      }) ; //    photocopy ky liye hm ye use krty hyn
     

addEventListener();
    
}
function dragStart() {
    dragStartIndex = +this.closest("li").getAttribute("data-index");
    //  this.classList.remove("over");
}
function dragEnter() {
    this.classList.add("over");
}
function dragOver(e) {
    e.preventDefault();
}
function dragLeave() {
    this.classList.remove("over");
}
function dragDrop() {

    const dropEndIndex = this.getAttribute("data-index");
    swapItems(dragStartIndex, dropEndIndex);
    this.classList.remove("over");
}

// function swapItems(fromIndex, toIndex) {

//    const itemOne = listItems [fromIndex].querySelector (".dragabble");
//    const itemTwo = listItems[toIndex].querySelector(".dragabble");


function swapItems(fromIndex, toIndex) {

   const itemOne = listItems[fromIndex];
   const itemTwo = listItems[toIndex];

   draggable_list.insertBefore(itemOne, itemTwo);
   draggable_list.insertBefore(itemTwo, listItems[fromIndex]);
}

//    listItems[fromIndex].appendChild(itemTwo);
//    listItems[toIndex].appendChild(itemOne);
// }




// ......
function checkOrder() {
  listItems .forEach((listItem, index) => {
    const personName = listItem
      .querySelector(".dragabble")
      .innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}
function addEventListener(){
    const dragabbles =document.querySelectorAll(".dragabble");
    const dragListItems =document.querySelectorAll(".draggable-list li")


    dragabbles.forEach((dragabble)=>{
        dragabble.addEventListener("dragstart", dragStart);
    });

    dragListItems.forEach((item)=>{
        item.addEventListener("dragover", dragOver);
        item.addEventListener("drop", dragDrop);
        item.addEventListener("dragenter",dragEnter);
        item.addEventListener("dragleave",dragLeave);
    })
}

check.addEventListener('click',checkOrder)
// console.log(richestPeople);