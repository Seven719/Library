const addBtn = document.querySelector('.add-book');
const form = document.querySelector('.add-book-form');
const cardsContainer = document.querySelector('.cards-container');
const addBook = document.querySelector('.add-book');
const modal = document.querySelector('.add-book-modal');
const closeModal = document.querySelector('.close-modal');

const books = [];
let bookIdCounter = 1; 

addBook.addEventListener('click', () => {
    modal.showModal()
})

closeModal.addEventListener('click', () => {
    modal.close()
})

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = getValueById('title');
    const author = getValueById('author');

    if (inLibrary(title, author)) {
        form.reset();
        return;
    }

    const book = {
        id: bookIdCounter++,         
        title,
        author,
        pages: getValueById('pages'),
        isRead: document.getElementById('isRead').checked,
    };

    addBookToLibrary(book);
    form.reset();
})

function addBookToLibrary(book) {
    books.push(book);
    const card = createBookCard(book);
    displayBookCard(card);
}

function inLibrary(title, author) {
    return books.some(book => book.title === title && book.author === author);
}

function createBookCard(book) {
    const card = createDOMElement('div', 'card');
    card.dataset.bookId = book.id;
    const cardText = createDOMElement('div', 'card-text');
    const cardBtns = createDOMElement('div', 'card-btns');

    const elements = [
        createParagraphElement(book.title),
        createParagraphElement(book.author),
        createParagraphElement(book.pages),
    ];

    appendChildren(cardText, elements);
    appendChildren(cardBtns, createBtns(book));
    appendChildren(card, [cardText, cardBtns]);

    return card;
}

function createBtns(book) {
    const buttonText = book.isRead ? 'Read' : 'Not Read';
    const buttonClass = book.isRead ? 'read' : 'not-read';

    const buttonRead = createBtn(buttonText, buttonClass);
    const buttonRemove = createBtn('Remove', 'remove');

    handleBtns(book, buttonRemove, buttonRead);

    return [buttonRead, buttonRemove];
}

function handleBtns(book, buttonRemove, buttonRead) {
    buttonRemove.addEventListener('click', function() {
        removeBookById(book.id);
    });

    buttonRead.addEventListener('click', function() {
        book.isRead = !book.isRead;

        buttonRead.textContent = book.isRead ? 'Read' : 'Not Read';

        buttonRead.classList.remove('read', 'not-read');
        buttonRead.classList.add(book.isRead ? 'read' : 'not-read');
    });
}

function createBtn (text, className) {
    const button = createDOMElement('button', className);
    button.textContent = text;
    return button;
}

function createDOMElement(elementType, className) {
    const element = document.createElement(elementType);
    element.classList.add(className);
    return element;
}

function createParagraphElement(text) {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    return paragraph;
}

function appendChildren(parent, children) {
    children.forEach(child => parent.appendChild(child));
}

function getValueById(id) {
    return document.getElementById(id).value;
}

function displayBookCard(card) {
    cardsContainer.appendChild(card);
}

function removeBookById(bookId) {
    const index = books.findIndex(book => book.id === bookId);
    if (index !== -1) {
        books.splice(index, 1);
    }

    const cardToRemove = document.querySelector(`.card[data-book-id="${bookId}"]`);
    if (cardToRemove) {
        cardToRemove.remove();
    }
}
