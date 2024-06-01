const myLibrary = [];
const cards = document.getElementById('cards');
const addBookButton = document.getElementById('add');
const addForm = document.getElementById('add-form');
const btnSubmit = document.getElementById('submit');
const dataTitle = document.querySelector('[data-title]');
const dataAuthor = document.querySelector('[data-author]');
const dataPages = document.querySelector('[data-pages]');
const dataRead = document.querySelector('[data-read]');
const overlay = document.getElementById('overlay');
const closeButton = document.getElementById("close");

let isFormOpen = false;

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read'}`;
    }
}

function addBookToLibrary(library) {
    const title = dataTitle.value;
    const author = dataAuthor.value;
    const pages = dataPages.value;
    const read = dataRead.checked;
    if(title && author && pages && read){
    library.push(new Book(title, author, pages, read));
     displayBooks(library);
     clearForm();
     closeModal();
    }else {
        alert('All field must be filled out')
    }
   
   
}

function openModal() {
addForm.style.transform= 'translate(32%, 0%) scale(1)';
addBookButton.style.transform = "rotate(45deg)";
overlay.style.display= 'block';

}
function closeModal () {
    addForm.style.transform= 'translate(32%, 0%) scale(0)';
    addBookButton.style.transform = "rotate(0deg)";
    overlay.style.display= 'none';
  clearForm();
}
function toggleModal (){
isFormOpen ?openModal():closeModal();
isFormOpen = !isFormOpen
}



function displayBooks(library){
cards.innerHTML = library.map((book,index)=>{
    return `
    <div data-book-index="${index}">
    <p>${book.title}</p>
    <p>${book.author}</p>
    <p>${book.pages} Pages</p>
    <button class="${book.read ? 'read' :'unread'}" data-index="${index}" data-action="toggle-read" >${book.read ? 'read':' not read'}</button>
    <button class="remove" data-index="${index}" data-action="remove">remove</button>
    </div>`
}).join("")
}

function clearForm(){
    dataTitle.value='';
    dataAuthor.value='';
    dataPages.value='';
    dataRead.checked=false;
}
function handleCardClick(event){
const index = event.target.dataset.index; // access the data-index attibute
const action = event.target.dataset.action; // access the data-action atribute
 
if(action === 'toggle-read'){
    toggleRead(index)
}else if(action === 'remove'){
    removeBook(index)
}

}
function removeBook (index){
myLibrary.splice(index , 1);
displayBooks(myLibrary);
}

function toggleRead (index){
myLibrary[index].read=!myLibrary[index].read;
displayBooks(myLibrary)
}


btnSubmit.addEventListener('click',()=>addBookToLibrary(myLibrary));
closeButton.addEventListener('click',closeModal);
addBookButton.addEventListener('click',toggleModal);
cards.addEventListener('click',handleCardClick);