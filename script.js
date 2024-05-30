const myLibrary = [];
const cards = document.getElementById('cards');
const addBook = document.getElementById('add');
const addForm = document.getElementById('add-form');
const btnSubmit = document.getElementById('submit');
const dataTitle = document.querySelector('[data-title]');
const dataAuthor = document.querySelector('[data-author]');
const dataPages = document.querySelector('[data-pages]');
const dataRead = document.querySelector('[data-read]');
const overlay = document.getElementById('overlay');
const closeButton = document.getElementById("close");

let formClose = false;

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

function addBookToLibrary(arr) {
    const title = dataTitle.value;
    const author = dataAuthor.value;
    const pages = dataPages.value;
    const read = dataRead.checked;

    arr.push(new Book(title, author, pages, read));
    displayBooks(arr);
}

function enableModalOrClose() {
    if (formClose) {
        addForm.style.transform = 'translate(32%, 0%) scale(0)';
        addBook.style.transform = "rotate(0deg)";
        overlay.style.display = 'none';
    } else {
        addForm.style.transform = 'translate(32%, 0%) scale(1)';
        addBook.style.transform = "rotate(45deg)";
        overlay.style.display = 'block';
    }
    formClose = !formClose;
}

function closeForm() {
    if (formClose) {
        addForm.style.transform = 'translate(32%, 0%) scale(0)';
        addBook.style.transform = "rotate(0deg)";
        overlay.style.display = 'none';
        clearForm();
        formClose = false;
    }
}

function submitForm() {
    if (dataTitle.value && dataAuthor.value && dataPages.value) {
        addBookToLibrary(myLibrary);
        clearForm();
        closeForm();
    }
}

function displayBooks(library) {
    cards.innerHTML = library.map((book, index) => {
        return `
            <div data-book-index='${index}'>
                <p>${book.title}</p>
                <p>${book.author}</p>
                <p>${book.pages} Pages</p>
                <button class="${book.read ? 'read' : 'unread'}" onclick="toggleRead(${index}, this)">${book.read ? 'read' : 'not read'}</button>
                <button class="remove" onclick="removeBook(${index})">remove</button>
            </div>`;
    }).join("");
}

function clearForm() {
    dataTitle.value = '';
    dataAuthor.value = '';
    dataPages.value = '';
    dataRead.checked = false;
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks(myLibrary);
}

function toggleRead(index, button) {
    myLibrary[index].read = !myLibrary[index].read;
    console.log(myLibrary[index]);
    console.log(!myLibrary[index].read);

    displayBooks(myLibrary);
}

addBook.addEventListener('click', enableModalOrClose);
btnSubmit.addEventListener('click', submitForm);
closeButton.addEventListener('click', closeForm);