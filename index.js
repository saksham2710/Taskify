
function addItem(event){
    event.preventDefault();
    let text = document.getElementById("todo-input");
    let newItem = db.collection("todo-items").add({
        text: text.value,
        status: "active"
    })
    text.value = "";
}

function getItems(){
    db.collection("todo-items").onSnapshot((snapshot)=>{
    let items=[];
    snapshot.docs.forEach((doc) => {
        items.push({
            id:doc.id,
            ...doc.data()
        })
    });
    generateItems(items);
})
}

function generateItems(items){
    let itemsHTML= "";

    let activeItemCount = 0;


    
    items.forEach((item)=>{

        if (item.status === "active") {
            activeItemCount++;
        }
        
        itemsHTML+=`
        <div class="todo-item">
            <div class="check">
                <div data-id="${item.id}" class="check-mark ${item.status=="completed" ? "checked": ""}">
                    <img src="res/icon-check.svg" alt="" srcset="">
                </div>
            </div>
            <div class="todo-text ${item.status=="completed" ? "checked": ""}">
                ${item.text}
            </div>
          <div class="delete" data-id="${item.id}" >
                <img src="res/icon-cross.svg" alt="Delete">
            </div>

         </div>
        `
    })
    document.querySelector(".todo-items").innerHTML=itemsHTML;
    document.querySelector(".items-left").innerText = `${activeItemCount} items left`;
    createEventListeners();
}

function createEventListeners(){
    let todoCheckMarks=document.querySelectorAll(".todo-item .check-mark")
    todoCheckMarks.forEach((checkMark)=>{
        checkMark.addEventListener("click",function(){
            markCompleted(checkMark.dataset.id);
        })
    })


    let todoDeleteButtons = document.querySelectorAll(".todo-item .delete");
    todoDeleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener("click", function() {
            deleteItem(deleteButton.dataset.id);
        });
    });
}

function deleteItem(id) {
    db.collection("todo-items").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}


function markCompleted(id){
    let item = db.collection("todo-items").doc(id);
    item.get().then(function(doc){
        if(doc.exists){
            let status=doc.data().status;
            if(status=="active"){
                item.update({
                    status: "completed"
                })               
            }
            else if(status=="completed"){
                item.update({
                    status:"active"
                })
            }
        }
    })
}

function changeTheme(){
    var element = document.body;
   element.classList.toggle("light-mode");
}

getItems();
