'use strict';

const addInput = document.querySelector('#input'),
    addBtn = document.querySelector('#add-btn'),
    todoList = document.querySelector('#todo-list'),
    todoListChecked = document.querySelector('#todo-list-checked'),
    resetBtn = document.querySelector('#reset-btn'),
    textItem = document.querySelector('.todo-item__text');

// Создаём новый пустой массив для заметок. Если массив уже лежит в localStorage, то берём его оттуда
let todoArr = localStorage.getItem('listItem') ? JSON.parse(localStorage.getItem('listItem')) : [];
let todoArrChecked = localStorage.getItem('listItemChecked') ? JSON.parse(localStorage.getItem('listItemChecked')) : [];

// Функция рендера заметок из массивов в localStorage
function itemRender() {
    const todoArrParsed = JSON.parse(localStorage.getItem('listItem'));
    const todoArrCheckedParsed = JSON.parse(localStorage.getItem('listItemChecked'));
    todoList.innerHTML = '';
    todoListChecked.innerHTML = '';
    todoArrParsed.forEach((item, index) => {
        const elem = document.createElement('div');
        elem.classList.add('todo-item');
        elem.innerHTML = `
            <p class="todo-item__text">${item}</p>
            <button class="todo-item__correct-btn" id="correct-btn"></button>
            <button class="todo-item__del-btn" id="del-btn">&times;</button>
        `;
        elem.setAttribute('data-item-id', index);
        todoList.appendChild(elem);
    });

    todoArrCheckedParsed.forEach((item, index) => {
        const elem = document.createElement('div');
        elem.classList.add('todo-item', 'todo-item_checked');
        elem.innerHTML = `
            <p class="todo-item__text">${item}</p>
            <button class="todo-item__correct-btn" id="correct-btn"></button>
            <button class="todo-item__del-btn" id="del-btn">&times;</button>
        `;
        elem.setAttribute('data-item-checked-id', index);
        todoListChecked.appendChild(elem);
    });
}

// Функция отправляет текущий массив в localStorage
function toLocalStorage() {
    const serializedTodos = JSON.stringify(todoArr);
    localStorage.setItem('listItem', serializedTodos);

    const serializedTodosChecked = JSON.stringify(todoArrChecked);
    localStorage.setItem('listItemChecked', serializedTodosChecked);
}


// Функция добавляет в текущий массив значение из инпута, а так же отправляет его в localStorage и рендерит
function addNewTodoItem() {
    addBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (addInput.value !== '') {
            todoArr[todoArr.length] = addInput.value;
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
        if (target.id === 'del-btn') {
            todoArr.splice(target.parentNode.getAttribute('data-item-id'), 1);
            toLocalStorage();
            itemRender();
        }
    });

    todoListChecked.addEventListener('click', (e) => {
        const target = e.target;
        if (target.id === 'del-btn') {
            todoArrChecked.splice(target.parentNode.getAttribute('data-item-checked-id'), 1);
            toLocalStorage();
            itemRender();
        }
    });
}

// Функция переносит айтемы в состояние checked и возвращает
function addToCheckedList() {
    todoList.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;

        if (target.tagName === 'P') {
            todoArrChecked[todoArrChecked.length] = target.textContent;
            todoArr.splice(target.parentNode.getAttribute('data-item-id'), 1);
            toLocalStorage();
            itemRender();
        }
    });

    todoListChecked.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;

        if (target.tagName === 'P') {
            todoArr[todoArr.length] = target.textContent;
            todoArrChecked.splice(target.parentNode.getAttribute('data-item-checked-id'), 1);
            toLocalStorage();
            itemRender();
        }
    });
}

// Функция удаляет все checked item 
function resetCheckedList() {
    resetBtn.addEventListener('click', (e) => {
        e.preventDefault();

        todoArrChecked = [];    
        toLocalStorage();
        itemRender();

    });
}

// Функция изменения текста item'ов
function correctItem() {
    function correctItemEvent(list) {
        list.addEventListener('click', (e) => {
            const target = e.target;
            if (target.id === 'correct-btn') {
                const item = target.parentNode;
    
    
                item.firstElementChild.style.display = 'none';
                target.style.display = 'none';
    
                // Создаём форму с инпутом и кнопкой и вставляем её в item
                const correctForm = document.createElement('form');
                correctForm.classList.add('todo-correct-form');
                correctForm.innerHTML = `
                        <input class="todo-correct-form__input" value="${item.firstElementChild.textContent}" type="text" name="correct-input">
                        <button class="todo-correct-form__btn" name="correct-btn"></button>
                `;
                item.insertBefore(correctForm, item.firstElementChild);
    
                const correctInput = item.querySelector('.todo-correct-form__input');
                const correctBtn = item.querySelector('.todo-correct-form__btn');
    
                // Ставим фокус на инпуте и устанавливаем курсор в конце
                correctInput.focus();
                correctInput.selectionStart = correctInput.selectionEnd = correctInput.value.length;
    
                correctBtn.addEventListener('click', (e) => {
                    e.preventDefault();
    
                    // Проверка на пустое значение
                    if (correctInput.value) {
                        // Меняем текст в элементе на значение value из инпута
                        if (list === todoList) {
                            todoArr[target.parentNode.getAttribute('data-item-id')] = correctInput.value;
                        } else if (list === todoListChecked) {
                            todoArrChecked[target.parentNode.getAttribute('data-item-checked-id')] = correctInput.value;
                        }
                    }
                    
    
                    toLocalStorage();
                    itemRender();
                });
                
            }
        });
    }

    correctItemEvent(todoList);
    correctItemEvent(todoListChecked);
}

// Инициализируем функции при загрузке страницы
function init() {
    toLocalStorage();
    itemRender();
    addNewTodoItem();
    removeTodoItem();
    addToCheckedList();
    resetCheckedList();
    correctItem();
}

init();