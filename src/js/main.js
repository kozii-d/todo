'use strict';

const addInput = document.querySelector('#input'),
    addBtn = document.querySelector('#btn'),
    todoList = document.querySelector('.todo-list'),
    todoItems = todoList.querySelectorAll('.todo-item');

// Создаём новый пустой массив для заметок. Если массив уже лежит в localStorage, то берём его оттуда
const todos = localStorage.getItem('listItem') ? JSON.parse(localStorage.getItem('listItem')) : [];

// Функция рендера заметок из массива в localStorage
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
}

// Функция отправляет текущий массив в localStorage
function toLocalStorage() {
    const serializedTodos = JSON.stringify(todos);
    localStorage.setItem('listItem', serializedTodos);
}

function inLocalStorage() {
    return JSON.parse(localStorage.getItem('listItem'));
}

// Функция добавляет в текущий массив значение из инпута, а так же отправляет его в localStorage и рендерит
function addNewTodoItem() {
    addBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (addInput.value !== '') {
            todos[todos.length] = addInput.value;
            addInput.value = '';
            toLocalStorage();
            itemRender();   
        }
    });
    
}

// Функция удаляет елемент по клику на кнопку, а так же отправляет массив в localStorage и рендерит
function removeTodoItem() {
    todoList.addEventListener('click', (e) => {
        const target = e.target;
        if (target.tagName === 'BUTTON') {
            todos.splice(target.parentNode.getAttribute('data-item-id'), 1);
            toLocalStorage();
            itemRender();
        }
    });
}

// Инициализируем функции при загрузке страницы
toLocalStorage();
itemRender();
addNewTodoItem();
removeTodoItem();