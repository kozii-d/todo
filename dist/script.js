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

const todoArr = localStorage.getItem('listItem') ? JSON.parse(localStorage.getItem('listItem')) : [];
const todoArrCheked = localStorage.getItem('listItemCheked') ? JSON.parse(localStorage.getItem('listItemCheked')) : []; // Функция рендера заметок из массивов в localStorage

function itemRender() {
  const todoArrParsed = JSON.parse(localStorage.getItem('listItem'));
  const todoArrChekedParsed = JSON.parse(localStorage.getItem('listItemCheked'));
  todoList.innerHTML = '';
  todoListCheked.innerHTML = '';
  todoArrParsed.forEach((item, index) => {
    const elem = document.createElement('div');
    elem.classList.add('todo-item');
    elem.innerHTML = `
            <p>${item}</p>
            <button class="todo-del-btn">X</button>
        `;
    elem.setAttribute('data-item-id', index);
    todoList.appendChild(elem);
  });
  todoArrChekedParsed.forEach((item, index) => {
    const elem = document.createElement('div');
    elem.classList.add('todo-item', 'todo-item-cheked');
    elem.innerHTML = `
            <p>${item}</p>
            <button class="todo-del-btn todo-del-btn-cheked">X</button>
        `;
    elem.setAttribute('data-item-cheked-id', index);
    todoListCheked.appendChild(elem);
  });
} // Функция отправляет текущий массив в localStorage


function toLocalStorage() {
  const serializedTodos = JSON.stringify(todoArr);
  localStorage.setItem('listItem', serializedTodos);
  const serializedTodosCheked = JSON.stringify(todoArrCheked);
  localStorage.setItem('listItemCheked', serializedTodosCheked);
} // Функция добавляет в текущий массив значение из инпута, а так же отправляет его в localStorage и рендерит


function addNewTodoItem() {
  addBtn.addEventListener("click", e => {
    e.preventDefault();

    if (addInput.value !== '') {
      todoArr[todoArr.length] = addInput.value;
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
      todoArr.splice(target.parentNode.getAttribute('data-item-id'), 1);
      toLocalStorage();
      itemRender();
    }
  });
  todoListCheked.addEventListener('click', e => {
    const target = e.target;

    if (target.tagName === 'BUTTON') {
      todoArrCheked.splice(target.parentNode.getAttribute('data-item-cheked-id'), 1);
      toLocalStorage();
      itemRender();
    }
  });
} // Функция переносит айтемы в состояние cheked и возвращает


function addToChekedList() {
  todoList.addEventListener('click', e => {
    e.preventDefault();
    const target = e.target;

    if (target.tagName !== 'BUTTON') {
      todoArrCheked[todoArrCheked.length] = target.textContent;
      todoArr.splice(target.parentNode.getAttribute('data-item-id'), 1);
      toLocalStorage();
      itemRender();
    }
  });
  todoListCheked.addEventListener('click', e => {
    e.preventDefault();
    const target = e.target;

    if (target.tagName !== 'BUTTON') {
      todoArr[todoArr.length] = target.textContent;
      todoArrCheked.splice(target.parentNode.getAttribute('data-item-id'), 1);
      toLocalStorage();
      itemRender();
    }
  });
} // Инициализируем функции при загрузке страницы


function init() {
  toLocalStorage();
  itemRender();
  addNewTodoItem();
  removeTodoItem();
  addToChekedList();
}

init();
/******/ })()
;
//# sourceMappingURL=script.js.map