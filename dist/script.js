/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/


const addInput = document.querySelector('#input'),
      addBtn = document.querySelector('#btn'),
      todoList = document.querySelector('.todo-list'),
      todoListCheked = document.querySelector('.todo-list-cheked'),
      todoItems = todoList.querySelectorAll('.todo-item'); // Создаём новый пустой массив для заметок. Если массив уже лежит в localStorage, то берём его оттуда

const todos = localStorage.getItem('listItem') ? JSON.parse(localStorage.getItem('listItem')) : [];
const todosCheked = localStorage.getItem('listItemCheked') ? JSON.parse(localStorage.getItem('listItemCheked')) : []; // Функция рендера заметок из массива в localStorage

function itemRender() {
  const todosParsed = JSON.parse(localStorage.getItem('listItem'));
  todoList.innerHTML = '';
  todosParsed.forEach((item, index) => {
    const elem = document.createElement('div');
    elem.classList.add('todo-item');
    elem.innerHTML = `
            <p>${item}</p>
            <button class="todo-del-btn">X</button>
        `;
    elem.setAttribute('data-item-id', index);
    todoList.appendChild(elem);
  });
} // Функция отправляет текущий массив в localStorage


function toLocalStorage() {
  const serializedTodos = JSON.stringify(todos);
  localStorage.setItem('listItem', serializedTodos);
} // Функция добавляет в текущий массив значение из инпута, а так же отправляет его в localStorage и рендерит


function addNewTodoItem() {
  addBtn.addEventListener("click", e => {
    e.preventDefault();

    if (addInput.value !== '') {
      todos[todos.length] = addInput.value;
      addInput.value = '';
      toLocalStorage();
      itemRender();
    }
  });
} // Функция удаляет елемент по клику на кнопку, а так же отправляет массив в localStorage и рендерит


function removeTodoItem() {
  todoList.addEventListener('click', e => {
    const target = e.target;

    if (target.tagName === 'BUTTON') {
      todos.splice(target.parentNode.getAttribute('data-item-id'), 1);
      toLocalStorage();
      itemRender();
    }
  });
} // Функция удаляет елемент по клику на кнопку, а так же отправляет массив в localStorage и рендерит


function removeTodoItemCheked() {
  todoListCheked.addEventListener('click', e => {
    const target = e.target;

    if (target.tagName === 'BUTTON') {
      todosCheked.splice(target.parentNode.getAttribute('data-item-cheked-id'), 1);
      toLocalStorageCheked();
      itemRenderCheked();
    }
  });
}

function toLocalStorageCheked() {
  const serializedTodosCheked = JSON.stringify(todosCheked);
  localStorage.setItem('listItemCheked', serializedTodosCheked);
} // Функция рендера заметок из массива в localStorage


function itemRenderCheked() {
  const todosParsedCheked = JSON.parse(localStorage.getItem('listItemCheked'));
  todoListCheked.innerHTML = '';
  todosParsedCheked.forEach((item, index) => {
    const elem = document.createElement('div');
    elem.classList.add('todo-item', 'todo-item-cheked');
    elem.innerHTML = `
            <p>${item}</p>
            <button class="todo-del-btn todo-del-btn-cheked">X</button>
        `;
    elem.setAttribute('data-item-cheked-id', index);
    todoListCheked.appendChild(elem);
  });
}

function addToChekedList() {
  todoList.addEventListener('click', e => {
    e.preventDefault();
    const target = e.target;

    if (target.tagName === 'P') {
      todosCheked[todosCheked.length] = target.textContent;
      toLocalStorageCheked();
      itemRenderCheked();
      todos.splice(target.parentNode.getAttribute('data-item-id'), 1);
      toLocalStorage();
      itemRender();
    }
  });
} // Инициализируем функции при загрузке страницы


toLocalStorage();
itemRender();
addNewTodoItem();
removeTodoItem();
toLocalStorageCheked();
itemRenderCheked();
addToChekedList();
removeTodoItemCheked();
/******/ })()
;
//# sourceMappingURL=script.js.map