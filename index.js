const form = document.getElementById('form')
const todosUL = document.getElementById('todos')
const input = document.getElementById('input')


const todosFromLoacalStorage = JSON.parse(localStorage.getItem('todos'))
console.log(todosFromLoacalStorage)

if (todosFromLoacalStorage) {
  todosFromLoacalStorage.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  addTodo()
})

function addTodo(todo) {
  let todoText = input.value
  if (todo) {
    todoText = todo.text
  }

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



