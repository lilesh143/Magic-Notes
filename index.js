console.log("This is project - MAgic Notes")
showNotes();

// Add note to the localStorage 
let addBtn = document.getElementById("addBtn")
addBtn.addEventListener('click', function(e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("titleTxt")
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        note: addTxt.value
    }

    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj))
    addTxt.value = "";
    addTitle.value = "";
    showNotes();

})

// Show all notes to the user  
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    let noteElem = document.getElementById("notes")
    notesObj.forEach(function(element, index) {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text">${element.note}</p>
        <button class="btn btn-primary" id="${index}" onclick="deleteNote(this.id)">Delete Note</button>
        </div>
        </div>`
    });
    if (notesObj != 0) {
        noteElem.innerHTML = html;
    } else {
        noteElem.innerHTML = `Nothing to show! Use 'Add Note' function to add some notes`;

    }

}

// function to delete note  
function deleteNote(index) {
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj))
    showNotes();

}

// Function to search a note 
let search = document.getElementById("searchTxt")
search.addEventListener('input', function() {

    let inputVal = search.value;
    let noteCard = document.getElementsByClassName('noteCard')
    Array.from(noteCard).forEach(function(element) {
        noteTxt = element.getElementsByTagName("p")[0].innerHTML;
        if (noteTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
            // element.innerHTML = `Sorry! Match not found`
        }

    })

})