const addBtn = document.querySelector('.add-book');
const form = document.querySelector('.add-book-form');
const cardsContainer = document.querySelector('.cards-container');
const books = [];

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const book = {
        title: getValueById('title'),
        author: getValueById('author'),
        pages: getValueById('pages'),
        isRead: document.getElementById('isRead').checked,
    };

    addBookToLibrary(book);

    form.reset();
});

function getValueById(id) {
    return document.getElementById(id).value;
}

function addBookToLibrary(book) {
    books.push(book);
    const card = createBookCard(book);
    displayBookCard(card);
}

function createBookCard(book) {
    const card = createDOMElement('div', 'card');
    const cardText = createDOMElement('div', 'card-text');
    const cardBtns = createDOMElement('div', 'card-btns');

    const elements = [
        createParagraphElement(book.title),
        createParagraphElement(book.author),
        createParagraphElement(book.pages),
    ];

    appendChildren(cardText, elements);
    appendChildren(cardBtns, createBtns(book.isRead));

    appendChildren(card, [cardText, cardBtns]);

    return card;
}

function createBtns(isRead) {
    const buttonRead = createBtn(isRead ? 'Read': 'Not Read', isRead ? 'read': 'not-read');
    const buttonRemove = createBtn('Remove', 'remove');
    return [buttonRead, buttonRemove];
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
    children.forEach(child => {
        parent.appendChild(child);
    });
}

function displayBookCard(card) {
    cardsContainer.appendChild(card);
}
