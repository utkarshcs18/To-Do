const toDo_array = JSON.parse(localStorage.getItem('lastTask'))||[];

const add = document.querySelector('.add');
const inputText = document.querySelector('.input-text');
const inputDate = document.querySelector('.input-date');
const displayContainer = document.querySelector('.display_toDo');

function toDo() {
    const inputStoreText = inputText.value.trim();
    const inputStoreDate = inputDate.value;

    if (inputStoreText === '' || inputStoreDate === '') {
        alert('Please fill out both fields!');
        return;
    }

    toDo_array.push({ inputStoreText, inputStoreDate });
    inputText.value = '';
    inputDate.value = '';

    display_toDo();
}

function display_toDo() {
    let toDo_arrayHtml = '';

    toDo_array.forEach((toDoObject, index) => {
        const { inputStoreText, inputStoreDate } = toDoObject;
        toDo_arrayHtml += `
        <div class="task">
            <div>${inputStoreText}</div> 
            <div>${inputStoreDate}</div>
            <button class="delete-todo" data-index="${index}">Delete</button>
        </div>`;
    });

    displayContainer.innerHTML = toDo_arrayHtml;

    document.querySelectorAll('.delete-todo').forEach((deleteButton) => {
        deleteButton.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            toDo_array.splice(index, 1);
            display_toDo();
        });
    });

    localStorage.setItem('lastTask',JSON.stringify(toDo_array));
}

add.addEventListener('click', () => {
    toDo();
});

inputText.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        toDo();
    }
});

display_toDo();