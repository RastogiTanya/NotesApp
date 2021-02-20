console.log("welcome");
showNotes(); //Displaying notes as soon as the page opens 
let addBtn = document.getElementById("addBtn");
//Adding a note
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    showNotes();
})
//Function to display notes as soon as they are added
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    //Adding the card
    notesObj.forEach(function (element, index) {
        html += `
        <div class=" notecard mx-2 my-2 card " style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button onclick="deleteNode(this.id)" class="btn btn-primary" id="${index}">Delete Node</button>
        </div>                
    </div>
        `;
    });
    let notesElem = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `No notes here.`;
    }
}
//function to delete the nodes
function deleteNode(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1); //first argument from where second argument how many
    localStorage.setItem("notes", JSON.stringify(notesObj)); //updating local storage
    showNotes();

}
// logic for search 
let search = document.getElementById("searchTxt");

let clickbtn=document.getElementById("buttonc");
clickbtn.addEventListener("click", function () {
    let inputval = search.value;
    let ourcard = document.getElementsByClassName("notecard");
    Array.from(ourcard).forEach(element => {
        let cardText = element.getElementsByTagName("p")[0].innerText;
        if (cardText.includes(inputval)) {
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})
//for displaying all the nodes when we have backspaced all the input data in search option without reloading the page
search.addEventListener("input",function(){
    if(search.value == "")
{
    showNotes();
}
})
