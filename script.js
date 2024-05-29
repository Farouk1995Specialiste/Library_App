const myLibrary = [];
const cards = document.getElementById('cards');
const addBook = document.getElementById('add');
const addForm = document.getElementById('add-form');
const btnSubmit = document.getElementById('submit');
const dataTtitle =  document.querySelector('[data-title]');
const dataTAuthor =  document.querySelector('[data-author]') ;
const dataPage = document.querySelector('[data-pages]') ;
const dataRead = document.querySelector('[data-read]') ;
const overlay = document.getElementById('overlay');
const closeButton = document.getElementById("close");


let formClose = false;


class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.info = function () {
            return `${this.title} by ${this.author} , ${this.pages} pages ${this.read} `;
        };
    }
}

const title = dataTtitle.value;
const author = dataTAuthor.value ;
const pages = dataPage.value ;
const read = dataRead.checked;






function addBookToLibrary(arr) {
  
arr.push(
new Book( dataTtitle.value ,dataTAuthor.value ,  dataPage.value, dataRead.checked)   
)
return arr ,
disPlayIntoCards(arr)
  }
 
   
//  // show From 
function EnableModalOrClosng() {
    if(formClose){
        addForm.style.cssText='  transform: translate(32%, 0%) scale(0);'
        addBook.style.cssText ="transform: rotate(0deg);" 
        overlay.style.display='none';
        formClose = false
    }else{
         addBook.style.cssText ="transform: rotate(45deg);"
        addForm.style.cssText='  transform: translate(32%, 0%) scale(1);' 
        overlay.style.display='block';
        formClose = true
    }

     }
// close form
function closeForm(){
    if(formClose){
        addForm.style.cssText='  transform: translate(32%, 0%) scale(0);'
        addBook.style.cssText ="transform: rotate(0deg);" 
        overlay.style.display='none';
       
        clearFom()
    }
}
    
function submitFotm (){
if (  dataTtitle.value !== '' && dataTtitle.value !== '' && dataTAuthor.value !==''){
    addBookToLibrary(myLibrary);
    clearFom()
    addForm.style.cssText='  transform: translate(32%, 0%) scale(0);' ;
    overlay.style.display='none'
    addBook.style.cssText ='transform:rotate(0deg);'
}

          }
          
    // FUNCTION THAT DISPALY CARDS
  function disPlayIntoCards(myLibrary)
  {
  
 cards.innerHTML = myLibrary.map ((item,index)=>{
 const myLibraryIndex =   myLibrary.map((item,index,arr)=>arr.indexOf(item))

const {title,author,pages,read}=item;

return ( `
        <div data-book-index='${(myLibraryIndex[index])}'
        <p>${title}</p>
        <p>${author}</p>
        <p>${pages} Pages</p>
        <button class="${read ===true? 'read' :"unread"}" onclick=toggleRead(this)>${ read=== true ?"read" :"not read"}</button>
        <button  id="remove" class="remove" onclick="remove(this)">remove  </button>
    </div>`

      
    
    )

       }).join("")
    
  }

// clear form 
function clearFom() {
    dataTtitle.value= '';
    dataTAuthor.value ='';
    dataPage.value= '';
    dataRead.checked = false
}

// REMOVE CARD FORM ARRAY AND PAGE
 function remove (buttonElement){
  const bookElement = buttonElement.parentElement
  const bookIndex = parseInt(bookElement.dataset.bookIndex)
  console.log(bookElement.dataset)
   //dataset is a special property of HTML elements that allows you to store custom data attributes as key-value pairs.
  console.log(bookIndex)
  // remove item from array
  myLibrary.splice(bookIndex ,1)
  console.log(myLibrary)
  // update the Dom
  bookElement.remove();
 }

 // CHANGE BTN READ STATUS
 let isRead = true;

 function toggleRead (btnRead){
    btnRead.classList.toggle('read' );
    btnRead.classList.toggle('unread');
// if isRead is true, the button text becomes "Read".
// If isRead is false, the button text becomes "Not Read".

    isRead =!isRead;
   btnRead.innerText= isRead ? 'read' :'not read'
  
   console.log(isRead)
  
 }

 addBook.addEventListener('click',EnableModalOrClosng)
btnSubmit.addEventListener('click',submitFotm) ;
closeButton.addEventListener('click',closeForm)