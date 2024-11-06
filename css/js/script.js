document.addEventListener('DOMContentLoaded', () => {
       const taskInput = document.getElementById('taskInput');
       const addTaskButton = document.getElementById('addTaskButton');
       const taskList = document.getElementById('taskList');

       let tasks = [];

       // Функция для обновления списка задач
       function renderTasks() {
           taskList.innerHTML = '';
           tasks.forEach((task, index) => {
               const li = document.createElement('li');
               li.textContent = task.text;
               if (task.completed) {
                   li.classList.add('completed');
               }
               li.addEventListener('click', () => {
                   task.completed = !task.completed;
                   renderTasks();
               });
               const deleteButton = document.createElement('button');
               deleteButton.textContent = 'Удалить';
               deleteButton.addEventListener('click', (e) => {
                   e.stopPropagation();
                   tasks.splice(index, 1);
                   renderTasks();
               });
               li.appendChild(deleteButton);
               taskList.appendChild(li);
           });
           localStorage.setItem('tasks', JSON.stringify(tasks));
       }

       // Загрузка задач из локального хранилища
       const savedTasks = localStorage.getItem('tasks');
       if (savedTasks) {
           tasks = JSON.parse(savedTasks);
       }

       addTaskButton.addEventListener('click', () => {
           const taskText = taskInput.value;
           if (taskText) {
               tasks.push({ text: taskText, completed: false });
               taskInput.value = '';
               renderTasks();
           }
       });

       renderTasks();
   });
