const form = document.getElementById('form')
const todosUL = document.getElementById('todos')
const input = document.getElementById('input')

//Extracting todoes from local storage
const todosFromLoacalStorage = JSON.parse(localStorage.getItem('todos'))


//if there is todos in LS we adde them from LS
if (todosFromLoacalStorage) {
  todosFromLoacalStorage.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  addTodo()
})



function addTodo(todo) {
  let todoText = input.value
  //todo is from local storage if it is not empty we assign todoText from local storage
  if (todo) {
    todoText = todo.text
  }
  //if there is a todoText, we create and prepare the li element to be append to the todosUL element
  if (todoText) {
    const todoEl = document.createElement('li')
    todoEl.innerText = todoText
    if (todo && todo.completed) {
      todoEl.classList.add('completed')
    }



    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed')
      updateLS()
    })
    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      todoEl.remove()
      updateLS()
    })

    todosUL.appendChild(todoEl)
    input.value = ''
    updateLS()
  }
}

// each action we invoke this function to be added todos data in local storage
function updateLS() {
  const todosForLocalStorage = []
  const todosEl = document.querySelectorAll('li')

  todosEl.forEach(todoEl => {
    todosForLocalStorage.push({
      text: todoEl.innerHTML,
      completed: todoEl.classList.contains('completed')
    })
  })
  localStorage.setItem('todos', JSON.stringify(todosForLocalStorage))
}



